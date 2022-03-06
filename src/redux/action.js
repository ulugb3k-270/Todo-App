export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const delTodo = (index) => {
  return {
    type: "DELETE_TODO",
    index: index,
  };
};

export const editTodo = (index, text) => {
  return {
    type: "EDIT_TODO",
    payload: index,
    editedText: text,
  };
};

export const completeTodo = (index) => {
  return {
    type: "COMPLETE_TODO",
    index: index,
  };
};
export const getTodo = (todos) => {
  return {
    type: "GET_TODOS",
    todos: todos,
  };
};
