import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";
import { IGetOneTeachersInterface } from "../../../../types/interface/teachers.interface";

export const useGetTeacherOne = (id: string) => {
    return useQuery({
        queryKey: [`getTeacher_detail_${id}`],
        queryFn: () =>
            request
                .get<IGetOneTeachersInterface>(`/teacher/${id}`)
                .then((res) => res.data),
    });
};
