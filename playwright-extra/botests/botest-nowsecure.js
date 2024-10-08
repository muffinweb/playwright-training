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
        path: '.././init.js'
    });

    await page.goto('https://nowsecure.nl/');

    page.screenshot({
        path: 'botests/nowsecure-nl.png',
        fullPage: true
    }).then(function (buffer) {
        console.log("NowSecure Bot Test TAMAMLANDI");
        browser.close();
    });


});