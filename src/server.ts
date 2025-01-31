import express, { Request, Response } from 'express';
import puppeteer from "puppeteer";
import { scrapedJobListing, scrapedJobDescription } from "./scraper";

const app = express();
const PORT = 8000;

// Home listing scraper API
app.get("/scrape", async (req: Request, res: Response): Promise<void> => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Scrape job listings
        const jobListings = await scrapedJobListing(page);
        
        // Scrape job descriptions
        const updatedJobListings = await scrapedJobDescription(jobListings, page);

        await browser.close();

        res.json(updatedJobListings);
    } catch (error) {
        res.status(500).json({ error: "Scraping failed", details: (error as Error).message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
