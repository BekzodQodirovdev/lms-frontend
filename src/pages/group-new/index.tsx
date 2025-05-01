import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Row,
    Col,
    notification,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "antd/es/upload";
import { FieldTypeGroup } from "../../types/interface/getGroup.interface";
import { useState } from "react";
import { useCreateGroup } from "./mutation/useCreateGroup";
import { useGetAllTeachers } from "./query/getAllTeacher";
import { useGetAllCoursesWGroupNew } from "./query/getAllCourse";

const { Option } = Select;

export const AddGroupForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    console.log(fileList);
    const [api, contextHolder] = notification.useNotification();

    const { mutate: createGroup, isPending: groupPan } = useCreateGroup();
    const { data: getTeacher } = useGetAllTeachers();
    const { data: getCourses } = useGetAllCoursesWGroupNew();

    const onFinish = (values: FieldTypeGroup) => {
        const group: FieldTypeGroup = {
            name: values.name,
            description: values.description,
            status: values.status,
            course_id: values.course_id,
            start_date:
                typeof values.start_date === "object" &&
                "format" in values.start_date
                    ? values.start_date.format("YYYY-MM-DD")
                    : values.start_date,
            teacher_id: values.teacher_id,
        };
        createGroup(group, {
            onSuccess: () => {
                api.success({
                    message: "Yaxshi natija",
                    description: "Group muvaffaqiyatli qo'shildi",
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
                            onClick={() => navigate("/admin/groups")}
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
                            loading={groupPan}
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
                            label="Guruh nomi"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, guruh nomini kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="Masalan: Frontend 101" />
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
                            <Input.TextArea placeholder="Guruh haqida qisqacha ma'lumot" />
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
                            label="Kurs ID"
                            name="course_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, kurs ID sini tanlang",
                                },
                            ]}
                        >
                            <Select placeholder="Kursni tanlang">
                                {getCourses?.data.map((item) => (
                                    <Option value={item.course_id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Boshlanish sanasi"
                            name="start_date"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Iltimos, boshlanish sanasini tanlang",
                                },
                            ]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                style={{ width: "100%" }}
                                placeholder="Guruh boshlanish sanasi"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="O'qituvchi ID"
                            name="teacher_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos, o'qituvchini tanlang",
                                },
                            ]}
                        >
                            <Select placeholder="O'qituvchini tanlang">
                                {getTeacher?.data.map((item) => (
                                    <Option value={item.user_id}>
                                        {item.full_name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
