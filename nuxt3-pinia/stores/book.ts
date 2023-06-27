import { defineStore } from "pinia";

interface TypeBook {
  id?: string;
  name: string;
  author: string;
}

export const useBooksStore = defineStore("useBooksStore", {
  state: () => {
    return {
      books: [] as TypeBook[],
      bookDetail: {
        id: "",
        name: "",
        author: "",
      } as TypeBook,
    };
  },
  actions: {
    getBooks(data: TypeBook[]) {
      this.books = data || [];
      this.bookDetail = {
        id: "",
        name: "",
        author: "",
      };
    },
    getBookDetail(id: string) {
      if (localStorage.getItem("listBook")) {
        this.bookDetail = [
          ...JSON.parse(localStorage.getItem("listBook") as string),
        ].find((item) => item.id === id);
      }
    },
    addBook(data: TypeBook) {
      const listBook = [
        ...this.books,
        { id: `${new Date()}`, name: data.name, author: data.author },
      ];
      localStorage.setItem("listBook", JSON.stringify(listBook));
    },
    editBook(data: TypeBook) {
      const listBook = [...this.books].map((item) =>
        item.id === data.id ? data : item
      );
      localStorage.setItem("listBook", JSON.stringify(listBook));
    },
    removeBook(id: string) {
      const listBook = [...this.books].filter((item) => item.id !== id);
      localStorage.setItem("listBook", JSON.stringify(listBook));
      this.books = listBook;
    },
  },
});
