// Chromium powered by Playwright-Extra
const { chromium } = require('playwright-extra')
const fs = require("fs");


// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
const stealth = require('puppeteer-extra-plugin-stealth')()

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(stealth)

// That's it, the rest is playwright usage as normal 😊
chromium.launch({ headless: true }).then(async browser => {

    const page = await browser.newPage();

    page.addInitScript({
        path: './init.js'
    })

    const trackNumber = "WHLC031E588335";

    await page.goto('https://www.chinese-brothers.com/services/cargotracking?number=' + trackNumber);
    await page.waitForLoadState('networkidle');

    await page.screenshot({
        path: 'scrape-results/screen-result.png',
        fullPage: true
    }).then(async function () {

        let resultHTML = await page.locator('#tracking_system_root').evaluate(node => node.shadowRoot.innerHTML);
        fs.writeFile('scrape-results/result.html', resultHTML, err => {
            if (err) {
                console.error(err);
            } else {
                console.log('output has been written successfully.');
            }
        });
        await browser.close();
    });

})