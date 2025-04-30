import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/axios-instance";
import { IGetOneTeachersInterface } from "../../../types/interface/teachers.interface";

export const useGetTeacher = (id: string) => {
    return useQuery({
        queryKey: [`teacher_${id}`],
        queryFn: () =>
            request
                .get<IGetOneTeachersInterface>(`teacher/${id}`)
                .then((data) => data.data),
    });
};
