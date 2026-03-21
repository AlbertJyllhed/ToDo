import "./TodoItem.css";

function TodoItem({ todo, checkFunc, deleteFunc, index, removeCategory }) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                id={`todo-checkbox-${index}`}
                checked={todo.done}
                onChange={(e) => checkFunc(index, e.target.checked)}
            />
            <label
                htmlFor={`todo-checkbox-${index}`}
                className="custom-checkbox"
            ></label>
            <p>{todo.text}</p>
            {todo.deadline && (
                <p>
                    Deadline:{" "}
                    {new Intl.DateTimeFormat("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }).format(new Date(todo.deadline))}
                </p>
            )}
            {todo.categories &&
                todo.categories.length > 0 &&
                todo.categories.map((category, i) => (
                    <button
                        key={todo.text + "#" + i}
                        onClick={() => removeCategory(index, i)}
                    >
                        {category}
                    </button>
                ))}
            <button className="delete-btn" onClick={() => deleteFunc(index)}>
                &#10006;
            </button>
        </div>
    );
}

export default TodoItem;
