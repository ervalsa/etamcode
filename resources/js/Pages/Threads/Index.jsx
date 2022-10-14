import React from "react";
import App from "@/Layouts/App";
import {Link} from "@inertiajs/inertia-react";

export default function Index(props) {

    const {data: threads} = props.threads
    console.log(props)

    return (
        <div className="space-y-4">
            {threads.length ? threads.map(thread => (
                <div className="block bg-white shadow-sm border p-5 rounded-lg hover:bg-blue-500 hover:text-white transition duration-150" key={thread.id}>
                    <Link href="#" className="bg-indigo-900 px-2 py-1 rounded-[20px] text-white font-medium text-sm">
                        {thread.category.name}
                    </Link>
                    <Link href={route('threads.show', thread.id)}>
                        <h1 className="py-2 text-lg">{thread.title}</h1>
                    </Link>

                    <div className="flex items-center">
                        <img className="w-8 h-8 rounded-full mr-3" src={thread.user.picture} alt={thread.user.name}/>
                        <div className="flex flex-col">
                            <h4>{thread.user.name}</h4>
                            <span className="text-xs">{thread.created_at}</span>
                        </div>
                    </div>
                </div>
            )) : 'No threads.'}
        </div>
    );
}

Index.layout = page => <App children={page} title="Threads"/>
