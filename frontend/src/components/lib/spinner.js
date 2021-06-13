import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { FaSpinner } from 'react-icons/fa'

const spin = keyframes`
  0% {
	transform: rotate(0deg)
  }
  100% {
	transform: rotate(360deg)
  }
`
export const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`
Spinner.defaultProps = {
  'aria-label': 'loading',
}
Spinner.displayName = 'Spinner'

export const FullscreenSpinner = () => {
  return (
    <div
      css={`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
      `}
    >
      <Spinner />
    </div>
  )
}
