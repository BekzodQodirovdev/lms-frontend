import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const useUpdateStudent = () => {
    return useMutation({
        mutationFn: ({
            studentData,
            id,
        }: {
            studentData: {
                full_name: string;
            };
            id: string;
        }) => request.patch(`/students/${id}`, studentData),
    });
};
