import { useState } from "react";

function CategoryInput({ todoList }) {
    const [categoryText, setCategoryText] = useState("");

    return (
        <>
            <input
                type="text"
                placeholder="Enter category name"
                value={categoryText}
                onChange={(e) => setCategoryText(e.target.value)}
            />
            <div></div>
        </>
    );
}

export default CategoryInput;
