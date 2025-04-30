export interface IGetCourseInterface {
    status: number;
    message: string;
    data: ICourse[];
}
export interface ICourse {
    course_id: string;
    name: string;
    description: string;
    duration: string;
    status: string;
    created_at: string;
    updated_at: string;
}
