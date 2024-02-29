import '@/styles/ModalLeft.scss';

import {
  ReactNode,
  useState,
} from 'react';

interface Modal {
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
   children: ReactNode;
   nameMain: string;
}

const ModalLeft = ({ isOpen, setIsOpen, children, nameMain }: Modal) => {
   const [modalOut, setModalOut] = useState(false);
   // const [user, setUser] = useUser((state) => [state.user, state.setUser]);

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
               style={{ maxWidth: '600px', margin: '0 auto' }}
               className={`fixed inset-0 z-50 overflow-y-auto h-full min-h-screen bg-white ${
                  isOpen && 'modal-left'
               } ${modalOut && 'out-left'}`}
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
                     <div className="p-4  flex flex-col justify-start">
                        <div className="w-full flex  items-center gap-5">
                           <div
                              onClick={handleClose}
                              className="ml-1 cursor-pointer"
                           >
                              <i className="fa-regular fa-arrow-left text-lg"></i>
                           </div>

                           <div>
                              <p className="text-lg font-medium">{nameMain}</p>
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

export default ModalLeft;
