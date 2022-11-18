import React, {useState} from "react";
import Forum from "@/Layouts/Forum";
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
                    <div className="flex text-white items-center justify-between">
                        <div className="flex gap-x-4 items-center">
                            <Link
                                href={route('likes.store')}
                                method="POST"
                                data={{ thread: thread.data.id }}
                                as="button"
                                className="px-4 py-2 bg-blue-800 text-white rounded font-semibold text-md text-white hover:bg-blue-600"
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

                        {auth.user ? auth.user.id === thread.data.user.id &&
                            <div className="flex gap-x-4">
                                <Link
                                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
                                    href={`/threads/${thread.data.slug}/edit`}
                                    as="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                    </svg>
                                </Link>
                                <Link
                                    className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
                                    href={route('threads.destroy', thread.data.slug)}
                                    method="delete"
                                    as="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        : '' }
                    </div>
                : ''}
            </div>

            <Reply {... { auth, thread }}/>
        </div>
    );
}

Show.layout = page => <Forum children={page}/>
