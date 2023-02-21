<template>
  <div id="app" class="container w-full max-w-4xl bg-gray-100">
    <ToDoList/>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style lang="scss">
</style>
