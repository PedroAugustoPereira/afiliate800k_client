import { useState } from 'react';

import { toast, ToastContainer, ToastOptions } from 'react-toastify';

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
   imageMain: File | null;
   imageEmpire: File | null;
}

const AddProduct = ({ setShowForm }: ProductProps) => {
   const [values, setValues] = useState({
      name: '',
      description: '',
      checkout: '',
      price: '',
      comission: '',
   });

   const [images, setImages] = useState<images>({
      imageMain: null,
      imageEmpire: null,
   });

   const [imagesUrl, setImagesUrl] = useState({
      imageMain: null,
      imageEmpire: null,
   });

   const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      console.log(e);
      const name = e.target.name;

      console.log(name);

      const file = target.files?.[0];
      console.log(file);
      if (file) {
         //const url = URL.createObjectURL(file);
         //setImageUrl(url);
         setImages({ ...images, [name]: file });
      }
   };

   const handleChange = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { name, description, price, comission, checkout } = values;
      console.log(images);

      const formData = new FormData();

      if (!images.imageMain || !images.imageEmpire) {
         console.log('erro');
         return;
      }

      formData.append('images', images.imageMain);
      formData.append('images', images.imageEmpire);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('comission', comission);
      formData.append('checkout', checkout);

      const data = await productService.create(formData);

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
            <p className="text-xl font-bold">Novo Produto</p>
         </div>

         <form className="mt-4 pb-6">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
               <div>
                  <label
                     htmlFor="name"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Nome
                  </label>
                  <input
                     onChange={handleChange}
                     name="name"
                     type="text"
                     id="name"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Nome do produto"
                     required
                  />
               </div>
               <div>
                  <label
                     htmlFor="checkout"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Checkout
                  </label>
                  <input
                     onChange={handleChange}
                     name="checkout"
                     type="text"
                     id="checkout"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Link de checkout"
                     required
                  />
               </div>
               <div>
                  <label
                     htmlFor="number-input"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Preço
                  </label>
                  <input
                     onChange={handleChange}
                     name="price"
                     type="number"
                     id="preco"
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Preço R$ XX,XX"
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="number-input"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Comissão por afiliado
                  </label>
                  <input
                     onChange={handleChange}
                     name="comission"
                     type="number"
                     id="comissao"
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Comissão R$ XX,XX"
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="message"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Descrição
                  </label>
                  <textarea
                     onChange={handleChange}
                     name="description"
                     id="message"
                     rows="4"
                     class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                     placeholder="Descrição do produto"
                  ></textarea>
               </div>
               <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                     Imagem
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
                        name="imageMain"
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
               <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                     Imagem
                  </p>
                  <label
                     htmlFor="dropzone-file2"
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
                        id="dropzone-file2"
                        type="file"
                        name="imageEmpire"
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
               <br></br>

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

export default AddProduct;
