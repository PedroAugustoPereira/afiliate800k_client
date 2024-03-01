import '@/styles/Home.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/effect-coverflow';
import 'swiper/css/mousewheel';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/grid';

import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import mercado from '@/assets/mercado.png';
import panelas from '@/assets/panelas2.png';
import purificador from '@/assets/purificador.png';
import ModalBottom from '@/components/Home/Modals/ModalBottom';
import isLoggedIn from '@/middlewares/auth/isLoggedIn';
import featuredProductService from '@/services/featuredProduct';
import productService from '@/services/productService';
import userService from '@/services/userService';
import useRefetch from '@/states/refetch';
import useUser from '@/states/user';

import Popup from '../components/fake/Popup';
import Header from '../components/Home/Header';
import Account from '../components/Home/Menus/Account';
import ModalLeft from '../components/Home/Modals/ModalLeft';
import Product from '../components/Home/Product';

export interface produtosDemonstrativos {
   name?: string;
   price: string;
   description?: string;
   comission: string;
   imageMain?: string;
   imageEmpire?: string;
   _id: string;
}

export interface featuredDemonstrativos {
   _id: string;
   imageFeatured: string;
   product: produtosDemonstrativos;
}

const Home = () => {
   const [user, setUser] = useUser((state) => [state.user, state.setUser]);
   const [refetch, setRefetch] = useRefetch((state) => [
      state.refetch,
      state.setRefetch,
   ]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [isModalProduct, setIsModalProduct] = useState(false);
   const [idProduct, setIdProdcut] = useState<string>('');

   const [popupFake1, setPopupFake1] = useState(false);
   const [popupFake2, setPopupFake2] = useState(false);

   function openModal(id: string) {
      setIdProdcut(id);
      setIsModalProduct(true);
   }

   function priceComssion(preco: string, comissao: string) {
      const precoNumero = parseFloat(preco);
      const comissaoNumero = parseFloat(comissao);

      // Verifica se os valores são números positivos

      if (
         isNaN(precoNumero) ||
         isNaN(comissaoNumero) ||
         precoNumero < 0 ||
         comissaoNumero < 0
      ) {
         return 'Valores inválidos. Certifique-se de inserir números positivos.';
      }

      // Calcula o valor da comissão
      const valorComissao = (comissaoNumero / precoNumero) * 100;

      // Retorna o valor da comissão arredondado para 2 casas decimais
      return `${valorComissao.toFixed(2)}%`;
   }

   const [produtos, setPodutos] = useState<produtosDemonstrativos[]>([]);
   const [featuredProdutos, setFeaturedProdutos] = useState<
      featuredDemonstrativos[]
   >([]);

   useEffect(() => {
      const main = document.getElementById('content');
      if (isModalOpen) {
         if (main) {
            main?.classList.add('hidden');
         }
      } else {
         main?.classList.remove('hidden');
      }
   }, [isModalOpen]);

   const navigate = useNavigate();

   const getProducts = async () => {
      const products = await productService.getAll();
      const featureds = await featuredProductService.getAll();
      if (products.data && featureds.data) {
         setFeaturedProdutos(featureds.data.data);
         setPodutos(products.data.data);
      }
   };

   //verificar se o usuário está logado
   async function getLogin() {
      const getUser = await isLoggedIn();
      if (getUser) {
         setUser(getUser);
      } else {
         console.log('não logado');
         navigate('/login');
      }
   }

   async function newFake(valor: string, fake: string) {
      const numero = parseFloat(valor);
      const update = await userService.updateSaldoFake(fake, numero);
      console.log('');

      if (update) {
         setRefetch(true);
      }
   }

   useEffect(() => {
      getLogin();
      setRefetch(false);
   }, [refetch.state]);

   useEffect(() => {
      getLogin();
      getProducts();
   }, []);

   useEffect(() => {
      console.log(produtos);
   }, [produtos]);

   // const slides = [
   //    { id: 1, name: 'Nome 1', percentage: '10%' },
   //    { id: 2, name: 'Nome 2', percentage: '20%' },
   //    { id: 3, name: 'Nome 3', percentage: '30%' },
   //    { id: 4, name: 'Nome 4', percentage: '40%' },
   //    { id: 5, name: 'Nome 5', percentage: '40%' },
   //    { id: 6, name: 'Nome 6', percentage: '40%' },
   // ];

   return (
      <>
         {/* Tela princial */}
         <main id="main" className="bg-white h-full relative over">
            {/* Header */}
            <div>
               <Header setModalUser={setIsModalOpen} />
            </div>

            {/* Restante do App fica nessa div */}
            <div id="content" className="p-3 flex flex-col gap-3">
               {/* SearchBox */}
               <div className="w-full flex justify-center p-1 ">
                  <div className="relative w-full">
                     <input
                        type="text"
                        className="bg-[#f3f3f3] w-full backdrop-blur-sm  py-2 pl-10 pr-4 rounded-3xl focus:outline-none border-1 border-gray-100 focus:border-violet-300 transition-colors duration-300"
                        placeholder="Busque no Afiliados 800k"
                     />
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                           className="w-4 h-4 text-gray-800"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 20 20"
                        >
                           <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                           />
                        </svg>
                     </div>
                  </div>
               </div>
               {/* Seção meus produtos e saldo */}
               <div className="flex justify-between w-full gap-3">
                  <div
                     onClick={() => navigate('/afiliate')}
                     className="w-2/4 bg-[#f3f3f3] py-3 px-2 rounded-3xl"
                  >
                     <p className="text-md text-[#616161]">
                        <i className="fa-sharp fa-regular fa-toolbox"></i> Meus
                        Produtos
                     </p>
                  </div>

                  <div
                     className="w-2/4 bg-[#f3f3f3] py-3 px-2 rounded-3xl"
                     onClick={() => navigate('/sales')}
                  >
                     <p className="text-[#616161]">
                        <i className="fa-regular fa-money-check-dollar"></i> R$
                        {user
                           ? parseFloat(user.saldo) +
                             parseFloat(user.saldoFicticio)
                           : ''}
                     </p>
                  </div>
               </div>

               {/* Melhores da semana */}
               <div className="mt-3">
                  <h2 className="text-left text-lg font-bold">
                     Melhores Produtos da semana
                  </h2>

                  {/* Repeating group aqui: */}
                  <div className="flex gap-2 mt-4">
                     <Swiper
                        effect={'slide'}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        grabCursor={true}
                        coverflowEffect={{
                           rotate: 0,
                           slideShadows: false,
                        }}
                        className="coverflow w-full"
                        style={{ padding: '5px' }}
                     >
                        {featuredProdutos.length > 0 &&
                        featuredProdutos !== undefined ? (
                           featuredProdutos.map((produto) => (
                              <SwiperSlide
                                 style={{ width: '16.66666667%' }}
                                 className="w-1/6"
                                 key={produto.product._id}
                              >
                                 <div className="w-full flex justify-center items-center flex-col">
                                    <div className="w-12 h-12 rounded-3xl outline  outline-[#f3f3f3] flex justify-center items-center">
                                       <img
                                          src={`https://afiliate800k-api.onrender.com/api/images/${produto.product.imageEmpire}`}
                                          alt=""
                                       />
                                    </div>

                                    <p className="text-center text-sm mt-1">
                                       {produto.product.name}
                                    </p>
                                    <p className="font-bold text-center text-sm">
                                       {priceComssion(
                                          produto.product.price,
                                          produto.product.comission
                                       )}
                                    </p>
                                 </div>
                              </SwiperSlide>
                           ))
                        ) : (
                           <div>
                              <p>Nada aqui por enquanto</p>
                           </div>
                        )}
                     </Swiper>
                  </div>
               </div>

               {/* banners grandes que tem na tela             */}
               <div>
                  {/* Repeating group aqui: */}
                  <div className="flex gap-2 mt-4">
                     <Swiper
                        effect={'slide'}
                        loop={true}
                        spaceBetween={20}
                        slidesPerView={'auto'}
                        centeredSlides={false}
                        grabCursor={true}
                        coverflowEffect={{
                           rotate: 0,
                           slideShadows: false,
                        }}
                        className="coverflow w-full"
                     >
                        {featuredProdutos.length > 0 &&
                        featuredProdutos !== undefined ? (
                           featuredProdutos.map((produto) => (
                              <SwiperSlide
                                 className="w-6/6"
                                 key={produto.product._id}
                                 id={produto.product._id}
                              >
                                 <div
                                    key={produto.product._id}
                                    className="w-full flex justify-center items-center flex-col"
                                 >
                                    <div className="w-12/12">
                                       <img
                                          src={`https://afiliate800k-api.onrender.com/api/images/${produto.imageFeatured}`}
                                          alt=""
                                       />
                                    </div>
                                 </div>
                              </SwiperSlide>
                           ))
                        ) : (
                           <>
                              <div>
                                 <p>Nada aqui por enquanto</p>
                              </div>
                           </>
                        )}
                     </Swiper>
                  </div>
               </div>

               {/* Seção de produtos */}
               <div className="mt-2">
                  <h2 className="text-lg font-bold text-left">
                     Para se conectar hoje!
                  </h2>
                  <p className="text-left">Os melhores produtos!</p>

                  {/* <div className="w-full mt-3">
                     <img src={afiliados} alt="" />
                  </div> */}

                  {/* Produtos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                     <div className="max-w-sm rounded shadow-md overflow-hidden  m-2 relative">
                        <div className="px-6 py-4 bg-[#f3f3f3]">
                           <div className="relative">
                              <img src={purificador} alt="" />
                           </div>
                        </div>
                        <img
                           src={mercado}
                           className="absolute p-2 w-16 top-0"
                           alt=""
                        />
                        <div className="p-3">
                           {/* <div className="flex gap-3 items-center">
                                    <p className="text-gray-400 text-md text-left line-through ">
                                       R$ {product.price}
                                    </p>
                                    <p className="bg-[#f3f3f3] rounded p-1 text-sm text">
                                       <i className="fa-regular fa-arrow-down"></i>
                                       17%
                                    </p>
                                 </div> */}

                           <p className="text-left  text-lg font-semibold">
                              R$ 590,90
                           </p>
                           <p className="text-sm text-gray-400 text-left">
                              Em até 24x
                           </p>

                           <p className="text-left">
                              <span className="text-primary bg-[#5e04d026] font-bold rounded text-lg px-2">
                                 Você recebe R$ 59,09
                              </span>
                           </p>
                           <p className="text-left text-lg mt-2 text-slate-600">
                              Purificador de água
                           </p>

                           <div
                              className="mt-4"
                              onClick={() => {
                                 setPopupFake1(true);
                                 newFake('59.09', 'fake1');
                              }}
                           >
                              {user?.fake1 === true ? (
                                 <button className="w-full rounded-3xl bg-slate-300 text-slate-600 text-center p-2 text-xl mb-4">
                                    Você indicou este produto!
                                 </button>
                              ) : (
                                 <button className="w-full rounded-3xl bg-primary text-white text-center p-2 text-xl mb-4">
                                    Indicar
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="max-w-sm rounded shadow-md overflow-hidden  m-2 relative">
                        <div className="px-6 py-4 bg-[#f3f3f3]">
                           <div className="relative flex justify-center items-center">
                              <img src={panelas} alt="" />
                           </div>
                        </div>
                        <img
                           src={mercado}
                           className="absolute p-2 w-16 top-0"
                           alt=""
                        />
                        <div className="p-3">
                           {/* <div className="flex gap-3 items-center">
                                    <p className="text-gray-400 text-md text-left line-through ">
                                       R$ {product.price}
                                    </p>
                                    <p className="bg-[#f3f3f3] rounded p-1 text-sm text">
                                       <i className="fa-regular fa-arrow-down"></i>
                                       17%
                                    </p>
                                 </div> */}

                           <p className="text-left  text-lg font-semibold">
                              R$ 290,00
                           </p>
                           <p className="text-sm text-gray-400 text-left">
                              Em até 24x
                           </p>

                           <p className="text-left">
                              <span className="text-primary bg-[#5e04d026] font-bold rounded text-lg px-2">
                                 Você recebe R$ 29,00
                              </span>
                           </p>
                           <p className="text-left text-lg mt-2 text-slate-600">
                              Conjunto de panelas 10 peças tramontina
                           </p>

                           <div
                              className="mt-4"
                              onClick={() => {
                                 setPopupFake2(true);
                                 newFake('29.00', 'fake2');
                              }}
                           >
                              {user?.fake2 === true ? (
                                 <button className="w-full rounded-3xl bg-slate-300 text-slate-600 text-center p-2 text-xl mb-4">
                                    Você indicou este produto!
                                 </button>
                              ) : (
                                 <button className="w-full rounded-3xl bg-primary text-white text-center p-2 text-xl mb-4">
                                    Indicar
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>

                     {produtos.length > 0 ? (
                        produtos?.map((product) => (
                           <div
                              onClick={() => openModal(product._id)}
                              key={product._id}
                              className="max-w-sm rounded shadow-md overflow-hidden  m-2 "
                           >
                              <div className="px-6 py-4 bg-[#f3f3f3]">
                                 <div className="">
                                    <img
                                       src={`https://afiliate800k-api.onrender.com/api/images/${product.imageMain}`}
                                       alt=""
                                    />
                                 </div>
                              </div>
                              <div className="p-3">
                                 <div className="flex gap-3 items-center">
                                    <p className="text-gray-400 text-md text-left line-through ">
                                       R$ {product.price}
                                    </p>
                                    <p className="bg-[#f3f3f3] rounded p-1 text-sm text">
                                       <i className="fa-regular fa-arrow-down"></i>
                                       17%
                                    </p>
                                 </div>

                                 <p className="text-left  text-lg font-semibold">
                                    R$ {product.price}
                                 </p>
                                 <p className="text-sm text-gray-400 text-left">
                                    Em até 24x
                                 </p>

                                 <p className="text-left">
                                    <span className="text-primary bg-[#5e04d026] font-bold rounded text-lg px-2">
                                       Você recebe R${' '}
                                       {parseFloat(product.comission).toFixed(
                                          2
                                       )}
                                    </span>
                                 </p>
                                 <p className="text-left text-lg mt-2 text-slate-600">
                                    {product.name}
                                 </p>
                                 <button className="w-full rounded-3xl bg-primary text-white text-center p-2 text-xl mb-4 mt-4">
                                    Ver mais
                                 </button>
                              </div>
                           </div>
                        ))
                     ) : (
                        <>
                           <p>Carregando</p>
                        </>
                     )}
                  </div>
               </div>
            </div>

            <ModalBottom isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
               <Account />
            </ModalBottom>

            <ModalLeft
               nameMain={'Descrição do produto'}
               isOpen={isModalProduct}
               setIsOpen={setIsModalProduct}
            >
               <Product id={idProduct} />
            </ModalLeft>

            <Popup
               value={'59,09'}
               isOpen={popupFake1}
               setIsOpen={setPopupFake1}
            />
            <Popup
               value={'29,00'}
               isOpen={popupFake2}
               setIsOpen={setPopupFake2}
            />
         </main>
      </>
   );
};

export default Home;
