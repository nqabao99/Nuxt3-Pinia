import { shallowMount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddBook from "./addBook.vue";

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

  // afterEach(() => {
  //   // Restore the original implementation of localStorage.getItem()
  //   vi.restoreAllMocks();
  // });

  it("renders the loading component when isLoading is true", () => {
    const wrapper = shallowMount(AddBook, {
      props: {
        isLoading: true,
      },
    });
    expect(wrapper.find("#test-loading")).toBeTruthy();
  });

  it("renders the NoData component when isLoading is false and bookDetail is empty", () => {
    const wrapper = shallowMount(AddBook, {
      props: {
        isLoading: false,
        bookDetail: null as any,
      },
    });
    expect(wrapper.find("#test-noData")).toBeTruthy();
  });

  it("should display the add book title when actions is add", async () => {
    const bookDetail = {
      id: "",
      name: "",
      author: "",
    };
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
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

  it("click button confirm", () => {
    const bookDetail = {
      id: "",
      name: "book5",
      author: "author",
    };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        actions: "add",
        bookDetail,
        handleConfirm: handleConfirmMock,
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

  it("No errors with action add", async () => {
    const bookDetail = { name: "book3", author: "Author" };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        handleConfirm: handleConfirmMock,
        actions: "add",
      },
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
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
    expect(handleConfirmMock).toHaveBeenCalledWith(bookDetail);
  });

  it("errors name is empty with action add", async () => {
    const bookDetail = { name: "", author: "Author" };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        handleConfirm: handleConfirmMock,
        actions: "add",
      },
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
        };
      },
    });

    wrapper.vm.validate(bookDetail);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleConfirmMock).not.toHaveBeenCalled();
  });

  it("errors name is exists with action add", async () => {
    const bookDetail = { name: "book1", author: "Author" };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        handleConfirm: handleConfirmMock,
        actions: "add",
      },
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
        };
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("Name book is exists");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleConfirmMock).not.toHaveBeenCalled();
  });

  it("errors author is empty with action add", async () => {
    const bookDetail = { name: "book3", author: "" };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        handleConfirm: handleConfirmMock,
        actions: "add",
      },
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
        };
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleConfirmMock).not.toHaveBeenCalled();
  });

  it("error name and author is empty with action add", async () => {
    const bookDetail = { name: "", author: "" };
    const handleConfirmMock = vi.fn();
    const wrapper = shallowMount(AddBook, {
      props: {
        handleConfirm: handleConfirmMock,
      },
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
        };
      },
    });

    wrapper.vm.validate(bookDetail);

    expect(wrapper.vm.messErrBook).toBe("Name book is required!");
    expect(wrapper.vm.messErrAuthor).toBe("Name author is required!");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleConfirmMock).not.toHaveBeenCalled();
  });

  it("error book is exists with action edit", () => {
    // Set up the necessary data and props
    const handleConfirmMock = vi.fn();
    const bookDetail = { name: "book2", author: "Author" };
    const wrapper = shallowMount(AddBook, {
      data() {
        return {
          messErrBook: "",
          messErrAuthor: "",
          isSubmit: false,
        };
      },
      props: {
        handleConfirm: handleConfirmMock,
        actions: "edit",
        cache: {
          name: "book",
          author: "Author",
        },
      },
    });

    wrapper.vm.validate(bookDetail);

    wrapper.vm.checkBookEqual(bookDetail.name);

    expect(wrapper.vm.messErrBook).toBe("Name book is exists");
    expect(wrapper.vm.messErrAuthor).toBe("");
    expect(wrapper.vm.isSubmit).toBe(true);
    expect(handleConfirmMock).not.toHaveBeenCalled();
  });
});
