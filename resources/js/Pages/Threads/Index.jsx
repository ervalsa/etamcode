import React from "react";
import App from "@/Layouts/App";
import {Link} from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";

export default function Index(props) {

    const {data: threads, meta} = props.threads

    return (
        <div className="space-y-4">
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
