import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";

export default function App({ auth, header, children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>

            <div className="container">
                <main className='pt-8'>{children}</main>
            </div>
        </div>
    );
}
