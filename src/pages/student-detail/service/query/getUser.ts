import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";
import { IGetOneStudentInterface } from "../../../../types/interface/student.interface";

export const useGetUserOne = (id: string) => {
    return useQuery({
        queryKey: [`getUser_detail_${id}`],
        queryFn: () =>
            request
                .get<IGetOneStudentInterface>(`/students/${id}`)
                .then((res) => res.data),
    });
};
