import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

import { PrizeGroupFromData } from "./modules/prizeGroup.interface";
import { useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import PrizeGroupForm, {
    PrizeGroupFormProps,
} from "./components/PrizeGroupForm";
import PrizeGroupList from "./components/PrizeGroupList";
import { useMessage } from "@/hooks/useMessage";

type PrizeGroupsListProps = PageProps & {
    items: PrizeGroupType[];
};
const PrizeGroupsContainer: React.FC<PrizeGroupsListProps> = ({
    auth,
    items,
}) => {
    const initFormData = new PrizeGroupFromData("", "", true, 0, "per_one");

    const { data, setData, post, processing, errors, reset, progress } =
        useForm(initFormData);
    const message = useMessage();

    const onChangeFormData: PrizeGroupFormProps["onChange"] = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault();
        post("/prize-group", {
            preserveScroll: true,
            onSuccess: () => {
                console.log("success");
                message.success("Thêm mới thành công.");
                reset();
            },
        });
    };

    console.log(items);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Nhóm giải thưởng
                </h2>
            }
        >
            <Head title="Prize groups" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-1 p-6">
                        <h3 className="text-lg font-bold mb-6">Thêm mới</h3>
                        <PrizeGroupForm
                            value={data}
                            errors={errors}
                            onChange={onChangeFormData}
                            onSubmit={handleSubmit}
                        />
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg col-span-2 p-6">
                        <h3 className="text-lg font-bold mb-6">
                            Danh sách nhóm giải
                        </h3>
                        <PrizeGroupList items={items} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default PrizeGroupsContainer;
