import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import AddBook from "./addBook.vue";

describe("AddBook", () => {
  test("renders the loading component when isLoading is true", () => {
    const wrapper = mount(AddBook, {
      props: {
        isLoading: true,
      },
    });
    expect(wrapper.find("#test-loading").exists()).toBe(true);
  });

  test("renders the NoData component when isLoading is false and bookDetail is empty", () => {
    const wrapper = mount(AddBook, {
      props: {
        isLoading: false,
        bookDetail: null as any,
      },
    });
    expect(wrapper.find("#test-noData").exists()).toBe(true);
  });

  test('should display the add book title when actions is not "edit"', () => {
    const wrapper = mount(AddBook, {
      props: {
        actions: "add",
        bookDetail: {
          id: "",
          name: "",
          author: "",
        },
      },
    });

    expect(wrapper.find("#test-title").text()).toBe("Add book");
  });

  test("renders the AddBook component when isLoading is false and bookDetail is not empty", () => {
    const wrapper = mount(AddBook, {
      props: {
        isLoading: false,
        actions: "edit",
        bookDetail: {
          id: "123",
          name: "book 1",
          author: "author 1",
        },
      },
    });
    expect(wrapper.find("#test-title").text()).toBe("Edit book");

    expect(wrapper.find(".border-round-sm.surface-100").exists()).toBe(true);
  });
});
