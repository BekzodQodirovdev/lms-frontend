import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export interface FieldTypeCourse {
    name: string;
    description: string;
    duration: number;
    status: "ACTIVE" | "INACTIVE";
}

export const useEditcourses = (id: string) => {
    return useMutation({
        mutationFn: (data: FieldTypeCourse) =>
            request.patch(`/courses/${id}`, data).then((data) => data.data),
    });
};
