export const OPERATORS = {
  ADD:      '+',
  SUBTRACT: '-',
  MULTIPLY: 'x',
  DIVIDE:   '/',
}

export const BUTTON_TYPES = {
  NUM:      0,
  DECIMAL:  1,
  OPERATOR: 2,
  DELETE:   3,
  RESET:    4,
  SUM:      5,
}

export const BUTTON_SIZES = {
  SMALL: 1,
  WIDE:  2,
}

export const BUTTON_COLORS = {
  WHITE: {
    bkg: 'var(--color-white--400)',
    txt: 'var(--color-blue--500)',
  },
  BLUE: {
    bkg: 'var(--color-blue--400)',
    txt: 'var(--color-white--100)',
  },
  RED: {
    bkg: 'var(--color-red--400)',
    txt: 'var(--color-white--100)',
  }
}
