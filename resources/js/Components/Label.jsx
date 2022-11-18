import React from 'react';

export default function Label({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-md text-white mb-2 ` + className}>
            {value ? value : { children }}
        </label>
    );
}
