import { Form, Input, Button, Select, Row, Col, notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "antd/es/upload";
import { useState } from "react";
import { useCreateCourse, FieldTypeCourse } from "./mutation/useCreateCourse";

const { Option } = Select;

export const AddCourseForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log(fileList);
    const [api, contextHolder] = notification.useNotification();

    const { mutate: createCourse, isPending: coursePan } = useCreateCourse();

    const onFinish = (values: FieldTypeCourse) => {
        const course: FieldTypeCourse = {
            name: values.name,
            description: values.description,
            status: values.status,
            duration: +values.duration,
        };
        createCourse(course, {
            onSuccess: () => {
                navigate("/admin/courses");
                api.success({
                    message: "Yaxshi natija",
                    description: "Course muvaffaqiyatli qo'shildi",
                });
                setFileList([]);
                form.resetFields();
            },
            onError: (error: any) => {
                console.error("Xatolik:", error);
                api.error({
                    message: "Xatolik",
                    description: error?.response?.data?.message,
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
                        Group qo'shish
                    </Title>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Button
                            onClick={() => navigate("/admin/courses")}
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
                            loading={coursePan}
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
                    <Col span={8}>
                        <Form.Item
                            label="Course nomi"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, Course nomini kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="Masalan: Dasturlash" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Izoh"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, izoh kiriting",
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Course haqida qisqacha ma'lumot" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, statusni tanlang",
                                },
                            ]}
                        >
                            <Select placeholder="Statusni tanlang">
                                <Option value="ACTIVE">Faol</Option>
                                <Option value="INACTIVE">Faol emas</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Davomiyligi"
                            name="duration"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Iltimos, Course davomiyligini kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="101" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
