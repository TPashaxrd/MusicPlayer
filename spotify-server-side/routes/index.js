const { render } = require('ejs');
var express = require('express');
var router = express.Router();

const fs = require("fs");

let routes = fs.readdirSync(__dirname);

for (let route of routes) {
  if (route.includes(".js") && route != "index.js") {
    router.use("/" + route.replace(".js", ""), require('./' + route));
  }
}

router.use((req, res) => {
  res.status(404).render('404', { title: '404', url: req.originalUrl });
});

module.exports = router;
