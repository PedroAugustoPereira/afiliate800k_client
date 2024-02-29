import '@/styles/Afiliate.scss';

import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import ModalLeft from '@/components/Home/Modals/ModalLeft';
import Product from '@/components/Home/Product';
import userService from '@/services/userService';

import { produtosDemonstrativos } from './Home';

const Afiliate = () => {
   const [products, setProducts] = useState<produtosDemonstrativos[]>([]);
   const navigate = useNavigate();
   const [isModalProduct, setIsModalProduct] = useState(false);
   const [idProduct, setIdProdcut] = useState<string>('');

   function openModal(id: string) {
      setIdProdcut(id);
      setIsModalProduct(true);
   }

   const getProducts = async () => {
      const produtos = await userService.getAfiliatedProducts();

      if (produtos.data) {
         console.log(produtos);
         setProducts(produtos.data.data);
      }
   };

   useEffect(() => {
      getProducts();
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
                     <p className="text-lg font-medium">
                        Produtos que estou Afiliado
                     </p>
                  </div>
               </div>
            </div>

            <div className="p-4 flex w-full mt-2 gap-3 flex-col">
               {products.length > 0 ? (
                  products.map((produto) => (
                     <div
                        onClick={() => openModal(produto._id)}
                        id={produto._id}
                        className="flex  justify-between items-center w-full shadow shadow-primary rounded p-4 "
                     >
                        <div className="flex flex-col">
                           <p className="text-md font-medium">{produto.name}</p>
                           <p className="text-sm text-slate-700 text-left">
                              R$ {produto.comission}
                           </p>
                        </div>
                        <div>
                           <i className="fa-light fa-chevron-right text-lg  text-primary"></i>
                        </div>
                     </div>
                  ))
               ) : (
                  <div>
                     <p>Carregando</p>
                  </div>
               )}
            </div>

            <ModalLeft
               nameMain={'Descrição do produto'}
               isOpen={isModalProduct}
               setIsOpen={setIsModalProduct}
            >
               <Product id={idProduct} />
            </ModalLeft>
         </main>
      </>
   );
};

export default Afiliate;
