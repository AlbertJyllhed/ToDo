import { useState, useEffect, useMemo } from "react";
import TodoInput from "./TodoInput";
import SearchFilter from "./SearchFilter";
import TodoItem from "./TodoItem";

function TodoList() {
    const [todoList, setTodoList] = useState(() => {
        const saved = localStorage.getItem("todoApp");
        return saved ? JSON.parse(saved).todoList || [] : [];
    });
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("todoApp");
        return saved ? JSON.parse(saved).categories || [] : [];
    });
    const [searchFilter, setSearchFilter] = useState([]);

    // Saving to local storage whenever the todo list changes
    useEffect(() => {
        localStorage.setItem(
            "todoApp",
            JSON.stringify({ todoList, categories }),
        );
    }, [todoList, categories]);

    // Filtered and sorted todos: undone first, then by deadline (earliest first)
    const filteredSortedTodos = useMemo(() => {
        let filtered = todoList;
        if (searchFilter.length > 0) {
            filtered = todoList.filter((todo) =>
                todo.categories.some((cat) => searchFilter.includes(cat)),
            );
        }
        return filtered.slice().sort((a, b) => {
            // Undone items first
            if (a.done !== b.done) {
                return a.done ? 1 : -1;
            }
            // Same done status: sort by deadline (earliest first)
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            return dateA - dateB;
        });
    }, [todoList, searchFilter]);

    // Creating a new todo item and adding it to the list
    function handleTodoCreation(text, deadline, categories) {
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

    // Changing the "done" status of a todo item
    function handleTodoChecking(index, status) {
        const todoCopy = [...todoList];
        todoCopy[index].done = status;
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    // Removing a todo item from the list
    function handleTodoRemoval(index) {
        const todoCopy = [...todoList];
        todoCopy.splice(index, 1);
        setTodoList(todoCopy);
        // console.log(todoCopy);
    }

    // Adding a new category to the list of categories if it doesn't already exist
    function handleCategoryCreation(category) {
        if (!categories.some((c) => category === c)) {
            const trimmedCat = category.toLowerCase().trim();
            setCategories([...categories, trimmedCat]);
        }
    }

    // Removing a category globally and from all todos
    function handleCategoryRemoval(categoryToRemove) {
        // Remove from categories list
        setCategories(categories.filter((cat) => cat !== categoryToRemove));

        // Remove from all todos that have this category
        setTodoList(
            todoList.map((todo) => ({
                ...todo,
                categories: todo.categories.filter(
                    (cat) => cat !== categoryToRemove,
                ),
            })),
        );
    }

    // Toggle a category in the search filter array (click to activate/deactivate)
    function handleSearchFilter(category) {
        setSearchFilter((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category],
        );
    }

    return (
        <>
            <TodoInput
                categories={categories}
                handleTodoCreation={handleTodoCreation}
                handleCategoryCreation={handleCategoryCreation}
                handleCategoryRemoval={handleCategoryRemoval}
            />
            <SearchFilter
                categories={categories}
                selectedFilters={searchFilter}
                handleSearchFilter={handleSearchFilter}
                clearFilters={() => setSearchFilter([])}
            />
            <div className="todo-container">
                {filteredSortedTodos.map((todo) => {
                    // Find the original index in todoList for actions
                    const originalIndex = todoList.findIndex((t) => t === todo);
                    return (
                        <TodoItem
                            key={"todo#" + originalIndex}
                            todo={todo}
                            checkFunc={handleTodoChecking}
                            deleteFunc={handleTodoRemoval}
                            index={originalIndex}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default TodoList;
