import React from "react";
import App from "@/Layouts/App";
import Create from "@/Pages/Threads/Create";
import {Head} from "@inertiajs/inertia-react";

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
        </div>
    );
}

Show.layout = page => <App children={page}/>
