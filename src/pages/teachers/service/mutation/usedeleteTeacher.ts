import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export const useDeleteTeacher = () => {
    return useMutation({
        mutationFn: (id: string) =>
            request.delete(`/teacher/${id}`).then((data) => data.data),
    });
};
