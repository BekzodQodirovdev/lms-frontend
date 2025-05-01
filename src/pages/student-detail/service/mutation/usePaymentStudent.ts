import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/axios-instance";

export interface PaymentStudent {
    type: "CASH" | "CREDIT_CARD";
    sum: number;
    student_id: string;
    group_id: string;
}

export const usePaymentStudent = () => {
    return useMutation({
        mutationFn: (data: PaymentStudent) =>
            request.post(`/payment-student`, data),
    });
};
