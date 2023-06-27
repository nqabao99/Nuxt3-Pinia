<template>
  <BookDetail :bookDetail="bookDetail" :isLoading="isLoading" />
</template>

<script>
import { useBooksStore } from "../../stores/book";
import { mapActions, mapState } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["bookDetail"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["getBookDetail"]),
    async getDetail(id) {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 700));
      this.isLoading = false;
      this.getBookDetail(id);
    },
  },
  created() {
    this.getDetail(useRoute().params.idBook);
  },
};
</script>
