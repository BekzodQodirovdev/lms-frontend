import { request } from "../../../config/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { FieldTypeGroup } from "../../../types/interface/getGroup.interface";

export const useUpdateGroup = (id: string) => {
    return useMutation({
        mutationFn: (groupData: Omit<FieldTypeGroup, "start_date">) =>
            request.put(`/groups/${id}`, groupData),
    });
};
