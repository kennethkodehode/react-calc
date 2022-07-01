import { createSlice } from '@reduxjs/toolkit'

import { OPERATORS, BUTTON_TYPES, BUTTON_SIZES, BUTTON_COLORS } from '../constants'

const initialState = {
  queue: [],
  current: '0',
  buttons: [
    {
      value: 7,
      keys: ['7'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 8,
      keys: ['8'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 9,
      keys: ['9'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 'del',
      keys: ['Delete', 'Backspace'],
      type: BUTTON_TYPES.DELETE,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.BLUE,
      isBeingPressed: false
    },
    {
      value: 4,
      keys: ['4'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 5,
      keys: ['5'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 6,
      keys: ['6'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: OPERATORS.ADD,
      keys: ['+'],
      type: BUTTON_TYPES.OPERATOR,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 1,
      keys: ['1'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 2,
      keys: ['2'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 3,
      keys: ['3'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL,
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: OPERATORS.SUBTRACT,
      keys: ['-'],
      type: BUTTON_TYPES.OPERATOR, 
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: '.',
      keys: ['.', ','],
      type: BUTTON_TYPES.DECIMAL,
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 0,
      keys: ['0'],
      type: BUTTON_TYPES.NUM,
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: OPERATORS.DIVIDE,
      keys: ['/'],
      type: BUTTON_TYPES.OPERATOR, 
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: OPERATORS.MULTIPLY,
      keys: ['x', '*'],
      type: BUTTON_TYPES.OPERATOR, 
      size: BUTTON_SIZES.SMALL, 
      color: BUTTON_COLORS.WHITE,
      isBeingPressed: false
    },
    {
      value: 'reset',
      keys: ['r', 'c'], 
      type: BUTTON_TYPES.RESET,
      size: BUTTON_SIZES.WIDE,
      color: BUTTON_COLORS.BLUE,
      isBeingPressed: false
    },
    {
      value: '=',
      keys: ['=', 'Enter'],
      type: BUTTON_TYPES.SUM,
      size: BUTTON_SIZES.WIDE,
      color: BUTTON_COLORS.RED,
      isBeingPressed: false
    }
  ]
}

const operations = {}
operations[OPERATORS.MULTIPLY] = (a, b) => a * b
operations[OPERATORS.DIVIDE]   = (a, b) => a / b
operations[OPERATORS.ADD]      = (a, b) => a + b
operations[OPERATORS.SUBTRACT] = (a, b) => a - b

const reducers = {
  pressButton: function(state, action) {
    const button = state.buttons.find(({ value }) => value === action.payload)
    if (button) button.isBeingPressed = true
  },

  depressButton: function(state, action) {
    const button = state.buttons.find(({ value }) => value === action.payload)
    
    if (!button) return

    button.isBeingPressed = false
    
    switch(button.type) {
      case BUTTON_TYPES.NUM:
        if (state.current.length > 12) return
        state.current =
          '0' === state.current
          ? button.value + ''
          : state.current + button.value
        break

      case BUTTON_TYPES.DECIMAL:
        if (!state.current.includes(button.value))
          state.current += button.value
        break

      case  BUTTON_TYPES.OPERATOR:
        if (state.queue?.[1]?.type === BUTTON_TYPES.OPERATOR) {
          state.queue[1].value = button.value
        } else if (state.queue.length == 2) {
          const operation = operations[state.queue[1].value]
          state.queue = [{
            value: operation(state.queue[0].value, parseFloat(state.current)),
            type: BUTTON_TYPES.NUM
          }]
          state.current = '0'

        } else {
          state.queue.push({value: parseFloat(state.current), type: BUTTON_TYPES.NUM})
          state.queue.push({value: button.value, type: button.type})
          state.current = '0'
        }
        break

      case BUTTON_TYPES.DELETE:
        state.current =
          1 === state.current.length
          ? '0'
          : state.current.substr(0, state.current.length - 1)
        break

      case BUTTON_TYPES.RESET:
        state.current = '0'
        state.queue = []
        break

      case BUTTON_TYPES.SUM:
        if (1 >= state.queue.length) return
        const operation = operations[state.queue[1].value] 
        const sum = operation(parseFloat(state.queue[0].value), parseFloat(state.current))
        state.current = sum < 1e+13 ? sum + '' : 'Err'
        state.queue = []
        break
    }
  }
}

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers,
})

export const { pressButton, depressButton } = rootSlice.actions
export default rootSlice.reducer