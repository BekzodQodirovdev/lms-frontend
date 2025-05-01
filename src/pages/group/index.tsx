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
import { useDeleteGroup } from "./service/mutation/usedeleteGroup";
import { EyeSvg } from "../../assets/eye-svgrepo-com";
import { useSearchStore } from "../../store/useSearchStore";
import useGetAllGroups from "./service/query/useGetAllGroup";
import { IGroup } from "../../types/interface/getGroup.interface";

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
    start_date: string | undefined;
    status: string;
}
export const Group = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<{
        open: boolean;
        user: { id: string | null; name: string | null };
    }>({
        open: false,
        user: { id: null, name: null },
    });
    const { search } = useSearchStore();
    const [isFilterQuery, _] = useState<IFilter | null>(null);
    const [api, contextHolder] = notification.useNotification();

    const [page, setPage] = useState<number>(1);
    const handleAddGroup = () => {
        navigate("/admin/group/add");
    };
    const { data, isLoading } = useGetAllGroups(
        page,
        10,
        isFilterQuery?.start_date,
        isFilterQuery?.status,
        search
    );
    const { mutate: deleteGroup } = useDeleteGroup();

    const handleEditGroup = (key: string) => {
        navigate(`/admin/group-detail/${key}`);
    };
    const handleDeleteGroup = (id: string, name: string) => {
        setIsModalOpen({ open: true, user: { id, name } });
    };

    const handleOk = () => {
        console.log(isModalOpen);
        if (isModalOpen.user.id) {
            deleteGroup(isModalOpen.user.id, {
                onSuccess(data) {
                    console.log(data);
                    api.success({
                        message: "Muvaffaqiyatli",
                        description: "Malumot o'chirildi",
                    });
                },
                onError(err: any) {
                    api.error({
                        message: "Xatolik",
                        description:
                            err?.response?.data?.message || "Xatolik yuz berdi",
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
            render: (_: any, __: IGroup, index: number) =>
                (page - 1) * 10 + index + 1,
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
            render: (date: string) => (
                <Typography.Text>{date.slice(0, 10)}</Typography.Text>
            ),
        },
        {
            title: "Holati",
            dataIndex: "status",
            key: "status",
            render: (gender: string) => (
                <Tag color={gender === "ACTIVE" ? "green" : "red"}>
                    {gender}
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
                        onClick={() => handleEditGroup(data.group_id)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            handleDeleteGroup(data.group_id, data.name)
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
                    Guruhlar jadvali
                </Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                        color: "var(--matn-rang-1)",
                        backgroundColor: "white",
                    }}
                    onClick={handleAddGroup}
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
                <Table<IGroup>
                    columns={columns}
                    dataSource={data?.data}
                    pagination={{
                        current: page,
                        pageSize: 10,
                        total: data?.meta.totalCount,
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
