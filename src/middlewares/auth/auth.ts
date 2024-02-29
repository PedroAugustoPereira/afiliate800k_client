import userService from '../../services/userService';

//teste
const AuthMiddleware = async () => {
   const response = await userService.requireUser();

   if (response.error || !response.status) {
      return {
         data: null,
         error: true,
      };
   } else {
      if (response) {
         return {
            data: response,
         };
      }
   }
};

export default AuthMiddleware;
