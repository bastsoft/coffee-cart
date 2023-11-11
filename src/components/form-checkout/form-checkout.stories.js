import FormCheckout from "./form-checkout.vue";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import getTestDecorator from "my-snip/storybook-test/create.js";
const test = getTestDecorator({userEvent, within, expect});

import snippets from "../../../snippets";

export default {
  title: "components/FormCheckout",
  component: FormCheckout,
  render: (args) => ({
    components: {
      FormCheckout,
    },
    data:()=>({
      formModel:{
        name: '',
        email: '',
        subscribe: false,

        day: null,
        time: null,
        address: null,
        typePay: null,

        step:0,
        isNeedToDeliver: false,
      },
      isSubmit: false
    }),
    watch:{
      "formModel.isNeedToDeliver"(){
        this.isSubmit = false;
      }
    },
    setup() {
      return {
        ...args,
      };
    },
    methods:{
      submit(){
        this.isSubmit = true;
      }
    },
    template: `
      <FormCheckout
        v-model="formModel"
        @submitForm="submit"
      />
      <b data-testid="check-submit" v-if="isSubmit">
        Submit
      </b>
    `,
  }),
};

export const ByDefault ={};

export const withTest = test(async function (
  { step, apiCy, canvasElement, expect }
) {
  const cy = apiCy.mount(canvasElement);

  await step("проверка валидации на пустом первом шаге", async () => {
    cy.get("button[type='submit']").click();

    const checkArrEl =  await cy.get('input:invalid');
    expect(checkArrEl.length).toBe(2);
  });

  await step("проверка сохранения submit на первом шаге без доставки", async () => {
    snippets["шаг заполнение формы"]({cy});
    cy.get("button[type='submit']").click();
    const submitArrEl =  await cy.get("[data-testid='check-submit']", {timeout: 10});
    expect(submitArrEl[0]).toBeTruthy();
  });

  await step("функционал доставки", async () => {
    cy.get("#needToDeliver").click();
    cy.get("button[type='submit']").click();
    snippets["шаг заполнения доставки"]({cy});
    cy.get("button[type='submit']").click();

    const submitArrEl =  await cy.get("[data-testid='check-submit']", {timeout: 10});
    expect(submitArrEl[0]).toBeTruthy();
  });
});