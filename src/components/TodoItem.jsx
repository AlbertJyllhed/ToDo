import React from "react";

function TodoItem({ todo, checkFunc, deleteFunc, index }) {
    return (
        <div className="todo-item">
            <p>{todo.text}</p>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => checkFunc(index, e.target.checked)}
            />
            <button className="delete" onClick={() => deleteFunc(index)}>
                Delete
            </button>
        </div>
    );
}

export default TodoItem;
