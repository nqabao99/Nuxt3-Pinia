<template>
  <div class="container">
    <ListBook />
  </div>
</template>

<script>
import ListBook from "./components/listBook.vue";

export default {
  components: {
    ListBook,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
