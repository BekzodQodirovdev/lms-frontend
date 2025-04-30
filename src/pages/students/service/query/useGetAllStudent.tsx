import { request } from "../../../../config/axios-instance";
import { IGetStudentInterface } from "../../../../types/interface/student.interface";
import { useQuery } from "@tanstack/react-query";

const useGetAllStudent = (
    page: number,
    limit: number,
    gender: string | undefined,
    data_of_birth: string | undefined,
    groupId: string | undefined,
    fullname: string | undefined
) => {
    return useQuery({
        queryKey: [
            "students_",
            page,
            limit,
            gender,
            data_of_birth,
            groupId,
            fullname,
        ],
        queryFn: () =>
            request
                .get<IGetStudentInterface>(
                    `/students?page=${page}&limit=${limit}`,
                    {
                        params: {
                            gender,
                            data_of_birth,
                            groupId,
                            fullname,
                        },
                    }
                )
                .then((res) => res.data),
    });
};

export default useGetAllStudent;
