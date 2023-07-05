import { mount, shallowMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia } from "pinia";

import AddBook from "./addBook.vue";
import { useBooksStore } from "../stores/book";

const cache = {
  id: "123",
  name: "book1",
  author: "Author",
};

const data = {
  isLoading: false,
  messErrBook: "",
  messErrAuthor: "",
  isSubmit: false,
};

describe("AddBook", () => {
  beforeEach(() => {
    // Mock localStorage.getItem() to return a specific value
    vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(
      JSON.stringify([
        { name: "book1", author: "Author" },
        { name: "book2", author: "Author" },
      ])
    );
  });

  vi.mock("../stores/book", () => ({
    useBooksStore: vi.fn(() => ({
      getBookDetail: vi.fn(),
      addBook: vi.fn(),
      editBook: vi.fn(),
    })),
  }));

  it("renders the loading component when isLoading is true", () => {
    const wrapper = mount(AddBook, {
      props: {
        actions: "edit",
      },
      data() {
        return {
          isLoading: true,
        };
      },
    });

    expect(wrapper.find("#test-loading")).toBeTruthy();
  });

  it("renders the NoData component when isLoading is false and bookDetail is empty", async () => {
    const wrapper = mount(AddBook, {
      props: {
        actions: "edit",
      },
      data() {
        return {
          isLoading: false,
          bookDetail: null,
        };
      },
    });

    expect(wrapper.find("#test-noData")).toBeTruthy();
  });

  it("should call getBookDetail action edit with the bookID", async () => {
    const mockGetBookDetail = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      getBookDetail: mockGetBookDetail,
    }));

    const idBook = "123";
    const wrapper = shallowMount(AddBook, {
      mocks: {
        $route: {
          params: {
            idBook,
          },
        },
      },
      props: {
        actions: "edit",
      },
      data() {
        return {
          isLoading: false,
        };
      },
    });

    await wrapper.vm.getDetail(idBook);

    wrapper.setData({ isLoading: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#test-loading")).toBeTruthy();

    wrapper.setData({ isLoading: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.find("#test-noData")).toBeTruthy();

    expect(mockGetBookDetail).toHaveBeenCalledWith(idBook);
  });

  it("click button confirm", () => {
    const bookDetail = {
      id: "",
      name: "book5",
      author: "author",
    };

    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return {
          bookDetail,
          isLoading: false,
        };
      },
    });

    const validateSpy = vi
      .spyOn(wrapper.vm, "validate")
      .mockImplementation(() => {
        // Implement the mock behavior of the validate method if needed
      });

    const button = wrapper.find("[label='Confirm']");
    button.trigger("click");

    expect(validateSpy).toHaveBeenCalled();
  });

  // method action add
  it("No errors with action add", () => {
    const bookDetail = { name: "book3", author: "Author" };
    const handleAddBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      addBook: handleAddBookMock,
    }));

    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return data;
      },
    });

    // Call the validate method
    wrapper.vm.validate(bookDetail);

    // Call the checkBookEqual method
    wrapper.vm.checkBookEqual(bookDetail.name);

    // Assert the expected behavior
    expect(wrapper.vm.messErrBook).toBe("");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleAddBookMock).toHaveBeenCalledWith(bookDetail);
  });

  it("errors name is empty with action add", () => {
    const bookDetail = { name: "", author: "Author" };
    const handleAddBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      addBook: handleAddBookMock,
    }));

    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return data;
      },
    });

    wrapper.vm.validate(bookDetail);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleAddBookMock).not.toHaveBeenCalled();
  });

  it("errors name is exists with action add", () => {
    const bookDetail = { name: "book1", author: "Author" };
    const handleAddBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      addBook: handleAddBookMock,
    }));
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return data;
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("Name book is exists");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleAddBookMock).not.toHaveBeenCalled();
  });

  it("errors author is empty with action add", () => {
    const bookDetail = { name: "book3", author: "" };
    const handleAddBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      addBook: handleAddBookMock,
    }));
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return data;
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleAddBookMock).not.toHaveBeenCalled();
  });

  it("error name and author is empty with action add", () => {
    const bookDetail = { name: "", author: "" };
    const handleAddBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      addBook: handleAddBookMock,
    }));
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
      },
      data() {
        return data;
      },
    });

    wrapper.vm.validate(bookDetail);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleAddBookMock).not.toHaveBeenCalled();
  });

  // method action edit

  it("No errors with action edit", () => {
    const bookDetail = { id: "123", name: "book", author: "Author123" };
    const handleEditBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      editBook: handleEditBookMock,
    }));
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "edit",
      },
      data() {
        return {
          ...data,
          cache,
        };
      },
    });

    // Call the validate method
    wrapper.vm.validate(bookDetail);

    // Call the checkBookEqual method
    wrapper.vm.checkBookEqual(bookDetail.name);

    // Assert the expected behavior
    expect(wrapper.vm.messErrBook).toBe("");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleEditBookMock).toHaveBeenCalledWith(bookDetail);
  });

  it("error name is empty with action edit", () => {
    const handleEditBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      editBook: handleEditBookMock,
    }));
    const bookDetail = { id: "123", name: "", author: "Author" };
    const wrapper = shallowMount(AddBook, {
      data() {
        return {
          ...data,
          cache,
        };
      },
      props: {
        actions: "edit",
      },
    });

    wrapper.vm.validate(bookDetail);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleEditBookMock).not.toHaveBeenCalledWith(bookDetail);
  });

  it("error book is exists with action edit", () => {
    // Set up the necessary data and props
    const handleEditBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      editBook: handleEditBookMock,
    }));
    const bookDetail = { id: "123", name: "book2", author: "Author" };
    const wrapper = shallowMount(AddBook, {
      data() {
        return {
          ...data,
          cache,
        };
      },
      props: {
        actions: "edit",
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("Name book is exists");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleEditBookMock).not.toHaveBeenCalledWith(bookDetail);
  });

  it("error author is empty with action edit", () => {
    const handleEditBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      editBook: handleEditBookMock,
    }));
    const bookDetail = { id: "123", name: "book3", author: "" };
    const wrapper = shallowMount(AddBook, {
      data() {
        return {
          ...data,
          cache,
        };
      },
      props: {
        actions: "edit",
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleEditBookMock).not.toHaveBeenCalledWith(bookDetail);
  });

  it("error book is empty and author is empty with action edit", () => {
    const handleEditBookMock = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      editBook: handleEditBookMock,
    }));
    const bookDetail = { id: "123", name: "", author: "" };
    const wrapper = shallowMount(AddBook, {
      data() {
        return {
          ...data,
          cache,
        };
      },
      props: {
        actions: "edit",
      },
    });

    wrapper.vm.validate(bookDetail);

    console.log("dddd", wrapper.vm.messErrBook);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleEditBookMock).not.toHaveBeenCalledWith(bookDetail);
  });
});
