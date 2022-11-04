import React, {useState} from "react";
import App from "@/Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Reply from "@/Components/Reply";

export default function Show({ thread }) {

    const { auth } = usePage().props;

    return (
        <div>
            <Head title={thread.data.title} />
            <div className="mb-5 text-white">
                <h1>{thread.title}</h1>
                <div className="mb-4">
                    {thread.data.created_at}
                </div>
                <div className="leading-relaxed">
                    {thread.data.body}
                </div>
            </div>

            {auth.user ? auth.user.id === thread.data.user.id &&
                <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)}
                      method="delete"
                      as="button">
                    Delete
                </Link>
            : '' }

            <Reply {... { auth, thread }}/>
        </div>
    );
}

Show.layout = page => <App children={page}/>
