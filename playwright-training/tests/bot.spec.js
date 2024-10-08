// playwright-extra is a drop-in replacement for playwright,
// it augments the installed playwright with plugin functionality
import { mock } from 'node:test';
import { chromium } from 'playwright-extra'

import { expect, test } from 'playwright/test'

// Load the stealth plugin and use defaults (all tricks to hide playwright usage)
// Note: playwright-extra is compatible with most puppeteer-extra plugins
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// Add the plugin to playwright (any number of plugins can be added)
chromium.use(StealthPlugin())




test('test', async () => {

    // ...(the rest of the quickstart code example is the same)
    chromium.launch({ headless: true }).then(async browser => {
        const page = await browser.newPage()

        page.addInitScript(mock => {
            window.playwright = undefined;
            window.navigator.webdriver = false;
        }, mock);

        console.log('Testing the stealth plugin..')
        await page.goto('https://bot.sannysoft.com', { waitUntil: 'networkidle' })

        await page.screenshot({ path: 'yenidirbu.png', fullPage: true })
        expect(page).toHaveTitle('Antibot');

        await browser.close()
    })
});