import React from 'react';
import App from '@/Layouts/App';
import {Head, usePage} from '@inertiajs/inertia-react';

export default function Dashboard(props) {

    const { auth } = usePage().props;

    return (
        <div>
            <Head title="User Dashboard" />

            <div className="py-12">
                <p className="text-white">{auth.user.name}</p>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're logged in as User!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = page => <App children={page}/>
