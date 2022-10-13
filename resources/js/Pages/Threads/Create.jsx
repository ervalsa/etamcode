import React from "react";
import App from "@/Layouts/App";
import {Head, useForm} from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create(props) {

    const {categories} = props;

    const { data, setData, post, reset } = useForm({
        title: '', body: '', category_id: ''
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    };

    const storeHandler = (e) => {
        e.preventDefault();
        post(route('threads.store'))
    };

    return (
        <div>
            <Head title="Tambah Thread" />

            <div>
                <form onSubmit={storeHandler}>
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
                    <PrimaryButton>Buat Thread</PrimaryButton>
                </form>
            </div>
        </div>
    );
}

Create.layout = page => <App children={page}/>
