import { defineStore } from "pinia";

interface TypeBook {
  id: string;
  name: string;
}

export const useBooksStore = defineStore("useBooksStore", {
  state: () => {
    return {
      books: [
        { id: "1", name: "book 1" },
        { id: "2", name: "book 2" },
        { id: "3", name: "book 3" },
        { id: "4", name: "book 4" },
      ] as TypeBook[],
      bookDetail: {
        id: "",
        name: "",
      } as TypeBook,
    };
  },
  actions: {
    addBook(data: string) {
      if (data !== "")
        this.books = [...this.books, { id: `${new Date()}`, name: data }];
      this.bookDetail = {
        id: "",
        name: "",
      };
    },
    editBook(data: TypeBook, submit: string) {
      if (submit) {
        this.bookDetail = {
          id: "",
          name: "",
        };
      } else {
        this.bookDetail = { ...this.bookDetail, ...data };
      }

      this.books = [...this.books].map((item) =>
        item.id === data.id ? data : item
      );
    },
    removeBook(id: string) {
      this.books = [...this.books].filter((item) => item.id !== id);
    },
  },
});
