import React from "react";
import App from "@/Layouts/App";
import {Head} from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Home() {
    return (
        <div>
            <Head title="Home" />

            <div className="flex flex-col gap-3 mb-[100px] text-white">
                <h1 className="font-bold leading-tight text-4xl mt-0 mb-2">
                    Tingkatkan Kemampuan Anda<br/>
                    Dengan Menjadi Bagian dari<br/>
                    Komunitas
                </h1>
                <p className="mb-4">Tingkatkan kemampuan Anda dengan berkontribusi forum tanya jawab,<br/>menulis blog dan lainnya dengan EtamCode</p>
                <div className="flex flex-row gap-4">
                    <PrimaryButton className="bg-gradient-to-l from-blue-600 to-indigo-500 rounded-[20px]">Jelajahi Forum</PrimaryButton>
                    <PrimaryButton className="rounded-[20px] bg-indigo-500">Baca Blog</PrimaryButton>
                </div>
            </div>

            <div>
                <div className="text-white">
                    <h1 className="font-bold text-center text-4xl mt-0 mb-2">Pilih Topik dan Dapatkan Bantuan<br/>dari Programmer</h1>
                    <p className="text-center">Banyaknya bahasa pemrograman, framework, dan tools yang bisa ditanyakan dan<br/>sudah dikelompokkan kedalam topik-topik tertentu</p>
                </div>
            </div>
        </div>
    );
}

Home.layout = page => <App children={page}/>
