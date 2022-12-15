import React from "react";
import {Link} from "@inertiajs/inertia-react";

export default function Pagination({meta}) {
    return (
        <div className="text-white flex items-center gap-x-2 pb-10">
            {meta.links.map((link, key) => {
                return link.url === null ? <span key={key} className="text-gray-500 mx-4" dangerouslySetInnerHTML={{ __html: link.label }}/> :
                    <Link
                        key={key}
                        className={`${link.active ? 'text-blue-500' : ''} px-5 py-2 rounded bg-[#2D2F3A]`}
                        href={link.url || ''}
                        dangerouslySetInnerHTML={{ __html: link.label }}/>;
            })}
        </div>
    );
}
