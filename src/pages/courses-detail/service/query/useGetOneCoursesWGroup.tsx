import { request } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGroup } from "../../../../types/interface/student.interface";

export const useGetOneCoursesDetail = (id: string) => {
    return useQuery({
        queryKey: ["courses_one_", id],
        queryFn: () =>
            request
                .get<IGroup[]>(`/courses/${id}/groups`)
                .then((res) => res.data),
    });
};
