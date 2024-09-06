import { Drawer } from "antd";

import { WinnerType } from "@/models/winner";
type DrawerWinerDetailProps = {
    open?: boolean;
    onClose?: () => void;
    initialValue?: WinnerType;
};
const DrawerWinerDetail: React.FC<DrawerWinerDetailProps> = ({
    open,
    onClose,
    initialValue,
}) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            width={450}
            title={`${initialValue?.member_info.name}`}
        >
            <div className="form-wraper">
                <div className="info">
                    <h3 className="mb-3 font-bold">Thông tin</h3>
                    <div className="flex flex-col gap-y-1">
                        <p>{initialValue?.member_info.name}</p>
                        <p>{initialValue?.member_info.member_code}</p>
                        <p>{initialValue?.member_info.email}</p>
                        <p>{initialValue?.member_info.phone}</p>
                        <p>{initialValue?.member_info.member_type}</p>
                        <p>{initialValue?.note}</p>
                    </div>
                </div>
                <div className="prize border-t pt-6 mt-6">
                    <h3 className="mb-3 font-bold">Giải thưởng</h3>
                    <div className="flex flex-col gap-y-1">
                        <p>{initialValue?.prize.prize_group.name}</p>
                        <p>{initialValue?.prize.name}</p>
                        <p>{initialValue?.prize.quantity}</p>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
export default DrawerWinerDetail;
