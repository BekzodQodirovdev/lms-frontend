import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";
import { IGetGroupByIdInterface } from "../../../../types/interface/getGroupOne.interface";

export const useGetGroupOne = (id: string) => {
    return useQuery({
        queryKey: [`getGroup_detail_${id}`],
        queryFn: () =>
            request
                .get<IGetGroupByIdInterface>(`/groups/${id}`)
                .then((res) => res.data),
    });
};
