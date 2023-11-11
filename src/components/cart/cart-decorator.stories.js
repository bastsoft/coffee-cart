import Cart from "./cart.vue";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import getTestDecorator from "my-snip/storybook-test/create.js";
const test = getTestDecorator({userEvent, within, expect});


//https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: "components/cart-decorator",
  component: Cart,
  render: (args) => ({
    components: {
      Cart,
    },
    data:()=>({
      lastEventValue: "",
      lastEventName: "",
    }),
    setup() {
      return {
        ...args,
      };
    },
    methods:{
      event(name, val){
        this.lastEventName = name;
        this.lastEventValue = val;
      }
    },
    template: `
      <Cart 
        :cartList="cartList"
        @removeOneCartItem="(val)=>event('removeOneCartItem', val)"
        @addOneCartItem="(val)=>event('addOneCartItem', val)"
        @removeCartItem="(val)=>event('removeCartItem', val)"
      />
      <div data-testid="result" >
        {{lastEventName}}
        {{lastEventValue}}
      </div>
    `,
  }),
};
export const ByDefault = test(
  async function ({ step, container, userEvent, expect }) {
    const result = container.getByTestId("result");

    await step("проверка addOneCartItem", async () => {
      await userEvent.click(container.getByLabelText("Add one Espresso"));
      expect(result.innerHTML).toBe("addOneCartItem Espresso");
    });
    
    await step("проверка removeOneCartItem", async () => {
      await userEvent.click(container.getByLabelText("Remove one Espresso"));
      expect(result.innerHTML).toBe("removeOneCartItem Espresso");
    });

    await step("проверка removeOneCartItem", async () => {
      await userEvent.click(container.getByLabelText("Remove all Espresso"));
      expect(result.innerHTML).toBe("removeCartItem Espresso");
    });
  },
  {
    args: {
      cartList: [
      { 
        "quantity": 1, "unitPrice": 10, "price": 10, "name": "Espresso", 
        "recipe": [ { "name": "espresso", "quantity": 30 } ] 
      }, 
      { "quantity": 1, "unitPrice": 12, "price": 12, "name": "Macchiato", "recipe": [ { "name": "espresso", "quantity": 30 }, { "name": "milk foam", "quantity": 15 } ] } ]
    }
  }
);

export const Clear =  {
  args: {
    cartList: [ ]
  },
};

