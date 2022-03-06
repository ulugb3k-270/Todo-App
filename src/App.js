import List from "./components/List";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo } from "./redux/action";

function App() {
  const [activity, setActivity] = useState("");
  const { todo } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addActivity = (e) => {
    e.preventDefault();

    if (activity.length) {
      dispatch(addTodo(activity));
      setActivity("");
    } else {
      alert("Empty input !");
    }
  };

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("todos"));
    dispatch(getTodo(dataFromStorage));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-[900px] h-[600px] border shadow-lg rounded-md p-3 relative">
        <h1 className="font-mono text-center text-4xl">Todo</h1>
        <form
          action=""
          method="POST"
          className="w-full flex items-center space-x-2 mt-3"
        >
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="What are you planning todo?"
            className="flex-1 p-3 border rounded-md"
          />
          <button
            className="p-3 rounded-md text-white bg-blue-400 cursor-pointer hover:bg-blue-500 active:scale-95"
            onClick={addActivity}
            type="submit"
          >
            ADD
          </button>
        </form>
        {todo.length ? (
          <div className="overflow-y-scroll scrollbar-thin max-height-[485px] ">
            {todo.map((data, i) => (
              <List
                key={i}
                id={data.id}
                index={i}
                todos={data.todo}
                completed={data.completed}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[80%] flex items-center justify-center text-gray-400 text-3xl">
            Nothing To Do !
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
