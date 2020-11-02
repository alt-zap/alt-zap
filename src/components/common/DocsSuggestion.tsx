import { styled } from 'linaria/react'
import React, { FC } from 'react'

type Props = { docs: Array<{ name: string; href: string }> }

const Wrapper = styled.div`
  border-radius: 0.25rem;
  border: 1px solid #c7c7c7;
  padding: 5px 0;
  display: flex;
  align-items: center;
`

const DocsSuggestion: FC<Props> = ({ docs }) => {
  return (
    <Wrapper>
      <div className="mh3">
        <svg
          id="Capa_1"
          height="20"
          viewBox="0 0 512 512"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="m446.605 124.392-119.997-119.997c-2.801-2.802-6.624-4.395-10.608-4.395h-210c-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h300c24.813 0 45-20.187 45-45v-332c0-4.09-1.717-7.931-4.395-10.608zm-115.605-73.179 68.787 68.787h-53.787c-8.271 0-15-6.729-15-15zm75 430.787h-300c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h195v75c0 24.813 20.187 45 45 45h75v317c0 8.271-6.729 15-15 15z" />
            <path d="m346 212h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path d="m346 272h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path d="m346 332h-180c-8.284 0-15 6.716-15 15s6.716 15 15 15h180c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path d="m286 392h-120c-8.284 0-15 6.716-15 15s6.716 15 15 15h120c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
          </g>
        </svg>
      </div>
      <div className="flex flex-column">
        <span className="light-silver ttu">TUTORIAIS</span>
        {docs.map(({ name, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ))}
      </div>
    </Wrapper>
  )
}

export default DocsSuggestion
