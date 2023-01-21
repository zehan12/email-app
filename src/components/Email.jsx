import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { changePage } from '../redux/pageSlice';
import { setEmail } from "../redux/emailSlice";
import Filters from "./Filters";
import { useEffect } from "react";
import EmailList from "./EmailList";
import { useState } from "react";


const Email = () => {
    const dispatch = useDispatch()
    const { page, totalPage } = useSelector(state => state.page);

    const [selected, setSelectd] = useState(true)

    // const { email, currentEmail, filter } = useSelector(state => state.email)

    // console.log(email, currentEmail, filter)
    // const email = useSelector(state=>state.email)


    const fetchEmails = async () => {
        const res = await fetch(`https://flipkart-email-mock.now.sh/?`);
        const data = await res.json();
        console.log(data, "api request")
        dispatch(setEmail(data));
    };

    const changeEmailsList = () => {
        console.log(page, "page selected");
    }

    // fetchEmails()

    // useEffect(() => {
    //     if (email.length === 0 || email === 'undefined') {
    //         console.log("this is called", page)
    //         fetchEmails()
    //     }
    // }, [])

    useEffect(() => {
        changeEmailsList()
    }, [page])


    const handlePage = () => {
        setSelectd(!selected)
        dispatch(changePage());
    };

    return (
        <Fragment>
            <div className="flex justify-between mx-20 my-3 mt-10">
                <Filters />
                <Pagination
                    currentPage={page}
                    totalPage={totalPage}
                    handlePage={handlePage}
                />
                {/* <EmailList email={email} /> */}
            </div>
            <div class="min-h-screen flex mx-20">
                <nav class={`${selected ? "w-full" : "w-[36%]"} flex-none bg-indigo-200 px-2`}>
                    Sidebar
                </nav>

                <main class="flex-1 min-w-0 overflow-auto bg-[#F4F6FA] px-2">

  
                </main>
            </div>
        </Fragment>
    )
}

export default Email;