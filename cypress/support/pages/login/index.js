export default new (class LoginPage {
  constructor() {
    this.alert = ".alert-error";
  }

  submit(email = null, password = null) {
    cy.visit("/");

    cy.get("input[placeholder$=email]").as("email");
    cy.get("input[placeholder*=senha]").as("password");

    if (email) {
      cy.get("@email").type(email);
    }
    if (password) {
      cy.get("@password").type(password);
    }

    cy.contains("button", "Entrar").click();
  }

  noticeShouldBe(message) {
    cy.get(".notice-container")
      .should("be.visible")
      .find(".error p")
      .should("have.text", message);
  }

  alertShouldBe(message) {
    cy.get(this.alert).should("be.visible").should("have.text", message);
  }

  requiredFields(emailMessage, passowrdMessage) {
    cy.get(this.alert)
      .should("have.length", 2)
      .and(($small) => {
        expect($small.get(0).textContent).to.equal(emailMessage);
        expect($small.get(1).textContent).to.equal(passowrdMessage);
      });
  }
})();
