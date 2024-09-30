import { FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Form, Checkbox, Input } from "antd";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = () => {
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    console.log(errors);
    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Form layout="vertical" onFinish={submit}>
                <Form.Item
                    label="Email"
                    help={errors.email}
                    validateStatus={errors.email ? "error" : undefined}
                >
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        size="large"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    validateStatus={errors.password ? "error" : undefined}
                    help={errors.password}
                >
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        size="large"
                        placeholder="Mật khẩu"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </Form.Item>
                <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                >
                    Lưu đăng nhập
                </Checkbox>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Quên mật khẩu?
                        </Link>
                    )}

                    <Button
                        type="primary"
                        size="large"
                        className="ms-4"
                        disabled={processing}
                        htmlType="submit"
                    >
                        Đăng nhập
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
