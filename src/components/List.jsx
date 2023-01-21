import { Fragment, useEffect } from "react";
import { useState } from "react";

const List = () => {
    const [emails, setEmails] = useState(null);
    const fetchEmail = async () => {
        const res = await fetch("https://flipkart-email-mock.now.sh");
        const data = await res.json();
        console.log(data)
        setEmails(data);
        console.log(emails,"email")
    }

    useEffect(() => {
        fetchEmail()
    }, [])

    return (
        <Fragment>
            <h1>List od Emails</h1>
            <div className=" m-4">
                {
                    emails &&
                    emails.list.map((email)=>(
                        <div key={email.id} className="bg-red-600 m-4">
                            <p>From: {`${email.from.name} <${email.from.email}>`}</p>
                            <p>Subject: {email.subject}</p>
                            <p>{email.short_description}</p>
                            <p>{ new Date(email.date).toDateString().split(" ")}</p>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default List;