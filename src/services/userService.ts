import getAuthToken from '../middlewares/auth/getAuthToken';
import Api from './Api';

export interface userUpdate {
   email?: string;
   name?: string;
   imagePerfil?: string;
}

const userService = {
   requireUser: async () => {
      if (!getAuthToken) {
         return {
            error: true,
            message: 'O usuário não está logado!',
            status: 401,
            data: null,
         };
      }

      const user = await Api.get('/api/users/me').catch((err) => {
         if (err.response.status === 401 || err.response.status === 404) {
            return {
               error: true,
               message: 'O usuário não está logado!',
               status: 401,
               data: null,
            };
         }

         return err;
      });

      return user;
   },

   setPerfil: async (data: FormData) => {
      const perfil = await Api.post('/api/users/setPerfil', data).catch(
         (err) => {
            if (
               err.response.status === 400 ||
               err.response.data.status === 'error' ||
               err.response.data.status === 'fail' ||
               !err.response.data.status
            ) {
               return err.response.data;
            }

            return err;
         }
      );

      const response = {
         data: perfil.data,
         status: perfil.status,
         message: perfil.message,
      };

      console.log(response);

      return response;
   },

   updateUser: async (data: userUpdate) => {
      const update = await Api.put('api/users/setNotFirstTime', data).catch(
         (err) => {
            if (
               err.response.status === 400 ||
               err.response.data.status === 'error' ||
               err.response.data.status === 'fail' ||
               !err.response.data.status
            ) {
               return err.response.data;
            }

            return err;
         }
      );

      const response = {
         data: update.data,
         status: update.status,
         message: update.message,
      };

      return response;
   },

   updateDataUser: async (data: FormData) => {
      const update = await Api.put('api/users/updateUser', data).catch(
         (err) => {
            if (
               err.response.status === 400 ||
               err.response.data.status === 'error' ||
               err.response.data.status === 'fail' ||
               !err.response.data.status
            ) {
               return err.response.data;
            }

            return err;
         }
      );

      const response = {
         data: update.data,
         status: update.status,
         message: update.message,
      };

      return response;
   },

   getUsers: async () => {
      const users = await Api.get('api/users/').catch((err) => {
         if (
            err.response.status === 400 ||
            err.response.data.status === 'error' ||
            err.response.data.status === 'fail' ||
            !err.response.data.status
         ) {
            return err.response.data;
         }

         return err;
      });

      const response = {
         data: users.data,
         status: users.status,
         message: users.message,
      };

      return response;
   },

   getAfiliatedProducts: async () => {
      const products = await Api.get('api/users/productsAfiliated').catch(
         (err) => {
            if (
               err.response.status === 400 ||
               err.response.data.status === 'error' ||
               err.response.data.status === 'fail' ||
               !err.response.data.status
            ) {
               return err.response.data;
            }

            return err;
         }
      );

      const response = {
         data: products.data,
         status: products.status,
         message: products.message,
      };

      return response;
   },

   updateSaldoFake: async (fake: string, saldoFicticio: number) => {
      const update = await Api.put('api/users/saldoFicticio', {
         fake,
         saldoFicticio,
      }).catch((err) => {
         if (
            err.response.status === 400 ||
            err.response.data.status === 'error' ||
            err.response.data.status === 'fail' ||
            !err.response.data.status
         ) {
            return err.response.data;
         }

         return err;
      });

      const response = {
         data: update.data,
         status: update.status,
         message: update.message,
      };

      return response;
   },
};

export default userService;
