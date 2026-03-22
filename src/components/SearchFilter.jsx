import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faBan } from "@fortawesome/free-solid-svg-icons";

function SearchFilter({
    categories,
    selectedFilters,
    handleSearchFilter,
    clearFilters,
    filterEnabled,
    handleSearchFilterToggle,
}) {
    return (
        <div className="content">
            <div className="heading">
                {filterEnabled ? (
                    <p>Filter by Category</p>
                ) : (
                    <p>Manual Sorting</p>
                )}
                <button onClick={handleSearchFilterToggle}>
                    {filterEnabled ? (
                        <FontAwesomeIcon icon={faBan} />
                    ) : (
                        <FontAwesomeIcon icon={faFilter} />
                    )}
                </button>
            </div>
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
