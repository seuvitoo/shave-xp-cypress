/// <reference types="cypress"/>

import forgetPasswordPage from "../support/pages/forgot-password";
import resetPasswordPage from "../support/pages/reset-password";
import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";

describe("esqueci minha senha", () => {
  it("deve exibir mensagem de resgate de senha", () => {
    const user = {
      name: "João Esquecido",
      email: "joao@esquecido.com",
      password: "pwd123",
      is_shaver: false,
    };

    cy.createUser(user);

    forgetPasswordPage.go();
    forgetPasswordPage.submit(user.email);

    const msg =
      "Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.";
    forgetPasswordPage.noticeShouldBe(msg);
  });

  context.only("quando o usuario solicita o resgate de senha", () => {
    const user = {
      name: "Will Smith",
      email: "will@esquecido.com",
      password: "pwd123",
      is_shaver: false,
    };

    beforeEach(() => {
      cy.createUser(user);
      cy.recoveryPassword(user.email);
      cy.getToken(user.email);
    });

    it("deve poder cadastrar uma nova senha", () => {
      resetPasswordPage.go(Cypress.env("token"));

      resetPasswordPage.submit("abc123", "abc123");

      const msg = "Agora você já pode logar com a sua nova senha secreta.";
      resetPasswordPage.noticeShouldBe(msg);
    });

    afterEach(() => {
      loginPage.submit(user.email, "abc123");
      shaversPage.header.userShouldBeLogged(user.name);
    });
  });
});
