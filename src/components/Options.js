import React, { useState, useEffect } from 'react';
import {Button, Modal, ToggleSwitch} from 'flowbite-react';
import {TbAdjustmentsHorizontal} from "react-icons/tb";
import { useTheme } from 'next-themes'

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";
import {compress} from "../utils/Utils";

const Options = () => {
    const {
        options,
        setOptions
    } = useSearchContext();

    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);

    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const handleClose = () => {
        localStorage.setItem(Config.appId + "-options", compress(options));
        setShow(false);
    }
    const toggleShow = () => setShow((s) => !s);

    const handleChange = (name, checked) => {
        setOptions((oldOptions) => ({ ...oldOptions, [name]: checked }));
        if (name === "darkMode") {
            if (checked) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }

    const optionAvailable = [
        {id:'old-reddit', label: "Old Reddit", name:"oldReddit", checked: options.oldReddit},
        {id:'show-date', label: "Show Date", name:"showDate", checked: options.showDate},
        {id:'dark-mode', label: "Dark Mode", name:"darkMode", checked: options.darkMode},
        {id:'add-award-travel', label: "Add Award Travel", name: "addAwardTravel", checked: options.addAwardTravel}
    ];

    const optionsList = optionAvailable.map((option, index) => (
        <ToggleSwitch
            key={index}
            id={option.id}
            name={option.name}
            label={option.label}
            checked={option.checked}
            onChange={(checked) => handleChange(option.name, checked)}
        />
    ));

    return (
        <>
            <Button
                size="sm"
                title={`${Config.appName} Options`}
                aria-label={`${Config.appName} Options`}
                aria-haspopup={true}
                onClick={toggleShow}>
                <TbAdjustmentsHorizontal className="h-5 w-5" />
            </Button>
            <Modal
                show={show}
                aria-labelledby="options-modal"
                onClose={handleClose}
                size="sm">
                <Modal.Header id="options-modal">
                    {Config.appName} Options
                </Modal.Header>
                <Modal.Body>
                    <form className="">
                        <div className="flex flex-col gap-4">
                            {optionsList}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        aria-label="Close"
                        onClick={handleClose}
                        fullSized>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Options;