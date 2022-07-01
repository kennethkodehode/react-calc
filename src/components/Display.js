import styled from 'styled-components'
import { useSelector } from 'react-redux'

export default function Display() {
  const { queue, current } = useSelector((state) => state)

  return (
    <StyledDiv>
      <StyledQueue>{queue.map(entry => entry.value).join(' ')}</StyledQueue>
      <h2>{current}</h2>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: var(--color-blue--700);
  padding: 1em;
  border-radius: .25rem;
  text-align: end;

  h2 {
    font-size: 2rem;
    margin: 0;

    @media (min-width: 48em) {
      font-size: 3rem;
    }
  }
`

const StyledQueue = styled.span`
  font-size: .85rem;
  display: inline-block;
  line-height: 1.5;
  min-height: 1rem;
  color: var(--color-blue--400);
`