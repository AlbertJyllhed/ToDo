function SearchFilter({ categories, handleSearchFilter }) {
    return (
        <div className="search-filter">
            {categories.length > 0 ? <p>Filter by category</p> : null}
            {categories.map((category, index) => (
                <button
                    key={"filter#" + index}
                    onClick={() => handleSearchFilter(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default SearchFilter;
