import { request } from "../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetCourseInterface } from "../../../types/interface/getCourserOne.interface";

export const useGetAllCoursesWGroupNew = () => {
    return useQuery({
        queryKey: ["allCourseWGroupNew"],
        queryFn: () =>
            request
                .get<IGetCourseInterface>("courses/all")
                .then((res) => res.data),
    });
};
