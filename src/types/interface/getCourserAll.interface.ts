import { ICourse } from "./getCourserOne.interface";

export interface IGetCourseInterfaceAll {
    status: number;
    message: string;
    data: ICourse[];
    meta: IMeta;
}

export interface IMeta {
    total: number;
}
