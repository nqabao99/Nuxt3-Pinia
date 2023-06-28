<template>
  <Loading v-if="isLoading"></Loading>
  <div class="mt-5 p-5 border-round-sm surface-100" v-else>
    <h2 class="mb-4 text-center">
      {{ this.actions !== "edit" ? "Add book" : "Edit book" }}
    </h2>
    <div class="p-inputgroup flex-1 mb-4">
      <span class="p-inputgroup-addon">
        <i class="pi pi-book"></i>
      </span>
      <InputText
        type="text"
        placeholder="Name book"
        v-model="bookDetail.name"
      />
    </div>

    <div class="p-inputgroup flex-1 mb-4">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText
        type="text"
        placeholder="Name author"
        v-model="bookDetail.author"
      />
    </div>

    <div class="flex justify-content-center">
      <nuxt-link to="/book">
        <Button label="Cancer" severity="secondary" outlined />
      </nuxt-link>

      <Button
        class="ml-5"
        @click="handleConfirm(bookDetail)"
        v-show="actions !== 'view'"
        label="Confirm"
      />
    </div>
  </div>
</template>

<script>
export default {
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
};
</script>

<style scoped>
.h2 {
}
</style>
