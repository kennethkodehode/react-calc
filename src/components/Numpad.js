import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Button from './Button'

export default function Numpad() {
  const buttons = useSelector((state) => state.buttons)
  
  return (
    <StyledNumpadContainer>
      {buttons.map(data => <Button key={data.value} {...data} />)}
    </StyledNumpadContainer>
  )
}

const StyledNumpadContainer = styled.div`
  background-color: var(--color-blue--600);
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1em;
  border-radius: .25em;
`