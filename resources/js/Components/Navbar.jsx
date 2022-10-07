import React from "react";
import {Link} from "@inertiajs/inertia-react";

export default function Navbar() {
    return (
        <div>
            <nav className="bg-white border-b border-gray-100">
                <Link method="post" href={route('logout')} as="button">
                    Log Out
                </Link>
            </nav>
        </div>
    );
}
