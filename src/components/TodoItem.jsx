import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faXmark,
    faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./TodoItem.css";

function TodoItem({ todo, checkFunc, deleteFunc, index, dragEnabled }) {
    const sortableProps = dragEnabled ? useSortable({ id: todo.id }) : null;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = sortableProps || {};

    const style = dragEnabled
        ? {
              transform: CSS.Transform.toString(transform),
              transition,
          }
        : {};

    function handleCheckboxChange(e) {
        checkFunc(index, e.target.checked);
    }

    function formatDeadline(deadline) {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(deadline));
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={
                "todo-item " +
                (todo.done ? "todo-item-checked " : "") +
                (isDragging ? "dragging" : "")
            }
        >
            <div className="wrapper">
                {dragEnabled && (
                    <span
                        className="drag-handle"
                        {...attributes}
                        {...listeners}
                    >
                        <FontAwesomeIcon icon={faGripLines} />
                    </span>
                )}
                <input
                    type="checkbox"
                    id={`todo-checkbox-${index}`}
                    checked={todo.done}
                    onChange={handleCheckboxChange}
                />
                <label
                    htmlFor={`todo-checkbox-${index}`}
                    className="custom-checkbox"
                ></label>
                <p className={todo.done ? "todo-text-checked" : ""}>
                    {todo.text}
                </p>
            </div>
            {todo.deadline && (
                <p>
                    <FontAwesomeIcon icon={faClock} />
                    {formatDeadline(todo.deadline)}
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
