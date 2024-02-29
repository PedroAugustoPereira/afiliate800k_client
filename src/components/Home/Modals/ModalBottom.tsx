import '@/styles/Modal.scss';

import {
  ReactNode,
  useState,
} from 'react';

interface Modal {
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
   children: ReactNode;
}

const ModalBottom = ({ isOpen, setIsOpen, children }: Modal) => {
   const [modalOut, setModalOut] = useState(false);

   const handleClose = () => {
      setModalOut(true);

      setTimeout(() => {
         setIsOpen(false);
         setModalOut(false);
      }, 500);
   };

   return (
      <>
         {isOpen && (
            <div
               className={`fixed inset-0 z-50 overflow-y-auto ${
                  isOpen && 'modal'
               } ${modalOut && 'out'}`}
               aria-labelledby="modal-title"
               role="dialog"
               aria-modal="true"
            >
               <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                     className="fixed inset-0 bg-white transition-opacity"
                     aria-hidden="true"
                  >
                     {/* Header Modal */}
                     <div className="p-4  flex flex-col justify-start bg-[#f3f3f3]">
                        <div className="w-full flex  items-center">
                           <div
                              onClick={handleClose}
                              className="ml-1 cursor-pointer"
                           >
                              <i className="fa-regular fa-arrow-left text-lg"></i>
                           </div>
                        </div>
                     </div>
                     {children}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default ModalBottom;
