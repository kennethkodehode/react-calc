import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import store from './store'
import { pressButton, depressButton } from './features/rootSlice'

import Header from './components/Header'
import Display from './components/Display'
import Numpad from './components/Numpad'

function PageContainer() {
  const dispatch = useDispatch()
  const buttons = useSelector((state) => state.buttons)

  function handleKeyDown(e) {
    const button = buttons.find(({ keys }) => keys.includes(e.key))

    if (button)
      dispatch(pressButton(button.value))
  }

  function handleKeyUp(e) {
    const button = buttons.find(({ keys }) => keys.includes(e.key))
    
    if (button)
      dispatch(depressButton(button.value))
  }

  useEffect(function() {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return function() {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <StyledPageContainer>
      <StyledCalcContainer>
        <Header />
        <Display />
        <Numpad />
      </StyledCalcContainer>  
    </StyledPageContainer>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <PageContainer />
    </Provider>
  )
}

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const StyledCalcContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 1em;
`