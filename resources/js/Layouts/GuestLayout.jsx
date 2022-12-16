import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="bg-[#2D2F3A] px-4 lg:px-0 min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="text-white flex flex-col gap-y-4 justify-center items-center">
                <h1 className="font-bold text-xl">ETAMCODE</h1>
            </div>

            <div className="w-full bg-[#1C1E24] sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    );
}
