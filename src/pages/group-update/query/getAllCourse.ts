import { request } from "../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetCourseInterface } from "../../../types/interface/getCourserOne.interface";

export const useGetAllCoursesWGroup = () => {
    return useQuery({
        queryKey: ["allCourseWGroup"],
        queryFn: () =>
            request
                .get<IGetCourseInterface>("courses/all")
                .then((res) => res.data),
    });
};
