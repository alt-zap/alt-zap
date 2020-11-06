import { styled } from 'linaria/react'
import React, { FC, useState } from 'react'

import { useAltIntl } from '../../../intlConfig'

type Props = { type: 'bug' | 'feature' }
const FeedbackPrompt: FC<Props> = ({ type }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { formatMessage } = useAltIntl()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // fetch(`https://sentry.io/api/0/projects/{organization_slug}/{project_slug}/user-feedback/`)
    // Simulating
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  return (
    <Container>
      {!success && (
        <Form onSubmit={onSubmit}>
          <Textarea
            disabled={loading}
            placeholder={formatMessage({ id: 'feedback.placeholder' })}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {formatMessage({
              id:
                type === 'bug'
                  ? 'feedback.reportBug'
                  : 'feedback.reportFeature',
            })}
          </Button>
        </Form>
      )}
      {success && <Success>{formatMessage({ id: 'feedback.thanks' })}</Success>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  min-height: 80px;
  padding: 6px;
  font-size: 16px;
`

const Button = styled.button`
  margin-top: 10px;
  background-color: ${(props) => (props.disabled ? '#c4c4c4' : '#001529')};
  color: white;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  border: 0;
  font-size: 15px;
  padding: 6px 0;
`

const Success = styled.div`
  padding: 30px 0;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
`

export default FeedbackPrompt
