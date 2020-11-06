import React, { FC, useState } from 'react'
import { styled } from 'linaria/react'

import FeedbackOption from './Option'
import FeedbackPrompt from './Prompt'
import BackIcon from './BackIcon'
import { useAltIntl } from '../../../intlConfig'

type Props = {
  initialType?: 'bug' | 'feature'
  onClose: () => void
}
const Feedback: FC<Props> = ({ initialType, onClose }) => {
  const { formatMessage } = useAltIntl()
  const [type, setType] = useState<'bug' | 'feature' | null>(
    initialType ?? null
  )

  return (
    <Container>
      <div className="flex mb2 items-center">
        {type && (
          <BackButton onClick={() => setType(null)}>
            <BackIcon width="12" />
          </BackButton>
        )}
        <Title>
          {formatMessage({
            id: type === null ? 'feedback.title' : 'feedback.conta',
          })}
        </Title>
        <CloseButton onClick={() => onClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            fill="currentColor"
            viewBox="0 0 11 11"
          >
            <path d="M10.707 1.707A1 1 0 009.293.293l1.414 1.414zm-1.414 9a1 1 0 001.414-1.414l-1.414 1.414zM1.707.293A1 1 0 00.293 1.707L1.707.293zm-1.414 9a1 1 0 101.414 1.414L.293 9.293zm5.914-3.086l4.5-4.5L9.293.293l-4.5 4.5 1.414 1.414zm-1.414 0l4.5 4.5 1.414-1.414-4.5-4.5-1.414 1.414zm1.414-1.414l-4.5-4.5L.293 1.707l4.5 4.5 1.414-1.414zm-1.414 0l-4.5 4.5 1.414 1.414 4.5-4.5-1.414-1.414z" />
          </svg>
        </CloseButton>
      </div>
      {!type && <FeedbackOption onSelect={(option) => setType(option)} />}
      {type && <FeedbackPrompt type={type} />}
    </Container>
  )
}

const Container = styled.div`
  background-color: #eee;
  border-radius: 8px;
  width: 100%;
  border: 2px solid #d4d4d4;
  padding: 8px;
  height: 209px;
`

const BackButton = styled.button`
  cursor: pointer;
  border: 0;
  &:hover {
    color: #9fa9b8;
  }
`

const CloseButton = styled.button`
  cursor: pointer;
  border: 0;
  &:hover {
    color: #9fa9b8;
  }
`

const Title = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`

export default Feedback
