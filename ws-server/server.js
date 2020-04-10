const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8082 })

const stocks = [
  {
    name: 'APPLE',
    price: 115,
  },
  {
    name: 'BILI',
    price: 25,
  },
  {
    name: 'BABA',
    price: 105,
  },
  {
    name: 'JD',
    price: 35,
  },
  {
    name: 'PDD',
    price: 65,
  },
  {
    name: 'TSLA',
    price: 87,
  },
]
function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) / 100
}

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    const stockRequest = JSON.parse(message).stocks
    console.log(stockRequest)
  })

  setInterval(function () {
    for (let i in stocks) {
      const price = stocks[i].price
      console.log(price)
      stocks[i].price += randomInterval(-100, 100)

      ws.send(JSON.stringify(stocks))
    }
  }, 1000)
})
