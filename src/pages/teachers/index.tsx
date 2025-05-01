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
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ITeacher } from "../../types/interface/teachers.interface";
import { useDeleteTeacher } from "./service/mutation/usedeleteTeacher";
import { EyeSvg } from "../../assets/eye-svgrepo-com";
import useGetAllTeacher from "./service/query/useGetAllTeacher";
import { useSearchStore } from "../../store/useSearchStore";

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
interface IFilter {
    data_of_birth?: string;
    gender?: string;
    fullname?: string;
}
export const Teacher = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<{
        open: boolean;
        user: { id: string | null; name: string | null };
    }>({
        open: false,
        user: { id: null, name: null },
    });
    const { search } = useSearchStore();
    const [isFilterQuery, setFilterQuery] = useState<IFilter | null>(null);

    const [page, setPage] = useState<number>(1);
    const handleAddTeacher = () => {
        navigate("/admin/teacher/add");
    };
    const { data, isLoading } = useGetAllTeacher(
        page,
        10,
        isFilterQuery?.data_of_birth,
        isFilterQuery?.gender,
        search
    );
    const { mutate: deleteTeacher } = useDeleteTeacher();

    const handleEditTeacher = (key: string) => {
        navigate(`/admin/teacher-detail/${key}`);
    };
    const handleDeleteTeacher = (id: string, name: string) => {
        setIsModalOpen({ open: true, user: { id, name } });
    };

    const handleOk = () => {
        console.log(isModalOpen);
        if (isModalOpen.user.id) {
            deleteTeacher(isModalOpen.user.id, {
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
            render: (_: any, __: ITeacher, index: number) =>
                (page - 1) * 10 + index + 1,
        },
        {
            title: "O’qituvchilar F.I.O",
            key: "full_name",
            render: (teacher: ITeacher) => (
                <Space>
                    <Image
                        src={teacher.images[0].url}
                        alt="Img"
                        width={36}
                        height={36}
                        style={{ borderRadius: "20px" }}
                    />
                    {teacher.full_name}
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
            title: "Kontakt",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: "Imkoniyatlar",
            key: "actions",
            render: (data: ITeacher) => (
                <Space>
                    <Button
                        icon={<EyeSvg />}
                        onClick={() => handleEditTeacher(data.user_id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            handleDeleteTeacher(data.user_id, data.full_name)
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
                    O'qituvchilar jadvali
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        color: "var(--matn-rang-1)",
                        backgroundColor: "white",
                    }}
                    onClick={handleAddTeacher}
                >
                    Qo'shish
                </Button>
            </Col>
            {isLoading ? (
                <div
                    style={{
                        height: "70vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Table<ITeacher>
                    columns={columns}
                    dataSource={data?.data}
                    pagination={{
                        current: page,
                        pageSize: 10,
                        total: data?.meta.teacherCount,
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
