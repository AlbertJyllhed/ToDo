import { useState } from "react";
import CategoryInput from "./CategoryInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./TodoInput.css";

function TodoInput({
    categories,
    handleTodoCreation,
    handleCategoryCreation,
    handleCategoryRemoval,
}) {
    const [todoText, setTodoText] = useState("");
    const [todoDeadline, setTodoDeadline] = useState("");
    const [todoCategories, setTodoCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);

    function toggleCategory(category) {
        if (editMode) {
            // In removal mode: confirm and remove globally
            if (
                window.confirm(`Remove category "${category}" from all todos?`)
            ) {
                handleCategoryRemoval(category);
            }
        } else {
            // Normal mode: toggle for new todo
            setTodoCategories((prev) =>
                prev.includes(category)
                    ? prev.filter((c) => c !== category)
                    : [...prev, category],
            );
        }
    }

    function createTodo(e) {
        e.preventDefault();
        handleTodoCreation(todoText, todoDeadline, todoCategories);
        setTodoText("");
        setTodoDeadline("");
        setTodoCategories([]);
    }

    return (
        <>
            <div className="todo-input">
                <form
                    onSubmit={(e) =>
                        createTodo(e, todoText, todoDeadline, todoCategories)
                    }
                >
                    <input
                        type="text"
                        placeholder="Enter Todo Text"
                        required
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                    />
                    <input
                        type="date"
                        value={todoDeadline}
                        onChange={(e) => setTodoDeadline(e.target.value)}
                    />
                    <button type="submit">Add Todo</button>
                </form>
                <CategoryInput
                    handleCategoryCreation={handleCategoryCreation}
                />
            </div>
            <div className="categories">
                <div className="heading">
                    <p>{editMode ? "Remove Categories" : "Add Categories"}</p>
                    <button onClick={() => setEditMode(!editMode)}>
                        <FontAwesomeIcon
                            icon={editMode ? faPenToSquare : faTrashCan}
                        />
                    </button>
                </div>
                {categories.map((category, index) => (
                    <button
                        key={"btn#" + index}
                        className={`${todoCategories.includes(category) && !editMode ? "active" : ""} ${editMode ? "delete-btn" : ""}`}
                        onClick={() => toggleCategory(category)}
                    >
                        {category}
                        {editMode && <FontAwesomeIcon icon={faTrashCan} />}
                    </button>
                ))}
            </div>
        </>
    );
}

export default TodoInput;
