<template>
  <Loading v-if="isLoading"></Loading>
  <div class="mt-5 p-5 border-round-sm surface-100" v-else>
    <h2 class="mb-4 text-center">
      {{ this.actions !== "edit" ? "Add book" : "Edit book" }}
    </h2>
    <div class="flex flex-column mb-4">
      <InputText
        type="text"
        placeholder="Name book"
        v-model="bookDetail.name"
        :class="{ 'border-red-500': messErrBook }"
      />
      <small class="p-error mt-1" v-show="messErrBook"
        >Name book is required!</small
      >
    </div>

    <div class="flex flex-column mb-4">
      <InputText
        type="text"
        placeholder="Name author"
        v-model="bookDetail.author"
        :class="{ 'border-red-500': messErrAuthor }"
      />
      <small class="p-error mt-1" v-show="messErrAuthor"
        >Name author is required!</small
      >
    </div>

    <div class="flex justify-content-center">
      <nuxt-link to="/book">
        <Button label="Cancer" severity="secondary" outlined />
      </nuxt-link>

      <Button
        class="ml-5"
        @click="validate(bookDetail)"
        v-show="actions !== 'view'"
        label="Confirm"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messErrBook: false,
      messErrAuthor: false,
      isSubmit: false,
    };
  },
  props: {
    bookDetail: {
      type: Object,
    },
    actions: {
      type: String,
    },
    handleConfirm: {
      type: Function,
    },
    isLoading: {
      type: Boolean,
    },
  },
  methods: {
    validate(data) {
      if (data.name === "") {
        this.messErrBook = true;
      }
      if (data.author === "") {
        this.messErrAuthor = true;
      }
      if (data.name !== "" && data.author !== "") {
        this.handleConfirm(data);
      }
      this.isSubmit = true;
    },
  },

  beforeUpdate() {
    if (this.isSubmit) {
      if (this.bookDetail.name !== "") {
        this.messErrBook = false;
      } else {
        this.messErrBook = true;
      }
      if (this.bookDetail.author !== "") {
        this.messErrAuthor = false;
      } else {
        this.messErrAuthor = true;
      }
    }
  },
};
</script>

<style>
.h2 {
}
</style>
