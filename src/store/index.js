import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

// const firebaseConfig = {
//   apiKey: "AIzaSyBoAifIn6uC6KzUD4WfYARFH334rRzl_xI",
//   authDomain: "todo-f0def.firebaseapp.com",
//   databaseUrl: "https://todo-83bbe-default-rtdb.firebaseio.com",
//   projectId: "todo-f0def",
//   storageBucket: "todo-f0def.appspot.com",
//   messagingSenderId: "806211618652",
//   appId: "1:806211618652:web:f9ae73111b13149ed82399",
//   measurementId: "G-DTP3X22VN0"
// };
// const firebaseTo = firebase.initializeApp(firebaseConfig);
// const db = firebaseTo.firestore();

// const DATABASE = 'todo-list';


export default new Vuex.Store({
	state: {
		todos: [],
		completedTodos: [],
		pendingTodos: [],
		completedFilter: false,
		uid: ''
	},
	getters: {
		allTodos: (state) => {
			if (state.completedFilter) {
				return state.completedTodos
			} else {
				return state.pendingTodos
			}
		}
	},
	actions: {
		addTodo({
			commit
		}, todo) {
			commit('addTodoTask', todo)
		},
		deleteTodo({
			commit
		}, id) {
			commit('deleteTodoTask', id)
		},
		updateTodo({
			commit
		}, todo) {
			commit('updateTodoTask', todo)
		},
		completeTodo({
			commit
		}, todo) {
			commit('completeTodoTask', todo)
		},
		getAllTodo({
			commit
		}) {
			commit('getAllTodo', JSON.parse(localStorage.getItem('storedData')))
		},
		getShowCompleted({
			commit
		}) {
			commit('getShowCompleted', JSON.parse(localStorage.getItem('storedData')))
		}
	},
	mutations: {
		addTodoTask(state, todo) {
			/** List of all todos modified or not defined */
			if (!state.todos) {
				state.todos = [];
			}
			state.todos.push(todo);
			state.pendingTodos.push(todo);
			localStorage.setItem('storedData', JSON.stringify(state.todos));
		},
		deleteTodoTask(state, id) {
			state.todos = state.todos.filter(todo => todo.id != id)
			state.pendingTodos = state.todos.filter(todo => todo.id != id && !todo.completedFilter);
			state.completedTodos = state.todos.filter(todo => todo.id != id && todo.completedFilter)
			localStorage.setItem('storedData', JSON.stringify(state.todos));
		},
		updateTodoTask(state, todo) {
			let index = state.todos.findIndex(v => v.id == todo.id)
			index != -1 ? state.todos[index] = todo : ''
		},
		getAllTodo(state, todos) {
			state.completedFilter = false;
			state.todos = todos;
			state.completedTodos = state.todos.filter(todo => todo.completed == true);
			state.pendingTodos = state.todos.filter(todoItem => todoItem.completed != true);
			state.pendingTodos.map((todoItem) => {
				let dueDate = new Date(todoItem.dueDate);
				let curDate = new Date();
        todoItem['overDue'] = curDate > dueDate ? true: false;
			});
		},
		setTodoList(state, allTodo) {
			state.todos.push(allTodo);
		},
		completeTodoTask(state, newTodo) {
			let index = state.todos.findIndex(v => v.id == newTodo.id)
			index != -1 ? state.todos[index] = newTodo : ''

			localStorage.setItem('storedData', JSON.stringify(state.todos));
			state.completedTodos = state.todos.filter(todo => todo.completed == true);
			state.pendingTodos = state.todos.filter(todoItem => todoItem.completed != true);
		},
		getShowCompleted(state) {
			state.completedFilter = true;
			state.completedTodos = state.todos.filter(todo => todo.completed == true);
			state.completedTodos.map((todoItem) => {
				let dueDate = new Date(todoItem.dueDate);
				let curDate = new Date();
				todoItem['overDue'] = curDate > dueDate ? true: false;
			});
		}
	},

	modules: {}
})