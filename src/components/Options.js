import React, { useState, useEffect } from 'react';
import {Button, Modal, ToggleSwitch} from 'flowbite-react';
import {TbAdjustmentsHorizontal} from "react-icons/tb";
import { useTheme } from 'next-themes';

import {Config} from "../../app.config";
import {useSearchContext} from "../utils/Context";
import {compress, gaEvent} from "../utils/Utils";

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
        localStorage.setItem(Config.id + "-options", compress(options));
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
        gaEvent("Options", {
            category: "Options",
            label: "name",
            value: checked ? "Yes":"No",
            nonInteraction: true
        })
    }

    const optionAvailable = [
        {id:'dark-mode', label: "Dark Mode", name:"darkMode", checked: options.darkMode},
        {id:'old-reddit', label: "Old Reddit", name:"oldReddit", checked: options.oldReddit},
        {id:'show-date', label: "Show Date", name:"showDate", checked: options.showDate},
        {id:'show-suggestions', label: "Show Suggestions", name: "showSuggestions", checked: options.showSuggestions}
    ];

    const optionsList = optionAvailable.map((option, index) => (
        <ToggleSwitch
            color="blue"
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
                color="blue"
                size="sm"
                title={`${Config.name} Options`}
                aria-label={`${Config.name} Options`}
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
                    {Config.name} Options
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
                        color="blue"
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