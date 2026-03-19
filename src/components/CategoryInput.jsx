import { useState } from "react";

function CategoryInput({ handleCategoryCreation }) {
    const [categoryText, setCategoryText] = useState("");

    function createCategory(category) {
        handleCategoryCreation(category);
        setCategoryText("");
    }

    return (
        <div className="category-input">
            <input
                type="text"
                placeholder="Enter category name"
                value={categoryText}
                onChange={(e) => setCategoryText(e.target.value)}
            />
            <button onClick={() => createCategory(categoryText)}>
                Create Category
            </button>
        </div>
    );
}

export default CategoryInput;
