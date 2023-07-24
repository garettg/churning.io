import React from 'react';
import {Config} from "../../app.config";
import {Alert} from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';

const Announce = () => {
    const announce = Config.announce
    if (announce.enable) {
        return (
            <Alert
                color={announce.color}
                icon={HiInformationCircle}
                className="mb-4">
                {announce.message}
            </Alert>
        )
    } else {
        return null;
    }
}

export default Announce;