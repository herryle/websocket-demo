const WebSocket = require('ws')

//生成WebSocket服务端
const wss = new WebSocket.Server({ port: 8082 })

function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) / 100
}

//websocket连接
wss.on('connection', function (ws) {
  //接收信息
  ws.on('message', function (message) {
    stockRequest = JSON.parse(message)
    console.log('收到消息', stockRequest)
  })

  //模拟股票价格
  const clientStockUpdater = setInterval(function () {
    for (let i in stockRequest) {
      stockRequest[i].price += randomInterval(-100, 100)
      //推送消息
      ws.send(JSON.stringify(stockRequest))
    }
  }, 1000)

  //关闭websocket
  ws.on('close', function () {
    clearInterval(clientStockUpdater)
  })
})
