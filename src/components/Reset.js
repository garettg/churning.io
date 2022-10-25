import {Button} from "flowbite-react";
import {MdRefresh} from "react-icons/md";

import {useSearchContext} from "../utils/Context";

const Reset = () => {
    const {
        reset
    } = useSearchContext();

    return (
        <Button
            size="sm"
            aria-label="Reset Search"
            title="Reset Search"
            onClick={reset}>
            <MdRefresh className="md:mr-2 h-5 w-5" />
            <span className="hidden md:inline">Reset</span>
        </Button>
    )
}

export default Reset;