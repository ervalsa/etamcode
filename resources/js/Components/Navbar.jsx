import React, {Fragment} from "react";
import { Link, usePage} from "@inertiajs/inertia-react";
import { Menu, Transition } from '@headlessui/react';

const NavLink = ({ as, method, href, children}) => {
    return (
        <Link as={as} method={method} href={href}>
            {children}
        </Link>
    )
}

const DropdownLink = ({as = "a", method = "get", className = '', href, children }) => {
    return (
        <Menu.Item>
            <Link preserveState className={`${className} w-full text-left py-2 px-4 hover:bg-gray-100 text-sm block`} as={as} method={method} href={href}>{children}</Link>
        </Menu.Item>
    )
}

export default function Navbar() {

    const { auth } = usePage().props;

    return (
        <div>
            <nav className="bg-[#2D2F3A] py-4 text-white">
                <div className="container">
                    {/* Mobile */}
                    <Menu as="div" className="flex lg:hidden items-center justify-between h-14 py-2">
                        <Link className="text-white uppercase font-semibold" href="/">ETAMCODE</Link>
                        <Menu.Button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items as="div" className="divide-y bg-white py-0.5 w-52 right-12 top-4 rounded-lg z-50 absolute shadow-sm border">
                                <div className="py-0.5 text-black">
                                    <DropdownLink href="/">Home</DropdownLink>
                                    <DropdownLink href="/threads">Threads</DropdownLink>
                                </div>
                                {auth.user ?
                                    <>
                                        {/*<div className="py-0 5 text-black">*/}
                                        {/*    <DropdownLink href="/dashboard">Dashboard</DropdownLink>*/}
                                        {/*</div>*/}
                                        <div className="py-0.5 text-black">
                                            <DropdownLink href="/threads?filtered=my-questions">
                                                My Questions
                                            </DropdownLink>
                                            <DropdownLink href="/threads?filtered=my-participation">
                                                My Participation
                                            </DropdownLink>
                                            <DropdownLink href="/threads?filtered=my-answer">
                                                My Answer
                                            </DropdownLink>
                                        </div>
                                        <DropdownLink className="text-black" href="/logout" method="POST" as="button">Logout</DropdownLink>
                                    </>
                                    :
                                    <div className="py-0.5 text-black">
                                        <DropdownLink href="/login" className="text-black">Login</DropdownLink>
                                        <DropdownLink href="/register">Register</DropdownLink>
                                    </div>
                                }
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Desktop */}
                    <div className="hidden lg:flex items-center justify-between">
                        <ul className="flex items-center gap-x-8">
                            <li><NavLink className="font-semibold uppercase text-black" href="/">ETAMCODE</NavLink></li>
                            <li><NavLink href="/">Home</NavLink></li>
                            <li><NavLink href="/threads">Threads</NavLink></li>
                            {/*{auth.user ? <li><NavLink href="/dashboard">Dashboard</NavLink></li> : ''}*/}
                        </ul>
                        {auth.user ?
                            <ul className="flex items-center gap-x-8">
                                <li><NavLink href="/dashboard">{auth.user.name}</NavLink></li>
                                <li><NavLink href="/logout" method="POST" as="button">Logout</NavLink></li>
                            </ul>
                            :
                            <ul className="flex items-center gap-x-8">
                                <li><NavLink href="/login">Login</NavLink></li>
                                <li><NavLink href="/register">Register</NavLink></li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </div>
        // <div>
        //     <nav className="bg-[#2D2F3A] py-3 flex items-center text-white">
        //         <div className="container">
        //             <div className="flex justify-between items-center gap-x-4">
        //                 <div>
        //                     <Link href={route('home')}>ETAMCODE</Link>
        //                 </div>
        //                 <div className="flex items-center gap-x-5">
        //                     <Link className="hover:text-blue-500" href={route('home')}>Home</Link>
        //                     <Link className="hover:text-blue-500" href={route('threads.index')}>Forum Q&A</Link>
        //                     <Link className="hover:text-blue-500" href={'#'}>Blog</Link>
        //                     <Link className="hover:text-blue-500" href={'#'}>FAQ</Link>
        //                 </div>
        //                 {auth.user ?
        //                     <div className="flex items-center gap-x-4">
        //                         <Link href={route('dashboard')}>Dashboard</Link>
        //                         <Link method="post" href={route('logout')} as="button">
        //                             Log Out
        //                         </Link>
        //                     </div>
        //                     :
        //                     <div className="flex items-center gap-x-2">
        //                         <Link className="hover:bg-gradient-to-l from-blue-600 to-indigo-500 px-4 py-1 rounded-[20px]" href="/login">Masuk</Link>
        //                         <Link className="text-white bg-gradient-to-l from-blue-600 to-indigo-500 px-4 py-1 rounded-[20px]" href="/register">Daftar</Link>
        //                     </div>
        //                 }
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
}
