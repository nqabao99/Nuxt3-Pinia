import { defineStore } from "pinia";

interface TypeBook {
  id?: string;
  name: string;
  author: string;
}

export const useBooksStore = defineStore("useBooksStore", {
  state: () => {
    return {
      books: JSON.parse(
        localStorage.getItem("listBook") as string
      ) as TypeBook[],
      bookDetail: {
        id: "",
        name: "",
        author: "",
      } as TypeBook,
      actions: "" as string,
    };
  },
  actions: {
    addBook(data: TypeBook) {
      const listBook = [
        ...this.books,
        { id: `${new Date()}`, name: data.name, author: data.author },
      ];
      localStorage.setItem("listBook", JSON.stringify(listBook));
      this.books = listBook;
    },
    editBook(data: TypeBook) {
      const listBook = [...this.books].map((item) =>
        item.id === data.id ? data : item
      );
      localStorage.setItem("listBook", JSON.stringify(listBook));
      this.books = listBook;
    },
    removeBook(id: string) {
      const listBook = [...this.books].filter((item) => item.id !== id);
      localStorage.setItem("listBook", JSON.stringify(listBook));
      this.books = listBook;
    },
    selectBook(data: TypeBook, type: string) {
      this.actions = type;
      this.bookDetail = { ...this.bookDetail, ...data };
    },
    resetBookDetail() {
      this.actions = "";
      this.bookDetail = {
        id: "",
        name: "",
        author: "",
      };
    },
  },
});
