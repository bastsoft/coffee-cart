import * as Story from "./cart-simple.stories.js";
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

test("storybook " + Story.default.title + " ByDefault", async () => {
  const renderFunction = Story.ByDefault.render || Story.default.render;
  const component = renderFunction(Story.ByDefault.args, { argTypes: {} });
  const container = await render(
    component,
    {
      global: {
        plugins: [],
      },
    }
  );

  const result = container.getByTestId("result");

  await userEvent.click(container.getByLabelText("Add one Espresso"));
  expect(result.innerHTML).toBe("addOneCartItem Espresso");

  await userEvent.click(container.getByLabelText("Remove one Espresso"));
  expect(result.innerHTML).toBe("removeOneCartItem Espresso");
  
  await userEvent.click(container.getByLabelText("Remove all Espresso"));
  expect(result.innerHTML).toBe("removeCartItem Espresso");
});