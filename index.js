const open = require('open');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const notifier = require('node-notifier');

const psUrl = 'https://www.coolblue.be/nl/product/865867/playstation-5-digital-edition.html';
const selector = 'div.js-desktop-order-block > div > div.grid-section-xs--gap-4.is-hidden-until-size-m > form > div > button';

async function run() {
        await sleep(3000);
        console.log("Scraping")
        fetch(psUrl)
            .then(res => res.text())
            .then(body => cheerio.load(body))
            .then($ => $(selector))
            .then(elements => elements.length > 0 ? openBrowser() : run());
    }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function openBrowser() {
    open(psUrl);
    notifier.notify({
            title: 'PlayStation 5 beschikbaar',
            message: 'HAAL DIE CREDIT CARD AL MAAR BOVEN!',
            sound: 'Ping'
        },
        function (err, response) {
            console.error(err);
        }
    );
}

run();
