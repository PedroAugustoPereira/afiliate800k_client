import { useEffect, useState } from 'react';

import { Modal } from 'flowbite-react';
import ReactLoading from 'react-loading';

import useRefetch from '@/states/refetch';

interface Modal {
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
   value: string;
}

const Popup = ({ isOpen, setIsOpen, value }: Modal) => {
   const [modalOut, setModalOut] = useState(false);
   const [loading, setLoading] = useState(true);
   const [refetch, setRefetch] = useRefetch((state) => [
      state.refetch,
      state.setRefetch,
   ]);

   const handleClose = () => {
      setModalOut(true);
      setRefetch(true);

      setTimeout(() => {
         setIsOpen(false);
         setModalOut(false);
      }, 500);
   };

   useEffect(() => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 2000);
   }, [isOpen]);

   return (
      <>
         {isOpen && (
            <div
               className={`fixed inset-0 z-50 overflow-y-auto bg-[#0000001f] h-full min-h-screen flex justify-center items-center  ${
                  isOpen && 'modal'
               } ${modalOut && 'out'}`}
               aria-labelledby="modal-title"
               role="dialog"
               aria-modal="true"
            >
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 p-0 items-center w-full">
                  <div
                     className="inset-0 h-auto shadow-2 bg-white transition-opacity w-10/12 pb-10 rounded-lg"
                     aria-hidden="true"
                  >
                     {/* Header Modal */}
                     <div className="p-4  flex flex-col justify-start">
                        <div className="w-full flex  items-center">
                           <div
                              onClick={handleClose}
                              className="ml-1 cursor-pointer"
                           >
                              <i className="fa-regular fa-arrow-left text-lg"></i>
                           </div>
                        </div>
                     </div>

                     {loading ? (
                        <div className="w-full flex justify-center items-center">
                           <ReactLoading
                              type={'spin'}
                              color={'#6358DC'}
                              height={100}
                              width={100}
                           />
                        </div>
                     ) : (
                        <div>
                           <h2 className="text-center font-bold text-xl mb-5">
                              Parabéns!
                           </h2>

                           <p>
                              Você recebeu R$ {value} por recomendar esse
                              produto!
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Popup;
