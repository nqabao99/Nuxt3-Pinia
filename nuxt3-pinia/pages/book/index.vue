<template>
  <ListBook
    :books="books"
    :bookDetail="bookDetail"
    :removeBook="removeBook"
    :select="select"
    :isLoading="isLoading"
  />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useBooksStore, ["books", "bookDetail"]),
  },
  methods: {
    ...mapActions(useBooksStore, [
      "removeBook",
      "selectBook",
      "resetBookDetail",
      "getBooks",
    ]),
    select(data, type) {
      this.selectBook(data, type);
      if (type === "view") {
        useRouter().push({ path: `book/${data.id}` });
      } else {
        useRouter().push({ path: `book/${type}` });
      }
    },

    async get() {
      this.isLoading = true;
      const res = await new Promise((resolve) => setTimeout(resolve, 700));
      this.isLoading = false;
      this.getBooks(JSON.parse(localStorage.getItem("listBook")));
    },
  },
  created() {
    this.get();
    this.resetBookDetail();
  },
};
</script>
