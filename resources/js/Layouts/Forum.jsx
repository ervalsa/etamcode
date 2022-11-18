import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Forum({ auth, header, children }) {

    return (
        <div className="min-h-screen bg-[#1C1E24]">
            <Navbar/>

            <div className="container">
                <div className="flex flex-col lg:flex-row pt-8 gap-x-10">
                    <div className="w-full lg:w-1/5">
                        <Sidebar/>
                    </div>
                    <div className="w-full lg:w-4/5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
