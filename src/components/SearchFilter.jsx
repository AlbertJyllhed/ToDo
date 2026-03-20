function SearchFilter({
    categories,
    selectedFilters,
    handleSearchFilter,
    clearFilters,
}) {
    return (
        <div className="search-filter">
            {categories.length > 0 ? <p>Filter by category</p> : null}

            <button
                className={selectedFilters.length === 0 ? "active" : ""}
                onClick={clearFilters}
            >
                All
            </button>

            {categories.map((category, index) => (
                <button
                    key={"filter#" + index}
                    className={
                        selectedFilters.includes(category) ? "active" : ""
                    }
                    onClick={() => handleSearchFilter(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default SearchFilter;
