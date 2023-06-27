<template>
  <AddBook
    :bookDetail="bookDetail"
    :actions="actions"
    :edit="edit"
    :add="add"
  />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "actions"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["removeBook", "addBook", "editBook"]),
    add(data) {
      if (data.name !== "" && data.author !== "") {
        this.addBook(data);
        useRouter().push({ path: "/book" });
      }
    },
    edit(data) {
      if (data.name !== "" && data.author !== "") {
        this.editBook(data);
        useRouter().push({ path: "/book" });
      }
    },
  },
};
</script>
