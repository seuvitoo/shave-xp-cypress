class ResetPasswordPage {
  go(token) {
    cy.visit("/reset-password?token=" + token);
    cy.get("form h1").should("have.text", "Resetar senha");
  }

  submit(newPassword, confirmNewPassword) {
    cy.get('input[placeholder="Nova senha"]').type(newPassword);
    cy.get('input[placeholder*="Confirmação"]').type(confirmNewPassword);

    cy.contains("button", "Alterar senha").click();
  }

  noticeShouldBe(expectedText) {
    cy.get(".notice p", { timeout: 10000 })
      .should("be.visible")
      .should("have.have.text", expectedText);
  }
}

export default new ResetPasswordPage();
