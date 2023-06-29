<template>
  <div>
    <div>counter: {{ counter }}</div>
    <button @click="counter++">increment</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    counter: 84,
  }),
};
</script>
