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
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeletecourses } from "./service/mutation/usedeleteCourses";
import { EyeSvg } from "../../assets/eye-svgrepo-com";
import { useSearchStore } from "../../store/useSearchStore";
import { useGetAllCourses } from "./service/query/useGetAllCourses";
import { ICourse } from "../../types/interface/getCourserOne.interface";

interface IFilter {
    status: "ACTIVE" | "INACTIVE";
}

export const Courses = () => {
    const navigate = useNavigate();
    const [isFilterQuery, _] = useState<IFilter | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<{
        open: boolean;
        user: { id: string | null; name: string | null };
    }>({
        open: false,
        user: { id: null, name: null },
    });
    const [page, setPage] = useState<number>(1);
    const handleAddCourse = () => {
        navigate("/admin/course/add");
    };
    const { search } = useSearchStore();

    const { data, isLoading, refetch } = useGetAllCourses(
        page,
        10,
        search,
        isFilterQuery?.status
    );
    const { mutate: deleteCourses } = useDeletecourses();

    const [api, contextHolder] = notification.useNotification();

    const handleEditCourse = (key: string) => {
        navigate(`/admin/course-detail/${key}`);
    };
    const handleDeleteCourse = (id: string, name: string) => {
        setIsModalOpen({ open: true, user: { id, name } });
    };

    const handleOk = () => {
        if (isModalOpen.user.id) {
            deleteCourses(isModalOpen.user.id, {
                onSuccess() {
                    refetch();
                    api.success({
                        message: "Muvaffaqiyatli",
                        description: "Course o'chirildi",
                    });
                },
                onError(err) {
                    api.error({
                        message: "Error",
                        description: err.message,
                    });
                },
            });
        }
        setIsModalOpen({ open: false, user: { id: null, name: null } });
    };

    const handleCancel = () => {
        setIsModalOpen({ open: false, user: { id: null, name: null } });
    };

    const columns = [
        {
            title: "#",
            key: "key",
            render: (_: any, __: ICourse, index: number) =>
                (page - 1) * 10 + index + 1,
        },
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Davomiligi",
            dataIndex: "duration",
            key: "duration",
            render: (duration: string) => (
                <Typography.Text>{duration} kun</Typography.Text>
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
            render: (data: ICourse) => (
                <Space>
                    <Button
                        icon={<EyeSvg />}
                        onClick={() => handleEditCourse(data.course_id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            handleDeleteCourse(data.course_id, data.name)
                        }
                        danger
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
                    Kurslar jadvali
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        color: "var(--matn-rang-1)",
                        backgroundColor: "white",
                    }}
                    onClick={handleAddCourse}
                >
                    Qo'shish
                </Button>
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
                <Table<ICourse>
                    columns={columns}
                    dataSource={data?.data}
                    pagination={{
                        current: page,
                        pageSize: 10,
                        total: data?.meta.total,
                        onChange: (pageNumber) => setPage(pageNumber),
                    }}
                    rowKey="user_id"
                />
            )}
            <Modal
                title="Chiqish"
                cancelText="Yo'q"
                okText="Ha"
                open={isModalOpen.open}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Rostanham {isModalOpen.user.name} ni o'chirmoqchimisiz.</p>
            </Modal>
        </div>
    );
};
