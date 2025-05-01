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
import { useNavigate, useParams } from "react-router-dom";
import { FieldTypeGroup } from "../../types/interface/getGroup.interface";
import { useEffect } from "react";
import { useUpdateGroup } from "./mutation/useCreateGroup";
import { useGetAllTeachers } from "./query/getAllTeacher";
import { useGetAllCoursesWGroup } from "./query/getAllCourse";
import { useGetOneGroup } from "./query/getOneGroup";
import dayjs from "dayjs";

const { Option } = Select;

export const UpdateGroupForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();
    const { data: getOneGroup } = useGetOneGroup(id!);
    const { mutate: updateGroup, isPending: groupPan } = useUpdateGroup(id!);
    const { data: getTeacher } = useGetAllTeachers();
    const { data: getCourses } = useGetAllCoursesWGroup();

    const onFinish = (values: FieldTypeGroup) => {
        const group: Omit<FieldTypeGroup, "start_date"> = {
            name: values.name,
            description: values.description,
            status: values.status,
            course_id: values.course_id,
            teacher_id: values.teacher_id,
        };
        updateGroup(group, {
            onSuccess: () => {
                api.success({
                    message: "Yaxshi natija",
                    description: "Group muvaffaqiyatli qo'shildi",
                });
                form.resetFields();
                navigate(`/admin/group-detail/${id}`);
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

    useEffect(() => {
        if (getOneGroup?.data) {
            form.setFieldsValue({
                name: getOneGroup.data.name,
                description: getOneGroup.data.description,
                status: getOneGroup.data.status,
                course_id: getOneGroup.data.course_id,
                start_date: dayjs(getOneGroup.data.start_date),
                teacher_id: getOneGroup.data.teacher_id,
            });
        }
    }, [getOneGroup?.data, form]);

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
                            onClick={() =>
                                navigate(`/admin/group-detail/${id}`)
                            }
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
