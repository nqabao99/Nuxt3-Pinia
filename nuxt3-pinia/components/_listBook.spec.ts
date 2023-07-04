import { shallowMount } from "@vue/test-utils";
import ListBook from "./listBook.vue";
import { describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

describe("BookDetail", () => {
  it("renders the Loading component when isLoading true", () => {
    const wrapper = shallowMount(ListBook, {
      data() {
        return {
          isLoading: true,
        };
      },
    });
    // Assert that the Loading component is rendered
    expect(wrapper.find("#test-loading")).toBeTruthy();
  });

  it("renders NoData component when isLoading false and books is array empty", () => {
    const wrapper = shallowMount(ListBook, {
      data() {
        return {
          isLoading: false,
          books: [],
        };
      },
    });

    // Assert that the Loading component is rendered
    expect(wrapper.find("#test-noData")).toBeTruthy();
  });

  it("renders the book list when isLoading false and books array is not empty", () => {
    const books = [
      { id: 1, name: "Book 1", author: "Author 1" },
      { id: 2, name: "Book 2", author: "Author 2" },
    ];

    const wrapper = shallowMount(ListBook, {
      data() {
        return {
          isLoading: false,
          books: books,
        };
      },
    });

    expect(wrapper.find("table#customers")).toBeTruthy();
  });

  it("performs assertions for router navigation", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/book/add",
          name: "Add Book",
        } as RouteRecordRaw,
        {
          path: "/book/edit/:idBook",
          name: "Edit Book",
        } as RouteRecordRaw,
        {
          path: "/book/:idBook",
          name: "Detail Book",
        } as RouteRecordRaw,
      ],
    });

    const wrapper = shallowMount(ListBook, {
      props: {
        books: [
          {
            id: "idbook",
            name: "book 1",
            author: "author 1",
          },
        ],
      },
      global: {
        plugins: [router],
      },
    });

    await router.push("/book/add");
    expect(router.currentRoute.value.name).toBe("Add Book");

    await router.push("/book/edit/123");
    expect(wrapper.vm.$route.params.idBook).toBe("123");
    expect(router.currentRoute.value.name).toBe("Edit Book");

    await router.push("/book/123");
    expect(wrapper.vm.$route.params.idBook).toBe("123");
    expect(router.currentRoute.value.name).toBe("Detail Book");
  });
});
