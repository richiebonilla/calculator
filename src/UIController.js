module.exports = (function () {
  let DOMstrings = {
    canvas: 'canvas',
    opCanvas: 'operation',
    divide: 'btn-divide',
    multiply: 'btn-multiply',
    subtract: 'btn-subtract',
    add: 'btn-add'
  }

  let canvas = document.getElementById(DOMstrings.canvas)
  let operationsCanvas = document.getElementById(DOMstrings.opCanvas)

  return {
    getDOMstrings: function () {
      return DOMstrings
    },
    updateCanvas: function (type, value) {
      if (canvas.textContent === '0' && value === '.') {
        canvas.textContent = '0'
      } else if (canvas.textContent === '0') {
        canvas.textContent = ''
      }
      switch (type) {
        case 'replace':
          canvas.textContent = value
          break

        // case 'backspace':
        //   if (canvas.textContent.length > 1) {
        //     canvas.textContent = canvas.textContent.slice(0, -1)
        //   } else {
        //     canvas.textContent = '0'
        //   }
        //   break

        case 'clearer':
          canvas.textContent = '0'
          break

        default:
          // append value to end of current canvas
          canvas.textContent += value
      }
    },
    updateCanvasOperation: function (operation) {
      operationsCanvas.textContent = operation
    },
    operatorState: function (el, state) {
      if (state === 'activate') {
        
        // Remove active state from all operators
        document.getElementById(DOMstrings.divide).classList.remove('active')
        document.getElementById(DOMstrings.multiply).classList.remove('active')
        document.getElementById(DOMstrings.subtract).classList.remove('active')
        document.getElementById(DOMstrings.add).classList.remove('active')
        
        // Add active state to newly active operator
        document.getElementById(el).classList.add('active')

      } else if (state === 'deactivate') {
        document.getElementById(DOMstrings.divide).classList.remove('active')
        document.getElementById(DOMstrings.multiply).classList.remove('active')
        document.getElementById(DOMstrings.subtract).classList.remove('active')
        document.getElementById(DOMstrings.add).classList.remove('active')
      }
    },
    getCanvas: function () {
      return canvas.textContent
    }
  }
})()
