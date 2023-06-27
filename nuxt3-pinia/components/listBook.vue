<template>
  <div>
    <div class="header">
      <h1>List Book</h1>
    </div>
    <table>
      <tr>
        <th>STT</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(book, index) in books" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.name }}</td>
        <td>
          <button class="button" @click="editBook(book)">Edit</button>
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

    <div class="dialog">
      <h2>Title</h2>
      <label for="fname">Name</label>
      <input type="text" v-model="bookDetail.name" placeholder="Enter book" />

      <button
        class="btnSubmit"
        @click="
          !bookDetail.id
            ? addBook(bookDetail.name)
            : editBook(bookDetail, 'submit')
        "
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { useBooksStore } from "../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["books", "bookDetail"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["removeBook", "addBook", "editBook"]),
  },
};
</script>

<style>
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
