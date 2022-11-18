import React from "react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Label from "@/Components/Label";

export default function FormThread({ data, submitHandler, handleChange, categories, submit}) {
    return (
        <div>
            <div className="p-4 bg-[#2D2F3A] rounded-lg">
                <form onSubmit={submitHandler}>
                    <div className="mb-5">
                        <Label value="Title"/>
                        <TextInput className="w-full rounded-lg" placeholder="Your Thread Title" type="text" name="title" value={data.title} handleChange={handleChange}/>
                    </div>
                    <div className="mb-5">
                        <Label value="Content"/>
                        <textarea className="resize-none w-full h-32 rounded-lg" placeholder="Your thread content" name="body" value={data.body} onChange={handleChange}/>
                    </div>
                    <div className="mb-5">
                        <Label value="Tag"/>
                        <select className="w-full rounded-lg" name="category_id" value={data.category_id} onChange={handleChange}>
                            <option>Choose Tags</option>
                            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                    </div>
                    <PrimaryButton className="bg-gradient-to-l from-blue-600 to-indigo-500">{submit}</PrimaryButton>
                </form>
            </div>
        </div>
    )
}
