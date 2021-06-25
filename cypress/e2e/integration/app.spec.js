describe('app', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should enter search field, call api and return items', () => {
    cy.intercept('https://api.github.com/search/users**').as('search');
    cy.get('.search-input input').type('test');
    cy.get('.search-input button').click();
    cy.wait('@search', { timeout: 10000 }).then((interception) => {
      const { response } = interception;
      assert.equal(response?.body?.items.length, 9);
      assert.isAbove(response?.body?.total_count, 0);
    });
  });

  it('should change page, call api and return items', () => {
    cy.intercept('https://api.github.com/search/users**').as('search');
    cy.get('.search-input input').type('test');
    cy.get('.search-input button').click();
    cy.wait('@search');
    cy.intercept('https://api.github.com/search/users**').as('searchByPage');
    cy.get('.ant-pagination-item-2').click();
    cy.get('.search-input button').click();
    cy.wait('@searchByPage', { timeout: 10000 }).then((interception) => {
      const { response } = interception;
      console.log(response)
      assert.equal(response?.body?.items.length, 9);
      assert.isAbove(response?.body?.total_count, 0);
    });
  });
});
