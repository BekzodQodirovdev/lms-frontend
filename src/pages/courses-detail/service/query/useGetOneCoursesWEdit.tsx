import { request } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { ICourse } from "../../../../types/interface/getCourserOne.interface";

export const useGetOneCoursesDetailEdit = (id: string) => {
    return useQuery({
        queryKey: ["courses_one_edit", id],
        queryFn: () =>
            request.get<ICourse>(`/courses/${id}`).then((res) => res.data),
    });
};
