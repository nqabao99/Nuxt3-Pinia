import { mount } from "@vue/test-utils";
import NoData from "./noData.vue";
import { describe, expect, test } from "vitest";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

describe("NoData", () => {
  test("performs assertions for router navigation'", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/book",
          name: "listBook",
        } as RouteRecordRaw,
      ],
    });

    const wrapper = mount(NoData, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/book");
    expect(router.currentRoute.value.name).toBe("listBook");
  });
});
