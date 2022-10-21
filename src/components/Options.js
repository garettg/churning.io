import React, { useState, useEffect } from 'react';
import {Button, Modal, Checkbox, Label, ToggleSwitch} from 'flowbite-react';
import {TbAdjustmentsHorizontal} from "react-icons/tb";
import { useTheme } from 'next-themes'

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";
import {compress} from "../utils/Utils";
import {ButtonClasses} from "../utils/Constants";

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
            <button type="button"
                    onClick={toggleShow}
                    className={ButtonClasses}>
                <TbAdjustmentsHorizontal className="h-5 w-5" />
            </button>
            <Modal show={show} onClose={handleClose} size="sm">
                <Modal.Header>
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
                    <Button onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Options;