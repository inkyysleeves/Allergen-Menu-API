const fetch = require('node-fetch');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
app.use(express.json());

app.post('/fetch-menu-items', (req, res) => {
  const url = req.body.url;

  fetch(`${url}`)
    .then(page => page.text())
    .then(body => {
      const menuItems = [];
      const $ = cheerio.load(body);
      $('.menu-item').each(function fn() {
        const dish = $(this).find('h4').text();
        const ingredients = $(this).find('p').text();
        menuItems.push({ dish, ingredients });
      });
      // filtering logic, do other smarts before responding back to client
      res.send(menuItems);
    });
});

app.listen(3001);

module.exports = app;