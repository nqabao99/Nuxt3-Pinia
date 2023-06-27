<template>
  <AddBook :bookDetail="bookDetail" :actions="actions" :submit="edit" />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "actions"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["editBook"]),
    edit(data) {
      if (data.name !== "" && data.author !== "") {
        this.editBook(data);
        useRouter().push({ path: "/book" });
      }
    },
  },
};
</script>
