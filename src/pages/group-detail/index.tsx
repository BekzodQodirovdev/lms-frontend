import { Button, Card, Col, Image, Row, Table, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { DeleteSvg } from "../../assets/delete";
import { EditSvg } from "../../assets/edit";
import { PaySvg } from "../../assets/pay";
import defaultUser from "../../assets/user.png";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGroupOne } from "./service/query/getGroupOne";
import { IGroupMember } from "../../types/interface/student.interface";
import { useAddMembers } from "./service/mutation/addGroupMembers";
import useGetAllStudent from "../students/service/query/useGetAllStudent";
import { useState } from "react";
import { Modal, Input, List, Spin } from "antd";

export const GroupDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) return "User not found";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchUser, setSearchUser] = useState("");
    const { data, isLoading, refetch } = useGetGroupOne(id);
    const { mutate: addMember, isPending: memberPanding } = useAddMembers();
    const { data: studentData } = useGetAllStudent(
        1,
        10000,
        undefined,
        undefined,
        undefined,
        searchUser
    );

    if (isLoading) return "Loading...";

    const group = data?.data;

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setSearchUser("");
        setSelectedUserId(null);
    };

    return (
        <div>
            <Col
                style={{
                    padding: "22px 20px",
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
                    Guruh haqida
                </Title>
                <Row style={{ gap: "10px" }}>
                    <Button type="default" icon={<DeleteSvg />}>
                        O‘chirish
                    </Button>
                    <Button
                        type="default"
                        icon={<EditSvg />}
                        onClick={() =>
                            navigate(`/admin/group/${group?.group_id}`)
                        }
                    >
                        Tahrirlash
                    </Button>
                    <Button
                        type="default"
                        icon={<PaySvg />}
                        onClick={showModal}
                    >
                        O'quvchi biriktirish
                    </Button>
                </Row>
            </Col>

            <Row style={{ padding: "10px 20px" }}>
                <Card
                    style={{
                        border: "1px solid var(--qidiruv-tizimi-1)",
                        height: "240px",
                        width: "100%",
                    }}
                >
                    <Title style={{ textAlign: "center" }}>{group?.name}</Title>
                    <Typography.Paragraph
                        style={{ fontSize: "20px", textAlign: "center" }}
                    >
                        {group?.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                        style={{ fontSize: "20px", textAlign: "center" }}
                    >
                        {group?.start_date.slice(0, 10)}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                        style={{ fontSize: "20px", textAlign: "center" }}
                    >
                        {group?.status}
                    </Typography.Paragraph>
                </Card>
            </Row>

            <div style={{ padding: "0 20px" }}>
                <Row gutter={20}>
                    <Col span={10}>
                        <Card
                            style={{
                                border: "1px solid var(--qidiruv-tizimi-1)",
                                height: "100%",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <Image
                                    width={150}
                                    height={150}
                                    style={{ borderRadius: "50%" }}
                                    src={
                                        group?.teacher.images?.[0]?.url ??
                                        defaultUser
                                    }
                                />
                                <Title level={4} style={{ marginTop: "10px" }}>
                                    {group?.teacher.full_name}
                                </Title>
                            </div>
                            <Typography.Paragraph>
                                <strong>Username:</strong>{" "}
                                {group?.teacher.username}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <strong>Telefon:</strong>{" "}
                                {group?.teacher.phone_number}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <strong>Jinsi:</strong>{" "}
                                {group?.teacher.gender === "MALE"
                                    ? "O‘g‘il bola"
                                    : "Qiz bola"}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <strong>Manzil:</strong>{" "}
                                {group?.teacher.address}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <strong>Tug‘ilgan sana:</strong>{" "}
                                {group?.teacher.data_of_birth}
                            </Typography.Paragraph>
                        </Card>
                    </Col>

                    <Col span={14}>
                        <Card
                            title="Guruh a'zolari"
                            style={{
                                border: "1px solid var(--qidiruv-tizimi-1)",
                                overflowX: "hidden",
                            }}
                        >
                            <Table<IGroupMember>
                                pagination={false}
                                rowKey="group_members_id"
                                dataSource={group?.group_members?.map(
                                    (member) => ({
                                        ...member,
                                        group: group,
                                    })
                                )}
                                scroll={{ y: 300 }}
                                sticky
                                columns={[
                                    {
                                        title: "#",
                                        key: "index",
                                        render: (_, __, index) => index + 1,
                                    },
                                    {
                                        title: "F.I.O",
                                        key: "full_name",
                                        render: (record) =>
                                            record.user.full_name,
                                    },
                                    {
                                        title: "Telefon",
                                        key: "phone",
                                        render: (record) =>
                                            record.user.phone_number,
                                    },
                                    {
                                        title: "Username",
                                        key: "username",
                                        render: (record) =>
                                            record.user.username,
                                    },
                                    {
                                        title: "Jinsi",
                                        key: "gender",
                                        render: (record) =>
                                            record.user.gender === "MALE"
                                                ? "O‘g‘il bola"
                                                : "Qiz bola",
                                    },
                                ]}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Modal
                title="O'quvchi biriktirish"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={() => {
                    if (selectedUserId && id) {
                        addMember(
                            { groupId: id, userId: selectedUserId },
                            {
                                onSuccess: () => {
                                    refetch();
                                    handleCancel();
                                },
                            }
                        );
                    }
                }}
                okButtonProps={{ disabled: !selectedUserId || memberPanding }}
                okText="Biriktirish"
            >
                <Input
                    placeholder="O‘quvchi ismini yozing"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                />
                <div
                    style={{ marginTop: 10, maxHeight: 200, overflowY: "auto" }}
                >
                    {studentData?.data ? (
                        <List
                            dataSource={studentData.data}
                            renderItem={(item) => (
                                <List.Item
                                    style={{
                                        backgroundColor:
                                            selectedUserId === item.user_id
                                                ? "#e6f7ff"
                                                : "",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setSelectedUserId(item.user_id)
                                    }
                                >
                                    {item.full_name} ({item.phone_number})
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Spin />
                    )}
                </div>
            </Modal>
        </div>
    );
};
