import { Button, Modal, ModalProps } from "antd";
import styled from "styled-components";

import { PrizeType } from "@/models/prize";
import { WinnerType } from "@/models/winner";
import Title from "@/Components/Title";

type ModalWinnerListProps = ModalProps & {
    winnerList?: WinnerType[];
    prize?: PrizeType;
    prizName: string;
    onClose?: () => void;
};
const ModalWinnerList: React.FC<ModalWinnerListProps> = ({
    winnerList,
    open,
    prize,
    onClose,
    prizName,
}) => {
    return (
        <ModalStyled
            centered
            width={1280}
            open={open}
            footer={null}
            onCancel={onClose}
            destroyOnClose={true}
        >
            <div className="modal-container font-jambono relative z-10">
                <div className="modal-container__head text-center py-6 font-bold">
                    <Title size="large">Danh sách người thắng</Title>
                    <Title size="large">{prizName}</Title>
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
                                    {item.member_info.full_name}
                                </div>

                                <div className="w-[150px]">
                                    {item.member_info.member_code}
                                </div>
                                <div className="flex-1">
                                    <span>{item.prize.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
