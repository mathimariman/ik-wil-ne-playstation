const open = require('open');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const productId = '868090';
const productUrl = 'https://www.coolblue.be/nl/product/' + productId;
const cartUrl= 'https://www.coolblue.be/nl/winkelmandje?add=' + productId;
const checkoutUrl = 'https://www.coolblue.be/nl/bestellen/overzicht';

const selector = '#main-content > div.grid-section-xs--gap-4.grid-section-m--gap-5 > div > div.grid-unit-xs--col-12.grid-unit-m--col-6.grid-unit-xl--col-5.js-sticky-bar-trigger > div > div.grid-section-xs--gap-4.grid-section-m--gap-5.js-order-block > div.is-hidden-until-size-m > div.js-desktop-order-block > div.grid-section-xs--gap-4 > a > div > div.icon-with-text__text';

async function run() {
        await sleep(3000);
        console.log("Scraping")
        fetch(productUrl)
            .then(res => res.text())
            .then(body => cheerio.load(body))
            .then($ => $(selector))
            .then(elements => elements.length === 0 ? openBrowser() : run());
    }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function openBrowser() {
    open(cartUrl);
    await sleep(200);
    open(checkoutUrl);
}

run();
