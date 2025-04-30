import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const useUploadImgTeacher = () => {
    return useMutation({
        mutationFn: (img: File) => {
            const formData = new FormData();
            formData.append("file", img);
            return request
                .post("/teacher/upload-image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data);
        },
    });
};
