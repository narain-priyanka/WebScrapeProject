import { Page,Browser } from "puppeteer";
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const randomSleep = (min: number, max: number) => new Promise((r) => setTimeout(r, Math.floor(Math.random() * (max - min + 1)) + min));

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
];

const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

export async function scrapedJobListing(page: Page) {
  const listOfJobs: { job: string, url: string | undefined, description: string, datePosted: Date, hood: string }[] = [];
  
  for (let i = 1; i <= 30; i++) { // Loop through 30 pages
      const pageUrl = `https://newyork.craigslist.org/search/jjj#search=1~thumb~${i}~0`; 

      await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
      await randomSleep(2000, 5000); // Avoid bot detection
      await page.setUserAgent(getRandomUserAgent()); 
      await page.setViewport({ width: 1280, height: 800 });

      // Wait for the job listing elements
      await page.waitForSelector(".result-info");

      const html = await page.content();
      const $ = cheerio.load(html);
      
      const scrappedJobList = $(".result-info").map((index: number, element: Element) => {
          const jobTitleUrlData = $(element).find(".title-blob>a");
          const job = $(jobTitleUrlData).text();
          const url = $(jobTitleUrlData).attr("href");
          const timeElement = $(element).find(".meta > span");
          const datePosted = new Date($(timeElement).attr("title"));
          const hoodElement = $(element).find(".supertitle");
          const hood = $(hoodElement).text().trim().replace("(", "").replace(")", "");

          return { job, url, datePosted, hood, description: "" };
      }).get();

      listOfJobs.push(...scrappedJobList);
      
      console.log(`Page ${i} scraped successfully.`);
  }

  console.log(`Total jobs scraped: ${listOfJobs.length}`);
  return listOfJobs;
}

export async function scrapedJobDescription(jobListings:{job:string, url:string | undefined, description: string, datePosted:Date, hood:string}[], page:Page){
    for (let i: number = 0; i < jobListings.length; i++) {
        const url = jobListings[i].url;
        if (url) { // Check if url is not undefined
            try {
                await randomSleep(2000, 5000);
                await page.setUserAgent(getRandomUserAgent());
                await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
                await randomSleep(1000, 3000);
                const html = await page.content();
                const $ = cheerio.load(html);
                const description = $("#postingbody").text();
                jobListings[i].description = description.trim(); // Update the job description
            } catch (error: any) {
                console.error(`Failed to scrape ${url}: ${error.message}`);
            }
        } else {
            console.warn(`Job listing at index ${i} has no URL.`);
        }
    }
    
    return jobListings;
}
async function main(){
    const browser: Browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features",
        "--disable-blink-features=AutomationControlled",
      ],
    });

    const page = await browser.newPage();  // returns page object that represents single page in browser
    // and the page objects provides methods to scrape , screenshot, or interact with data.
    const jobListings = await scrapedJobListing(page);
    const updatedJobListings = await scrapedJobDescription(jobListings, page);
    console.log(updatedJobListings);
    await randomSleep(3000, 7000);
    await browser.close();
}

main();
