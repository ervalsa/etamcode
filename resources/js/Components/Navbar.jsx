import React from "react";
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Navbar() {

    const { auth }= usePage().props;

    return (
        <div>
            <nav className="bg-white border-b border-gray-100 h-12 flex items-center">
                <div className="container">
                    <div className="flex items-center gap-x-4">
                        <Link href={route('threads.index')}>Threads</Link>
                        {auth.user ?
                            <div className="flex items-center gap-x-4">
                                <Link href={route('threads.create')}>New Thread</Link>
                                <Link method="post" href={route('logout')} as="button">
                                    Log Out
                                </Link>
                            </div>
                            :
                            <div className="flex items-center gap-x-4">
                                <Link href="/login">Login</Link>
                                <Link href="/register">Register</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
