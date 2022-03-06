export const initialState = {
  
  todo: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = [
        {
          id: Math.floor(Math.random() * 10000),
          completed: {
            status: false,
            date: null,
          },
          todo: action.payload,
        },
        ...state.todo,
      ];
      return {
        ...state,
        todo: newTodo,
      };

    case "DELETE_TODO":
      state.todo.splice(action.index, 1);

      return {
        ...state,
        todo: state.todo,
      };

    case "EDIT_TODO":
      state.todo[action.payload].todo = action.editedText;
      return {
        ...state,
        todo: state.todo,
      };
    case "COMPLETE_TODO":
      const date = new Date();
      state.todo[action.index].completed.status = !false;
      state.todo[
        action.index
      ].completed.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
      }:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`;
      return {
        ...state,
        todo: state.todo,
      };
    case "GET_TODOS":
      return{
        ...state,
        todo: action.todos
      }
    default:
      return {
        ...state,
      };
  }
};
