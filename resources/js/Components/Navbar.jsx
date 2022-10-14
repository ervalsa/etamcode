import React from "react";
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Navbar() {

    const { auth }= usePage().props;

    return (
        <div>
            <nav className="bg-[#2D2F3A] py-3 flex items-center text-white">
                <div className="container">
                    <div className="flex justify-between items-center gap-x-4">
                        <div>
                            <Link href={route('home')}>ETAMCODE</Link>
                        </div>
                        <div className="flex items-center gap-x-5">
                            <Link className="hover:text-blue-500" href={route('home')}>Home</Link>
                            <Link className="hover:text-blue-500" href={route('threads.index')}>Forum Q&A</Link>
                            <Link className="hover:text-blue-500" href={'#'}>Blog</Link>
                            <Link className="hover:text-blue-500" href={'#'}>FAQ</Link>
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
                            <div className="flex items-center gap-x-2">
                                <Link className="hover:bg-gradient-to-l from-blue-600 to-indigo-500 px-4 py-1 rounded-[20px]" href="/login">Masuk</Link>
                                <Link className="text-white bg-gradient-to-l from-blue-600 to-indigo-500 px-4 py-1 rounded-[20px]" href="/register">Daftar</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
