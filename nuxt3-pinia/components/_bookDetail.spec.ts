import { mount } from "@vue/test-utils";
import BookDetail from "./bookDetail.vue";
import { describe, expect, test } from "vitest";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

describe("BookDetail", () => {
  test("performs assertions for router navigation", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/book",
          name: "listBook",
        } as RouteRecordRaw,
      ],
    });

    const wrapper = mount(BookDetail, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/book");
    expect(router.currentRoute.value.name).toBe("listBook");
  });

  test("correctly receives and renders props", async () => {
    const bookDetail = {
      name: "Book Name",
      author: "Book Author",
    };
    const wrapper = mount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail,
      },
    });

    expect(wrapper.props("isLoading")).toBe(false);
    expect(wrapper.props("bookDetail")).toEqual(bookDetail);
  });

  test("renders the loading component when isLoading is true", () => {
    const wrapper = mount(BookDetail, {
      props: {
        isLoading: true,
      },
    });
    expect(wrapper.find("#test-loading").exists()).toBe(true);
  });

  test("renders the NoData component when isLoading is false and bookDetail is empty", () => {
    const wrapper = mount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail: null as any,
      },
    });
    expect(wrapper.findComponent("#test-noData").exists()).toBe(true);
  });

  test("renders the BookDetail when isLoading is false and bookDetail is not empty", () => {
    const bookDetail = {
      name: "Book Name",
      author: "Author Name",
    };

    const wrapper = mount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail: bookDetail,
      },
    });
    expect(wrapper.find(".mt-5.p-5.border-round-sm.surface-100").exists()).toBe(
      true
    );

    const nameBook = wrapper.find("#test-nameBook");

    console.log("nameBook.element", nameBook);

    // expect(nameBook.element.tagName).toBe(bookDetail.name);
  });
});
