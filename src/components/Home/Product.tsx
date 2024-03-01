import { useEffect, useState } from 'react';

import productService from '@/services/productService';
import useUser from '@/states/user';

interface propsProduct {
   id: string;
}

interface Produto {
   _id: string;
   name: string;
   price: number;
   comission: number;
   checkout: string;
   description: string;
   imageMain: string;
   imageEmpire: string;
   createdByUser: [];
   sales?: [];
   affiliates?: string[];
   revenue?: number;
   createdAt?: string;
   updatedAt?: string;
   ref?: string;
}

const Product = ({ id }: propsProduct) => {
   const [productState, setProductState] = useState<Produto | null>(null);
   const [refetch, setRefetch] = useState(false);
   const [user] = useUser((state) => [state.user]);

   async function newAfiliate(e: React.MouseEvent<HTMLButtonElement>) {
      const id = e.currentTarget.id;
      const newAfiliate = await productService.afiliate(id);

      if (newAfiliate) {
         setRefetch(true);
      }
   }

   async function getProduct(id: string) {
      const product = await productService.getProduct(id);

      if (product) {
         console.log(product);
         setProductState(product.data.data);
      }
   }

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(
            productState?.checkout + '?ref=' + productState?.ref
         );
         alert('copiado com sucesso!');
      } catch (err) {
         alert('erro ao copiar');
      }
   };

   useEffect(() => {
      getProduct(id);
      setRefetch(false);
   }, [id, refetch]);

   return (
      <>
         <div className="w-full flex justify-center pb-6">
            <div className="w-11/12 flex justify-center flex-col">
               {productState !== null ? (
                  <>
                     {/* Imagem */}
                     <div className="flex justify-center">
                        <img
                           src={`https://afiliate800k-api.onrender.com/api/images/${productState.imageMain}`}
                           alt=""
                           className="w-11/12"
                        />
                     </div>

                     <div>
                        <p className="text-left mt-3 text-xl">
                           {productState?.name}
                        </p>
                        <p className="text-left mt-1 text-slate-600">
                           Checkout: {productState?.checkout}
                        </p>
                     </div>

                     <div className="mt-5 ">
                        <p className="text-left mt-1 text-slate-600 ">
                           De <span className="line-through">R$ 443,33</span>
                        </p>
                        <p className="text-left text-xl font-medium">
                           Por R$ {productState.price}
                        </p>

                        <p className="text-left text-2xl mt-2">
                           <span className=" text-primary bg-[#5e04d026] font-medium rounded  px-2">
                              <b>R$ {productState.comission}</b> de comissão
                           </span>
                        </p>

                        <div className="w-full mt-4">
                           {productState !== null &&
                           user !== null &&
                           !productState.affiliates?.includes(user._id) ? (
                              <button
                                 onClick={newAfiliate}
                                 id={productState._id}
                                 className="w-full rounded-3xl bg-primary text-white text-center p-2 text-xl"
                              >
                                 Afiliar-se
                              </button>
                           ) : (
                              <>
                                 <p className="text-left mb-3">
                                    Seu link:{' '}
                                    <b className="text-blue-500 underline">
                                       {productState.checkout}?ref=
                                       {productState?.ref}
                                    </b>
                                 </p>
                                 <button
                                    onClick={copyToClipboard}
                                    id={productState._id}
                                    className="w-full rounded-3xl bg-primary text-white text-center p-2 text-xl mb-4"
                                 >
                                    Copiar meu link
                                 </button>
                                 <button className="w-full rounded-3xl bg-[#ccc] text-black text-center p-2 text-xl">
                                    Cancelar afilização
                                 </button>
                              </>
                           )}
                        </div>
                     </div>

                     <div className="mt-6">
                        <div className="py-3 border-b-2 border-[#f3f3f3]">
                           <p className="font-medium text-xl text-left">
                              Informções do produto
                           </p>
                        </div>

                        <div className="py-3 border-b-2 border-[#f3f3f3]">
                           <p className="text-lg font-medium text-left">
                              Descrição do produto
                           </p>

                           <p className="text-left text-slate-600 text-md mt-2">
                              {productState.description}
                           </p>
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <div>
                        <p>Carregando</p>
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Product;
