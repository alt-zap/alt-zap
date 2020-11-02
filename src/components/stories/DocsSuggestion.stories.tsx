import React from 'react'

import DocsSuggestion from '../common/DocsSuggestion'

export default {
  title: 'common/DocsSuggestion',
  component: DocsSuggestion,
  decorators: [(story: any) => <div className="pa2">{story()}</div>],
}

export const WithOne = () => (
  <DocsSuggestion
    docs={[
      {
        name: 'Como treinar seu dragão',
        href: 'https://docs.alt.app.br/teste',
      },
    ]}
  />
)

export const WithTwo = () => (
  <DocsSuggestion
    docs={[
      {
        name: 'Como treinar seu dragão',
        href: 'https://docs.alt.app.br/teste',
      },
      {
        name: 'Como treinar seu dragão 2',
        href: 'https://docs.alt.app.br/teste',
      },
    ]}
  />
)
