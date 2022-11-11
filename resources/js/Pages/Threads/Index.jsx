import React, {useState, useEffect, useCallback} from "react";
import App from "@/Layouts/App";
import {Link} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";
import {debounce, pickBy} from "lodash";
import {Inertia} from "@inertiajs/inertia";
import Filter from "@/Components/Filter";

export default function Index(props) {

    const { filter, categories } = props;
    const {data: threads, meta} = props.threads;
    const [keyword, setKeyword] = useState(filter.search)

    const reload = useCallback(
        debounce((q) => {
            Inertia.get('/threads', pickBy({ search: q, page: filter.page, category: filter.category }), { preserveState: true})
        }, 500)
    , []);

    useEffect(() => reload(keyword), [keyword])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between w-full">
                <div>
                    <Filter categories={categories} initialState={filter.category}/>
                </div>
                <div className="bg-white flex items-center overflow-hidden shadow rounded-lg px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="h-10 p-0 focus:outline-none focus:ring-transparent focus:border-transparent border-0"
                        placeholder="Search ..."
                        type="text"
                        name="search"
                        id="search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}/>
                </div>
            </div>
            {threads.length ? threads.map(thread => (
                <div className="block bg-white shadow-sm border p-5 rounded-lg hover:bg-blue-500 hover:text-white transition duration-150" key={thread.id}>
                    <Link href={route('threads.show', thread.slug)}>
                        <div className="flex flex-col gap-y-4">
                            <div>
                                <Link href={`/threads?category=${thread.category.slug}`} className="bg-indigo-900 px-2 py-1 rounded-[20px] text-white font-medium text-sm">
                                    {thread.category.name}
                                </Link>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full" src={thread.user.picture} alt={thread.user.name}/>
                                </div>
                                <div className="flex flex-col gap-y-4 w-full">
                                    <div>
                                        <h1 className="text-lg">{thread.title}</h1>
                                        <div className="leading-relaxed text-md text-gray-500">
                                            {thread.body}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex gap-x-4">
                                            <h4 className="text-sm">{thread.user.name}</h4>
                                            <span className="text-sm">{thread.created_at}</span>
                                        </div>
                                        <div className="flex gap-x-4 text-sm">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                     className="w-6 h-6 inline">
                                                    <path
                                                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                                </svg>
                                                <span className="ml-1">{thread.likes_count}</span>
                                            </span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline">
                                                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-1">{thread.replies_count}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )) : 'No threads.'}

            <Pagination meta={meta}/>
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads"/>
