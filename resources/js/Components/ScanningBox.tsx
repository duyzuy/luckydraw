import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";

export type ScanningBoxProps = {
    onSubmit: (data: string) => void;
    className?: string;
};
const ScanningBox: React.FC<ScanningBoxProps> = ({
    onSubmit,
    className = "",
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [barcodeData, setBarcodeData] = useState("");
    const [isScanning, setScanning] = useState(false);

    const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
        evt
    ) => {
        setBarcodeData(() => evt.target.value);

        !isScanning && setScanning(() => true);
    };

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();

        //clear data input after submit
        onSubmit?.(barcodeData);
        setBarcodeData("");
        setScanning(false);
    };
    const handleFocusInput = () => {
        const el = inputRef.current;

        if (!el || el === null) return;

        el.closest(".scanbox")?.classList.add("animating");
    };
    const handleBlurInput = () => {
        const el = inputRef.current;

        if (!el || el === null) return;

        el.closest(".scanbox")?.classList.remove("animating");
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <CheckFormStyled
            className={`scanbox${className ? " " + className : ""} ${
                isScanning ? " scanning" : ""
            }`}
            onSubmit={handleSubmitForm}
        >
            <div className="scanbox__form-inner">
                <div className="scanbox__square">
                    <span className="bar line left"></span>
                    <span className="bar line right"></span>
                    <span className="bar line bottom left"></span>
                    <span className="bar line bottom right"></span>
                    <span className="bar col left"></span>
                    <span className="bar col right"></span>
                    <span className="bar col bottom left"></span>
                    <span className="bar col bottom right"></span>
                </div>
                <div className="scanbox__input">
                    <input
                        ref={inputRef}
                        value={barcodeData}
                        type="text"
                        name="barcode"
                        placeholder="Waiting for scanning"
                        onChange={handleChangeInput}
                        onFocus={handleFocusInput}
                        onBlur={handleBlurInput}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <span className="scanbox__placeholder-shown"></span>
                </div>
            </div>
            <span className="scanning-bar"></span>
        </CheckFormStyled>
    );
};
export default ScanningBox;

const movingDown = keyframes`
  to {
    transform: translate(0, 450px);
  }
`;

const CheckFormStyled = styled("form")`
    & {
        border: 8px solid #f1f1f1;
        padding: 16px;
        border-radius: 16px;
        width: 250px;
        height: 250px;
        position: relative;
        overflow: hidden;
        &.animating {
            .scanning-bar {
                animation: ${movingDown} 5s linear infinite;
            }
            .scanbox__form-inner {
                .scanbox__square {
                    background-color: #cff7f136;
                }
            }
        }
        &.scanning {
            .scanbox__input {
                input {
                    &:focus {
                        outline: none;
                        box-shadow: none;

                        ~ .scanbox__placeholder-shown {
                            &:after {
                                content: "Đang quét, vui lòng chờ trong giây lát.";
                                color: #008f81;
                            }
                        }
                    }
                }
            }
        }
        .scanbox__form-inner {
            position: relative;
            width: 100%;
            height: 100%;
            .scanbox__square {
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                background-color: #f1f1f152;

                .bar {
                    position: absolute;
                    background: #02b3a2;
                    display: block;
                    &.bottom {
                        bottom: 0;
                    }
                    &.left: {
                        left: 0;
                    }
                    &.right {
                        right: 0;
                    }
                    &.line {
                        width: 46px;
                        height: 1px;
                    }
                    &.col {
                        height: 46px;
                        width: 1px;
                    }
                }
            }
        }
        .scanning-bar {
            width: 100%;
            height: 2px;
            left: 0;
            right: 0;
            top: -2px;
            background-color: rgb(0 237 189 / 76%);
            display: block;
            position: absolute;

            &::after {
                content: "";
                position: absolute;
                width: 100%;
                background: linear-gradient(to top, #00dcc775, transparent);
                left: 0;
                top: -60px;
                height: 60px;
            }
        }

        .scanbox__input {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            .scanbox__placeholder-shown {
                color: #008f81;
                position: relative;
                z-index: 10;
                pointer-events: none;
            }
            input {
                width: 100%;
                height: 100%;
                border-width: 0;
                position: absolute;
                top: 0;
                left: 0;
                background-color: transparent;
                z-index: 10;
                color: transparent;
                // text-shadow: 0 0 0 #2196f3;
                cursor: pointer;
                // font-size: 0px;
                &::placeholder {
                    color: transparent;
                    text-align: center;
                }
                &:focus {
                    outline: none;
                    box-shadow: none;

                    ~ .scanbox__placeholder-shown {
                        &:after {
                            content: "Đang chờ quét...";
                            color: #008f81;
                        }
                    }
                }
                ~ .scanbox__placeholder-shown {
                    &:after {
                        content: "Vui lòng bấm tại đây";
                        color: #000000;
                    }
                }
            }
        }
    }
`;
