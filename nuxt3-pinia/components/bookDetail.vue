<template>
  <div class="loader" v-if="isLoading"></div>
  <div class="dialog" v-else>
    <h2>View</h2>
    <label for="name">Name</label>
    <input
      class="textField"
      type="text"
      v-model="bookDetail.name"
      placeholder="Enter book"
      :readonly="actions === 'view'"
    />

    <label for="author">Author</label>
    <input
      class="textField"
      type="text"
      v-model="bookDetail.author"
      placeholder="Enter author"
      :readonly="actions === 'view'"
    />

    <div class="btn">
      <nuxt-link to="/book" class="btnSubmit" style="background-color: #dedede">
        Back
      </nuxt-link>
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

.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin: 100px auto;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
