import React from "react";
import App from "@/Layouts/App";
import {Link} from "@inertiajs/inertia-react";

export default function Index(props) {

    const {data: threads} = props.threads
    console.log(props)

    return (
        <div className="space-y-4">
            {threads.length ? threads.map(thread => (
                <Link className="block bg-white shadow-sm border p-5 rounded-lg hover:bg-blue-500 hover:text-white transition duration-150"
                      href={route('threads.show', thread.id)} key={thread.id}>
                    <h1>{thread.title}</h1>
                    <div>{thread.created_at}</div>
                </Link>
            )) : 'No threads.'}
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads"/>
