<template>
    <div class="container w-full max-w-4xl">
      <div class="rounded-xl shadow-lg text-gray-700">
        <div
          class="max-h-96 overflow-y-auto p-4 bg-white border rounded-xl text-gray-800 h-full space-y-2 flex justify-between items-center"
        >
          <div class="flex justify-between items-center w-full">
            <div class="w-3/4">
              <div class="flex flex-col md:flex-row md:max-w-xl max-w-screen-md">
                <div class="flex items-center mr-3">
                  <font-awesome-icon
                    @click="onCompleted(todo)"
                    :class="todo.completed ? 'text-green-700' : ''"
                    icon="fas-solid fa-check-circle"
                    class="cursor-pointer mr-3 text-xl mb-2 md:mb-0"
                  />
                </div>
                <div class="flex flex-col justify-start">
                  <h6 class="text-gray-900 text-md font-medium mb-2 break-all">
                    <span
                      v-if="!editing"
                      :class="`${!todo.completed?'font-bold hover:text-yellow-800':'line-through'} `"
                    >
                      {{ todo.title }}
                    </span>
                    <span v-else>
                      <input
                        v-bind:value="todoText"
                        @change="todoTextChange"
                        type="text"
                        class="shadow appearance-none border rounded-lg text-sm w-full py-2 px-3 text-grey-darker"
                      />
                    </span>
                  </h6>
                  <p class="text-gray-600 text-xs">
                    <span v-if="!editing">
                      <font-awesome-icon
                        icon="fas-solid fa-calendar-alt"
                        title="Due Date"
                        class="font-gray-400 mr-2"
                        :class="todo.overDue && todo.dueDate ? 'text-red-500' : ''"
                      />
                      <span :class="todo.overDue ? 'text-red-500' : ''">
                        {{ todo.overDue && todo.dueDate ? 'Over Due, ' : '' }}
                        {{ todo.dueDate }}
                      </span>
                    </span>
                    <date-picker
                      v-else
                      v-model="dueDate"
                      @change="dueDateChange(todo)"
                      input-class="shadow appearance-none border rounded-lg w-full py-2 px-3 mr-4 text-grey-darker"
                      placeholder="Due Date"
                      valueType="format"
                    ></date-picker>
                  </p>
                </div>
              </div>
            </div>
            <div class="w-1/4 h-12">
              <div class="text-sm text-right">
                <div class="">
                  <font-awesome-icon
                    v-if="!editing"
                    @click="updateTodoItem(todo)"
                    class="cursor-pointer text-blue-500 mb-2 md:mb-0"
                    icon="fas-solid fa-pencil"
                  />
                  <font-awesome-icon
                    v-if="editing"
                    @click="updateTodoItem(todo)"
                    class="cursor-pointer text-blue-500 mb-2 md:mb-0"
                    icon="fas-solid fa-save"
                  />
                  <font-awesome-icon
                    @click="showModal = true"
                    class="mx-3 cursor-pointer text-red-500 mb-2 md:mb-0"
                    icon="fas-solid fa-trash-can"
                  />
                  <button
                    class="text-pink-500 border border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150 btn-cpy sm:mt-2"
                    type="button"
                    @click.prevent="duplicateItem(todo)"
                  >
                    Duplicate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center"></div>

          <VueModel
            v-if="showModal"
            @cancel="showModal = false"
            @close="deleteItem(todo)"
          ></VueModel>
        </div>
      </div>
    </div>
  </template>

  <script>

import { v1 } from "uuid";
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import DatePicker from 'vue2-datepicker';
import { mapActions } from "vuex";
import VueModel from "./Modal.vue";

  Vue.use(VueToast, {position: 'top'})

        export default {
        name: 'ToDoItem',
          props: {
            todo: {}
          },
          components: {
            VueModel,
            DatePicker
          },
          data() {
            return {
              todoText: "",
              dueDate : this.$props.todo.dueDate,
              editing: false,
              completed: false,
              showModal: false
            };
          },
          methods: {
            ...mapActions(["deleteTodo", "updateTodo", "completeTodo", "addTodo","getAllTodo", "getShowCompleted"]),
            onCompleted(todo) {
                const updateData = {
                id: todo.id,
                title: todo.title,
                dueDate: todo.dueDate,
                completed: !todo.completed
              }
              this.completeTodo(updateData);
              Vue.$toast.open(!this.$store.state.completedFilter ? 'Successfully Completed the Task' : 'Successfully Marked Completed Task as Pending');

            },
            duplicateItem(todo) {
              /** Complete is set false to create duplicate as a pending task */
              const updateData = {
                id: v1(),
                title: todo.title,
                dueDate: todo.dueDate,
                completed: false
              }
              this.addTodo(updateData);
              Vue.$toast.open('Successfully Duplicated the Task');
              this.getAllTodo();
            },
            todoTextChange(e) {
              this.todoText = e.target.value;
            },
            dueDateChange(todo){
              todo.dueDate = this.dueDate;
            },
            updateTodoItem(todo) {
              this.editing = this.editing == true ? false : true;
              if (this.editing) {
                this.todoText = todo.title;
                this.updateTodo(todo);
              } else {
                todo.title = this.todoText;
                this.completeTodo(todo)
                Vue.$toast.open('Successfully Updated the Task');
                !this.$store.state.completedFilter ?  this.getAllTodo() : this.getShowCompleted();
              }
            },
            deleteItem(todo) {
              this.deleteTodo(todo.id);
              Vue.$toast.open('Successfully Deleted the Task');
              !this.$store.state.completedFilter ?  this.getAllTodo() : this.getShowCompleted();
            }
          }
        };
  </script>

  <style scoped>
  .btn-cpy {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    font-size: 0.65rem;
  }
  </style>
