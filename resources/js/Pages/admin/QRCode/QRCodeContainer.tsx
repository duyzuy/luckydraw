import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MemberType } from "@/models/member";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Form, Checkbox, Space, Input } from "antd";
import { QRCodeSVG } from "qrcode.react";

type QRCodeContainerProps = PageProps & {
    memberList: MemberType[];
    flash: {
        error: string | null;
        success: string | null;
    };
};

// BEGIN:VCARD
// VÉION:3.0
// N:V Trng;Duy
// FN:Duy V Trng
// TITLE:Senior
// ỎG:Việtt
// EMAIL;TYPE=INTERNET:vutruongduy2109@gmail.com
// TEL;TYPE=voice,ửok,pref:0982013088
// TEL;TYPE=voice,home,pref:0982013089
// TEL;TYPE=voice,cell,pref:0982013088
// TEL;TYPE=fax,ửok,pref:0982013088F
// ADR:;;Ho Chi Minh, Ho Chi Minh 2;Hô;Ninh Binh;700000;Vit Nam
// END:VCARD

// tel:0982013088

// mailto:vutruongduy2109@gmail.com?subject=danh sach trung giai&body=toi xin gi danh sach trung giai

const QRTYPES = [
    {
        name: "URL",
        key: "url",
        data: "https://ww.qrcode-monkey.com",
    },
    {
        name: "Text",
        key: "text",
    },
    {
        name: "Email",
        key: "email",
        data: "mailto:vutruongduy2109@gmail.com?subject=subject muon gui&body=noi dung muon gui",
    },
    {
        name: "VCard",
        key: "VCARD",
        data: `BEGIN:VCARD\nVERSION:3.0\nN:vu truong;Duy\nFN:Duy vu truong\nTITLE:Sernior\nORG:Vietjet\nURL:vietjetair.com\nEMAIL;TYPE=INTERNET:vutruongduy2109@gmail.com\nTEL;TYPE=voice,work,pref:0982013088\nTEL;TYPE=voice,home,pref:0982013099\nTEL;TYPE=voice,cell,pref:0982013088\nTEL;TYPE=fax,work,pref:098666888\nADR:;;Ho Chi Minh, Ho Chi Minh 2;Ho chi Minh;Ninh Binh;700000;Vit Nam\nEND:VCARD`,
    },
    {
        name: "Mecard",
        key: "MECARD",
        data: "MECARD:N:truong duy,vu;NICKNAME:duyzuy;TEL:0982013088;EMAIL:vutruongduy2109@gmail.com;ADR:,,Ho Chi Minh, Ho Chi Minh 2,Ho chi Minh,Ninh Binh,700000,Vit Nam;;",
    },
    {
        name: "Sms",
        key: "SMS",
        data: "SMSTO:0982013088:toi muon gui noi dung cho ban",
    },
];

const QRCodeContainer: React.FC<QRCodeContainerProps> = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    QRCode
                </h2>
            }
        >
            {/* MECARD:N:trng
            duy,v;NICKNAME:vutruongduy;TEL:0982013088;EMAIL:vutruongduy2109@gmail.com;ADR:,,Ho
            Chi Minh, Ho Chi Minh 2,H Ch Minh,Ninh Binh,700000,Vit nam;; */}
            <Head title="QRCode " />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex gap-x-3 mb-6">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-6">
                                    QRCode generation
                                </h3>
                                <div className="bg-gray-50 p-6">
                                    <Form layout="vertical">
                                        <Space>
                                            {QRTYPES.map((type) => (
                                                <div key={type.key}>
                                                    <Checkbox>
                                                        {type.name}
                                                    </Checkbox>
                                                </div>
                                            ))}
                                        </Space>
                                        <div className="h-6"></div>
                                        <Form.Item label="Url">
                                            <Input placeholder="url" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            <div className="w-fit">
                                <QRCodeSVG
                                    value={`https://www.facebook.com/vutruongduy2109`}
                                    level="L"
                                    bgColor="#ffffff"
                                    fgColor="#000"
                                    size={350}
                                    title="Tieu de"
                                    marginSize={5}
                                    // imageSettings={{
                                    //     src: "http://[::1]:5173/resources/js/images/logo-red.svg",
                                    //     height: 30,
                                    //     width: 30,
                                    //     excavate: true,
                                    // }}
                                />
                                <div className="text-center">
                                    <Space>
                                        <Button>Tạo mã QR</Button>
                                        <Button>Tải về</Button>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default QRCodeContainer;
