describe('Integrity', () => {
  before(() => {
    cy.visit('http://localhost:8000/bardolucis')
  })

  it('Should be able to select Buchada on Bar do Lucis', () => {
    cy.get('#summary-P9gta905bgWcNBBbUlIP').click()
  })
})
