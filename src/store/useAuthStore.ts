import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserT } from "../types/interface";

interface DataT {
    user: UserT;
    token: string | null;
    setUser: (user: UserT) => void;
    setToken: (token: string) => void;
}

export const useAuthStore = create<DataT>()(
    persist(
        (set) => ({
            user: {},
            token: null,
            setUser: (user: UserT) => set({ user: user }),
            setToken: (token: string) => set({ token }),
        }),
        {
            name: "auth",
        }
    )
);
