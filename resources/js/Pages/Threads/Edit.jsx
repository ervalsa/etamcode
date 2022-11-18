import React from "react";
import Forum from "@/Layouts/Forum";
import {Head, useForm} from "@inertiajs/inertia-react";
import FormThread from "@/Components/FormThread";

export default function Edit({ thread, categories}) {

    const { data, setData, put } = useForm({
        title: thread.title || '',
        body : thread.body,
        category_id: thread.category_id,
    });

    const submitHandler = (e) => {
        e.preventDefault()
        put(route('threads.update', thread.slug))
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    return(
        <div>
            <Head title="Edit Thread" />
            <h1 className="text-white font-bold text-lg">Edit Thread</h1>
            <p className="text-white text-md mb-5">Edit thread, jika terdapat kesalahan penulisan</p>
            <FormThread {... { data, submitHandler, handleChange, categories, submit: 'Update Thread'}}/>
        </div>
    );
}

Edit.layout = page => <Forum children={page}/>
