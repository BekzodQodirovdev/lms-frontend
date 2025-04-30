import { request } from "../../../../config/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { IGetGroupInterface } from "../../../../types/interface/group";

const useGetAllGroups = (
    page: number,
    limit: number,
    start_date: string | undefined,
    status: string | undefined,
    name: string | undefined
) => {
    return useQuery({
        queryKey: ["group_", page, limit, start_date, status, name],
        queryFn: () =>
            request
                .get<IGetGroupInterface>(`/groups`, {
                    params: {
                        page,
                        limit,
                        start_date,
                        status,
                        name,
                    },
                })
                .then((res) => res.data),
    });
};

export default useGetAllGroups;
