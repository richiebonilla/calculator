module.exports = (function () {
  let memory = []
  let inputHistory = []
  let operationHistory = []

  return {
    // parseCanvas: function (equation) {
    //   return math.eval(equation)
    // },
    updateInputHistory: function (key) {
      inputHistory.push(key)
    },
    updateMemory: function (type, value) {
      switch (type) {
        case 'append':
          memory.push(value)
          break

        case 'clearer':
          memory.length = 0
          break

        case 'backspace':
          memory.pop()
          break

        case 'replace':
          memory.length = 0
          memory.push(value)
          break

        default:
      }
    },
    updateOperationHistory: function (o) {
      operationHistory.push(o)
    },
    getMemory: function () {
      return memory
    },
    getInputHistory: function () {
      return inputHistory
    },
    getOperationHistory: function () {
      return operationHistory
    },
    solve: function () {
      return math.eval(memory.join(''))
    }
  }
})()
