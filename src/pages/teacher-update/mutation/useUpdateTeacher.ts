import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";
export interface ICreateTeacherParams {
    full_name: string;
    username: string;
    img_url?: string;
    password: string;
    phone_number: string;
    address: string;
    gender: string;
    data_of_birth: string;
}

export const useUpdateTeacher = (id: string) => {
    return useMutation({
        mutationFn: (teacherData: ICreateTeacherParams) =>
            request.patch(`/teacher/${id}`, teacherData),
    });
};
