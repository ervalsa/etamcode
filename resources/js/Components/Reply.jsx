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
                                className="w-full"
                                name="body"
                                value={data.body}
                                onChange={handleChange}>
                            </textarea>
                    </div>
                    <PrimaryButton className="mb-4 hover:bg-blue-800">Reply</PrimaryButton>
                </form>
            : ''}
            <div>
                { thread.replies.length ? thread.replies.map(reply => (
                    <div key={reply.id}>
                        <div className="rounded bg-[#2D2F3A] px-4 py-4 mb-4">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-2 mb-4">
                                    <div className="flex flex-row items-center gap-x-4">
                                        <img className="w-8 h-8 rounded-full" src={reply.user.picture} alt={reply.user.name}/>
                                        <div className="flex flex-row gap-x-2">
                                            <h2 className="text-white font-bold">{reply.user.name}</h2>
                                            <h4 className="text-gray-400">{reply.created_at}</h4>
                                        </div>
                                    </div>
                                    <p className="text-white">{reply.body}</p>
                                    <div className="text-white">
                                        <div className="flex flex-row gap-x-2">
                                            {auth.user &&
                                                <button className="px-4 py-2 bg-gray-900 rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-800"
                                                        onClick={ () => showReplyForm(reply)}>
                                                    Reply
                                                </button>
                                            }

                                            {auth.user &&
                                                <Link href={route('likes.store')}
                                                      method="POST"
                                                      data={{ reply: reply.id }}
                                                      as="Button"
                                                      className="px-4 py-2 bg-blue-800 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-600"
                                                      preserveScroll>
                                                    Like
                                                </Link>
                                            }

                                            <span> {reply.likes_count } Disukai</span>
                                        </div>
                                </div>
                                    { data.parent_id ? data.parent_id === reply.id &&
                                        <form onSubmit={replyStoreHandler}>
                                            <div className="mt-4 mb-2">
                                                    <textarea
                                                        className="w-full"
                                                        name="body"
                                                        value={data.body}
                                                        onChange={handleChange}>
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
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-y-2">
                                                    <p>{child.body} </p>

                                                    <div>
                                                        {auth.user &&
                                                            <Link href={route('likes.store')}
                                                                  method="POST"
                                                                  data={{reply: child.id}}
                                                                  as="Button"
                                                                  className="px-4 py-2 bg-blue-800 text-white rounded-md font-semibold text-xs text-white uppercase hover:bg-blue-600"
                                                                  preserveScroll>
                                                                Like
                                                            </Link>
                                                        }
                                                        <span> {child.likes_count } Disukai </span>
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


