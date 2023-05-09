export default new (class ForgotPasswordPage {
  go() {
    cy.visit("/forgot-password");

    //checkpoint para garantir que estamos indo para a página certa
    cy.get("form h1").should("have.text", "Recuperar senha");
  }

  submit(email) {
    cy.get("input[placeholder$=mail]").type(email);
    cy.contains("button", "Recuperar").click();
  }

  noticeShouldBe(expectedText) {
    cy.get(".notice p", { timeout: 10000 })
      .should("be.visible")
      .should("have.have.text", expectedText);
  }
})();
