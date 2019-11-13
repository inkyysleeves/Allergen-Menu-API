const fetch = require('node-fetch');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(cors());

app.post('/fetch-menu-items', (req, res) => {
   const url = "https://www.just-eat.co.uk/restaurants-milano-pizza-new-bow/menu";
   (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const divClass = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.information")).map(arr => arr.innerText.trim())
    );
    res.send(divClass);
    await browser.close();
  })();

  });
  
  app.listen(process.env.PORT || 3002);
  
  module.exports = app;
 