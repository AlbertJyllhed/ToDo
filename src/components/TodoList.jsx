import { useState, useEffect, useMemo } from "react";
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
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
    const [filterEnabled, setFilterEnabled] = useState(true);

    // Saving to local storage whenever the todo list changes
    useEffect(() => {
        localStorage.setItem(
            "todoApp",
            JSON.stringify({ todoList, categories }),
        );
    }, [todoList, categories]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // Filtered and sorted todos: undone first, then by deadline (earliest first)
    const filteredSortedTodos = useMemo(() => {
        let filtered = todoList;
        if (filterEnabled && searchFilter.length > 0) {
            filtered = todoList.filter((todo) =>
                todo.categories.some((cat) => searchFilter.includes(cat)),
            );
        }

        // Only sort when filtering is enabled
        if (filterEnabled) {
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
        } else {
            // When filtering disabled return items in current order
            return filtered.slice();
        }
    }, [todoList, searchFilter, filterEnabled]);

    // Creating a new todo item and adding it to the list
    function handleTodoCreation(text, deadline, categories) {
        setTodoList([
            {
                id: Date.now(),
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

    function handleSearchFilterToggle() {
        setFilterEnabled((prev) => !prev);
    }

    // Handle drag and drop reordering
    function handleDragEnd(event) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = todoList.findIndex(
                (todo) => todo.id === active.id,
            );
            const newIndex = todoList.findIndex((todo) => todo.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                setTodoList(arrayMove(todoList, oldIndex, newIndex));
            }
        }
    }

    // Drag enabled only when filter is disabled
    const dragEnabled = !filterEnabled;

    // Create the todo container content
    const todoContainerContent = filteredSortedTodos.map((todo) => {
        const originalIndex = todoList.findIndex((t) => t.id === todo.id);
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                checkFunc={handleTodoChecking}
                deleteFunc={handleTodoRemoval}
                index={originalIndex}
                dragEnabled={dragEnabled}
            />
        );
    });

    // Render the container with or without drag context
    const todoContainer = dragEnabled ? (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={todoList.map((todo) => todo.id)}>
                <div className="todo-container">{todoContainerContent}</div>
            </SortableContext>
        </DndContext>
    ) : (
        <div className="todo-container">{todoContainerContent}</div>
    );

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
                filterEnabled={filterEnabled}
                handleSearchFilterToggle={handleSearchFilterToggle}
            />
            {todoContainer}
        </>
    );
}

export default TodoList;
