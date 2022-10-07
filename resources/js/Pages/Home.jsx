import React from "react";
import App from "@/Layouts/App";
import {Head} from "@inertiajs/inertia-react";

export default function Home() {
    return (
        <div>
            <Head title="Home" />

            <div>
                Home
            </div>
        </div>
    );
}

Home.layout = page => <App children={page}/>
