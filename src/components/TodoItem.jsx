import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

function TodoItem({ todo, checkFunc, deleteFunc, index }) {
    return (
        <div className="todo-item">
            <div className="wrapper">
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
            </div>
            {todo.deadline && (
                <p>
                    <FontAwesomeIcon icon={faClock} />
                    {new Intl.DateTimeFormat("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }).format(new Date(todo.deadline))}
                </p>
            )}
            <div className="wrapper">
                {todo.categories &&
                    todo.categories.length > 0 &&
                    todo.categories.map((category, i) => (
                        <button key={todo.text + "#" + i} className="active">
                            {category}
                        </button>
                    ))}
            </div>
            <button className="delete-btn" onClick={() => deleteFunc(index)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default TodoItem;
