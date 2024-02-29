import { useNavigate } from 'react-router-dom';

import userService from '@/services/userService';

const Header = () => {
   const navigate = useNavigate();

   const handleJump = async () => {
      const setFirstTime = await userService.updateUser({ firstTime: false });
      if (setFirstTime) {
         navigate('/');
      }
   };

   return (
      <>
         <div className="bg-primary flex justify-between p-3 ">
            {/* Imagem perfil */}
            <div className="">
               {/* div simulando a imagem */}
               <h1 className="text-white text-2xl font-bold">
                  Afiliados<span>800k</span>
               </h1>
            </div>

            {/* Informações da conta, configurações     */}
            <div className="flex gap-3 items-center">
               <h2 onClick={handleJump} className="text-white underline">
                  Pular
               </h2>
            </div>
         </div>
      </>
   );
};

export default Header;
