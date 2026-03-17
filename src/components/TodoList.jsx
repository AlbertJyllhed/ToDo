import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

function TodoList() {
    const [todoList, setTodoList] = useState([]);

    function handleTodoCreation(event, todo) {
        event.preventDefault();
        setTodoList([...todoList, todo]);
    }

    return (
        <>
            <TodoInput handleTodoCreation={handleTodoCreation} />
            <div>
                {todoList.map((todo, index) => (
                    <TodoItem key={"todo#" + index} text={todo} />
                ))}
            </div>
        </>
    );
}

export default TodoList;
