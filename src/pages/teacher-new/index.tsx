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
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "antd/es/upload";
import { FieldTypeTeacher } from "../../types/interface/teachers.interface";
import { useState } from "react";
import { useUploadImgStudent } from "./mutation/fileUpload";
import {
    ICreateTeacherParams,
    useCreateTeacher,
} from "./mutation/useCreateTeacher";
import { useGetAllGroup } from "./query/getGrup";

const { Option } = Select;

export const AddTeacherForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log(fileList);
    const [api, contextHolder] = notification.useNotification();

    const { mutate: uploadMutate, isPending: createImgPeading } =
        useUploadImgStudent();
    const { mutate: createTeacher, isPending: studentPan } = useCreateTeacher();
    const { data: groupData } = useGetAllGroup();
    console.log(groupData);

    const onFinish = (values: FieldTypeTeacher) => {
        const user: ICreateTeacherParams = {
            img_url: fileList[0]?.url,
            full_name: `${values.firstname.trim()} ${values.lastname.trim()} ${values.surname.trim()}`,
            password: values.password,
            username: values.username,
            gender: values.gender,
            address: values.address.trim(),
            phone_number: values.phone_number,
            data_of_birth: values.data_of_birth.format("YYYY-MM-DD"),
        };
        createTeacher(user, {
            onSuccess: () => {
                api.success({
                    message: "Yaxshi natija",
                    description: "O'quvchi muvaffaqiyatli qo'shildi",
                });
                setFileList([]);
                form.resetFields();
            },
            onError: (error: any) => {
                console.error("Xatolik:", error);
                api.error({
                    message: "Xatolik",
                    description: error?.response?.data?.message[0],
                });
            },
        });
    };

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
                        O'qituvchilarni qo'shish
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
