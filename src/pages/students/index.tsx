import {
    Table,
    Tag,
    Button,
    Space,
    Col,
    Spin,
    Typography,
    Image,
    Modal,
    Popover,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import useGetAllStudent from "./service/query/useGetAllStudent";
import { useState } from "react";
import { IStudetn } from "../../types/interface/student.interface";
import { useDeleteStudent } from "./service/mutation/usedeleteStudent";
import { EyeSvg } from "../../assets/eye-svgrepo-com";
import { useSearchStore } from "../../store/useSearchStore";

interface IFilter {
    gender?: string;
    data_of_birth?: string;
    groupId?: string;
    fullname?: string;
}

// const data = [
//     {
//         key: "1",
//         name: "Sultonov Shokirjon Tursinjon o'g'li",
//         birthday: "15.05.2021",
//         gender: "O'g'il bola",
//         group: "15-gurux",
//         attendance: true,
//     },
//     {
//         key: "2",
//         name: "Nodirova Shodiya Tursinjon qizi",
//         birthday: "15.05.2021",
//         gender: "Qiz bola",
//         group: "15-gurux",
//         attendance: false,
//     },
// ];

export const Students = () => {
    const navigate = useNavigate();
    const [isFilterQuery, _] = useState<IFilter | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<{
        open: boolean;
        user: { id: string | null; name: string | null };
    }>({
        open: false,
        user: { id: null, name: null },
    });
    const [page, setPage] = useState<number>(1);
    const handleAddStudent = () => {
        navigate("/admin/students/add");
    };
    const { search } = useSearchStore();

    const { data, isLoading } = useGetAllStudent(
        page,
        10,
        isFilterQuery?.gender,
        isFilterQuery?.data_of_birth,
        isFilterQuery?.groupId,
        search
    );
    const { mutate: deleteStudent } = useDeleteStudent();

    const handleEditStudent = (key: string) => {
        navigate(`/admin/student-detail/${key}`);
    };
    const handleDeleteStudent = (id: string, name: string) => {
        setIsModalOpen({ open: true, user: { id, name } });
    };

    const handleOk = () => {
        if (isModalOpen.user.id) {
            deleteStudent(isModalOpen.user.id, {
                onSuccess(data) {
                    console.log(data);
                },
                onError(err) {
                    console.log("error ", err);
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
            render: (_: any, __: IStudetn, index: number) =>
                (page - 1) * 10 + index + 1,
        },
        {
            title: "Bolalar F.I.O",
            key: "full_name",
            render: (student: IStudetn) => (
                <Space>
                    <Image
                        src={student.images[0].url}
                        alt="Img"
                        width={36}
                        height={36}
                        style={{ borderRadius: "20px" }}
                    />
                    {student.full_name}
                </Space>
            ),
        },
        {
            title: "Tug'ilgan sana",
            dataIndex: "data_of_birth",
            key: "data_of_birth",
            render: (date: string) => (
                <Typography.Text>{date.slice(0, 10)}</Typography.Text>
            ),
        },
        {
            title: "Jinsi",
            dataIndex: "gender",
            key: "gender",
            render: (gender: string) => (
                <Tag color={gender === "MALE" ? "green" : "red"}>{gender}</Tag>
            ),
        },
        {
            title: "Yashash joyi",
            dataIndex: "address",
            key: "addres",
        },
        {
            title: "Gurux nomi",
            key: "group",
            render: (data: IStudetn) => (
                <Typography.Text
                    style={{
                        fontSize: "18px",
                    }}
                >
                    {data?.group_members[0]?.group?.name}
                </Typography.Text>
            ),
        },
        {
            title: "To'lov",
            key: "payment",
            render: (data: IStudetn) => {
                const content = (
                    <div>
                        <p>
                            To'lov:{" "}
                            {
                                data.PaymentForStudent[
                                    data.PaymentForStudent.length - 1
                                ]?.sum
                            }
                        </p>
                        <p>
                            To'lov turi:{" "}
                            {
                                data.PaymentForStudent[
                                    data.PaymentForStudent.length - 1
                                ]?.type
                            }
                        </p>
                    </div>
                );
                return (
                    <Popover content={content} title="Malumotlar">
                        <Button>To'lov</Button>
                    </Popover>
                );
            },
        },
        {
            title: "Imkoniyatlar",
            key: "actions",
            render: (data: IStudetn) => (
                <Space>
                    <Button
                        icon={<EyeSvg />}
                        onClick={() => handleEditStudent(data.user_id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            handleDeleteStudent(data.user_id, data.full_name)
                        }
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
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
                    O’quvchilar jadvali
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        color: "var(--matn-rang-1)",
                        backgroundColor: "white",
                    }}
                    onClick={handleAddStudent}
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
                <Table<IStudetn>
                    columns={columns}
                    dataSource={data?.data}
                    pagination={{
                        current: page,
                        pageSize: 10,
                        total: data?.meta.studentCount,
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
