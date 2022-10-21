import {MdRefresh} from "react-icons/md";

import {useSearchContext} from "../utils/Context";
import {ButtonClasses} from "../utils/Constants";

const Reset = () => {
    const {
        reset
    } = useSearchContext();

    return (
        <button type="button" className={`${ButtonClasses} text-xs`} onClick={reset}>
            <MdRefresh className="mr-2 h-5 w-5" /> Reset
        </button>
    )
}

export default Reset;