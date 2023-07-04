<template>
  <Loading v-if="isLoading" id="test-loading"></Loading>
  <NoData v-else-if="!bookDetail" id="test-noData"></NoData>
  <div class="mt-5 p-5 border-round-sm surface-100" v-else>
    <h2 class="mb-4 text-center" id="test-title">
      {{ this.actions !== "edit" ? "Add book" : "Edit book" }}
    </h2>
    <div class="flex flex-column mb-4">
      <InputText
        type="text"
        placeholder="Name book"
        v-model="bookDetail.name"
        :class="{ 'border-red-500': messErrBook }"
      />
      <small class="p-error mt-1" v-show="messErrBook">{{ messErrBook }}</small>
    </div>

    <div class="flex flex-column mb-4">
      <InputText
        type="text"
        placeholder="Name author"
        v-model="bookDetail.author"
        :class="{ 'border-red-500': messErrAuthor }"
      />
      <small class="p-error mt-1" v-show="messErrAuthor">{{
        messErrAuthor
      }}</small>
    </div>

    <div class="flex justify-content-center">
      <nuxt-link to="/book">
        <Button label="Cancer" severity="secondary" outlined />
      </nuxt-link>

      <Button class="ml-5" @click="validate(bookDetail)" label="Confirm" />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import { useBooksStore } from "../stores/book";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    InputText,
  },
  data() {
    return {
      messErrBook: "",
      messErrAuthor: "",
      isSubmit: false,
      isLoading: false,
    };
  },
  props: {
    actions: {
      type: String,
    },
  },
  computed: {
    ...mapState(useBooksStore, ["bookDetail", "cache"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["addBook", "editBook", "getBookDetail"]),
    checkBookEqual(data) {
      const books = JSON.parse(localStorage.getItem("listBook")) || [];
      const book = books.find((item) => item.name === data);
      if (
        (this.actions === "add" && book) ||
        (this.actions === "edit" && book && this.cache.name !== data)
      ) {
        this.messErrBook = "Name book is exists";
      } else {
        this.messErrBook = "";
      }
    },
    setMessErrRequired(type) {
      if (type === "book") {
        this.messErrBook = "Name book is required!";
      } else {
        this.messErrAuthor = "Name author is required!";
      }
    },
    validate(data) {
      if (data.name === "") {
        this.setMessErrRequired("book");
      } else {
        this.checkBookEqual(data.name);
      }
      if (data.author === "") {
        this.setMessErrRequired();
      }
      if (this.messErrBook === "" && this.messErrAuthor === "") {
        if (this.actions === "add") {
          this.addBook(data);
        } else {
          this.editBook(data);
        }
        useRouter().push({ path: "/book" });
      }
      this.isSubmit = true;
    },
    async getDetail(id) {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isLoading = false;
      this.getBookDetail(id);
    },
  },
  created() {
    if (this.actions === "edit") this.getDetail(useRoute().params.idBook);
  },
  beforeUpdate() {
    if (this.isSubmit) {
      if (this.bookDetail.name !== "") {
        this.checkBookEqual(this.bookDetail.name);
      } else {
        this.setMessErrRequired("book");
      }
      if (this.bookDetail.author !== "") {
        this.messErrAuthor = "";
      } else {
        this.setMessErrRequired();
      }
    }
  },
};
</script>

<style>
.h2 {
}
</style>
