<template>
  <AddBook
    :bookDetail="bookDetail"
    actions="edit"
    :handleConfirm="edit"
    :isLoading="isLoading"
    :cache="cache"
  />
</template>

<script>
import { useBooksStore } from "../../../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "cache"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["editBook", "getBookDetail"]),
    edit(data) {
      if (data.name !== "" && data.author !== "") {
        this.editBook(data);
        useRouter().push({ path: "/book" });
      }
    },
    async getDetail(id) {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isLoading = false;
      this.getBookDetail(id);
    },
  },
  created() {
    this.getDetail(useRoute().params.idBook);
  },
};
</script>
