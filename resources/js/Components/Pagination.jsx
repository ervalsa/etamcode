import React from "react";
import {Link} from "@inertiajs/inertia-react";

export default function Pagination({meta}) {
    return (
        <div className="text-white flex items-center gap-x-4 pb-10">
            {meta.links.map((link, key) => {
                return link.url === null ? <span className="text-gray-500" dangerouslySetInnerHTML={{ __html: link.label }}/> :
                    <Link
                    className={`${link.active ? 'text-blue-500' : ''}`}
                    key={key} href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}/>;
            })}
        </div>
    );
}
