import { Dayjs } from "dayjs";

export interface IGetGroupInterface {
    status: number;
    message: string;
    data: IGroup[];
    meta: IMeta;
}
export interface IGroup {
    group_id: string;
    name: string;
    description: string;
    course_id: string;
    teacher_id: string;
    status: string;
    start_date: string;
    created_at: string;
    updated_at: string;
}

export interface IMeta {
    totalCount: number;
}

export type FieldTypeGroup = {
    name: string;
    description: string;
    course_id: string;
    teacher_id: string;
    status: string;
    start_date: string | Dayjs;
};
