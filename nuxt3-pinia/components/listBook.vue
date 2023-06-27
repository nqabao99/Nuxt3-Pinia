<template>
  <div>
    <div class="header">
      <h1>List Book</h1>
      <nuxt-link
        to="/book/add"
        class="button"
        style="background-color: #45a049; margin-right: 0px"
        >Add</nuxt-link
      >
    </div>
    <Loading v-if="isLoading"></Loading>
    <table v-else>
      <tr>
        <th>STT</th>
        <th>Name</th>
        <th>Author</th>
        <th style="text-align: center">Actions</th>
      </tr>
      <tr v-for="(book, index) in books" :key="book.id">
        <td>{{ index + 1 }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>
          <button
            class="button"
            style="background-color: #dedede"
            @click="changeRouter(book.id, 'view')"
          >
            View
          </button>
          <button class="button" @click="changeRouter(book.id, 'edit')">
            Edit
          </button>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td:last-child {
  display: flex;
  justify-content: center;
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
