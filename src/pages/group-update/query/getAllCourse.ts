import { request } from "../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetCourseInterface } from "../../../types/interface/getCourser.interface";

export const useGetAllCourses = () => {
    return useQuery({
        queryKey: ["allCourse"],
        queryFn: () =>
            request
                .get<IGetCourseInterface>("courses/all")
                .then((res) => res.data),
    });
};
