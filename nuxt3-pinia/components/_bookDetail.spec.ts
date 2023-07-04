import { mount, shallowMount } from "@vue/test-utils";
import BookDetail from "./bookDetail.vue";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useBooksStore } from "../stores/book";

const bookDetail = {
  id: "123",
  name: "Book Name",
  author: "Author Name",
};

describe("BookDetail", () => {
  // vi.mock("../stores/book", () => ({
  //   useBooksStore: vi.fn(() => ({
  //     getBookDetail: vi.fn(),
  //   })),
  // }));

  // it("renders correctly", async () => {
  //   const mockGetBookDetail = vi.fn();
  //   (useBooksStore as any).mockImplementation(() => ({
  //     getBookDetail: mockGetBookDetail,
  //   }));

  //   // Mount component với các giá trị và mock cần thiết
  //   const idBook = "123";
  //   const wrapper = shallowMount(BookDetail, {
  //     mocks: {
  //       $route: {
  //         params: {
  //           idBook,
  //         },
  //       },
  //     },
  //   });

  //   // Kiểm tra hiển thị Loading component khi isLoading là true
  //   expect(wrapper.find("#test-loading")).toBeTruthy();

  //   // Đặt isLoading thành false để hiển thị nội dung chính
  //   wrapper.setData({ isLoading: false });
  //   await wrapper.vm.$nextTick();

  //   // Kiểm tra hiển thị NoData component khi bookDetail không tồn tại
  //   expect(wrapper.find("#test-noData")).toBeTruthy();

  //   // Đặt giá trị bookDetail để hiển thị nội dung chính
  //   const bookDetail = { name: "Book Name", author: "Book Author" };
  //   wrapper.setData({ bookDetail });
  //   await wrapper.vm.$nextTick();

  //   expect(wrapper.find(".border-round-sm .surface-100")).toBeTruthy();

  //   // Kiểm tra gọi đúng hàm getBookDetail với đúng tham số
  //   expect(mockGetBookDetail).toHaveBeenCalledWith(idBook);
  // });

  vi.mock("../stores/book", () => ({
    useBooksStore: vi.fn(() => ({
      getBookDetail: vi.fn(),
    })),
  }));

  it("should call getBookDetail action with the correct ID", async () => {
    const mockGetBookDetail = vi.fn();
    (useBooksStore as any).mockImplementation(() => ({
      getBookDetail: mockGetBookDetail,
    }));

    const idBook = "123";
    const wrapper = shallowMount(BookDetail, {
      mocks: {
        $route: {
          params: {
            idBook,
          },
        },
      },
      data() {
        return {
          isLoading: false,
          // bookDetail: null,
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

  it("displays loading state when isLoading is true", async () => {
    const wrapper = mount(BookDetail, {
      data() {
        return {
          isLoading: true,
        };
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find("#test-loading")).toBeTruthy();
  });

  it("displays NoData component when bookDetail is falsy", async () => {
    const wrapper = mount(BookDetail, {
      data() {
        return {
          isLoading: false,
          bookDetail: null,
        };
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#test-noData")).toBeTruthy();
  });

  it("displays book details when bookDetail is truthy", async () => {
    const wrapper = mount(BookDetail, {
      data() {
        return {
          isLoading: false,
          bookDetail: bookDetail,
        };
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".border-round-sm .surface-100")).toBeTruthy();
  });

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
});
