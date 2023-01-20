import { Fragment, useEffect } from "react";
import { useState } from "react";

const List = () => {
    const [emails, setEmails] = useState(null);
    const fetchEmail = async () => {
        const res = await fetch("https://flipkart-email-mock.now.sh");
        const data = await res.json();
        setEmails(data.list);
        console.log(emails,"email")
    }

    useEffect(() => {
        fetchEmail()
    }, [])

    return (
        <Fragment>
            <h1>List od Emails</h1>
            <div>
                {
                    emails.map((email)=>(
                        <div key={email.id}>
                            <p>{email.short_description}</p>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default List;