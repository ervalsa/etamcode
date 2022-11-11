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
            <div className="flex flex-col justify-between">
                <input
                    placeholder="Search ..."
                    type="text"
                    name="search"
                    id="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}/>
                <Filter categories={categories} initialState={filter.category}/>
            </div>
            {threads.length ? threads.map(thread => (
                <div className="block bg-white shadow-sm border p-5 rounded-lg hover:bg-blue-500 hover:text-white transition duration-150" key={thread.id}>
                    <Link href={`/threads?category=${thread.category.slug}`} className="bg-indigo-900 px-2 py-1 rounded-[20px] text-white font-medium text-sm">
                        {thread.category.name}
                    </Link>
                    <Link href={route('threads.show', thread.slug)}>
                        <h1 className="py-2 text-lg">{thread.title}</h1>
                    </Link>

                    <div className="flex justify-between">
                        <h4>{thread.user.name}</h4>
                        <span className="text-xs">{thread.created_at}</span>
                    </div>
                </div>
            )) : 'No threads.'}

            <Pagination meta={meta}/>
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads"/>
