import { request } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetTeachersInterface } from "../../../../types/interface/teachers.interface";

const useGetAllTeacher = (
    page: number,
    limit: number,
    date_of_birth: string | undefined,
    gender: string | undefined,
    full_name: string | undefined
) => {
    return useQuery({
        queryKey: ["teacher_", page, limit, date_of_birth, gender, full_name],
        queryFn: () =>
            request
                .get<IGetTeachersInterface>(
                    `/teacher?page=${page}&limit=${limit}`,
                    {
                        params: {
                            date_of_birth,
                            gender,
                            full_name,
                        },
                    }
                )
                .then((res) => res.data),
    });
};

export default useGetAllTeacher;
