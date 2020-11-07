import { styled } from 'linaria/react'
import React, { FC } from 'react'

import BugIcon from './BugIcon'
import IdeaIcon from './IdeaIcon'

type Props = { onSelect: (option: 'bug' | 'feature') => void }

const FeedbackOption: FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex flex-column items-center">
      <BugButton onClick={() => onSelect('bug')}>
        <BugIcon width="25" />
        <span>Reportar um Problema</span>
      </BugButton>
      <Or>Ou</Or>
      <FeatureButton onClick={() => onSelect('feature')}>
        <IdeaIcon width="25" />
        <span>Fazer uma Sugestão</span>
      </FeatureButton>
    </div>
  )
}

const BugButton = styled.button`
  border: 2px solid #001529;
  background-color: white;
  padding: 9px 12px;
  border-radius: 14px;
  color: #001529;
  font-size: 17px;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    border-color: #07233f;
    color: #07233f;
  }
`

const FeatureButton = styled.button`
  border: 2px solid #001529;
  background-color: white;
  padding: 9px 12px;
  border-radius: 14px;
  color: #001529;
  font-size: 17px;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    border-color: #07233f;
    color: #07233f;
  }
`

const Or = styled.div`
  text-transform: uppercase;
  color: gray;
  text-align: center;
`

export default FeedbackOption
