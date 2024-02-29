import { useState } from 'react';

import perfil from '@/assets/perfil2.png';
import useUser from '@/states/user';

import ModalLeft from '../Modals/ModalLeft';
import Config from './Config';

const Account = () => {
   const [user] = useUser((state) => [state.user]);
   const [modalLeftOpen, setModalLeftOpen] = useState(false);

   return (
      <>
         <div className="flex gap-5  bg-[#f3f3f3] p-4 pt-6">
            {/* imagem */}
            <div>
               <img
                  src={
                     user?.imagePerfil
                        ? `https://afiliate800k-api.vercel.app/api/images/${user?.imagePerfil}`
                        : perfil
                  }
                  className="w-14 h-14 rounded-full border-2 border-primary"
                  alt=""
               />
            </div>

            {/* Dados */}
            <div>
               <p className="font-semibold text-left">{user?.name}</p>
               <p className="text-sm">Email: {user?.email}</p>
            </div>
         </div>

         {/* itens */}
         <div>
            <div
               //    onClick={() => setModalLeftOpen(true)}
               className="w-full flex items-center justify-between p-5 border-b-2 border-[#f3f3f3]] "
            >
               <div
                  className="flex w-full items-center justify-start gap-5 cursor-pointer"
                  onClick={() => setModalLeftOpen(true)}
               >
                  <div>
                     <i className="fa-sharp fa-light fa-gear text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">Configurar</p>
                     <p className="text-sm text-slate-400 text-left">
                        Conta, pix, Perfil
                     </p>
                  </div>
               </div>

               <div>
                  <i className="fa-light fa-chevron-right text-lg"></i>
               </div>
            </div>

            <div className="w-full flex items-center justify-between p-5 border-b-2 border-[#f3f3f3]] ">
               <div className="flex w-full items-center justify-start gap-5">
                  <div>
                     <i className="fa-sharp fa-light fa-shield text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">Segurança</p>
                     {/* <p className="text-sm text-slate-400 text-left">
                                    Conta, pix, Perfil
                                 </p> */}
                  </div>
               </div>

               <div>
                  <i className="fa-light fa-chevron-right text-lg"></i>
               </div>
            </div>

            <div className="w-full flex items-center justify-between p-5 border-b-2 border-[#f3f3f3]] ">
               <div className="flex w-full items-center justify-start gap-5">
                  <div>
                     <i className="fa-regular fa-money-bill text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">Saques</p>
                     {/* <p className="text-sm text-slate-400 text-left">
                                    Conta, pix, Perfil
                                 </p> */}
                  </div>
               </div>

               <div>
                  <i className="fa-light fa-chevron-right text-lg"></i>
               </div>
            </div>
         </div>

         {/* sair */}
         <div className="p-4">
            <button className="w-full bg-[#f3f3f3] p-3 rounded-3xl font-medium text-center">
               <i className="fa-light fa-arrow-right-from-bracket"></i> Sair do
               aplicativo
            </button>
         </div>

         <ModalLeft
            nameMain={'Configurações'}
            isOpen={modalLeftOpen}
            setIsOpen={setModalLeftOpen}
         >
            <Config />
         </ModalLeft>
      </>
   );
};

export default Account;
