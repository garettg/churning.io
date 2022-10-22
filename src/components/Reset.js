import {MdRefresh} from "react-icons/md";

import {useSearchContext} from "../utils/Context";
import {ButtonClasses} from "../utils/Constants";

const Reset = () => {
    const {
        reset
    } = useSearchContext();

    return (
        <button
            type="button"
            aria-label="Reset Search"
            title="Reset Search"
            className={`${ButtonClasses} text-xs`}
            onClick={reset}>
            <MdRefresh className="md:mr-2 h-5 w-5" />
            <span className="hidden md:inline">Reset</span>
        </button>
    )
}

export default Reset;