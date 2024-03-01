import '@/styles/Login.scss';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
  ToastOptions,
} from 'react-toastify';

import login from '@/assets/login.png';
import isLoggedIn from '@/middlewares/auth/isLoggedIn';
import authService, { userLogin } from '@/services/authService';

const toastOptions: ToastOptions = {
   position: 'top-right',
   autoClose: 2000,
   pauseOnHover: true,
   draggable: true,
   theme: 'light',
};

const Login = () => {
   //estados dos inputs
   const [values, setValues] = useState<userLogin>({
      email: '',
      password: '',
   });

   //habilitar navegação pelo componente
   const navigate = useNavigate();

   //verificação se o usuádrio está logado:
   useEffect(() => {
      if(!isLoggedIn()) navigate('/login');
      
   }, []);

   //seta o valor dos estados conforme os inputs
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   //function login click
   const handdleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      const { email, password } = values;
      const loginBtn = document.getElementById('login-btn');

      const data = await authService.login({
         email,
         password,
      });

      loginBtn!.classList.add('loading');

      if (
         data.status === 'error' ||
         data.status === 'fail' ||
         data.status === false
      ) {
         loginBtn!.classList.remove('loading'),
            toast.error(data.message, toastOptions);
      } else {
         toast.success('Logado com sucesso', toastOptions);
         loginBtn!.classList.remove('loading'),
            setTimeout(() => {
               console.log(data.data);
               if (data.data.firstTime) {
                  navigate('/bem-vindo');
                  return;
               }
               navigate('/');
            }, 2000);
      }
   };

   return (
      <>
         <div className="flex justify-center items-center  h-screen bg-[#F4F4F4]">
            <div className="bg-[#F4F4F4] flex flex-col md:flex-row md:w-auto w-full">
               <div className="md:w-2/4 w-full hidden md:flex">
                  <img className="w-full" src={`${login}`} alt="" />
               </div>

               <div className=" md:w-2/4 md:p-7 w-full p-2">
                  <div className="bg-white rounded-lg p-5 h-full flex flex-col shadow-md">
                     <h2 className="font-poppins text-left text-3x1">
                        Bem vindo(a)
                     </h2>

                     <h2 className="text-primary font-bold text-3xl text-left font-poppins">
                        Afiliados 800k
                     </h2>

                     <form
                        action=""
                        className="relative group flex flex-col justify-end mt-24"
                     >
                        <div className="relative">
                           <input
                              onChange={handleChange}
                              name="email"
                              type="text"
                              id="floating_filled"
                              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900  dark:focus:border-primary bg-[#ECECEC] border-0 border-b-2 border-gray-300 appearance-none  dark:border-primary focus:outline-none focus:ring-0 focus:border-primary-600 peer"
                              placeholder=" "
                           />
                           <label
                              htmlFor="floating_filled"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                           >
                              {' '}
                              <i className="fa-sharp fa-solid fa-envelope mr-2"></i>{' '}
                              Email
                           </label>
                        </div>

                        <br />

                        <div className="relative">
                           <input
                              onChange={handleChange}
                              name="password"
                              type="text"
                              id="floating_filled"
                              className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900  dark:focus:border-primary bg-[#ECECEC] border-0 border-b-2 border-gray-300 appearance-none  dark:border-primary  focus:outline-none focus:ring-0 focus:border-primary-600 peer"
                              placeholder=" "
                           />
                           <label
                              htmlFor="floating_filled"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                           >
                              {' '}
                              <i className="fa-sharp fa-solid fa-key mr-2"></i>{' '}
                              Senha
                           </label>
                        </div>

                        <Link
                           to={''}
                           className="text-primary text-right text-sm"
                        >
                           Esqueceu sua senha?
                        </Link>

                        <button
                           id="login-btn"
                           onClick={handdleLogin}
                           className="relative  action-btn bg-primary w-full text-center p-3 rounded-lg mt-5 text-white"
                        >
                           Login
                        </button>
                        <ToastContainer />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;
