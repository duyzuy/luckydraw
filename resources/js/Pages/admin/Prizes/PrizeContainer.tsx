import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

import { useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";

import { useMessage } from "@/hooks/useMessage";
import PrizeForm, { PrizeFormProps } from "./components/PrizeForm";
import { PrizeFormData } from "./modules/prize.interface";
import { PrizeType } from "@/models/prize";
import PrizeList from "./components/PrizeList";

type PrizeGroupsListProps = PageProps & {
    prizeList: PrizeType[];
    prizeGroupList: PrizeGroupType[];
};
const PrizeContainer: React.FC<PrizeGroupsListProps> = ({
    auth,
    prizeList,
    prizeGroupList,
}) => {
    const initFormData = new PrizeFormData("", "", "");

    const { data, setData, post, processing, errors, reset, progress } =
        useForm(initFormData);
    const message = useMessage();

    const onChangeFormData: PrizeFormProps["onChange"] = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        post(route("prize.store"), {
            preserveScroll: true,
            onSuccess: () => {
                message.success("Thêm mới thành công.");
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Nhóm giải thưởng
                </h2>
            }
        >
            <Head title="Nhóm giải thưởng" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-1 p-6">
                        <h3 className="text-lg font-bold mb-6">Thêm mới</h3>
                        <PrizeForm
                            value={data}
                            errors={errors}
                            prizeGroupList={prizeGroupList}
                            onSubmit={handleSubmit}
                            onChange={onChangeFormData}
                        />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 p-6">
                        <h3 className="text-lg font-bold mb-6">
                            Danh sách giải thưởng
                        </h3>
                        <PrizeList
                            items={prizeList}
                            prizeGroupList={prizeGroupList}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default PrizeContainer;
