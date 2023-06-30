<template>
  <Loading v-if="isLoading" id="test-loading"></Loading>
  <NoData v-else-if="!bookDetail" id="test-noData"></NoData>
  <div class="mt-5 p-5 border-round-sm surface-100" v-else>
    <h2 class="mb-4 text-center">Detail book</h2>
    <div class="p-inputgroup flex-1 mb-4">
      <span class="p-inputgroup-addon">
        <i class="pi pi-book"></i>
      </span>
      <InputText
        type="text"
        placeholder="Name book"
        v-model="bookDetail.name"
        :readonly="true"
        id="test-nameBook"
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
        :readonly="true"
      />
    </div>

    <div class="flex justify-content-center">
      <NuxtLink to="/book">
        <Button label="Back" severity="secondary" outlined />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bookDetail: {
      type: Object,
    },
    isLoading: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
h2 {
}
</style>
