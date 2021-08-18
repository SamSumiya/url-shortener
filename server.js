require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const shortUrl = require('./models/ShortURL.js')
const app = express()
const server = http.createServer(app)

mongoose.connect('mongodb://localhost/urlShortner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async(req, res) => {
  const shortUrls = await shortUrl.find()
  res.render('index', { shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await shortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')    
})

app.get('/:shortUrl', async (req, res) => {
  const response = await shortUrl.findOne({ short: req.params.shortUrl });
  if (response === null) return res.sendStatus(404)

  response.clicks++;
  response.save();
  res.redirect(response.full)
})

const PORT = process.env.PORT || 5050

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});