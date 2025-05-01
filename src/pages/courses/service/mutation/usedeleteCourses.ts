import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export const useDeletecourses = () => {
    return useMutation({
        mutationFn: (id: string) =>
            request.delete(`/courses/${id}`).then((data) => data.data),
    });
};
