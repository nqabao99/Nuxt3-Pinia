<template>
  <Loading v-if="isLoading"></Loading>

  <div class="card" v-else>
    <DataTable :value="books">
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">List Book</span>
          <NuxtLink to="/book/add"
            ><Button label="Add" severity="success"
          /></NuxtLink>
        </div>
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="author" header="Author"> </Column>
      <Column header="Actions">
        <template #body="book">
          <Button
            @click="changeRouter(book.data.id, 'view')"
            label="View"
            severity="secondary"
            outlined
          />
          <Button
            @click="changeRouter(book.data.id, 'edit')"
            label="Edit"
            severity="warning"
            class="ml-4 mr-4"
          />
          <Button
            @click="removeBook(book.data.id)"
            label="Remove"
            severity="danger"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
    },
    bookDetail: {
      type: Object,
    },
    removeBook: {
      type: Function,
    },
    changeRouter: {
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
