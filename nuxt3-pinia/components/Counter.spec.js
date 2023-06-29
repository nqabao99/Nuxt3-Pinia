import { shallowMount } from "@vue/test-utils";
import Counter from "./Counter.vue";

describe("Counter.vue", () => {
  // test("increments the counter value when button is clicked", () => {
  //   const wrapper = shallowMount(Counter);
  //   expect(wrapper.text()).toContain("counter: 84");
  //   wrapper.find("button").trigger("click");
  //   expect(wrapper.text()).toContain("counter: 85");
  // });

  it("renders properly", () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.exists()).toBe(true);
  });
});
