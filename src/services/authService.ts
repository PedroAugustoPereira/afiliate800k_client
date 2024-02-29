import Api from './Api';

export type userRegister = {
   email: string;
   password: string;
   role: string;
   passwordConfirm: string;
};

export type userLogin = {
   email: string;
   password: string;
};

const authService = {
   register: async (data: userRegister) => {
      const user = await Api.post('/api/auth/register', data).catch((err) => {
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
         data: user.data,
         status: user.status,
         message: user.message,
      };

      return response;
   },

   login: async (params: userLogin) => {
      const res = await Api.post('/api/auth/login', params).catch((err) => {
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
         data: res.data,
         status: res.status,
         message: res.message,
      };

      return response;
   },
};

export default authService;
