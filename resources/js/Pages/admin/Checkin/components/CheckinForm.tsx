import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import ScanningBox, { ScanningBoxProps } from "@/Components/ScanningBox";
const CheckinForm = () => {
    const [data, setData] = useState("");
    const handleSubmit: ScanningBoxProps["onSubmit"] = (data) => {
        console.log(data);
        setData(data);
    };

    return (
        <div>
            <div className="check-in-box text-center">
                <span className="font-bold text-xl mb-3 inline-block">
                    Checkin
                </span>
                <ScanningBox onSubmit={handleSubmit} className="mx-auto" />
                <div className="py-2 text-xs">
                    Vui lòng nhấn vào box sau đó thực hiện scanning trên thiết
                    bị.
                </div>
            </div>
            <div>{data}</div>
        </div>
    );
};
export default CheckinForm;
