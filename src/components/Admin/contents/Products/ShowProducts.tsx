import {
  useEffect,
  useState,
} from 'react';

import { produtosDemonstrativos } from '@/pages/Home';
import productService from '@/services/productService';

const ShowProducts = () => {
   const [produtos, setPodutos] = useState<produtosDemonstrativos[]>([]);
   const getProducts = async () => {
      const products = await productService.getAll();
      if (products.data) {
         setPodutos(products.data.data);
      }
   };

   useEffect(() => {
      getProducts();
   }, []);

   return (
      <>
         <div>
            <h1 className="text-xl text-[#4B4453] font-bold">Produtos</h1>
         </div>

         <div>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
               <div>
                  <button
                     id="dropdownRadioButton"
                     data-dropdown-toggle="dropdownRadio"
                     className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                     type="button"
                  >
                     <svg
                        className="w-3 h-3 text-gray-500  me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                     </svg>
                     Last 30 days
                     <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                     >
                        <path
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="m1 1 4 4 4-4"
                        />
                     </svg>
                  </button>

                  <div
                     id="dropdownRadio"
                     className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow "
                     data-popper-reference-hidden=""
                     data-popper-escaped=""
                     data-popper-placement="top"
                     style={{
                        position: 'absolute',
                        inset: 'auto auto 0px 0px',
                        margin: '0px',
                        transform: 'translate3d(522.5px, 3847.5px, 0px)',
                     }}
                  >
                     <ul
                        className="p-3 space-y-1 text-sm text-gray-700 "
                        aria-labelledby="dropdownRadioButton"
                     >
                        <li>
                           <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                              <input
                                 id="filter-radio-example-1"
                                 type="radio"
                                 value=""
                                 name="filter-radio"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 "
                              />
                              <label
                                 htmlFor="filter-radio-example-1"
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                              >
                                 Last day
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                              <input
                                 id="filter-radio-example-2"
                                 type="radio"
                                 value=""
                                 name="filter-radio"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                              />
                              <label
                                 htmlFor="filter-radio-example-2"
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                              >
                                 Last 7 days
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                              <input
                                 id="filter-radio-example-3"
                                 type="radio"
                                 value=""
                                 name="filter-radio"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                              />
                              <label
                                 htmlFor="filter-radio-example-3"
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                              >
                                 Last 30 days
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                              <input
                                 id="filter-radio-example-4"
                                 type="radio"
                                 value=""
                                 name="filter-radio"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                              />
                              <label
                                 htmlFor="filter-radio-example-4"
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                              >
                                 Last month
                              </label>
                           </div>
                        </li>
                        <li>
                           <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
                              <input
                                 id="filter-radio-example-5"
                                 type="radio"
                                 value=""
                                 name="filter-radio"
                                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                              />
                              <label
                                 htmlFor="filter-radio-example-5"
                                 className="w-full ms-2 text-sm font-medium text-gray-900 rounded "
                              >
                                 Last year
                              </label>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <label htmlFor="table-search" className="sr-only">
                  Search
               </label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                     <svg
                        className="w-5 h-5 text-gray-500 "
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill-rule="evenodd"
                           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                           clip-rule="evenodd"
                        ></path>
                     </svg>
                  </div>
                  <input
                     type="text"
                     id="table-search"
                     className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                     placeholder="Search for items"
                  />
               </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
               <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                     <tr>
                        <th scope="col" className="px-6 py-3">
                           Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Comissão
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Preço
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Ação
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {produtos.length > 0 ? (
                        produtos?.map((product) => (
                           <>
                              <tr
                                 key={product._id}
                                 className="odd:bg-white  even:bg-gray-50  border-b "
                              >
                                 <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                 >
                                    {product.name}
                                 </th>
                                 <td className="px-6 py-4">
                                    R$ {product.comission}
                                 </td>
                                 <td className="px-6 py-4">ainda não temos</td>
                                 <td className="px-6 py-4">
                                    R$ {product.price}
                                 </td>
                                 <td className="px-6 py-4">
                                    <a
                                       href="#"
                                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                       Edit
                                    </a>

                                    <a
                                       href="#"
                                       className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                       Remove
                                    </a>
                                 </td>
                              </tr>
                           </>
                        ))
                     ) : (
                        <>
                           <div>
                              <p>Carregando</p>
                           </div>
                        </>
                     )}
                  </tbody>
               </table>
            </div>
            <nav
               className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
               aria-label="Table navigation"
            >
               <span className="text-sm font-normal text-gray-500  mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  Showing{' '}
                  <span className="font-semibold text-gray-900 ">1-10</span> of{' '}
                  <span className="font-semibold text-gray-900 ">1000</span>
               </span>
               <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                     >
                        Previous
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                     >
                        1
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                     >
                        2
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        aria-current="page"
                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                     >
                        3
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                     >
                        4
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                     >
                        5
                     </a>
                  </li>
                  <li>
                     <a
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                     >
                        Next
                     </a>
                  </li>
               </ul>
            </nav>
         </div>
      </>
   );
};

export default ShowProducts;
