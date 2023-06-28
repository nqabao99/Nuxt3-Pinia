<template>
  <ListBook
    :books="books"
    :bookDetail="bookDetail"
    :removeBook="removeBook"
    :changeRouter="changeRouter"
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
    ...mapActions(useBooksStore, ["removeBook", , "getBooks"]),
    changeRouter(id, type) {
      if (type === "view") {
        useRouter().push({ path: `book/${id}` });
      } else {
        useRouter().push({ path: `book/edit/${id}` });
      }
    },
    async get() {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isLoading = false;
      this.getBooks(JSON.parse(localStorage.getItem("listBook")));
    },
  },
  created() {
    this.get();
  },
};
</script>
