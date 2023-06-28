<template>
  <AddBook :bookDetail="bookDetail" actions="add" :handleConfirm="add" />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["addBook"]),
    add(data) {
      this.addBook(data);
      useRouter().push({ path: "/book" });
    },
  },
};
</script>
