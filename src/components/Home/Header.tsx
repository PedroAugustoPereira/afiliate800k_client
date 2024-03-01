import perfil from '@/assets/perfil2.png';
import useUser from '@/states/user';

interface Header {
   setModalUser: (value: boolean) => void;
}

const Header = ({ setModalUser }: Header) => {
   const [user] = useUser((state) => [state.user]);

   const handleModalUser = () => {
      setModalUser(true);
   };

   return (
      <>
         <div className="bg-primary flex justify-between p-3 ">
            {/* Imagem perfil */}
            <div className=" flex items-center gap-3">
               {/* div simulando a imagem */}
               <img
                  className="h-10 w-10 rounded-3xl"
                  src={
                     user?.imagePerfil
                        ? `https://afiliate800k-api.onrender.com/api/images/${user?.imagePerfil}`
                        : perfil
                  }
                  alt=""
               />
               <p className="text-white">
                  Olá, {user?.name ? user?.name : `seja bem vindo`}!
               </p>
               {/* <div className="bg-white h-10 w-10 rounded-3xl"></div> */}
            </div>

            {/* Informações da conta, configurações     */}
            <div className="flex gap-3 items-center">
               <div>
                  <i className="fa-solid fa-gauge-low text-white"></i>
               </div>

               <div onClick={handleModalUser} className="cursor-pointer">
                  <i className="fa-sharp fa-solid fa-user text-white"></i>
               </div>

               <div>
                  <i className="fa-regular fa-gear text-white"></i>
               </div>
            </div>
         </div>
      </>
   );
};

export default Header;
