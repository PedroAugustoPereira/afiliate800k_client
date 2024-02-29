import { useState } from 'react';

import {
  toast,
  ToastContainer,
  ToastOptions,
} from 'react-toastify';

import authService from '@/services/authService';

interface userProps {
   setShowForm: (option: boolean) => void;
}

const toastOptions: ToastOptions = {
   position: 'top-right',
   autoClose: 2000,
   pauseOnHover: true,
   draggable: true,
   theme: 'light',
};

const AddUser = ({ setShowForm }: userProps) => {
   const [values, setValues] = useState({
      email: '',
      password: '',
      passwordConfirm: '',
      role: '',
   });

   const handleChange = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const handleChecbokxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setValues({ ...values, [e.target.name]: 'admin' });
      } else {
         setValues({ ...values, [e.target.name]: '' });
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const { email, role, password, passwordConfirm } = values;

      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);
      formData.append('passwordConfirm', passwordConfirm);
      formData.append('role', role);

      const data = await authService.register({
         email,
         role,
         password,
         passwordConfirm,
      });

      if (data) {
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
   };

   return (
      <>
         <div className="cursor-pointer" onClick={() => setShowForm(false)}>
            <i className="fa-sharp fa-regular fa-arrow-left"></i>
         </div>
         <div className="mb-4">
            <p className="text-xl font-bold">Novo Usuário</p>
         </div>

         <form className="mt-4 pb-6">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
               <div>
                  <label
                     htmlFor="name"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Email
                  </label>
                  <input
                     onChange={handleChange}
                     name="email"
                     type="text"
                     id="email"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Email do usuário"
                     required
                  />
               </div>
               <div className="flex justify-start items-center">
                  <div className="flex items-center ">
                     <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                        onChange={handleChecbokxChange}
                     />
                     <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900 "
                     >
                        Administrador
                     </label>
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="number-input"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Senha
                  </label>
                  <input
                     onChange={handleChange}
                     name="password"
                     type="password"
                     id="password"
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Senha do usuário"
                     required
                  />
               </div>

               <div>
                  <label
                     htmlFor="number-input"
                     className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                     Confirmação de senha
                  </label>
                  <input
                     onChange={handleChange}
                     name="passwordConfirm"
                     type="passwordConfirm"
                     id="passwordConirm"
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="Confirme sua senha"
                     required
                  />
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

export default AddUser;
