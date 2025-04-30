import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export interface IPayment {
    type: string;
    sum: number;
    teacher_id: string;
}

export const usePaymentTeacher = () => {
    return useMutation({
        mutationFn: (data: IPayment) =>
            request.post("/payment-teacher", data).then((res) => res.data),
    });
};
