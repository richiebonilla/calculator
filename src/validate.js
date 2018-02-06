module.exports = (function () {
  return {
    key: function (key) {
      const keyCodes = [13, 32, 37, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 61, 124, 187, 191]

      if (keyCodes.includes(key.keyCode) || keyCodes.includes(key.which)) {
        return true
      }
    },
    backspace: function (key) {
      if (key.keyCode === 8 || ['backspace', 'Backspace'].includes(key)) {
        return true
      }
    },
    clearer: function (key) {
      return ['AC', ' '].includes(key)
    },
    equals: function (key) {
      return ['=', 'Enter'].includes(key)
    },
    inverse: function (key) {
      return ['+/-'].includes(key)
    },
    numeral: function (key) {
      return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)
    },
    operator: function (key) {
      return ['/', '÷', '*', '-', '+'].includes(key)
    },
    percentage: function (key) {
      return ['%'].includes(key)
    }
  }
})()
