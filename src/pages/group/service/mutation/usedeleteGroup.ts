import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export const useDeleteGroup = () => {
    return useMutation({
        mutationFn: (id: string) =>
            request.delete(`/groups/${id}`).then((data) => data.data),
    });
};
