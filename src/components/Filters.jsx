import { Fragment } from "react"

const Filters = ( ) => {
    return(
        <Fragment>
            <div className="flex justify-evenly gap-5 font-[400] font-sans text-xl">
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