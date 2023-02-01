import React,
{
    Fragment,
    useEffect,
    useState
} from "react"
import {
    useDispatch,
    useSelector
}
    from "react-redux";
import Pagination from "./Pagination";
import {
    changePage
} from '../redux/pageSlice';
import {
    setEmail,
    setFilters,
    setFavorite,
    setUnFavorite,
    setRead
} from "../redux/emailSlice";
import Filters from "./Filters";


const Email = () => {
    const dispatch = useDispatch()
    const { page, totalPage } = useSelector(state => state.page);
    const [selected, setSelected] = useState(null)
    const [data, setData] = useState(null)
    const { email, currentEmail, filter } = useSelector(state => state.email);

    function getDDMMYYHHMMFormat(numericDate) {
        let date = new Date(numericDate)
        let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return (formattedToday + '\xa0\xa0\xa0\xa0' + time)
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
        setSelected(null)
        dispatch(changePage());
    };

    const handleFilters = (val) => {
        setSelected(null)
        dispatch(setFilters(val))
    }

    const handleSelected = async (id) => {
        const res = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
        const data = await res.json();

        dispatch(setRead({ email: email, id: id }))
        setSelected(id)
        let regex = /<p>(.*?)<\/p>/g;
        let matches = data.body.match(regex);
        setData(matches)
    }

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
            </div>
            <div className="min-h-screen flex mx-20">
                <nav className={`${selected ? "w-[36%]" : "w-full"} flex-none px-2`}>
                    {
                        email.length !== 0 &&
                        email.list.filter((val) => {
                            if (filter.toLowerCase() === "all") {
                                return true
                            }
                            if (filter.toLowerCase() === "read") {
                                if (val.read) {
                                    return true
                                }
                            }

                            if (filter.toLowerCase() === "unread") {
                                if (!val.read) {
                                    return true
                                }
                            }
                            if (filter.toLowerCase() === "favorites") {
                                if (val.favorite) {
                                    return true
                                }
                            }
                        })
                            .slice(startIndex, endIndex).map((email) => {
                                return (
                                    <div
                                        onClick={() => handleSelected(email.id)}
                                        key={email.id}
                                        className="card md:flex max-w- w-full my-4 p-2 rounded-xl "
                                        style={{ border: "1px solid black", backgroundColor: email.read ? "#F2F2F2" : "" }}>
                                        <div className="w-12 h-12 m-3 pt-[6px] bg-[#E54065] text-white font-semibold text-2xl text-center rounded-full">{email.from.name.toUpperCase().charAt(0)} </div>
                                        <div className="flex-grow text-center md:text-left mb-0 mt-1">
                                            <h4 className="heading my-0">From: <b>{` ${email.from.name} <${email.from.email}> `}</b></h4>
                                            <p className="mb-3 mt-2">Subject <b>{email.subject}</b></p>
                                            <div>
                                                <p className="mb-3 mt-2">{selected ? email.short_description.substring(0, 50) + " ..." : email.short_description}</p>
                                                <time className="gap-3">{getDDMMYYHHMMFormat(email.date)}</time>
                                            </div>
                                            {
                                                email.favorite ? <div className="text-[#E54065] font-semibold">Favorite</div> : ""
                                            }
                                        </div>
                                    </div>
                                )

                            })
                    }
                </nav>

                <main className="flex-1 min-w-0 overflow-auto bg-[#F4F6FA] px-2 ">
                    {
                        email.length !== 0 &&
                        email.list.filter((v, i) => v.id === selected).map((item) => (
                            <div
                                key={item.id}
                                className="card flex flex-col max-w- w-full my-4 p-2 rounded-xl bg-[#FFFFFF]"
                                style={{ border: "1px solid black" }}>
                                <div className="flex mx-6">
                                    <div className="w-12 h-12 m-3 pt-[6px] bg-[#E54065] text-white font-semibold text-2xl text-center rounded-full">{item.from.name.toUpperCase().charAt(0)} </div>
                                    <div className="flex-grow text-center md:text-left mb-0 ml-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="mb-3 mt-3 text-3xl"><b>{item.subject}</b></p>
                                                <time className="">{getDDMMYYHHMMFormat(item.date)}</time>
                                            </div>
                                            <div className="mt-5">
                                                {
                                                    item.favorite === false ?
                                                        <button onClick={() => dispatch(setFavorite({ email: email, id: item.id }))} className="bg-[#E54065] text-white text-xs font-semibold h-7 px-4 rounded-2xl">Mark as favorite</button> :
                                                        <button onClick={() => dispatch(setUnFavorite({ email: email, id: item.id }))} className="bg-[#E54065] text-white text-xs font-semibold h-7 px-4 rounded-2xl">Remove from favorite</button>
                                                }

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