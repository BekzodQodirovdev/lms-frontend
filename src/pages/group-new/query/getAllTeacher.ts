import { request } from "../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetTeachersInterface } from "../../../types/interface/teachers.interface";

export const useGetAllTeachers = () => {
    return useQuery({
        queryKey: ["allTeacher"],
        queryFn: () =>
            request
                .get<IGetTeachersInterface>("teacher/for-group")
                .then((res) => res.data),
    });
};
