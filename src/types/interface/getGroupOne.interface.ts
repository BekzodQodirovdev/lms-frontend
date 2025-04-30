import { IStudetn } from "./student.interface";
import { ITeacher } from "./teachers.interface";

export interface IGetGroupByIdInterface {
    status: number;
    message: string;
    data: IGroup;
}

export interface IGroupMember {
    group_members_id: string;
    group_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    user: IStudetn;
}

export interface IGroup {
    group_id: string;
    name: string;
    description: string;
    course_id: string;
    teacher_id: string;
    status: string;
    teacher: ITeacher;
    group_members: IGroupMember[];
    start_date: string;
    created_at: string;
    updated_at: string;
}
