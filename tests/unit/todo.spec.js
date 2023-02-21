import store from "@/store/index";

describe('ToDoList.vue', () => {
  it('it should add the todo task', () => {
    const todo = {
      id: 1,
      title: 'Complete the todo list task',
      dueDate: '21/02/2023',
      completed: false
    }
   store.commit('addTodoTask', todo);
   expect(store.state.todos).toContain(todo);
  }),
  it('it should update the todo task', () => {
    const updateTodo = {
        id: 1,
        title: 'Completed the todo list task',
        dueDate: '21/02/2023',
        completed: true
    }
   store.commit('updateTodoTask', updateTodo.id);
   expect(updateTodo).toBe(updateTodo);
  }),
  it('it should delete the todo task', () => {
    const filterTodo =
      {
        id: 1,
        title: 'Complete the todo list task',
        dueDate: '21/02/2023',
        completed: false
      }
   store.commit('deleteTodoTask', filterTodo.id);
   expect(store.state.todos).toStrictEqual([]);
  }),
  it('it should get All the todo task', () => {
    const allTodos = [
      {
        id: 1,
        title: 'Complete the todo list task',
        dueDate: '21/02/2023',
        completed: false
      },
      {
        id: 2,
        title: 'Complete the todo list test cases',
        dueDate: '21/02/2023',
        completed: true
      }
    ]

    store.commit('getAllTodo', allTodos)
    expect(store.state.todos).toHaveLength(2);
  })
})
