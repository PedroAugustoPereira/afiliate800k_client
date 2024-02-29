import { create } from 'zustand';

export interface User {
   _id: string;
   email: string;
   password?: string;
   products?: string[];
   name?: string;
   imagePerfil?: string;
   role?: string;
   firstTime?: boolean;
   createdAt?: string;
   updatedAt?: string;
   saldo: string;
   saldoFicticio: string;
   fake1?: boolean;
   fake2?: boolean;
}

export interface UseUser {
   user: User | null;
   setUser: (data: User | null) => void;
}

const useUser = create<UseUser>((set) => ({
   user: { _id: '', email: '', password: '', products: [], role: '' },
   setUser: (data: User | null) => set(() => ({ user: data })),
}));

export default useUser;
