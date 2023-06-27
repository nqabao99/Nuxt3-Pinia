<template>
  <AddBook :bookDetail="bookDetail" :actions="actions" :submit="add" />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "actions"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["addBook"]),
    add(data) {
      if (data.name !== "" && data.author !== "") {
        this.addBook(data);
        useRouter().push({ path: "/book" });
      }
    },
  },
};
</script>
