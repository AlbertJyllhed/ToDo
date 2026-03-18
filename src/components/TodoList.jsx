import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

function TodoList() {
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem("todo")) || [],
    );

    // create category list and send to CategoryInput

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todoList));
    }, [todoList]);

    function handleTodoCreation(event, text) {
        event.preventDefault();
        setTodoList([{ text: text, done: false, categories: [] }, ...todoList]);
    }

    function handleTodoChecking(index, status) {
        const todoCopy = [...todoList];
        todoCopy[index].done = status;
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    function handleTodoRemoval(index) {
        const todoCopy = [...todoList];
        todoCopy.splice(index, 1);
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    return (
        <>
            <TodoInput
                todoList={todoList}
                handleTodoCreation={handleTodoCreation}
            />
            <div>
                {todoList.map((todo, index) => (
                    <TodoItem
                        key={"todo#" + index}
                        todo={todo}
                        checkFunc={handleTodoChecking}
                        deleteFunc={handleTodoRemoval}
                        index={index}
                    />
                ))}
            </div>
        </>
    );
}

export default TodoList;
