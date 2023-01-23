import { Fragment } from "react"

const Filters = ({ active, handleFilters }) => {
    const filters = [
        "All", "Unread", "Read", "Favorites"
    ]
    return (
        <Fragment>
            <div className="flex justify-evenly items-center gap-3 font-[400] font-sans text-l ml-4">
                <div>
                    Filter By:
                </div>
                {
                    filters.map((filter) => (<div
                        onClick={(e) => handleFilters(e.target.innerText)}
                        key={filter}
                        className={active === filter ? "border-2 px-5 rounded-2xl text-gray-700 bg-gray-200 border-gray-300" : "px-5"}>
                        {filter}
                    </div>))
                }

            </div>
        </Fragment>
    )
}

export default Filters;