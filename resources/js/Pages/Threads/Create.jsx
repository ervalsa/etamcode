import React from "react";
import Forum from "@/Layouts/Forum";
import {Head, useForm} from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import FormThread from "@/Components/FormThread";

export default function Create(props) {

    const {categories} = props;

    const { data, setData, post, reset } = useForm({
        title: '', body: '', category_id: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route('threads.store'))
    };

    return (
        <div>
            <h1 className="text-white font-bold text-lg">Buat Thread Baru</h1>
            <p className="text-white text-md mb-5">Membuat thread, agar kamu bisa mendapatkan jawaban</p>
            <FormThread {... { data, submitHandler, handleChange, categories, submit: 'Create Thread'}}/>
        </div>
    );
}

Create.layout = page => <Forum children={page}/>
