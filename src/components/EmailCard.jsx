import { Fragment } from "react"

const EmailCard = ({ from, subject, short_description, date }) => {
    return (
        <Fragment>
            <div class="card md:flex max-w-lg">
                <img class="rounded-full mx-auto h-20 w-20 md:mr-6 mb-6" src="/assets/profile_image.png" />
                <div class="flex-grow text-center md:text-left mb-0">
                    <h4 class="heading my-0">From: <b>{` ${from.name} <${from.email}> `}</b></h4>
                    <p class="mb-3 mt-2">{subject}</p>
                    <div>
                        <p class="mb-3 mt-2">{short_description}</p>
                        <time>{new Date(date).toDateString().split(" ")}</time>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmailCard;
