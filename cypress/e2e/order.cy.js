/// <reference types="cypress"/>

import shaversPage from "../support/pages/shavers";
import catalogoPage from "../support/pages/catalogo";
import orderPage from "../support/pages/order";

import data from "../fixtures/order.json";

describe("Pedido", () => {
  context("usuario logado", () => {
    const { customer, shavers, service } = data;
    before(() => {
      cy.createUser(customer);
      cy.apiLogin(customer);
    });

    it("deve poder solicitar serviços", () => {
      shaversPage.selectShaver(shavers.name);
      catalogoPage.hasShaver(shavers.name);

      catalogoPage.selectService(service.description);
      catalogoPage.hasTitle(service.description);

      catalogoPage.confirmOrder();
      orderPage.hasOrder();
    });
  });
});
