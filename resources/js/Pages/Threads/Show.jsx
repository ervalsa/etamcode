import React, {useState} from "react";
import App from "@/Layouts/App";
import {Head, Link, useForm} from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Show({thread}) {
    const { data, setData, post, reset } = useForm({
        body: '',
    })

    const handleChange = (e) => setData(e.target.name, e.target.value)

    const replyStoreHandler = (e) => {
        e.preventDefault();
        post(route('replies.store', thread.data.slug), {
            onSuccess: () => reset()
        })
    }

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
            <Link className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600" href={route('threads.destroy', thread.data.slug)}
                  method="delete"
                  as="button">
                Delete
            </Link>

            <div>
                {thread.replies.length ? thread.replies.map(reply => (
                    <div key={reply.id}>
                        {reply.body}
                        <div>
                            <img className="w-8 h-8 rounded-full" src={reply.user.picture} alt={reply.user.name}/>
                            {reply.created_at}
                        </div>
                    </div>
                )): 'Tidak ada balasan'}
            </div>

            <form onSubmit={replyStoreHandler}>
                <div className="mb-5">
                    <textarea
                        name="body"
                        value={data.body}
                        onChange={handleChange}>
                    </textarea>
                </div>
                <PrimaryButton>Reply</PrimaryButton>
            </form>
        </div>
    );
}

Show.layout = page => <App children={page}/>
