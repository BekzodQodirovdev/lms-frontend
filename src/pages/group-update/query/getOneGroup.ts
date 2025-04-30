import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/axios-instance";

export const useGetOneGroup = (id: string) => {
    return useQuery({
        queryKey: ["getOneGroup", id],
        queryFn: () => request.get(`groups/${id}`).then((res) => res.data),
    });
};
