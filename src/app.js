import './scss/app.scss'
import UICtrl from './UIController.js'
import calcCtrl from './calculatorController.js'
import is from './validate.js'

const app = (function (calcCtrl, ui, is) {
  const DOM = UICtrl.getDOMstrings()

  const setupEventListeners = function () {
    // evaluates clicks
    document.addEventListener('click', function (e) {
      let btnLabel = e.target.textContent

      if (e.target.classList.contains('button')) {
        controller(btnLabel)
        console.log(e)
      }
    })

    // evaluates keypresses
    document.addEventListener('keypress', function (e) {
      if (is.key(e)) {
        controller(e.key)
        console.log(e)
      }
    })

    // // evaluates keydown for backspace
    // document.addEventListener('keydown', function (e) {
    //   if (is.backspace(e)) {
    //     controller(e.key)
    //     // console.log(e)
    //   }
    // })

    // evaluates touchevents
    document.addEventListener('touchstart', function (e) {
      let btnLabel = e.target.textContent

      if (e.target.classList.contains('button')) {
        controller(btnLabel)
        // console.log(e)
      }
    })
  }
  const appendOperator = function (key) {
    switch (key) {
      case '÷':
      case '/':
        UICtrl.operatorState(DOM.divide, 'activate')
        calcCtrl.updateMemory('append', '/')
        calcCtrl.updateInputHistory(key)
        break

      case '*':
        UICtrl.operatorState(DOM.multiply, 'activate')
        calcCtrl.updateMemory('append', '*')
        calcCtrl.updateInputHistory(key)
        break

      case '-':
        UICtrl.operatorState(DOM.subtract, 'activate')
        calcCtrl.updateMemory('append', '-')
        calcCtrl.updateInputHistory(key)
        break

      case '+':
        UICtrl.operatorState(DOM.add, 'activate')
        calcCtrl.updateMemory('append', '+')
        calcCtrl.updateInputHistory(key)
        break

      default:
    }
  }
  const resolvePartialOperation = function (memory, key) {
    // store lastmemory for safe-keeping
    let lm = memory.pop()
    // get the contents of memory, except lastmemory
    // join this new arr into a number
    let num = memory.join('')
    // replace memory with this new number, the operator, and the new number
    calcCtrl.updateMemory('replace', num)
    calcCtrl.updateMemory('append', lm)
    calcCtrl.updateMemory('append', num)
    calcCtrl.updateInputHistory(key)
    // solve
    solveUpdate(memory)
  }
  const solveUpdate = function (memory) {
    let ans = calcCtrl.solve()
    let op = memory.join('')
    // update operation history before updating memory to capture equation
    calcCtrl.updateOperationHistory(op)
    UICtrl.updateCanvasOperation(op)
    // then update canvas and memory with answer
    UICtrl.updateCanvas('replace', ans)
    calcCtrl.updateMemory('replace', ans)
  }
  const controller = function (key) {
    let memory = calcCtrl.getMemory()
    let lastMemory = memory[memory.length - 1]
    let inputHistory = calcCtrl.getInputHistory()
    let lastInput = inputHistory[inputHistory.length - 1]
    let operationHistory = calcCtrl.getOperationHistory()

    switch (key !== '') {
      case is.numeral(key):

        // key = parseInt(key) // converts all numeral inputs to num primitive 
          // (not sure why I did this in the first place, but I commented it out so that my double zero button would work when I added it on 03-18-2018)
      
        if (is.equals(lastInput)) {
          // if last input was equals, start fresh with this num keypress
          UICtrl.updateCanvas('replace', key)
          UICtrl.updateCanvasOperation('')
          calcCtrl.updateMemory('replace', key)
        } else {
          if (is.operator(lastMemory)) {
            // if last mem is an operator replace the current num in the canvas with the newly clicked num
            UICtrl.updateCanvas('replace', key)
            calcCtrl.updateMemory('append', key)
          } else if (is.percentage(lastInput) || is.inverse(lastInput)) {
            UICtrl.updateCanvas('replace', key)
            calcCtrl.updateMemory('replace', key)
          } else {
            // if last mem is a number, append the newly clicked digit
            UICtrl.updateCanvas('append', key)
            calcCtrl.updateMemory('append', key)
          }
        }
        // update input history with numeral keypress regardless of how canvas and memory are handled above
        calcCtrl.updateInputHistory(key)
        console.log(memory, inputHistory)
        break

      case is.clearer(key):
        UICtrl.updateCanvas('clearer')
        UICtrl.updateCanvasOperation('')
        calcCtrl.updateMemory('clearer')
        calcCtrl.updateInputHistory(key)
        UICtrl.operatorState('', 'deactivate')
        console.log(memory, inputHistory)
        break

      // case is.backspace(key):
      //   UICtrl.updateCanvas('backspace')
      //   calcCtrl.updateMemory('backspace')
      //   calcCtrl.updateInputHistory(key)
      //   console.log(memory, inputHistory)
      //   break

      case is.equals(key):
        if (!isNaN(lastMemory)) {
          solveUpdate(memory)
          calcCtrl.updateInputHistory(key)
          console.log(memory, inputHistory, operationHistory)
        } else if (isNaN(lastMemory)) {
          resolvePartialOperation(memory, key)
          console.log(memory, inputHistory, operationHistory)
        }
        UICtrl.operatorState('', 'deactivate')
        break

      case is.operator(key):
        if (memory.length > 0) {
          if (!isNaN(lastMemory)) {
            // check memory for operator
            let ops = memory.filter((m) => is.operator(m))

            if (ops.length > 0) { // there is an operator
              // solve, and replace memory with answer and new operator
              solveUpdate(memory)
              appendOperator(key)

              console.log(memory, inputHistory)
            } else { // there is no operator
              appendOperator(key)
              console.log(memory, inputHistory)
            }
          } else if (isNaN(lastMemory)) {
            // UICtrl.updateCanvas('backspace')
            // calcCtrl.updateMemory('backspace')
            // calcCtrl.updateInputHistory(key)
            if (is.operator(lastMemory)) {
              memory.pop()         
            }
            appendOperator(key)
            console.log(memory, inputHistory, operationHistory)
          }
        }
        break

      case is.percentage(key):
        if (is.operator(lastMemory)) {
          resolvePartialOperation(memory, key)
        } else {
          solveUpdate(memory)
        }
        calcCtrl.updateMemory('append', '*0.01')
        solveUpdate(memory)
        calcCtrl.updateInputHistory(key)
        break

      case is.inverse(key):
        if (is.operator(lastMemory)) {
          resolvePartialOperation(memory, key)
        } else {
          solveUpdate(memory)
        }
        calcCtrl.updateMemory('append', '*-1')
        solveUpdate(memory)
        calcCtrl.updateInputHistory(key)
        break

      default:
        console.log('Err: unanticipated input')
    }
  }

  return {
    init: function () {
      console.log('Application has started')
      setupEventListeners()
    }
  }
})(calcCtrl, UICtrl, is)

app.init()
