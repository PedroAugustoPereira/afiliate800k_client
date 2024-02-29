import '@/styles/Afiliate.scss';

import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import saleService from '@/services/saleService';

import { produtosDemonstrativos } from './Home';

interface Sale {
   _id: string;
   refAfiliate: {
      product: produtosDemonstrativos;
   };

   createdAt: string;
}

const Sales = () => {
   const [sales, setSales] = useState<Sale[]>([]);

   const navigate = useNavigate();

   const getSales = async () => {
      const sale = await saleService.getAll();

      if (sale.data) {
         console.log(sale.data.data);
         setSales(sale.data.data);
      }
   };

   const formateDate = (date: string) => {
      const newDate = new Date(date);
      const formattedDate = format(newDate, 'dd/MM/yyyy');

      return formattedDate;
   };

   useEffect(() => {
      getSales();
   }, []);

   return (
      <>
         <main
            id="mainAfiliate"
            className="bg-white h-full relative over min-h-screen"
         >
            <div className="p-4  flex flex-col justify-start">
               <div className="w-full flex  items-center">
                  <div className="ml-1 cursor-pointer flex gap-7 items-center">
                     <i
                        onClick={() => navigate(-1)}
                        className="fa-regular fa-arrow-left text-lg"
                     ></i>
                     <p className="text-lg font-medium">Minhas vendas</p>
                  </div>
               </div>
            </div>

            <div className="p-4 flex w-full mt-2 gap-3 flex-col">
               {sales.length > 0 ? (
                  sales.map((sale) => (
                     <div
                        id={sale._id}
                        className="flex  justify-between items-center w-full shadow shadow-primary rounded p-4 "
                     >
                        <div className="flex flex-col">
                           <p className="text-md font-medium">
                              {sale.refAfiliate.product?.name}
                           </p>
                           <p className="text-sm text-slate-700 text-left text-green-700">
                              R$ {sale.refAfiliate.product?.comission}
                           </p>
                        </div>
                        <div>
                           <p>{formateDate(sale.createdAt)}</p>
                        </div>
                     </div>
                  ))
               ) : (
                  <div>
                     <p>Carregando</p>
                  </div>
               )}
            </div>
         </main>
      </>
   );
};

export default Sales;
