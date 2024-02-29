import '@/styles/Home.scss';

import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import perfil from '@/assets/perfil2.png';
import userService from '@/services/userService';

import Header from '../components/Welcome/Header';

const toastOptions: ToastOptions = {
   position: 'top-right',
   autoClose: 2000,
   pauseOnHover: true,
   draggable: true,
   theme: 'light',
};

const Welcome = () => {
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);
   const [name, setName] = useState('');
   const [file, setFile] = useState<File | null>(null);
   const [imageUrl, setImageUrl] = useState('');
   const [hover, setHover] = useState(false);

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
         const url = URL.createObjectURL(file);
         setImageUrl(url);
         setFile(file);
         // Faça algo com o arquivo, como enviá-lo para o servidor
         console.log(file);
      }
   };

   const handleMouseEnter = () => {
      setHover(true);
   };

   const handleMouseLeave = () => {
      setHover(false);
   };

   const handleContinue = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      if (file !== null) {
         formData.append('image', file);
      }

      formData.append('name', name);
      const data = await userService.setPerfil(formData);

      if (data) {
         if (data.status) {
            if (
               data.status === 'error' ||
               data.status === 'fail' ||
               data.status === false
            ) {
               toast.error(data.message, toastOptions);
            } else {
               const setFirstTime = await userService.updateUser({
                  firstTime: false,
               });
               navigate('/');
            }
         }
      }
   };

   return (
      <>
         <main id="main" className="bg-white h-full min-h-screen">
            <div>
               <Header />
            </div>

            <div className="p-5">
               <div className="mt-3 mb-6">
                  <h2 className="text-left text-2xl text-primary font-bold ">
                     Seja bem vindo!
                  </h2>
                  <p className="text-left">
                     Nos diga seu nome, e adicione sua imagem! (opcional)
                  </p>
               </div>

               <div className="relative h-44">
                  <div className="mx-auto w-44 text-center relative">
                     <div
                        className="relative w-44"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                     >
                        <img
                           className={`w-44 h-44 rounded-full absolute ${
                              hover ? 'opacity-0' : ''
                           }`}
                           src={imageUrl || perfil}
                           alt=""
                        />
                        <img
                           style={{ borderRadius: '50%' }}
                           className={`ww-44 h-44 rosunded-full absolute rounded-3xl overflow-hidden ${
                              hover ? '' : 'opacity-0'
                           }`}
                           src={imageUrl || perfil}
                           alt=""
                        />
                        <div
                           onClick={handleClick}
                           className="w-44 h-44 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
                        >
                           <img
                              className="hidden group-hover:block w-12"
                              src="https://www.svgrepo.com/show/33565/upload.svg"
                              alt=""
                           />
                        </div>
                     </div>
                     <input
                        type="file"
                        className="opacity-0 absolute w-full h-full"
                        ref={inputRef}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div>
                  <p className="text-sm mt-3">
                     Clique na imagem para adicionar
                  </p>
               </div>

               <div className="mt-5">
                  <p className="text-left font-bold text-primary text-xl">
                     Nome
                  </p>
                  <div className="flex">
                     <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md ">
                        <svg
                           className="w-4 h-4 text-gray-500 "
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                        >
                           <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                     </span>
                     <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setName(e.target.value)
                        }
                        type="text"
                        id="website-admin"
                        className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-primary focus:border-primary block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
                        placeholder="Nos diga seu nome"
                     />
                  </div>
               </div>

               <button
                  id="login-btn"
                  className="relative  action-btn bg-primary w-full text-center p-3 rounded-lg mt-5 text-white"
                  onClick={handleContinue}
               >
                  Salvar e continuar
               </button>
            </div>
         </main>
         <ToastContainer />
      </>
   );
};

export default Welcome;
