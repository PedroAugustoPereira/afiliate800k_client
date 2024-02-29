import '@/styles/Perfil.scss';

import { useRef, useState } from 'react';

import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import perfil from '@/assets/perfil2.png';
import userService from '@/services/userService';
import useRefetch from '@/states/refetch';
import useUser from '@/states/user';

const toastOptions: ToastOptions = {
   position: 'top-right',
   autoClose: 2000,
   pauseOnHover: true,
   draggable: true,
   theme: 'light',
};

const Perfil = () => {
   const [user] = useUser((state) => [state.user]);
   const [values, setValues] = useState({
      email: user?.email || '',
      name: user?.name || '',
   });

   const [imageUrl, setImageUrl] = useState('');
   const [file, setFile] = useState<File | null>(null);
   const [hover, setHover] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const image = user?.imagePerfil
      ? `http://localhost:5000/api/images/${user?.imagePerfil}`
      : null;
   const [setRefetch] = useRefetch((state) => [state.setRefetch]);

   const handleClick = () => {
      inputRef.current?.click();
   };

   const handleMouseEnter = () => {
      setHover(true);
   };

   const handleMouseLeave = () => {
      setHover(false);
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

   const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const handleSave = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      if (file !== null) {
         formData.append('image', file);
      }

      if (user?.name !== values.name) {
         formData.append('name', values.name);
      }
      if (user?.email !== values.email) {
         formData.append('email', values.email);
      }

      const data = await userService.updateDataUser(formData);
      console.log(data);

      if (data) {
         if (data.status) {
            if (
               data.status === 'error' ||
               data.status === 'fail' ||
               data.status === false
            ) {
               toast.error(data.message, toastOptions);
            } else {
               toast.success('Salvo com sucesso', toastOptions);
               setRefetch(true);
            }
         }
      }
   };

   return (
      <>
         {/* itens */}

         <div className="px-5">
            <div className="py-5">
               <p className="text-slate-500 text-sm font-medium text-left">
                  Perfil
               </p>
            </div>

            <div className="w-full flex  items-center flex-col py-5 border-b-2 border-[#f3f3f3] ">
               <div className="flex w-full items-center justify-start gap-5 w-full">
                  <div className="w-full">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-left"
                        htmlFor="name"
                     >
                        Nome
                     </label>
                     <input
                        className="bg-[#f3f3f3] rounded-xl  border-none appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        value={values.name}
                        name={'name'}
                        onChange={handleChangeInputs}
                        type="text"
                        placeholder="Preencha seu nome..."
                     />
                  </div>
               </div>

               <div className="flex w-full items-center justify-start gap-5 w-full mt-6">
                  <div className="w-full">
                     <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-left"
                        htmlFor="email"
                     >
                        Email
                     </label>
                     <input
                        className="bg-[#f3f3f3] rounded-xl  border-none appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChangeInputs}
                        type="text"
                        placeholder="Preencha seu email"
                     />
                  </div>
               </div>

               <div className="flex w-full items-center justify-start gap-5 w-full mt-6">
                  <div className="w-full flex gap-3 items-center">
                     <div className="relative h-20">
                        <div className="mx-auto w-20 text-center relative">
                           <div
                              className="relative w-20"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                           >
                              <img
                                 className={`w-20 h-20 rounded-full absolute ${
                                    hover ? 'opacity-0' : ''
                                 }`}
                                 src={imageUrl || image || perfil}
                                 alt=""
                              />
                              <img
                                 style={{ borderRadius: '50%' }}
                                 className={`w-20 h-20 rosunded-full absolute rounded-3xl overflow-hidden ${
                                    hover ? '' : 'opacity-0'
                                 }`}
                                 src={imageUrl || image || perfil}
                                 alt=""
                              />
                              <div
                                 onClick={handleClick}
                                 className="w-20 h-20 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
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
                        <p className="text-sm ">
                           Clique na imagem para alterar
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <button
               onClick={handleSave}
               className="w-full p-4 font-medium flex justify-center items-center color-white bg-primary rounded-3xl  text-white"
            >
               Salvar
            </button>
         </div>
         <ToastContainer />
      </>
   );
};

export default Perfil;
