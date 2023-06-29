import { mount } from "@vue/test-utils";
import MyComponent from "../components/MyComponent.vue";
import { describe, test } from "vitest";

describe("MyComponent", () => {
  test("renders a message", () => {
    const wrapper = mount(MyComponent, {
      props: { msg: "Hello, world" },
    });

    expect(wrapper.text()).toContain("Hello, world");
  });
});
