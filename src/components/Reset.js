import React from 'react';
import {Button} from "flowbite-react";
import {MdRefresh} from "react-icons/md";

import {useSearchContext} from "../utils/Context";

const Reset = () => {
    const {
        reset
    } = useSearchContext();

    return (
        <Button
            color="blue"
            size="xs"
            aria-label="Reset Search"
            title="Reset Search"
            onClick={reset}>
            <MdRefresh className="md:mr-2 h-4 w-4" />
            <span className="hidden md:inline">Reset</span>
        </Button>
    )
}

export default Reset;