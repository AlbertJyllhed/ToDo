import { useState } from "react";

function CategoryInput({ handleCategoryCreation }) {
    const [categoryText, setCategoryText] = useState("");

    function createCategory(e, category) {
        e.preventDefault();
        handleCategoryCreation(category);
        setCategoryText("");
    }

    return (
        <div className="category-input">
            <form onSubmit={(e) => createCategory(e, categoryText)}>
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={categoryText}
                    onChange={(e) => setCategoryText(e.target.value)}
                    required
                />
                <button type="submit">Create Category</button>
            </form>
        </div>
    );
}

export default CategoryInput;
