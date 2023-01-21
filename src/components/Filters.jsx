import { Fragment } from "react"

const Filters = ( ) => {
    return(
        <Fragment>
            <div className="flex">
                <div>
                    Filter By:
                </div>
                <div>
                    Unread
                </div>
                <div>
                    Read
                </div>
                <div>
                    Favorites
                </div>
            </div>
        </Fragment>
    )
}

export default Filters;