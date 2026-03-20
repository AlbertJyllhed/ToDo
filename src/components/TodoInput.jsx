import { useState } from "react";
import CategoryInput from "./CategoryInput";

function TodoInput({ categories, handleTodoCreation, handleCategoryCreation }) {
    const [todoText, setTodoText] = useState("");
    const [todoDeadline, setTodoDeadline] = useState("");
    const [todoCategories, setTodoCategories] = useState([]);

    function addCategory(category) {
        setTodoCategories([...todoCategories, category]);
    }

    function createTodo(e) {
        e.preventDefault();
        handleTodoCreation(todoText, todoDeadline, todoCategories);
        setTodoText("");
        setTodoDeadline("");
        setTodoCategories([]);
    }

    return (
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
            <CategoryInput handleCategoryCreation={handleCategoryCreation} />
            <div className="categories">
                {categories.map((category, index) => (
                    <button
                        key={"btn#" + index}
                        className="category-btn"
                        onClick={() => addCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoInput;
