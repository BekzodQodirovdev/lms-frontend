import { request } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetCourseInterfaceAll } from "../../../../types/interface/getCourserAll.interface";

export const useGetAllCourses = (
    page: number,
    limit: number,
    name: string | undefined,
    status: "ACTIVE" | "INACTIVE" | undefined
) => {
    return useQuery({
        queryKey: ["courses_", page, limit, name, status],
        queryFn: () =>
            request
                .get<IGetCourseInterfaceAll>(
                    `/courses?page=${page}&limit=${limit}`,
                    {
                        params: {
                            name,
                            status,
                        },
                    }
                )
                .then((res) => res.data),
    });
};
