import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Upload,
    Row,
    Col,
    notification,
    Typography,
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate, useParams } from "react-router-dom";
import { UploadFile } from "antd/es/upload";
import { FieldTypeTeacher } from "../../types/interface/teachers.interface";
import { useEffect, useState } from "react";
import { useUploadImgTeacher } from "./mutation/fileUpload";
import {
    ICreateTeacherParams,
    useUpdateTeacher,
} from "./mutation/useUpdateTeacher";
import { useGetTeacher } from "./query/getUser";
import dayjs from "dayjs";

const { Option } = Select;

export const UpdateTeacherForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [api, contextHolder] = notification.useNotification();
    const { data: teacherData, isLoading } = useGetTeacher(id!);
    let teacherDataUpdate = teacherData?.data;
    const { mutate: uploadMutate, isPending: createImgPeading } =
        useUploadImgTeacher();

    const { mutate: updateTeacher, isPending: studentPan } = useUpdateTeacher(
        id!
    );

    const onFinish = (values: FieldTypeTeacher) => {
        const updatedUser: ICreateTeacherParams = {
            img_url: fileList[0]?.url,
            full_name: `${values.firstname} ${values.lastname} ${values.surname}`,
            password: values.password,
            username: values.username,
            gender: values.gender,
            address: values.address.trim(),
            phone_number: values.phone_number,
            data_of_birth: values.data_of_birth.format("YYYY-MM-DD"),
        };

        updateTeacher(updatedUser, {
            onSuccess: () => {
                api.success({
                    message: "Muvaffaqiyatli yangilandi",
                    description: "O'qituvchi ma'lumotlari saqlandi",
                });
                navigate("/admin/teachers");
            },
            onError: (error: any) => {
                console.error("Xatolik:", error);
                api.error({
                    message: "Xatolik",
                    description:
                        error?.response?.data?.message?.[0] ||
                        "Xatolik yuz berdi",
                });
            },
        });
    };

    useEffect(() => {
        if (teacherDataUpdate) {
            const [firstname, lastname, ...surname] =
                teacherDataUpdate.full_name.split(" ");
            form.setFieldsValue({
                firstname: firstname || "",
                lastname: lastname || "",
                surname: surname.join(" ") || "",
                username: teacherDataUpdate.username,
                password: teacherDataUpdate.password,
                phone_number: teacherDataUpdate.phone_number,
                address: teacherDataUpdate.address,
                gender: teacherDataUpdate.gender,
                data_of_birth: dayjs(teacherDataUpdate.data_of_birth),
            });

            setFileList([
                {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: teacherDataUpdate.images?.[0]?.url || "",
                },
            ]);
        }
    }, [teacherDataUpdate, form]);

    if (!id) {
        return (
            <Col
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography.Text>Id topilmadi :(</Typography.Text>
                    <Button onClick={() => navigate("/admin/teachers")}>
                        Orqaga
                    </Button>
                </Col>
            </Col>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log(teacherDataUpdate);

    if (!teacherDataUpdate) {
        return (
            <Col
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Col
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography.Text>Teacher topilmadi :(</Typography.Text>
                    <Button onClick={() => navigate("/admin/teachers")}>
                        Orqaga
                    </Button>
                </Col>
            </Col>
        );
    }

    return (
        <div style={{ padding: "0 20px" }}>
            {contextHolder}
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row
                    style={{
                        padding: "22px 0 20px 0",
                        borderBottom: "1px solid var(--qidiruv-tizimi-1)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "40px",
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            fontWeight: 600,
                            fontSize: "26px",
                            color: "var(--matn-rang-1)",
                            fontFamily: "var(--font-family)",
                            margin: 0,
                        }}
                    >
                        O'qituvchilarni O'zgartirish
                    </Title>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => navigate("/admin/teachers")}
                            icon={<CloseOutlined />}
                            style={{
                                borderColor: "var(--qizil-rang-1)",
                                color: "var(--qizil-rang-1)",
                                fontWeight: 600,
                                background: "var(--oq-rang-1)",
                                boxShadow: "2px 2px 5px var(--mirrorname)",
                            }}
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            loading={studentPan}
                            icon={<CheckOutlined />}
                            htmlType="submit"
                            style={{
                                borderColor: "var(--breand-rang-2)",
                                color: "var(--breand-rang-2)",
                                fontWeight: 600,
                                background: "var(--oq-rang-1)",
                                boxShadow: "2px 2px 5px var(--mirrorname)",
                            }}
                        >
                            Saqlash
                        </Button>
                    </div>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Form.Item label="Avatar" name="avatar">
                            <Upload
                                customRequest={({
                                    file,
                                    onSuccess,
                                    onError,
                                }) => {
                                    if (file && !createImgPeading) {
                                        uploadMutate(file as File, {
                                            onSuccess: (data) => {
                                                setFileList([
                                                    {
                                                        uid: (file as any).uid,
                                                        name: (file as any)
                                                            .name,
                                                        status: "done",
                                                        url: data.data
                                                            .image_url,
                                                    },
                                                ]);
                                                if (onSuccess) {
                                                    onSuccess("ok");
                                                }
                                            },
                                            onError: (error) => {
                                                if (onError) {
                                                    onError(error);
                                                }
                                            },
                                        });
                                    }
                                }}
                                listType="picture-card"
                                maxCount={1}
                                onRemove={() => setFileList([])}
                                fileList={fileList}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    <UploadOutlined
                                        style={{
                                            fontSize: "24px",
                                            marginBottom: "8px",
                                        }}
                                    />
                                    <div style={{ fontSize: "14px" }}>
                                        Rasm yuklash
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Ism"
                            name="firstname"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Ism"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Familiya"
                            name="lastname"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Familiya"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Sharif"
                            name="surname"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Sharif"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Foydalanuvchi nomi"
                            name="username"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Username"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Parol"
                            name="password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password
                                placeholder="Parol"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Telefon raqam"
                            name="phone_number"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Telefon raqam"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Manzil"
                            name="address"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Manzil"
                                style={{ height: "45px" }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Jinsi"
                            name="gender"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Jinsi"
                                style={{ height: "45px" }}
                            >
                                <Option value="MALE">Erkak</Option>
                                <Option value="FEMALE">Ayol</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Tug'ilgan sana"
                            name="data_of_birth"
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                format="DD.MM.YYYY"
                                style={{ width: "100%", height: "45px" }}
                                placeholder="Tug'ilgan sana"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
