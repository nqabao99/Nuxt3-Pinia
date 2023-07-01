import { mount, shallowMount } from "@vue/test-utils";
import BookDetail from "./bookDetail.vue";
import { describe, expect, it } from "vitest";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const bookDetail = {
  id: "123",
  name: "Book Name",
  author: "Author Name",
};

describe("BookDetail", () => {
  it("performs assertions for router navigation", async () => {
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

  it("renders the loading component when isLoading is true", () => {
    const wrapper = shallowMount(BookDetail, {
      props: {
        isLoading: true,
      },
    });
    expect(wrapper.find("#test-loading")).toBeTruthy();
  });

  it("renders the NoData component when isLoading is false and bookDetail is empty", () => {
    const wrapper = shallowMount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail: null as any,
      },
    });
    expect(wrapper.find("#test-noData")).toBeTruthy();
  });

  it("renders the BookDetail when isLoading is false and bookDetail is not empty", () => {
    const wrapper = shallowMount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail,
      },
    });

    expect(wrapper.find(".border-round-sm.surface-100")).toBeTruthy();
  });

  it("renders the InputText with props", async () => {
    const wrapper = shallowMount(BookDetail, {
      props: {
        isLoading: false,
        bookDetail,
      },
    });

    const name = wrapper.findComponent("[placeholder='Name book']");
    await name.setValue(bookDetail.name);
    expect(wrapper.props("bookDetail").name).toBe(bookDetail.name);

    const author = wrapper.findComponent("[placeholder='Name author']");
    await author.setValue(bookDetail.author);
    expect(wrapper.props("bookDetail").author).toBe(bookDetail.author);
  });
});
