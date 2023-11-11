import snippets from "../../snippets";

describe('example', () => {
  it('snippets', () => {
    cy.visit("http://localhost:5173/");
    snippets["userflow чекаут"]({cy});
  });
});
