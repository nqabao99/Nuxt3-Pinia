<template>
  <div
    class="flex flex-wrap align-items-center justify-content-between gap-2 mt-5 mb-3"
  >
    <span class="text-xl text-900 font-bold">List Book</span>
    <NuxtLink to="/book/add"
      ><Button size="small" label="Add" severity="success"
    /></NuxtLink>
  </div>
  <Loading v-if="isLoading" id="test-loading"></Loading>

  <table v-else id="customers">
    <tr>
      <th>STT</th>
      <th>Name</th>
      <th>Author</th>
      <th>Actions</th>
    </tr>
    <tr v-if="books.length === 0" id="test-noData">
      <td colspan="4" class="text-center">No data</td>
    </tr>
    <tr v-else v-for="(book, index) in books" :key="book.id">
      <td>{{ index + 1 }}</td>
      <td>{{ book.name }}</td>
      <td>{{ book.author }}</td>
      <td>
        <Button
          @click="changeRouter(book.id, 'view')"
          label="View"
          severity="secondary"
          outlined
        />
        <Button
          @click="changeRouter(book.id, 'edit')"
          label="Edit"
          severity="warning"
          class="ml-4 mr-4"
        />
        <Button @click="removeBook(book.id)" label="Remove" severity="danger" />
      </td>
    </tr>
  </table>
</template>

<script>
import { useBooksStore } from "../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useBooksStore, ["books"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["removeBook", "getBooks"]),
    changeRouter(id, type) {
      if (type === "view") {
        useRouter().push({ path: `book/${id}` });
      } else {
        useRouter().push({ path: `book/edit/${id}` });
      }
    },
    async get() {
      this.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.isLoading = false;
      this.getBooks(JSON.parse(localStorage.getItem("listBook")));
    },
  },
  created() {
    this.get();
  },
};
</script>

<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
