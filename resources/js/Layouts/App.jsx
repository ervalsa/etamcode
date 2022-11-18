import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";

export default function App({ auth, header, children }) {

    return (
        <div className="min-h-screen bg-[#1C1E24]">
            <Navbar/>
            <div className="container">
                {children}
            </div>

            <footer className="py-4 mt-16 bg-[#2D2F3A]">
                <div className="container">
                    <div className="text-center text-white">
                        &copy; 2022 EtamCode. All right reserved
                    </div>
                </div>
            </footer>
        </div>
    );
}
