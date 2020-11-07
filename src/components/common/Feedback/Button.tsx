import { styled } from 'linaria/react'
import React, { FC, useState } from 'react'

import Feedback from '.'

const FeedbackButton: FC = () => {
  const [modal, setModal] = useState(false)

  return (
    <>
      <Container>
        <Button onClick={() => setModal(!modal)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="17"
            viewBox="0 0 512.001 512.001"
            className="mr0 mr2-ns"
            fill="#FFF"
          >
            <path d="M503.839 395.379l-195.7-338.962C297.257 37.569 277.766 26.315 256 26.315c-21.765 0-41.257 11.254-52.139 30.102L8.162 395.378c-10.883 18.85-10.883 41.356 0 60.205 10.883 18.849 30.373 30.102 52.139 30.102h391.398c21.765 0 41.256-11.254 52.14-30.101 10.883-18.85 10.883-41.356 0-60.205zm-25.978 45.207c-5.461 9.458-15.241 15.104-26.162 15.104H60.301c-10.922 0-20.702-5.646-26.162-15.104-5.46-9.458-5.46-20.75 0-30.208L229.84 71.416c5.46-9.458 15.24-15.104 26.161-15.104 10.92 0 20.701 5.646 26.161 15.104l195.7 338.962c5.459 9.458 5.459 20.75-.001 30.208z" />
            <path d="M241.001 176.01h29.996v149.982h-29.996zM256 355.99c-11.027 0-19.998 8.971-19.998 19.998s8.971 19.998 19.998 19.998c11.026 0 19.998-8.971 19.998-19.998S267.027 355.99 256 355.99z" />
          </svg>
          <span className="dn db-ns">Enviar Feedback</span>
        </Button>
      </Container>
      <Popover isVisible={modal}>
        <Feedback onClose={() => setModal(false)} />
      </Popover>
    </>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
`

const Button = styled.button`
  background-color: #001529;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  border: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  &:hover {
    color: #eeeeee;
  }
  @media (max-width: 600px) {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    justify-content: center;
  }
`

const Popover = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 62px;
  right: 20px;
  width: 300px;
  height: 220px;
  transition: visibility 0s, opacity 0.5s linear;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  @media (max-width: 600px) {
    bottom: 70px;
  }
`

export default FeedbackButton
