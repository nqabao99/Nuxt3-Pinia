<template>
  <AddBook :bookDetail="bookDetail" :actions="actions" />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "actions"]),
  },
};
</script>
