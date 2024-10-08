// Chromium powered by Playwright-Extra
const { chromium } = require('playwright-extra')


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

    await page.goto('https://www.wanhai.com/views/Main.xhtml');
    await page.locator('#q_ref_no1').click();
    await page.locator('#q_ref_no1').fill('035EX59687');
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Query' }).click();
    const page1 = await page1Promise;
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByRole('link', { name: 'Booking Data' }).click();
    const page2 = await page2Promise;
    await page2.getByRole('cell', { name: 'Book No.' }).click();

    await page2.screenshot({
        path: 'wanhai-result.png',
        fullPage: true
    });

    await browser.close();

})