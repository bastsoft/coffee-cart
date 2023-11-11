import * as Story from "./form-checkout.stories.js";

import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import mySnipStorybookTestRunInJest from "my-snip/storybook-test/run-in-jest.js";

mySnipStorybookTestRunInJest(Story, {render, userEvent});
