import React from "react";
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Navbar() {

    const { auth }= usePage().props;

    return (
        <div>
            <nav className="bg-white border-b border-gray-100 h-12 flex items-center">
                <div className="container">
                    <div className="flex justify-between items-center gap-x-4">
                        <div>
                            <Link href={route('home')}>ETAMCODE</Link>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <Link className="hover:bg-" href={route('home')}>Home</Link>
                            <Link href={route('threads.index')}>Forum Q&A</Link>
                            <Link href={'#'}>Blog</Link>
                            <Link href={'#'}>FAQ</Link>
                        </div>
                        {auth.user ?
                            <div className="flex items-center gap-x-4">
                                <Link href={route('threads.create')}>New Thread</Link>
                                <Link href={route('dashboard')}>Dashboard</Link>
                                <Link method="post" href={route('logout')} as="button">
                                    Log Out
                                </Link>
                            </div>
                            :
                            <div className="flex items-center gap-x-4">
                                <Link href="/login">Masuk</Link>
                                <Link href="/register">Daftar</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
