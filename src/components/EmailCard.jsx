import { Fragment } from "react"

const EmailCard = ({ from, subject, short_description, date }) => {
    return (
        <Fragment>
            <div className="card md:flex max-w-lg">
                <img className="rounded-full mx-auto h-20 w-20 md:mr-6 mb-6" src="/assets/profile_image.png" />
                <div className="flex-grow text-center md:text-left mb-0">
                    <h4 className="heading my-0">From: <b>{` ${from.name} <${from.email}> `}</b></h4>
                    <p className="mb-3 mt-2">{subject}</p>
                    <div>
                        <p className="mb-3 mt-2">{short_description}</p>
                        <time>{new Date(date).toDateString().split(" ")}</time>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmailCard;
