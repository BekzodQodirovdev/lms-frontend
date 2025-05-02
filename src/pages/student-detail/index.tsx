import {
    Button,
    Card,
    Col,
    Form,
    Image,
    Input,
    List,
    Modal,
    notification,
    Row,
    Select,
    Spin,
    Table,
    TableProps,
    Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import { DeleteSvg } from "../../assets/delete";
import { EditSvg } from "../../assets/edit";
import { PaySvg } from "../../assets/pay";

import defaultUser from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserOne } from "./service/query/getUser";
import {
    IGroupMember,
    IPaymentForStudent,
} from "../../types/interface/student.interface";
import { usePaymentStudent } from "./service/mutation/usePaymentStudent";
import { useState } from "react";
import useGetAllGroups from "../group/service/query/useGetAllGroup";

///////////////GROUP////////////////

const columnsGroup: TableProps<IGroupMember>["columns"] = [
    {
        title: "#",
        key: "id",
        render: (_: any, __: IGroupMember, index: number) => index + 1,
    },
    {
        title: "Nomi",
        key: "name",
        render: (data: IGroupMember) => <p>{data.group.name}</p>,
    },
    {
        title: "Boshlangan sana",
        key: "start_date",
        render: (data: IGroupMember) => (
            <p>{data.group.start_date.slice(0, 10)}</p>
        ),
    },
    {
        title: "Holati",
        key: "status",
        render: (data: IGroupMember) => {
            return data.group.status == "ACTIVE" ? (
                <p style={{ color: "green" }}>{data.group.status}</p>
            ) : (
                <p style={{ color: "red" }}>{data.group.status}</p>
            );
        },
    },
];

///////////PAYMENT//////////////

const columnsPayment: TableProps<IPaymentForStudent>["columns"] = [
    {
        title: "#",
        key: "id",
        render: (_: any, __: IPaymentForStudent, index: number) => index + 1,
    },
    {
        title: "Miqdori",
        dataIndex: "sum",
        key: "summa",
    },
    {
        title: "To'lov turi",
        dataIndex: "type",
        key: "payType",
    },
    {
        title: "Boshlangan sana",
        key: "start_date",
        render: (data: IPaymentForStudent) => (
            <p>{data.created_at.slice(0, 10)}</p>
        ),
    },
];

///////////////////////////////

export const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [searchUser, setSearchUser] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useGetUserOne(id!);
    const { data: getAllGroup } = useGetAllGroups(
        1,
        1000,
        undefined,
        undefined,
        searchUser
    );
    const { mutate } = usePaymentStudent();
    if (!id) {
        return "user not found";
    }
    if (isLoading) {
        return "Loading...";
    }
    const handlePayment = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                if (!selectedGroupId) {
                    api.info({ message: "Gruhni tanlang" });
                    return;
                }
                const payload = {
                    ...values,
                    student_id: id,
                    sum: Number(values.sum),
                    group_id: selectedGroupId,
                };
                mutate(payload, {
                    onSuccess: () => {
                        api.success({
                            message: "Muvaffaqiyatli bajarildi",
                            description: "To'lov muvaffaqiyatli qo'shildi",
                        });
                        setIsModalOpen(false);
                        form.resetFields();
                        refetch();
                    },
                    onError: () => {
                        api.error({
                            message: "Muvaffaqiyatsiz",
                            description: "Xatolik yuz berdi",
                        });
                    },
                });
            })
            .catch(() => {});
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSearchUser("");
        setSelectedGroupId("");
        form.resetFields();
    };
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
                    O'quvchi haqida
                </Title>
                <Row style={{ gap: "10px" }}>
                    <Button type="default" icon={<DeleteSvg />}>
                        O'chirish
                    </Button>
                    <Button
                        type="default"
                        icon={<EditSvg />}
                        onClick={() =>
                            navigate(`/admin/students/${data?.data.user_id}`)
                        }
                    >
                        Tahrirlash
                    </Button>
                    <Button
                        type="default"
                        icon={<PaySvg />}
                        onClick={handlePayment}
                    >
                        To'lov qilish
                    </Button>
                </Row>
            </Col>
            <Row
                style={{
                    gap: "20px",
                    padding: "30px 20px",
                }}
            >
                <Col
                    style={{
                        width: "49%",
                        height: "455px",
                        border: "1px solid var(--qidiruv-tizimi-1)",
                        borderRadius: "5px",
                        padding: "20px ",
                    }}
                >
                    <div
                        style={{
                            margin: "0 auto",
                            width: "200px",
                            height: "200px",
                            marginBottom: "20px",
                        }}
                    >
                        <Image src={data?.data.images[0]?.url ?? defaultUser} />
                    </div>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        To'liq ismi:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.full_name}
                        </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        Telfon raqami:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.phone_number}
                        </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        Yashash manzili:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.address}
                        </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        Tug'ilgan sana:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.data_of_birth}
                        </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        Jinsi:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.gender == "MALE"
                                ? "O'g'il bola"
                                : "Qiz bola"}
                        </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                        style={{
                            fontSize: "18px",
                            display: "block",
                            paddingBottom: "5px",
                        }}
                    >
                        Username:{" "}
                        <Typography.Text
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                        >
                            {data?.data.username}
                        </Typography.Text>
                    </Typography.Text>
                </Col>
                <Col style={{ width: "49%" }}>
                    <Card
                        title="Guruhlar"
                        variant="borderless"
                        style={{
                            border: "1px solid var(--qidiruv-tizimi-1)",
                            marginBottom: "15px",
                            overflowX: "hidden",
                        }}
                    >
                        <Table<IGroupMember>
                            style={{ height: "220px" }}
                            scroll={{ y: 180 }}
                            sticky
                            pagination={false}
                            columns={columnsGroup}
                            dataSource={data?.data.group_members}
                        />
                    </Card>
                    <Card
                        title="To'lovlar"
                        variant="borderless"
                        style={{
                            border: "1px solid var(--qidiruv-tizimi-1)",

                            overflowX: "hidden",
                        }}
                    >
                        <Table<IPaymentForStudent>
                            style={{ height: "240px" }}
                            scroll={{ y: 200 }}
                            sticky
                            pagination={false}
                            columns={columnsPayment}
                            dataSource={data?.data.PaymentForStudent}
                        />
                    </Card>
                </Col>
            </Row>
            <Modal
                title="To'lov qilish"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Tasdiqlash"
                cancelText="Bekor qilish"
            >
                <Form form={form} layout="vertical">
                    <Input
                        placeholder="O‘quvchi ismini yozing"
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                    />
                    <div
                        style={{
                            marginTop: 10,
                            maxHeight: 200,
                            height: "200px",
                            border: "1px solid var(--qidiruv-tizimi-1)",
                            borderRadius: "5px",
                            overflowY: "auto",
                            padding: "10px",
                        }}
                    >
                        {getAllGroup?.data ? (
                            <List
                                dataSource={getAllGroup.data}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{
                                            backgroundColor:
                                                selectedGroupId ===
                                                item.group_id
                                                    ? "#e6f7ff"
                                                    : "",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            setSelectedGroupId(item.group_id)
                                        }
                                    >
                                        {item.name} ({item.description})
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <Spin />
                        )}
                    </div>

                    <Form.Item
                        label="To'lov turi"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: "To'lov turini kiriting",
                            },
                        ]}
                    >
                        <Select placeholder="To'lov turini tanlang">
                            <Select.Option value="CASH">Naqd</Select.Option>
                            <Select.Option value="CREDIT_CARD">
                                Karta
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="To'lov summasi"
                        name="sum"
                        rules={[
                            { required: true, message: "Summani kiriting" },
                        ]}
                    >
                        <Input type="number" placeholder="Miqdorni kiriting" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
