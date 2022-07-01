import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { pressButton, depressButton } from '../features/rootSlice'

export default function Button({ value, color, size, isBeingPressed }) {
  const dispatch = useDispatch()

  return (
    <StyledButton
      onMouseDown={() => dispatch(pressButton(value))}
      onMouseUp={() => dispatch(depressButton(value))}
      {...{color, size, isBeingPressed}}
    >{value}</StyledButton>
  )
}

const StyledButton = styled.div`
  background-color: ${props => props.color.bkg};
  color: ${props => props.color.txt};
  padding: .5em;
  border-radius: .25em;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: pointer;
  grid-column: ${props => `span ${props.size}`};
  box-shadow: inset 0 ${props => props.isBeingPressed ? '-.1em' : '-.2em'} rgba(0,0,0,.25);
  user-select: none;
  transform:
    scaleY(${props => props.isBeingPressed ? .9 : 1})
    translateY(${props => props.isBeingPressed ? '.2rem' : 0})
  ;

  @media (min-width: 48em) {
    font-size: 1.6rem;
  }
`