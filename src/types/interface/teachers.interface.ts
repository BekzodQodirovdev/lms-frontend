import { Dayjs } from "dayjs";
import { ImagesI } from "./dashboard";

export interface IGetTeachersInterface {
    status: number;
    message: string;
    data: ITeacher[];
    meta: IMeta;
}

export interface IGetOneTeachersInterface {
    status: number;
    message: string;
    data: ITeacher;
}

export interface ITeacher {
    full_name: string;
    username: string;
    password: string;
    role: string;
    address: string;
    phone_number: string;
    gender: string;
    data_of_birth: string;
    created_at: string;
    updated_at: string;
    user_id: string;
    images: ImagesI[];
    groups: ITeacherGroup[];
    PaymentForTeacher: IPaymentForTeacher[];
}


export interface ITeacherGroup {
    course_id: string;
    created_at: string;
    description: string;
    group_id: string;
    name: string;
    start_date: string;
    status: string;
    teacher_id: string;
    updated_at: string;
}

export interface IPaymentForTeacher {
    created_at: string;
    payment_id: string;
    sum: number;
    teacher_id: string;
    type: string;
    updated_at: string;
}

export interface IMeta {
    teacherCount: number;
}
export type FieldTypeTeacher = {
    firstname: string;
    lastname: string;
    surname: string;
    password: string;
    username: string;
    gender: string;
    address: string;
    phone_number: string;
    data_of_birth: Dayjs;
};
