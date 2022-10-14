import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";

export default function App({ auth, header, children }) {

    return (
        <div className="min-h-screen bg-[#1C1E24]">
            <Navbar/>

            <div className="container">
                <main className='pt-[50px]'>{children}</main>
            </div>
        </div>
    );
}
