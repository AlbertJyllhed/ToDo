import React from "react";

function TodoItem({ todo, checkFunc, deleteFunc, index, removeCategory }) {
    return (
        <div className="todo-item">
            <p>{todo.text}</p>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) => checkFunc(index, e.target.checked)}
            />
            {todo.categories
                ? todo.categories.map((category, i) => (
                      <button
                          key={todo.text + "#" + i}
                          onClick={() => removeCategory(index, i)}
                      >
                          {category}
                      </button>
                  ))
                : null}
            <button className="delete" onClick={() => deleteFunc(index)}>
                &#10006;
            </button>
        </div>
    );
}

export default TodoItem;
