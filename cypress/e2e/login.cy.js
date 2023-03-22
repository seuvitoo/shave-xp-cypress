/// <reference types="cypress"/>

import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";

import data from "../fixtures/users.json";

describe("login", () => {
  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = data.sucesso;

      cy.createUser(user)
      

      loginPage.submit(user.email, user.password);
      shaversPage.header.userShouldBeLogged(user.name);
    });

    it("não deve logar com senha incorreta", () => {
      const senhaInvalida = data.senhaInvalida;
      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.submit(senhaInvalida.email, senhaInvalida.password);
      loginPage.noticeShouldBe(message);
    });

    it("não deve logar com e-mail não cadastrado", () => {
      const email404 = data.email404;
      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.submit(email404.email, email404.password);
      loginPage.noticeShouldBe(message);
    });

    it("campos obrigatórios para login", () => {
      loginPage.submit();
      loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória");
    });
  });

  context("senha curta", () => {
    const passwords = ["1", "12", "123", "1234", "12345"];

    passwords.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit("vy.santos@live.com", p);
        loginPage.alertShouldBe("Pelo menos 6 caracteres");
      });
    });
  });

  context("e-mail no formado incorreto", () => {
    const emails = [
      "vy.santos",
      "1245",
      "victor.com.br",
      "@gmail",
      "victor$",
      "victor@gmail",
    ];

    emails.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit(p, "pwd123");
        loginPage.alertShouldBe("Informe um email válido");
      });
    });
  });
});
