import { create } from 'zustand';

export type DataMenu = {
   page: string;
   isRepeat: boolean;
};

export type UseMenu = {
   dataMenu: DataMenu;

   setDataMenu: (data: DataMenu) => void;
};

const useMenu = create<UseMenu>((set) => ({
   dataMenu: { page: 'Produtos', isRepeat: false },
   setDataMenu: (data: DataMenu) => set(() => ({ dataMenu: data })),
}));

export default useMenu;
