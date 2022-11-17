import React, {useState} from "react";
import App from "@/Layouts/App";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import Reply from "@/Components/Reply";

export default function Show({ thread }) {

    const { auth } = usePage().props;

    return (
        <div className="">
            <Head title={thread.data.title} />
            <div className='rounded-lg bg-[#2D2F3A] px-6 py-6 mb-4'>
                <div className="mb-5 text-white">
                    <h1 className="text-lg font-bold mb-2">{thread.data.title}</h1>
                    <div className="leading-relaxed mb-4">
                        {thread.data.body}
                    </div>
                    <div className="mb-4">
                        {thread.data.created_at}
                    </div>
                </div>

                {auth.user ?
                    <div className="flex flex-row gap-x-4 text-white">
                        {auth.user ? auth.user.id === thread.data.user.id &&
                            <Link
                                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                href={route('threads.destroy', thread.data.slug)}
                                method="delete"
                                as="button">
                                Delete
                            </Link>
                            : '' }
                        <Link
                            href={route('likes.store')}
                            method="POST"
                            data={{ thread: thread.data.id }}
                            as="button"
                            className="px-4 py-2 bg-blue-800 text-white rounded font-semibold text-xs text-white hover:bg-blue-600"
                            preserveScroll>
                            Like
                        </Link>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6 inline">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                            </svg>
                            {thread.data.likes_count }
                        </span>
                    </div>
                : ''}
            </div>

            <Reply {... { auth, thread }}/>
        </div>
    );
}

Show.layout = page => <App children={page}/>
