import { defineStore } from "pinia";

export const useBooksStore = defineStore("books", {
  state: () => {
    return {
      books: [
        { id: 1, name: "book 1" },
        { id: 2, name: "book 2" },
        { id: 3, name: "book 3" },
        { id: 4, name: "book 4" },
      ],
      bookDetail: null,
    };
  },
  actions: {
    selectBook(id) {
      this.bookDetail = [...this.books].find((item) => item.id === id);
    },
    addBook(data) {
      this.books = [...this.books, { id: 5, name: data }];
    },
    editBook(data) {
      this.books = [...this.books].map((item) =>
        item.id === data.id ? data : item
      );
    },
    removeBook(id) {
      this.books = [...this.books].filter((item) => item.id !== id);
    },
  },
});
