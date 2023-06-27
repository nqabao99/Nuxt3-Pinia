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
          <button class="button" @click="edit(book)">Edit</button>
          <button
            class="button"
            style="background-color: #dc3545; margin-left: 20px"
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
      "editBook",
      "resetBookDetail",
    ]),
    edit(data) {
      this.editBook(data);
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

tr:nth-child(even) {
  background-color: #dddddd;
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
}

.dialog {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin-top: 30px;
}

.dialog h2 {
  text-align: center;
}

.dialog input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.dialog .btnSubmit {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dialog .btnSubmit:hover {
  background-color: #45a049;
}
</style>
