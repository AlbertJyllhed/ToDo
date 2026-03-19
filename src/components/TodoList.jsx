import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import SearchFilter from "./SearchFilter";
import TodoItem from "./TodoItem";

function TodoList() {
    const [todoList, setTodoList] = useState(
        JSON.parse(localStorage.getItem("todo")) || [],
    );

    // create category list and send to CategoryInput
    const [categories, setCategories] = useState([]);
    const [searchFilter, setSearchFilter] = useState([]);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todoList));
    }, [todoList]);

    function handleTodoCreation(event, text, categories) {
        event.preventDefault();
        const deadline = Date.now() + 6.048e8;
        setTodoList([
            {
                text: text,
                done: false,
                deadline: deadline,
                categories: categories,
            },
            ...todoList,
        ]);
    }

    function handleTodoChecking(index, status) {
        const todoCopy = [...todoList];
        todoCopy[index].done = status;
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    function handleTodoRemoval(index) {
        const todoCopy = [...todoList];
        todoCopy.splice(index, 1);
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    function handleCategoryCreation(category) {
        if (!categories.some((c) => category === c)) {
            const trimmedCat = category.toLowerCase().trim();
            setCategories([...categories, trimmedCat]);
        }
    }

    function removeCategory(todoIndex, categoryIndex) {
        const todoCopy = [...todoList];
        todoCopy[todoIndex].categories.splice(categoryIndex, 1);
        setTodoList(todoCopy);
    }

    function handleSearchFilter(text) {
        setSearchFilter([...searchFilter, text]);
    }

    return (
        <>
            <TodoInput
                categories={categories}
                handleTodoCreation={handleTodoCreation}
                handleCategoryCreation={handleCategoryCreation}
            />
            <SearchFilter
                categories={categories}
                handleSearchFilter={handleSearchFilter}
            />
            <div className="todo-container">
                {todoList.map((todo, index) =>
                    // Fix issues
                    searchFilter.some((filter) => todo.text === filter) ||
                    searchFilter.length === 0 ? (
                        <TodoItem
                            key={"todo#" + index}
                            todo={todo}
                            checkFunc={handleTodoChecking}
                            deleteFunc={handleTodoRemoval}
                            index={index}
                            removeCategory={removeCategory}
                        />
                    ) : null,
                )}
            </div>
        </>
    );
}

export default TodoList;
