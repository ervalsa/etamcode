import React from "react";
import App from "@/Layouts/App";
import {Head, Link} from "@inertiajs/inertia-react";

export default function Show({thread}) {
    return (
        <div>
            <Head title={thread.title} />

            <h1>{thread.title}</h1>
            <div>
                {thread.created_at}
            </div>
            <div className="leading-relaxed">
                {thread.body}
            </div>
            <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.id)}
                  method="delete"
                  as="button">
                Delete
            </Link>
        </div>
    );
}

Show.layout = page => <App children={page}/>
