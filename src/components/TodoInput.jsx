import { useState } from "react";

function TodoInput({ handleTodoCreation }) {
    const [todo, setTodo] = useState("");

    return (
        <div>
            <form onSubmit={(e) => handleTodoCreation(e, todo)}>
                <input
                    type="text"
                    placeholder="Enter To Do Text"
                    required
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default TodoInput;
