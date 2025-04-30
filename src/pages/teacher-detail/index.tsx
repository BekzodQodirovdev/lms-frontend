import {
    Button,
    Card,
    Col,
    Image,
    Row,
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
import { useGetTeacherOne } from "./service/query/getTeacher";
import {
    IPaymentForTeacher,
    ITeacherGroup,
} from "../../types/interface/teachers.interface";

///////////////GROUP////////////////

const columnsGroup: TableProps<ITeacherGroup>["columns"] = [
    {
        title: "#",
        key: "id",
        render: (_: any, __: ITeacherGroup, index: number) => index + 1,
    },
    {
        title: "Nomi",
        key: "name",
        render: (data: ITeacherGroup) => <p>{data.name}</p>,
    },
    {
        title: "Boshlangan sana",
        key: "start_date",
        render: (data: ITeacherGroup) => <p>{data.start_date.slice(0, 10)}</p>,
    },
    {
        title: "Holati",
        key: "status",
        render: (data: ITeacherGroup) => {
            return data.status == "ACTIVE" ? (
                <p style={{ color: "green" }}>{data.status}</p>
            ) : (
                <p style={{ color: "red" }}>{data.status}</p>
            );
        },
    },
];

///////////PAYMENT//////////////

const columnsPayment: TableProps<IPaymentForTeacher>["columns"] = [
    {
        title: "#",
        key: "id",
        render: (_: any, __: IPaymentForTeacher, index: number) => index + 1,
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
        render: (data: IPaymentForTeacher) => (
            <p>{data.created_at.slice(0, 10)}</p>
        ),
    },
];

///////////////////////////////

export const TeacherDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) {
        return "user not found";
    }
    const { data, isLoading } = useGetTeacherOne(id);
    if (isLoading) {
        return "Loading...";
    }
    console.log(data);
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
                    O'qituvchi haqida
                </Title>
                <Row style={{ gap: "10px" }}>
                    <Button type="default" icon={<DeleteSvg />}>
                        O'chirish
                    </Button>
                    <Button
                        type="default"
                        icon={<EditSvg />}
                        onClick={() =>
                            navigate(`/admin/teacher/${data?.data.user_id}`)
                        }
                    >
                        Tahrirlash
                    </Button>
                    <Button type="default" icon={<PaySvg />}>
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
                        }}
                    >
                        <Table<ITeacherGroup>
                            columns={columnsGroup}
                            dataSource={data?.data.groups}
                        />
                    </Card>
                    <Card
                        title="To'lovlar"
                        variant="borderless"
                        style={{
                            border: "1px solid var(--qidiruv-tizimi-1)",
                        }}
                    >
                        <Table<IPaymentForTeacher>
                            columns={columnsPayment}
                            dataSource={data?.data.PaymentForTeacher}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
