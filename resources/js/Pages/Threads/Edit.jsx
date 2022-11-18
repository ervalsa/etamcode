import React from "react";
import Forum from "@/Layouts/Forum";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import {useForm} from "@inertiajs/inertia-react";

export default function Edit({ thread, categories}) {

    const { data, setData, put } = useForm({
        title: thread.title || '',
        body : thread.body,
        category_id: thread.category_id,
    });

    const updateHandler = (e) => {
        e.preventDefault()
        put(route('threads.update', thread.slug))
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    return(
        <div>
            <form onSubmit={updateHandler}>
                <div className="mb-5">
                    <TextInput type="text" name="title" value={data.title} handleChange={handleChange}/>
                </div>
                <div className="mb-5">
                    <textarea name="body" value={data.body} onChange={handleChange}/>
                </div>
                <div className="mb-5">
                    <select name="category_id" value={data.category_id} onChange={handleChange}>
                        <option>Choose Category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <PrimaryButton>Update Thread</PrimaryButton>
            </form>
        </div>
    );
}

Edit.layout = page => <Forum children={page}/>
