import { useState } from "react";
import { useDispatch } from "react-redux";
import { delTodo, editTodo, completeTodo } from "../redux/action";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

function List({ id, index, todos, completed }) {
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todos);
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state);

  const cancelEdit = () => {
    setEdit(false);
    setEditedTodo(todos);
  };

  const applyEdit = () => {
    if (editedTodo.length) {
      dispatch(editTodo(index, editedTodo));
      localStorage.setItem("todos", JSON.stringify(todo));
    } else {
      setEdit(true);
      alert("Input is empty !");
    }
    setEdit(false);
  };

  return (
    <>
      <div className="flex space-x-4 py-3 h-full items-center">
        <h2 className="text-xl">{index + 1}.</h2>
        <h2 className="flex-1 text-xl">{todos}</h2>
        <h2 className="font-mono">
          {!completed.status
            ? "not completed"
            : `completed on ${completed.date}`}
        </h2>

        {!completed.status ? (
          <>
            <button
              className="border p-2 rounded-md bg-green-500 text-white"
              onClick={() => {
                dispatch(completeTodo(index));
                localStorage.setItem("todos", JSON.stringify(todo));
              }}
            >
              Complete
            </button>
            <button
              className="border p-2 rounded-md  w-[61px]"
              onClick={() => setEdit(!edit)}
            >
              Edit
            </button>
          </>
        ) : (
          <CheckCircleIcon className="h-8 bg-blue text-blue-400 " />
        )}
        <button
          className="bg-red-600 p-2 text-white rounded-md"
          onClick={() => {
            dispatch(delTodo(index));
            localStorage.setItem("todos", JSON.stringify(todo));
          }}
        >
          Delete
        </button>
      </div>
      {edit && (
        <div className="absolute w-[900px]  h-[600px] bg-[#00000040] top-0 flex items-center justify-center rounded-md left-0">
          <div className="bg-white rounded-lg w-full mx-20 flex pl-3">
            <input
              type="text"
              placeholder="Edit Your Todo"
              value={editedTodo}
              onChange={(e) => setEditedTodo(e.target.value)}
              className="flex-1 rounded-l-md p-3  outline-none"
            />
            <button
              className="bg-blue-400 px-3 text-white "
              onClick={applyEdit}
            >
              Apply
            </button>
            <button
              className="bg-red-600 px-3 text-white rounded-r-md"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
