import '@/styles/Admin.scss';

import { useState } from 'react';

import useMenu from '@/states/Admin/menu';

const HeaderLeft = () => {
   const [{ page }, setDataMenu] = useMenu((state) => [
      state.dataMenu,
      state.setDataMenu,
   ]);
   const [activeOption, setActiveOption] = useState(page);

   const handleClick = (option: string) => {
      //setSelectedOption(option);
      setDataMenu({ page: option, isRepeat: page === option });
      setActiveOption(option);
   };

   return (
      <>
         <div className="h-full w-full bg-white rounded shadow">
            <div className="p-6 topHeader">
               <h1 className="font-bold text-primary text-center text-2xl">
                  Afiliados800k
               </h1>
            </div>

            <div className="py-2">
               {/*todos items do menu aqui */}

               {/* Produtos */}
               <div
                  onClick={() => handleClick('Produtos')}
                  className={`pl-6 ml-1 border-l-4 flex items-center rounded cursor-pointer transition-colors duration-200 ${
                     activeOption === 'Produtos'
                        ? 'border-primary text-white'
                        : ''
                  }`}
               >
                  <div
                     className={`p-2 w-11/12 rounded ${
                        activeOption === 'Produtos'
                           ? 'bg-primary text-white'
                           : ''
                     }`}
                  >
                     <p className="text-left text-md pl-2">
                        <i className="fa-duotone fa-grid mr-2"></i> Produtos
                     </p>
                  </div>
               </div>

               {/* Dashboard */}
               <div
                  onClick={() => handleClick('Featured')}
                  className={`pl-6 ml-1 border-l-4 flex items-center rounded cursor-pointer transition-colors duration-200 ${
                     activeOption === 'Featured'
                        ? 'border-primary text-white'
                        : ''
                  }`}
               >
                  <div
                     className={`p-2 w-11/12 rounded ${
                        activeOption === 'Featured'
                           ? 'bg-primary text-white'
                           : ''
                     }`}
                  >
                     <p className="text-left text-md pl-2">
                        <i className="fa-regular fa-gauge mr-2"></i>
                        Produtos em destaque
                     </p>
                  </div>
               </div>

               {/* Dashboard */}
               <div
                  onClick={() => handleClick('Dashboard')}
                  className={`pl-6 ml-1 border-l-4 flex items-center rounded cursor-pointer transition-colors duration-200 ${
                     activeOption === 'Dashboard'
                        ? 'border-primary text-white'
                        : ''
                  }`}
               >
                  <div
                     className={`p-2 w-11/12 rounded ${
                        activeOption === 'Dashboard'
                           ? 'bg-primary text-white'
                           : ''
                     }`}
                  >
                     <p className="text-left text-md pl-2">
                        <i className="fa-regular fa-gauge mr-2"></i>
                        Dashboard
                     </p>
                  </div>
               </div>

               {/* Dashboard */}
               <div
                  onClick={() => handleClick('Usuarios')}
                  className={`pl-6 ml-1 border-l-4 flex items-center rounded cursor-pointer transition-colors duration-200 ${
                     activeOption === 'Usuarios'
                        ? 'border-primary text-white'
                        : ''
                  }`}
               >
                  <div
                     className={`p-2 w-11/12 rounded ${
                        activeOption === 'Usuarios'
                           ? 'bg-primary text-white'
                           : ''
                     }`}
                  >
                     <p className="text-left text-md pl-2">
                        <i className="fa-regular fa-gauge mr-2"></i>
                        Usuários
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default HeaderLeft;
