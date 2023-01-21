import { Fragment } from "react"
import EmailCard from "./EmailCard"

const EmailList = (emails) => {
    return (
        <Fragment>
            {
                emails.map((email) => (<EmailCard key={email.id} />))
            }
        </Fragment>
    )
}

export default EmailList;