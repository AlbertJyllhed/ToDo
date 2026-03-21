import { useState } from "react";
import CategoryInput from "./CategoryInput";
import "./TodoInput.css";

function TodoInput({ categories, handleTodoCreation, handleCategoryCreation }) {
    const [todoText, setTodoText] = useState("");
    const [todoDeadline, setTodoDeadline] = useState("");
    const [todoCategories, setTodoCategories] = useState([]);

    function toggleCategory(category) {
        setTodoCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category],
        );
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
                    <textarea
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
                <p>Add Categories</p>
                {categories.map((category, index) => (
                    <button
                        key={"btn#" + index}
                        className={`category-btn ${todoCategories.includes(category) ? "active" : ""}`}
                        onClick={() => toggleCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </>
    );
}

export default TodoInput;
