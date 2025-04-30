import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { FieldTypeGroup } from "../../../types/interface/getGroup.interface";

export const useCreateGroup = () => {
    return useMutation({
        mutationFn: (groupData: FieldTypeGroup) =>
            request.post("/groups", groupData),
    });
};
