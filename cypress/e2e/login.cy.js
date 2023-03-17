/// <reference types="cypress"/>

import loginPage from "../support/pages/login";
import shaversPage from "../support/pages/shavers";

describe("login", () => {
  context("quando submeto o formulário", () => {
    const user = {
      name: "Victor",
      email: "vy.santos@live.com",
      password: "pwd123",
    };

    it("deve logar com sucesso", () => {
      loginPage.submit(user.email, user.password);
      shaversPage.header.userShouldBeLogged(user.name);
    });

    it("não deve logar com senha incorreta", () => {
      const user = {
        nome: "Victor",
        email: "vy.santos@live.com",
        password: "pwd123456",
      };

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.submit(user.email, user.password);
      loginPage.noticeShouldBe(message);
    });

    it("não deve logar com e-mail não cadastrado", () => {
      const user = {
        nome: "Victor",
        email: "vy.santos@teste.com",
        password: "pwd123456",
      };

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";

      loginPage.submit(user.email, user.password);
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
