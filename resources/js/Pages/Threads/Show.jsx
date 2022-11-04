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

            {auth.user ?
               <div className="flex flex-row gap-x-4 text-white">
                   {auth.user ? auth.user.id === thread.data.user.id &&
                       <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                             href={route('threads.destroy', thread.data.slug)}
                             method="delete"
                             as="button">
                           Delete
                       </Link>
                   : '' }
                   <Link href={route('likes.store')}
                         method="POST"
                         data={{ thread: thread.data.id }}
                         as="Button"
                         className="mb-4 px-4 py-2 bg-blue-800 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-600"
                         preserveScroll>
                       Like
                   </Link>
                   <span> {thread.data.likes_count } Disukai</span>
               </div>
            : ''}

            <Reply {... { auth, thread }}/>
        </div>
    );
}

Show.layout = page => <App children={page}/>
