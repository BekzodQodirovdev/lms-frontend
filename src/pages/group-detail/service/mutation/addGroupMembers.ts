import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export interface IAddGroupMembers {
    groupId: string;
    userId: string;
}

export const useAddMembers = () => {
    return useMutation({
        mutationFn: (data: IAddGroupMembers) =>
            request.post("/group-members", data).then((res) => res.data),
    });
};
