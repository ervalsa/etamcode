import React from "react";
import App from "@/Layouts/App";
import {Head, Link} from "@inertiajs/inertia-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Home({ threads }) {

    return (
        <div className='py-20'>
            <Head title="Home" />

            <div className="flex flex-col gap-3 mb-[100px] text-white">
                <h1 className="font-bold leading-tight text-4xl mt-0 mb-2">
                    Tingkatkan Kemampuan Anda<br/>
                    Dengan Menjadi Bagian dari<br/>
                    Komunitas
                </h1>
                <p className="mb-4">Tingkatkan kemampuan Anda dengan berkontribusi forum tanya jawab,<br/>menulis blog dan lainnya dengan EtamCode</p>
                <div className="flex flex-row gap-4">
                    <Link href={route('threads.index')}>
                        <PrimaryButton className="bg-gradient-to-l from-blue-600 to-indigo-500 rounded-[20px]">Jelajahi Forum</PrimaryButton>
                    </Link>
                    {/*<PrimaryButton className="rounded-[20px] bg-indigo-500">Baca Blog</PrimaryButton>*/}
                </div>
            </div>

            {/*<div>*/}
            {/*    <div className="text-white">*/}
            {/*        <h1 className="font-bold text-center text-4xl mt-0 mb-2">Pilih Topik dan Dapatkan Bantuan<br/>dari Programmer</h1>*/}
            {/*        <p className="text-center mb-5">Banyaknya bahasa pemrograman, framework, dan tools yang bisa ditanyakan dan<br/>sudah dikelompokkan kedalam topik-topik tertentu</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="mt-[50px]">
                <div className="text-white">
                    <h1 className="font-bold text-center text-4xl mt-0 mb-2">Pertanyaan Terbaru</h1>
                    <p className="text-center mb-5">Ini adalah daftar pertanyaan yang baru saja ditanyakan di EtamCode</p>
                    <div className="grid grid-cols-3 gap-10">
                        {threads.length ? threads.map((thread, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-200 p-6">
                                <Link className="py-1 px-3 text-xs font-semibold bg-gray-800 text-gray-50 rounded-full" href={`/threads?category=${thread.category.slug}`}>
                                    {thread.category.name}
                                </Link>
                                <h4 className="font-bold text-xl text-black mt-2 mb-3">
                                    <Link href={`/threads/${thread.slug}`}>{thread.title}</Link>
                                </h4>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0">
                                            <img className="w-5 h-5 rounded-full" src={thread.user.picture} alt={thread.user.name} />
                                        </div>
                                        <div className="text-black">
                                            {thread.user.name}
                                        </div>
                                    </div>
                                    <div className="text-gray-500">
                                        {thread.created_at}
                                    </div>
                                </div>
                            </div>
                        )) :
                            <div className='bg-white col-span-3 border border-dashed p-10 text-center text-gray-800 rounded-2xl'>
                                No threads.
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/*<div className="mt-[50px]">*/}
            {/*    <div className="text-white">*/}
            {/*        <h1 className="font-bold text-center text-4xl mt-0 mb-2">Blog Terakhir</h1>*/}
            {/*        <p className="text-center">Jika mempunyai waktu maka luangkan dan manfaatkan dengan membaca<br/>blog-blog yang ditulis oleh pengguna EtamCode yang mungkin bermanfaat<br/>bagi Anda</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

Home.layout = page => <App children={page}/>
