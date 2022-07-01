import styled from 'styled-components'

export default function Header() {
  return (
    <StyledHeader>
      <h1>calc</h1>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  h1 {
    margin: 0;
  }
`