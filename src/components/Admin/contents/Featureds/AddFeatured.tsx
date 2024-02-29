import {
  useEffect,
  useState,
} from 'react';

import {
  toast,
  ToastContainer,
  ToastOptions,
} from 'react-toastify';

import { produtosDemonstrativos } from '@/pages/Home';
import featuredProductService from '@/services/featuredProduct';
import productService from '@/services/productService';

interface ProductProps {
   setShowForm: (option: boolean) => void;
}

const toastOptions: ToastOptions = {
   position: 'top-right',
   autoClose: 2000,
   pauseOnHover: true,
   draggable: true,
   theme: 'light',
};

interface images {
   imageFeatured: File | null;
}

const AddFeatured = ({ setShowForm }: ProductProps) => {
   const [options, setOptions] = useState<produtosDemonstrativos[]>([]);
   const [selectedProduct, setSelectedProduct] = useState('');

   const getProducts = async () => {
      const products = await productService.getAll();
      if (products.data) {
         console.log(products.data.data);
         setOptions(products.data.data);
      }
   };

   useEffect(() => {
      getProducts();
   }, []);

   const handleChanges = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      console.log(selectedOption);
      setSelectedProduct(selectedOption.id);
   };

   const [images, setImages] = useState<images>({
      imageFeatured: null,
   });


   const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const name = e.target.name;

      const file = target.files?.[0];
      if (file) {
         //const url = URL.createObjectURL(file);
         //setImageUrl(url);
         setImages({ ...images, [name]: file });
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const productId = selectedProduct;
      console.log(productId);

      const formData = new FormData();

      if (!images.imageFeatured) {
         return;
      }

      formData.append('imageFeatured', images.imageFeatured);
      formData.append('productId', productId);

      const data = await featuredProductService.create(formData);

      if (data) {
         if (data.status) {
            if (
               data.status === 'error' ||
               data.status === 'fail' ||
               data.status === false
            ) {
               toast.error(data.message, toastOptions);
            } else {
               toast.success('Criado com sucesso', toastOptions);
            }
         }
      }
   };

   return (
      <>
         <div className="cursor-pointer" onClick={() => setShowForm(false)}>
            <i className="fa-sharp fa-regular fa-arrow-left"></i>
         </div>
         <div className="mb-4">
            <p className="text-xl font-bold">Novo destaque</p>
         </div>

         <form className="mt-4 pb-6">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
               <div>
                  <label
                     htmlFor="name"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Produto
                  </label>
                  <div>
                     <select
                        value={selectedProduct}
                        onChange={handleChanges}
                        className="w-full py-2 px-3 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 border border-gray-300 text-sm rounded-lg text-gray-900 p-2.5"
                     >
                        {options.length > 0 ? (
                           options.map((option) => (
                              <option
                                 id={option._id}
                                 key={option._id}
                                 value={option.name}
                              >
                                 {option.name}
                              </option>
                           ))
                        ) : (
                           <div>
                              <p>Carregando</p>
                           </div>
                        )}
                     </select>
                  </div>
               </div>

               <div></div>

               <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                     Banner
                  </p>
                  <label
                     htmlFor="dropzone-file"
                     className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                  >
                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                           className="w-8 h-8 mb-4 text-gray-500 "
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 20 16"
                        >
                           <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                           />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                           <span className="font-semibold">
                              Click para upload
                           </span>{' '}
                           ou arraste até aqui
                        </p>
                        <p className="text-xs text-gray-500 ">
                           SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                     </div>
                     <input
                        id="dropzone-file"
                        type="file"
                        name="imageFeatured"
                        className="hidden"
                        onChange={handleChangeImages}
                     />
                  </label>
                  {/* <div className="flex flex-col items-center">
                     {images.map((image, index) => (
                        <img
                           key={index}
                           src={URL.createObjectURL(image)}
                           alt={`Imagem ${index + 1}`}
                           className="my-2"
                        />
                     ))}
                  </div> */}
               </div>
               <br />
               <button
                  onClick={handleSubmit}
                  type="submit"
                  className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center"
               >
                  Salvar
               </button>
            </div>
            <ToastContainer />
         </form>
      </>
   );
};

export default AddFeatured;
