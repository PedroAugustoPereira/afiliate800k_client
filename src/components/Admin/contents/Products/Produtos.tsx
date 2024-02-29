import { useEffect, useState } from 'react';

import useMenu from '@/states/Admin/menu';

import AddProduct from './AddProduct';
import ShowProducts from './ShowProducts';

const Produtos = () => {
   const [showForm, setShowForm] = useState(false);
   const [{ isRepeat }] = useMenu((state) => [state.dataMenu]);

   useEffect(() => {
      if (isRepeat) {
         setShowForm(false);
      }
   }, [isRepeat]);

   return (
      <>
         {showForm ? (
            <AddProduct setShowForm={setShowForm} />
         ) : (
            <>
               <ShowProducts />
               <div className="mt-4 ">
                  <button
                     onClick={() => setShowForm(true)}
                     type="button"
                     className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                  >
                     <i className="fa-solid fa-plus"></i> Adicionar Produto
                  </button>
               </div>
            </>
         )}
      </>
   );
};

export default Produtos;
