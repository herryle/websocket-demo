const vm = new Vue({
  el: '#app',
  data: {
    stock_request: { stocks: ['AAPL', 'BILI', 'BABA', 'JD', 'PDD', 'TSLA'] },
    tableData: [
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
    ],
  },
  methods: {
    start() {
      const ws = new WebSocket('ws://localhost:8082')
      ws.onopen = function (e) {
        console.log('Connection to server opened')
        ws.send(JSON.stringify(vm.stock_request))
        console.log('sened a mesg')
      }
      ws.onmessage = function (e) {
        vm.tableData = JSON.parse(e.data)

        console.log(vm.tableData)
      }
    },
    end() {},
  },
})
