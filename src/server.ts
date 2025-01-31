<<<<<<< HEAD
// // import express, { Request, Response } from 'express';
// // import puppeteer from "puppeteer";
// // import { scrapedJobListing, scrapedJobDescription } from "./scraper";

// // console.log("Starting server...");

// // const app = express();
// // const PORT = process.env.PORT || 8000;

// // app.get("/scrape", async (req: Request, res: Response): Promise<void> => {
// //     console.log("Received request at /scrape");
// //     let browser;
// //     try {
// //         browser = await puppeteer.launch({ 
// //             headless: true,
// //             args: ["--no-sandbox", "--disable-setuid-sandbox"]
// //         });
// //         console.log("Launched Puppeteer");

// //         const page = await browser.newPage();
// //         console.log("Opened new page");

// //         const jobListings = await scrapedJobListing(page);
// //         console.log(`Scraped ${jobListings.length} job listings`);

// //         const updatedJobListings = await scrapedJobDescription(jobListings, page);
// //         console.log("Scraped job descriptions");

// //         res.json(updatedJobListings);
// //     } catch (error) {
// //         console.error("Error in /scrape:", error);
// //         res.status(500).json({ error: "Scraping failed", details: (error as Error).message });
// //     } finally {
// //         if (browser) {
// //             await browser.close();
// //             console.log("Browser closed");
// //         }
// //     }
// // });

// // export { app };


// import express, { Request, Response } from 'express';
// import puppeteer from "puppeteer";
// import { scrapedJobListing, scrapedJobDescription } from "./scraper";

// console.log("Starting server...");

// const app = express();
// const PORT = process.env.PORT || 8000;

// app.get("/scrape", async (req: Request, res: Response): Promise<void> => {
//     console.log("Received request at /scrape");
//     let browser;
//     try {
//         browser = await puppeteer.launch({ 
//             headless: true,
//             args: ["--no-sandbox", "--disable-setuid-sandbox"]
//         });
//         console.log("Launched Puppeteer");

//         const page = await browser.newPage();
//         console.log("Opened new page");

//         const jobListings = await scrapedJobListing(page);
//         console.log(`Scraped ${jobListings.length} job listings`);

//         const updatedJobListings = await scrapedJobDescription(jobListings, page);
//         console.log("Scraped job descriptions");

//         res.json(updatedJobListings);
//     } catch (error) {
//         console.error("Error in /scrape:", error);
//         res.status(500).json({ error: "Scraping failed", details: (error as Error).message });
//     } finally {
//         if (browser) {
//             await browser.close();
//             console.log("Browser closed");
//         }
//     }
// });

// // ✅ Start the server here in `server.ts`
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// export { app };
=======

>>>>>>> origin/master
