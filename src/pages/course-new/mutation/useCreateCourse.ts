import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

export interface FieldTypeCourse {
    name: string;
    description: string;
    duration: number;
    status: "ACTIVE" | "INACTIVE";
}

export const useCreateCourse = () => {
    return useMutation({
        mutationFn: (courseData: FieldTypeCourse) =>
            request.post("/courses", courseData),
    });
};
