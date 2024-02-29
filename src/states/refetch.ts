import { create } from 'zustand';

export interface fetch {
   state: boolean;
}

export interface useRefetch {
   refetch: fetch;
   setRefetch: (data: boolean) => void;
}

const useRefetch = create<useRefetch>((set) => ({
   refetch: { state: false },
   setRefetch: (data: boolean) => set(() => ({ refetch: { state: data } })),
}));

export default useRefetch;
