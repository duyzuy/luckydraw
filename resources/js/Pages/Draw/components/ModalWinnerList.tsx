import { MemberType } from "@/models/member";
import { Button, Modal, ModalProps } from "antd";
import Text3D from "@/Components/Text3D";
import Confetti from "react-confetti";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { PrizeType } from "@/models/prize";
import { WinnerType } from "@/models/winner";

type ModalWinnerListProps = ModalProps & {
    winnerList?: WinnerType[];
    prize?: PrizeType;
    prizName: string;
    onRedraw?: (memberId: string, prizeId?: string) => void;
    onClose?: () => void;
};
const ModalWinnerList: React.FC<ModalWinnerListProps> = ({
    winnerList,
    open,
    prize,
    onClose,
    onRedraw,
    prizName,
}) => {
    const [runConfet, setRunConfet] = useState(true);

    const onRedrawWinner = () => {
        // winner && onRedraw?.(winner?.id);
        onClose?.();
    };
    return (
        <ModalStyled
            centered
            width={1280}
            open={open}
            // onOk={() => setModal2Open(false)}
            footer={null}
            onCancel={onClose}
            destroyOnClose={true}
        >
            <div className="modal-container font-jambono">
                <div className="modal-container__head text-center py-6  font-bold">
                    <Text3D className="text-6xl mb-6" color="yellow">
                        Danh sách người thắng
                    </Text3D>
                    <Text3D
                        className="text-yellow-400 drop-shadow-md text-6xl"
                        color="yellow"
                    >
                        {prizName}
                    </Text3D>
                </div>
                <div className="modal-container__body text-center text-2xl flex flex-col text-white">
                    <div className="flex py-4 bg-red-700 rounded-md mb-6">
                        <div className="w-[250px]">Họ và tên</div>
                        <div className="w-[150px]">Mã</div>
                        <div className="flex-1">Giải thưởng</div>
                    </div>
                    {winnerList?.map((item) => (
                        <div
                            className="winner-item mb-3 pb-3 border-b border-red-700"
                            key={item.id}
                        >
                            <div className="flex items-center gap-x-3">
                                <div className="w-[250px] text-left">
                                    {item.member_info.name}
                                </div>
                                <div className="w-[150px]">
                                    {item.member_info.member_code}
                                </div>
                                <div className="flex-1">{item.prize.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="modal-container__actions pt-12 pb-4">
                    <div className="flex items-center justify-center gap-x-3">
                        {/* <Button
                            type="primary"
                            size="large"
                            onClick={onRedrawWinner}
                            className="w-28 font-jambono"
                        >
                            Quay lại
                        </Button> */}
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
export default ModalWinnerList;

const ModalStyled = styled(Modal)`
    &&& {
        .ant-modal-content {
            background: red;
        }
    }
`;
