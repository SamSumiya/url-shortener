const express = require('express')
const http = require('http') 
const app = express()
const server = http.createServer(app)


app.set("view engine", 'ejs')

app.get('/', (req, res) => {
   res.render('index')
})


const PORT = process.env.PORT || 5050

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});