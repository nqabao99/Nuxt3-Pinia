<template>
  <div class="dialog">
    <h2>
      {{
        actions === "edit"
          ? "Edit book"
          : actions === "view"
          ? "View"
          : "Add book"
      }}
    </h2>
    <label for="name">Name</label>
    <input
      class="textField"
      type="text"
      v-model="bookDetail.name"
      placeholder="Enter book"
    />

    <label for="author">Author</label>
    <input
      class="textField"
      type="text"
      v-model="bookDetail.author"
      placeholder="Enter author"
    />

    <div class="btn">
      <nuxt-link to="/book" class="btnSubmit" style="background-color: #dedede">
        Back
      </nuxt-link>

      <button
        class="btnSubmit"
        @click="actions !== 'edit' ? add(bookDetail) : edit(bookDetail)"
        v-show="actions !== 'view'"
      >
        {{ actions !== "edit" ? "Add" : "Edit" }}
      </button>
    </div>
  </div>
</template>

<script>
import { useBooksStore } from "../stores/book";
import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(useBooksStore, ["books", "bookDetail", "actions"]),
  },
  methods: {
    ...mapActions(useBooksStore, ["removeBook", "addBook", "editBook"]),
    add(data) {
      if (data.name !== "" && data.author !== "") {
        this.addBook(data);
        useRouter().push({ path: "/book" });
      }
    },
    edit(data) {
      if (data.name !== "" && data.author !== "") {
        this.editBook(data);
        useRouter().push({ path: "/book" });
      }
    },
  },
};
</script>

<style>
.dialog {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin-top: 30px;
}

h2 {
  text-align: center;
}

.textField {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  display: flex;
  justify-content: space-evenly;
}

.btnSubmit {
  width: 30%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}
</style>
