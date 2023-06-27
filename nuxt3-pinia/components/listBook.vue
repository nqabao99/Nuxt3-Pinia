<template>
  <div>
    <div class="header">
      <h1>List Book</h1>
      <nuxt-link to="/book/add" class="button" style="background-color: #45a049"
        >Add</nuxt-link
      >
    </div>
    <table>
      <tr>
        <th>STT</th>
        <th>Name</th>
        <th>Author</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(book, index) in books" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>
          <button
            class="button"
            style="background-color: #dedede"
            @click="select(book, 'view')"
          >
            View
          </button>
          <button class="button" @click="select(book, 'edit')">Edit</button>
          <button
            class="button"
            style="background-color: #dc3545"
            @click="removeBook(book.id)"
          >
            Remove
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useBooksStore } from "../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  mounted() {
    this.resetBookDetail();
  },
  computed: {
    ...mapState(useBooksStore, ["books", "bookDetail"]),
  },
  methods: {
    ...mapActions(useBooksStore, [
      "removeBook",
      "addBook",
      "selectBook",
      "resetBookDetail",
    ]),
    select(data, type) {
      this.selectBook(data, type);
      useRouter().push({ path: "book/add" });
    },
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.button {
  padding: 5px 0;
  border-radius: 5px;
  background-color: #ffc107;
  border: 0;
  text-align: center;
  color: #fff;
  width: 100px;
  text-decoration: none;
  margin-right: 20px;
}
</style>
