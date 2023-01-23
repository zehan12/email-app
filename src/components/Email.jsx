import React, { Fragment, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { changePage } from '../redux/pageSlice';
import { setEmail, setFilters } from "../redux/emailSlice";
import Filters from "./Filters";
import { useEffect } from "react";
import EmailList from "./EmailList";
import { useState } from "react";
import EmailCard from "./EmailCard";


const Email = () => {
    const dispatch = useDispatch()
    const { page, totalPage } = useSelector(state => state.page);
    const [selected, setSelectd] = useState(null)
    const [data, setData] = useState(null)
    const { email, currentEmail, filter } = useSelector(state => state.email);

    console.log(email, currentEmail, filter)


    function getDDMMYYHHMMFormat(numericDate) {
        let date = new Date(numericDate)
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday + '\xa0\xa0\xa0\xa0' + time
    }

    const fetchEmails = async () => {
        const res = await fetch(`https://flipkart-email-mock.now.sh/?`);
        const data = await res.json();
        dispatch(setEmail(data));
    };

    const emailsPerPage = 10;
    const startIndex = (page - 1) * emailsPerPage;
    const endIndex = startIndex + emailsPerPage;

    useEffect(() => {
        if (email.length === 0 || email === 'undefined') {
            console.log("this is called", page)
            fetchEmails()
        }

        // dispatch(setEmail([]));


    }, [])

    const handlePage = () => {
        dispatch(changePage());
    };

    const handleFilters = (val) => {
        dispatch(setFilters(val))
    }

    const handleSelected = async (id) => {
        console.log(id)
        const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
        const data = await res.json();
        setSelectd(id)
        let regex = /<p>(.*?)<\/p>/g;
        let matches = data.body.match(regex);
        setData(matches)
    }

    useLayoutEffect(() => {
        console.log("effects render", data)
    }, [])

    return (
        <Fragment>
            <div className="flex justify-between mx-20 my-3 mt-10">
                <Filters
                    active={filter}
                    handleFilters={handleFilters}
                />
                <Pagination
                    currentPage={page}
                    totalPage={totalPage}
                    handlePage={handlePage}
                />
                {/* <EmailList email={email} /> */}
            </div>
            <div className="min-h-screen flex mx-20">
                <nav className={`${selected ? "w-[36%]" : "w-full"} flex-none px-2`}>
                    {
                        email.length !== 0 &&
                        email.list.slice(startIndex, endIndex).map((email, index) => {

                            return (
                                <div
                                    onClick={() => handleSelected(email.id)}
                                    key={email.id}
                                    className="card md:flex max-w- w-full my-4 p-2 rounded-xl bg-[#FFFFFF]"
                                    style={{ border: "1px solid black" }}>
                                    <div className="w-12 h-12 m-3 pt-[6px] bg-[#E54065] text-white font-semibold text-2xl text-center rounded-full">{email.from.name.toUpperCase().charAt(0)} </div>
                                    <div className="flex-grow text-center md:text-left mb-0 mt-1">
                                        <h4 className="heading my-0">From: <b>{` ${email.from.name} <${email.from.email}> `}{index}</b></h4>
                                        <p className="mb-3 mt-2">Subject <b>{email.subject}</b></p>
                                        <div>
                                            <p className="mb-3 mt-2">{selected ? email.short_description.substring(0, 50) + " ..." : email.short_description}</p>
                                            <time className="gap-3">{getDDMMYYHHMMFormat(email.date)}</time>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </nav>

                <main className="flex-1 min-w-0 overflow-auto bg-[#F4F6FA] px-2 ">
                    {
                        email.length !== 0 &&
                        email.list.filter((v, i) => v.id === selected).map((email) => (
                            <div
                                key={email.id}
                                className="card flex flex-col max-w- w-full my-4 p-2 rounded-xl bg-[#FFFFFF]"
                                style={{ border: "1px solid black" }}>
                                <div className="flex mx-6">
                                    <div className="w-12 h-12 m-3 pt-[6px] bg-[#E54065] text-white font-semibold text-2xl text-center rounded-full">{email.from.name.toUpperCase().charAt(0)} </div>
                                    <div className="flex-grow text-center md:text-left mb-0 ml-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="mb-3 mt-3 text-3xl"><b>{email.subject}</b></p>
                                                <time className="">{getDDMMYYHHMMFormat(email.date)}</time>
                                            </div>
                                            <div className="mt-5">
                                                <button className="bg-[#E54065] text-white text-xs font-semibold h-7 px-4 rounded-2xl">Mark as favorite</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 mx-10">

                                    {data &&
                                        data.map((para) => (
                                            <div
                                                key={para.charAt(4)}
                                                dangerouslySetInnerHTML={{ __html: para }}
                                                className="my-2"
                                            />
                                        ))
                                    }
                                </div>

                            </div>
                        ))
                    }
                </main>
            </div>
        </Fragment>
    )
}

export default Email;