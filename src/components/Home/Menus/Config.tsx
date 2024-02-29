import { useState } from 'react';

import ModalBottom from '@/components/Home/Modals/ModalBottom';

import Perfil from './Perfil';

const Config = () => {
   const [isModalPerfil, setIsModalPerfil] = useState(false);

   return (
      <>
         {/* itens */}
         <div>
            <div className="p-5">
               <p className="text-slate-500 text-sm font-medium text-left">
                  Aplicativo
               </p>
            </div>

            <div
               className="w-full flex items-center justify-between p-5 border-b-2 border-[#f3f3f3]"
               onClick={() => setIsModalPerfil(true)}
            >
               <div className="flex w-full items-center justify-start gap-5">
                  <div>
                     <i className="fa-light fa-user text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">
                        Editar dados do Perfil
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
                     <i className="fa-light fa-bell text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">Notificações</p>
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

            <div className="w-full flex items-center justify-between p-5 border-b-2 border-[#f3f3f3]] ">
               <div className="flex w-full items-center justify-start gap-5">
                  <div>
                     <i className="fa-brands fa-pix text-xl"></i>
                  </div>
                  <div>
                     <p className="font-medium text-left">
                        Configurar chaves pix
                     </p>
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

         <ModalBottom isOpen={isModalPerfil} setIsOpen={setIsModalPerfil}>
            <Perfil />
         </ModalBottom>
      </>
   );
};

export default Config;
