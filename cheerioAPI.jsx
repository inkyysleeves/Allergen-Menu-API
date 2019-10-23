const fetch = require('node-fetch');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/fetch-menu-items', (req, res) => {
   const url = req.body.urltoscan;
  // console.log(req.body.urltoscan);
  // const url = 'https://zoukteabar.co.uk/menus/manchester/';


  fetch(`${url}`)
    .then(page => page.text())
    .then(body => {
      const menuItems = [];
      const $ = cheerio.load(body);
      $('.menu-item').each(function fn() {
        const _id = new Date().getTime()+Math.floor(Math.random()*100000);
        const dish = $(this).find('h4').text();
        const ingredients = $(this).find('p').text();
        menuItems.push({_id, dish, ingredients });
      });
      // filtering logic, do other smarts before responding back to client
      res.send(menuItems);
    });
});

app.listen(3001);

module.exports = app;