<template>
  <div class="container w-full max-w-4xl bg-gray-100 p-0 sm:p-12">
    <div class="px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
      <div class="">
        <div class="mb-4">
          <h1 class="text-2xl font-bold mb-8">
            <font-awesome-icon
              icon="fas-solid fa-paperclip"
              class="font-gray-400 mr-2 text-pink-500"
            />
            Todo List
          </h1>
        </div>
        <form v-on:submit.prevent="addToDoItem">
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10"
          >
            <div class="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-2">
              <input
                :class="{'border-red-500': validationStatus($v.title) && this.error.length >= 1}"
                class="shadow appearance-none border rounded-lg w-full py-2 px-3 mr-4 text-grey-darker"
                v-model.trim="$v.title.$model"
                placeholder="Add Todo"
              />
              <span
                v-if="!$v.title.required && this.error.length >= 1"
                class="text-red-500 text-sm"
                >Title is required!</span
              >
            </div>
            <div>
              <date-picker
                :class="{'invalid:border-red-500 rounded-lg': validationStatus($v.dueDate) && this.error.length >= 1}"
                input-class="shadow appearance-none border rounded-lg w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Due Date"
                v-model.trim="$v.dueDate.$model"
                valueType="format"
              ></date-picker>
            </div>
            <div>
              <button
                class="w-full px-6 py-2 text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div class="grid grid-cols-6 gap-4 mb-5">
          <div class="col-span-1">
            <a
              class="cursor-pointer btn-cpy font-bold uppercase text-xs px-4 py-1 mr-3 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
              :class="!$store.state.completedFilter ? 'text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600' : 'text-gray-700' "
              @click.prevent="showAllTasks()"
              >All</a
            >
            <a
              class="cursor-pointer btn-cpy font-bold uppercase text-xs px-4 py-1 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
              :class="$store.state.completedFilter ? 'text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600' : 'text-gray-700' "
              @click.prevent="showCompletedTasks()"
              >Completed</a
            >
          </div>
        </div>
        <div
          class="flex mb-4 items-center"
          v-for="item in allTodos"
          :value="item.id"
          :key="item.id"
        >
          <ToDoItem :todo="item"></ToDoItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v1 } from 'uuid';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import ToDoItem from './ToDoItem';

Vue.use(VueToast, {position: 'top'})

export default {
  name: 'ToDoList',
  props: {},
  computed : {
      ...mapGetters(["allTodos"])
    },
  methods: {
    validationStatus(validation) {
      return typeof validation !="undefined" ? validation.$error: false;
    },
    ...mapActions(["addTodo","getAllTodo","getShowCompleted"]),

      addToDoItem() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.addTodo({
        id: v1(),
        title: this.title,
        dueDate: this.dueDate,
        completed: false
      });
      this.title = '';
      this.dueDate = '';
      this.error = [];
      Vue.$toast.open('Successfully Added the Task');
      } else {
        this.error.push('Invalid Submit')
        return
      }
      this.getAllTodo();
    },
    showCompletedTasks() {
       this.getShowCompleted();
    },
    showAllTasks(){
      this.getAllTodo();
    }
  },
  mounted: function(){
    this.$nextTick(this.getAllTodo)
  },
  data()  {
    return {
      error: [],
      title: null,
      dueDate: null,
    }
  },
  validations: {
    title: {required},
    dueDate: {}
  },
  components: {
    DatePicker,
    ToDoItem
  }
}
</script>

<style scoped lang="scss">
.mx-datepicker {
  width: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
