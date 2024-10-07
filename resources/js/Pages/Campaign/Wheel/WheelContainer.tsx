import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import { PrizeType } from "@/models/prize";
import FeLayout from "@/Layouts/FeLayout";
import { MemberType } from "@/models/member";

import { WinnerType } from "@/models/winner";
import { CampaignType } from "@/models/campaign";
import styled from "styled-components";
import Title from "@/Components/Title";
import Button3D from "@/Components/Button3D";

type WheelContainerProps = PageProps & {
    campaign: CampaignType;
    members: MemberType[];
    prizeGroups?: (PrizeGroupType & { prizes: PrizeType[] })[];
    winners: WinnerType[];
};
const WHEEL_PRIZES = [
    {
        id: 1,
        name: "01 Vé máy bay Vietjet",
    },
    {
        id: 2,
        name: "Voucher 500K",
    },
    {
        id: 3,
        name: "Voucher 1000K",
    },
    {
        id: 4,
        name: "Chúc bạn may mắn",
    },
    {
        id: 5,
        name: "Voucher 5000K",
    },
    {
        id: 6,
        name: "05 Vé máy bay khứ hồi",
    },
    {
        id: 7,
        name: "05 Vé máy bay khứ hồi",
    },
    {
        id: 8,
        name: "05 Vé máy bay khứ hồi",
    },
    {
        id: 9,
        name: "05 Vé máy bay khứ hồi",
    },
    {
        id: 10,
        name: "05 Vé máy bay khứ hồi",
    },
];
const WheelContainer: React.FC<WheelContainerProps> = ({
    prizeGroups,
    members,
    campaign,
    winners,
}) => {
    return (
        <FeLayout title={campaign.name}>
            <div className="campaign-page">
                <div className="campaign-page__body">
                    <div className="flex items-center justify-center">
                        <div>
                            <StyledWheel className="wheel mb-12">
                                <div className="wheel-items">
                                    {WHEEL_PRIZES.map((item, _index) => (
                                        <div
                                            className={`wheel-item ${
                                                _index === 0 ? "special" : null
                                            }`}
                                            key={item.id}
                                        >
                                            <div className="wheel-item-content">
                                                <h4
                                                    className={`font-jambono text-white font-bold text-3xl drop-shadow-sm`}
                                                    style={{
                                                        WebkitTextStrokeWidth:
                                                            "1.5px",
                                                        WebkitTextFillColor:
                                                            "#ffde02",
                                                        WebkitTextStrokeColor:
                                                            "rgb(152 28 32)",
                                                    }}
                                                >
                                                    {item.name}
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="wheel-pointer">
                                    <span></span>
                                </div>
                                <div className="wheel-brand">
                                    <span className="wheel-brand-name font-jambono text-white">
                                        Vietjet
                                    </span>
                                </div>
                            </StyledWheel>
                            <div className="luckydraw-actions flex items-center justify-center">
                                <Button3D>Quay ngay</Button3D>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FeLayout>
    );
};

export default WheelContainer;

const StyledWheel = styled.div`
    & {
        position: relative;
        width: 800px;
        height: 800px;

        .wheel-items {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0px 0px 26px -10px #0000006b;
            border: 8px solid #981c20;
            &::after,
            &::before {
                content: "";
                inset: 0;
                position: absolute;
                border-radius: 50%;
                z-index: 20;
            }
            &::before {
                inset: 0;
                border: 30px solid #ff0200;
            }
            &::after {
                inset: 30px;
                border: 10px solid #981b20;
            }
        }
        .wheel-item {
            width: 255px;
            height: 50%;
            padding: 100px 60px 80px;
            position: absolute;
            clip-path: polygon(0 0, 50% 100%, 100% 0);
            overflow: hidden;
            transform-origin: bottom;
            display: flex;
            justify-content: center;
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;
            &:nth-child(odd) {
                background: #e4262b;
            }
            &:nth-child(even) {
                background: white;
            }
            &.special {
                background: linear-gradient(to bottom, #ffdc04, #f7a914);
            }
            &:nth-child(1) {
                transform: rotateX(0deg) translateX(-50%) rotate(0deg);
            }
            &:nth-child(2) {
                transform: rotateX(0deg) translateX(-50%) rotate(36deg);
            }
            &:nth-child(3) {
                transform: rotateX(0deg) translateX(-50%) rotate(72deg);
            }
            &:nth-child(4) {
                transform: rotateX(0deg) translateX(-50%) rotate(108deg);
            }
            &:nth-child(5) {
                transform: rotateX(0deg) translateX(-50%) rotate(144deg);
            }
            &:nth-child(6) {
                transform: rotateX(0deg) translateX(-50%) rotate(180deg);
            }
            &:nth-child(7) {
                transform: rotateX(0deg) translateX(-50%) rotate(216deg);
            }
            &:nth-child(8) {
                transform: rotateX(0deg) translateX(-50%) rotate(252deg);
            }
            &:nth-child(9) {
                transform: rotateX(0deg) translateX(-50%) rotate(288deg);
            }
            &:nth-child(10) {
                transform: rotateX(0deg) translateX(-50%) rotate(324deg);
            }
            .wheel-item-content {
                font-size: 30px;
                text-align: center;
            }
        }
        .wheel-pointer {
        }
        .wheel-brand {
            width: 180px;
            height: 180px;
            position: absolute;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
            background: linear-gradient(to right, #ffdc04, #f7a914);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px 0px rgb(0 0 0 / 25%);

            &::after {
                content: "";
                position: absolute;
                border-radius: 50%;
                inset: 22px;
                background: linear-gradient(to right, #e4262b, #c71b22);
            }
            &::before {
                content: "";
                position: absolute;
                border-radius: 50%;
                inset: 18px;
                background: linear-gradient(to right, #f7a914, #ffdc04);
            }
            .wheel-brand-name {
                position: relative;
                z-index: 10;
                font-size: 32px;
            }
        }
        .wheel-pointer {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: white;
            top: -25px;
            position: absolute;
            z-index: 30;
            left: 50%;
            transform: translateX(-50%);
            background: #ffdc04;

            &::after,
            &::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

                border-radius: 50%;
            }
            &::after {
                width: 60px;
                height: 60px;
                background: linear-gradient(to bottom, #e4262b, #c71b22);
            }
            &::before {
                width: 30px;
                height: 30px;
                background: white;
                z-index: 10;
            }
            span {
                display: block;
                width: 100%;
                height: 100px;
                background: white;
                position: absolute;
                top: 50%;
                left: 0;
                background: linear-gradient(to bottom, #ffdc04, #f7a914);
                clip-path: polygon(0 0, 50% 100%, 100% 0);
            }
        }
    }
`;
