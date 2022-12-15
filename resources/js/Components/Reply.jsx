import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import {Link, useForm} from "@inertiajs/inertia-react";

export default function Reply({ thread, auth }) {

    const { data, setData, post, reset } = useForm({
        body: '',
        parent_id: ''
    })

    const handleChange = (e) => setData(e.target.name, e.target.value)

    const showReplyForm = (parent) => {
        setData({ ...data, parent_id: parent.id });
    }

    const replyStoreHandler = (e) => {
        e.preventDefault();
        post(route('replies.store', thread.data.slug), {
            onSuccess: () => reset(),
            preserveScroll: true
        })
    }

    return (
        <div className="flex flex-col">
            { auth.user ? !data.parent_id &&
                <form onSubmit={replyStoreHandler}>
                    <div className="mb-4">
                            <textarea
                                className="w-full rounded-lg resize-none"
                                name="body"
                                value={data.body}
                                onChange={handleChange}
                                placeholder={'Tulis komentarmu disini ...'}>
                            </textarea>
                    </div>
                    <PrimaryButton className="mb-4 hover:bg-blue-800">Reply</PrimaryButton>
                </form>
            : ''}
            <div>
                { thread.replies.length ? thread.replies.map(reply => (
                    <div key={reply.id}>
                        <div className="rounded-lg bg-[#2D2F3A] px-4 py-4 mb-4">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-2 mb-4">
                                    <div className="flex flex-row items-center gap-x-4">
                                        <img className="w-8 h-8 rounded-full" src={reply.user.picture} alt={reply.user.name}/>
                                        <div className="flex flex-row gap-x-2">
                                            <h2 className="text-white font-bold">{reply.user.name}</h2>
                                            <h4 className="text-gray-400">{reply.created_at}</h4>
                                            {thread.data.answer_id === reply.id &&
                                                <div className="bg-green-500 text-white px-2 py-1 rounded">
                                                    Best
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <p className="text-white">{reply.body}</p>
                                    <div className="text-white">
                                        <div className="flex flex-row gap-x-2">
                                            {auth.user && reply.parent_id === null ?
                                                <button className="px-4 py-2 bg-gray-900 rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-800"
                                                        onClick={ () => showReplyForm(reply)}>
                                                    Reply
                                                </button>
                                            : '' }

                                            {auth.user &&
                                                <>
                                                    <Link href={route('likes.store')}
                                                          method="POST"
                                                          data={{ reply: reply.id }}
                                                          as="Button"
                                                          className="px-4 py-2 bg-blue-800 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-600"
                                                          preserveScroll>
                                                        Like
                                                    </Link>
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                             className="w-6 h-6 inline">
                                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                                        </svg>
                                                        {reply.likes_count }
                                                    </span>
                                                    {auth.user.id === thread.data.user.id &&
                                                        <Link
                                                            href={ route('answer.store', thread.data.slug) }
                                                            data={{ answer_id: reply.id }}
                                                            method="POST"
                                                            as="button">
                                                            Mark as best
                                                        </Link>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                    { data.parent_id ? data.parent_id === reply.id &&
                                        <form onSubmit={replyStoreHandler}>
                                            <div className="mt-4 mb-2">
                                                    <textarea
                                                        className="w-full rounded-lg resize-none"
                                                        name="body"
                                                        value={data.body}
                                                        onChange={handleChange}
                                                        placeholder={'Tulis komentarmu disini ...'}>
                                                    </textarea>
                                            </div>
                                            <div className="flex flex-row gap-x-2">
                                                <PrimaryButton className="hover:bg-blue-800">Reply</PrimaryButton>
                                                <button className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-red-800"
                                                        onClick={() => setData({...data, parent_id: null})}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                        : ''}
                                </div>
                                <div className="ml-4">
                                    {reply.children.length ? reply.children.map(child => (
                                        <div className="text-white mb-8" key={child.id}>
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex flex-row items-center gap-x-4">
                                                    <img className="w-8 h-8 rounded-full" src={child.user.picture} alt={child.user.name}/>
                                                    <div className="flex flex-row gap-x-2">
                                                        <h2 className="text-white font-bold">{child.user.name}</h2>
                                                        <h4 className="text-gray-400">{child.created_at}</h4>
                                                        {thread.data.answer_id === child.id &&
                                                            <div className="bg-green-500 text-white px-2 py-1 rounded">
                                                                Best
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-y-2">
                                                    <p>{child.body} </p>

                                                    <div>
                                                        {auth.user &&
                                                            <>
                                                                <Link href={route('likes.store')}
                                                                      method="POST"
                                                                      data={{reply: child.id}}
                                                                      as="Button"
                                                                      className="px-4 py-2 bg-blue-800 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-600"
                                                                      preserveScroll>
                                                                    Like
                                                                </Link>

                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                                         className="w-6 h-6 inline">
                                                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                                                    </svg>
                                                                    {child.likes_count }
                                                                </span>
                                                                {auth.user.id === thread.data.user.id &&
                                                                    <Link
                                                                        href={ route('answer.store', thread.data.slug)}
                                                                        method="POST"
                                                                        data={{ answer_id: child.id }}
                                                                        as="button">
                                                                        Mark as best
                                                                    </Link>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                )): <div className="text-white">Belum ada balasan</div>}
            </div>
        </div>
    )
}


