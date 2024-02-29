import Api from './Api';

export type productRegister = {
   name: string;
   description: string;
   price: number;
   comission: number;
   checkout: string;
   images: [];
};

const productService = {
   create: async (data: FormData) => {
      const product = await Api.post('/api/products/newProduct', data).catch(
         (err) => {
            if (
               err.response.status === 400 ||
               err.response.data.status === 'error' ||
               err.response.data.status === 'fail' ||
               !err.response.data.status
            ) {
               return err.response.data;
            }

            console.log(err);

            return err;
         }
      );

      const response = {
         data: product.data,
         status: product.status,
         message: product.message,
      };

      return response;
   },

   getAll: async () => {
      const products = await Api.get('/api/products/').catch((err) => {
         if (
            err.response.status === 400 ||
            err.response.data.status === 'error' ||
            err.response.data.status === 'fail' ||
            !err.response.data.status
         ) {
            return err.response.data;
         }

         console.log(err);

         return err;
      });

      const response = {
         data: products.data,
         status: products.status,
         message: products.message,
      };

      return response;
   },

   getProduct: async (id: string) => {
      const product = await Api.get(`/api/products/${id}`).catch((err) => {
         if (
            err.response.status === 400 ||
            err.response.data.status === 'error' ||
            err.response.data.status === 'fail' ||
            !err.response.data.status
         ) {
            return err.response.data;
         }

         console.log(err);

         return err;
      });

      const response = {
         data: product.data,
         status: product.status,
         message: product.message,
      };

      return response;
   },

   afiliate: async (productId: string) => {
      const product = await Api.post(`/api/products/newAfiliate`, {
         productId: productId
      }).catch((err) => {
         if (
            err.response.status === 400 ||
            err.response.data.status === 'error' ||
            err.response.data.status === 'fail' ||
            !err.response.data.status
         ) {
            return err.response.data;
         }

         console.log(err);

         return err;
      });

      const response = {
         data: product.data,
         status: product.status,
         message: product.message,
      };

      return response;
   }
};

export default productService;
