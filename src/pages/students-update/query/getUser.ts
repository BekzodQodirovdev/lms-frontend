import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/axios-instance";
import { IGetOneStudentInterface } from "../../../types/interface/student.interface";

export const useGetStudent = (id: string) => {
    return useQuery({
        queryKey: [`studet_${id}`],
        queryFn: () =>
            request
                .get<IGetOneStudentInterface>(`students/${id}`)
                .then((data) => data.data),
    });
};
