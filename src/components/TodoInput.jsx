import { useState } from "react";
import CategoryInput from "./CategoryInput";

function TodoInput({ todoList, handleTodoCreation }) {
    const [todoText, setTodoText] = useState("");

    return (
        <div>
            <form onSubmit={(e) => handleTodoCreation(e, todoText)}>
                <input
                    type="text"
                    placeholder="Enter Todo Text"
                    required
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <CategoryInput todoList={todoList} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default TodoInput;
