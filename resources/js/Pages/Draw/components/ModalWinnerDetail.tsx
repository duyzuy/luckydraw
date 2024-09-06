import { MemberType } from "@/models/member";
import { Button, Modal, ModalProps } from "antd";
import Text3D from "@/Components/Text3D";
import Confetti from "react-confetti";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { PrizeType } from "@/models/prize";
import { WinnerType } from "@/models/winner";

type ModalWinnerDetailProps = ModalProps & {
    winner?: WinnerType;
    prize?: PrizeType;
    onRedraw?: (memberId: string, prizeId?: string) => void;
    onClose?: () => void;
};
const ModalWinnerDetail: React.FC<ModalWinnerDetailProps> = ({
    winner,
    open,
    prize,
    onClose,
    onRedraw,
}) => {
    const [runConfet, setRunConfet] = useState(true);

    const onRedrawWinner = () => {
        winner && onRedraw?.(winner?.id);
        onClose?.();
    };
    return (
        <ModalStyled
            centered
            width={1080}
            open={open}
            // onOk={() => setModal2Open(false)}
            footer={null}
            onCancel={onClose}
            destroyOnClose={true}
        >
            <div className="modal-container font-jambono">
                <div className="modal-container__head text-center py-6 mb-6 font-bold">
                    <Text3D className="text-8xl" color="yellow">
                        Chúc mừng
                    </Text3D>
                </div>
                <div className="modal-container__body text-center text-6xl flex flex-col gap-y-6 text-white">
                    <div className="info">
                        <div className="uppercase mb-3 font-bold">
                            {winner?.member_info.name}
                        </div>
                        <div>{winner?.member_info?.member_code}</div>
                        <div>{winner?.member_info?.position}</div>
                    </div>
                    <p className="py-3 text-yellow-400 drop-shadow-md font-bold">
                        Thắng
                    </p>
                    <div className="text-5xl">
                        <p className="mb-3">{winner?.prize.prize_group.name}</p>
                        <p>{winner?.prize?.name}</p>
                    </div>
                </div>
                <div className="modal-container__actions pt-12 pb-4">
                    <div className="flex items-center justify-center gap-x-3">
                        <Button
                            type="primary"
                            size="large"
                            onClick={onRedrawWinner}
                            className="w-28 font-jambono"
                        >
                            Quay lại
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            ghost
                            onClick={onClose}
                            className="w-28 font-jambono"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </div>
            {open ? (
                <Confetti
                    className="w-full h-full -z-10"
                    gravity={0.1}
                    recycle={true}
                    run={true}
                    numberOfPieces={300}
                    tweenDuration={1000}
                />
            ) : null}
        </ModalStyled>
    );
};
export default ModalWinnerDetail;

const ModalStyled = styled(Modal)`
    &&& {
        .ant-modal-content {
            background: red;
        }
    }
`;
