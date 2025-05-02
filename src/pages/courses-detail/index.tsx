import {
    Table,
    Tag,
    Button,
    Space,
    Col,
    Spin,
    Typography,
    Modal,
    notification,
    Row,
    Form,
    Input,
    InputNumber,
    Select,
} from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { EyeSvg } from "../../assets/eye-svgrepo-com";
import { useGetOneCoursesDetail } from "./service/query/useGetOneCoursesWGroup";
import { IGroup } from "../../types/interface/student.interface";
import { DeleteSvg } from "../../assets/delete";
import { EditSvg } from "../../assets/edit";
import { useGetOneCoursesDetailEdit } from "./service/query/useGetOneCoursesWEdit";
import { useEditcourses } from "./service/mutation/useUpdateCourses";

export interface FieldTypeCourse {
    name: string;
    description: string;
    duration: number;
    status: "ACTIVE" | "INACTIVE";
}

export const CoursesDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FieldTypeCourse>();

    const { data, isLoading } = useGetOneCoursesDetail(id!);
    const { data: geteditData } = useGetOneCoursesDetailEdit(id!);

    const { mutate } = useEditcourses(id!);

    const [api, contextHolder] = notification.useNotification();

    const handleEditCourse = (key: string) => {
        navigate(`/admin/group-detail/${key}`);
    };

    const openEditModal = () => {
        form.setFieldsValue({
            name: geteditData?.name || "",
            description: geteditData?.description || "",
            duration: Number(geteditData?.duration) || 0,
            status: (geteditData?.status as "ACTIVE" | "INACTIVE") || "ACTIVE",
        });
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            mutate(values, {
                onSuccess: () => {
                    api.success({
                        message: "Kurs ma'lumotlari yangilandi",
                    });
                },
                onError: (error) => {
                    console.log(error);
                    api.error({
                        message: "Xatolik",
                    });
                },
            });
            setIsModalOpen(false);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: "#",
            key: "key",
            render: (_: any, __: IGroup, index: number) => index + 1,
        },
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Boshlangan sana",
            dataIndex: "start_date",
            key: "start_date",
            render: (start_date: string) => (
                <Typography.Text>{start_date.slice(0, 10)}</Typography.Text>
            ),
        },
        {
            title: "Holati",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Imkoniyatlar",
            key: "actions",
            render: (data: IGroup) => (
                <Space>
                    <Button
                        icon={<EyeSvg />}
                        onClick={() => handleEditCourse(data.group_id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
            <Col
                style={{
                    padding: "22px 20px 20px 20px",
                    borderBottom: "1px solid var(--qidiruv-tizimi-1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
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
                    Kurs haqida
                </Title>
                <Row style={{ gap: "10px" }}>
                    <Button type="default" icon={<DeleteSvg />}>
                        O‘chirish
                    </Button>
                    <Button
                        type="default"
                        icon={<EditSvg />}
                        onClick={openEditModal}
                    >
                        Tahrirlash
                    </Button>
                </Row>
            </Col>

            {isLoading ? (
                <div
                    style={{
                        height: "80vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Table<IGroup>
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            )}

            <Modal
                title="Kursni tahrirlash"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Saqlash"
                cancelText="Bekor qilish"
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="edit-course-form"
                    initialValues={{
                        status: "ACTIVE",
                    }}
                >
                    <Form.Item
                        label="Nomi"
                        name="name"
                        rules={[
                            { required: true, message: "Nomini kiriting!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Izoh"
                        name="description"
                        rules={[{ required: true, message: "Izoh kiriting!" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Davomiyligi (oylarda)"
                        name="duration"
                        rules={[
                            { required: true, message: "Davomiylik kiriting!" },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Holati"
                        name="status"
                        rules={[
                            { required: true, message: "Holatni tanlang!" },
                        ]}
                    >
                        <Select
                            options={[
                                { label: "Faol", value: "ACTIVE" },
                                { label: "Nofaol", value: "INACTIVE" },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
