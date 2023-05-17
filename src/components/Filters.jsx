import React from 'react'
import Select from "react-select"

function Filters({ handleSelect, langList }) {
    const langListArr = langList.map(lang => ({ label: lang, value: lang, name: "lang" }));
    const groupOptions =
        [
            {
                label: "rating",
                options:
                    [{
                        value: "7",
                        label: "> 7",
                        name: "rating",

                    },
                    {
                        value: "5",
                        label: "> 5",
                        name: "rating",
                    }
                    ],
                color: "00b4d8"
            },
            {
                label: "release",
                options: [
                    {
                        value: "10",
                        label: "Last 10 years",
                        name: "release",
                    },
                    {
                        value: "20",
                        label: "Last 20 years",
                        name: "release",
                    }
                ],
                color: "00b4d8"
            },
            {
                label: "language",
                options: langListArr,
                color: "green"
            },
        ]
    
    return (
        <div className='w-1/2 sm:w-1/4'>
            <Select
                isMulti
                options={groupOptions}
                onChange={handleSelect}
                placeholder="Filter"
                className="rounded-md"
                classNamePrefix="select"
            />
        </div>

    )
}

export default Filters
