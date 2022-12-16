import React from 'react';
import App from '@/Layouts/App';
import {Head, Link, usePage} from '@inertiajs/inertia-react';
import {Menu} from "@headlessui/react";

const ThreadSetting = ({ thread }) => {
    return (
        <Menu as="div" className='relative'>
            <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mr-4 bg-white hover:bg-gray-200 w-52 border shadow-sm rounded-lg overflow-hidden py-0.5 top-0">
                <Menu.Item>
                    <Link className="py-2.5 block px-4 text-black" href={`/threads/${thread.slug}/edit`}>
                        Edit
                    </Link>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}

export default function Dashboard(props) {

    const { auth} = props;
    console.log(props)
    // const {threads, meta} = props.threads;

    return (
        <div>
            <Head title="User Dashboard" />
            <div className="py-12 text-white">
                <h1 className="text-white mb-6">Your Statistic</h1>

                {auth.user ?
                    <div className="flex flex-row gap-x-4">
                        <img className="w-20 h-20 rounded-full" src={auth.user.picture} alt=""/>
                        <div className="mt-4 flex flex-col gap-y-2">
                            <p>{auth.user.name}</p>
                            <p>{auth.user.email}</p>
                        </div>
                    </div>
                    :
                    ''
                }
                {/*<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">*/}
                {/*    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">*/}
                {/*        <div className="p-6 bg-white border-b border-gray-200">You're logged in as User!</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

Dashboard.layout = page => <App children={page}/>
