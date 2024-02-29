import Api from './Api';

export type productRegister = {
   name: string;
   description: string;
   price: number;
   comission: number;
   checkout: string;
   images: [];
};

const featuredProductService = {
   create: async (data: FormData) => {
      const featuredProduct = await Api.post(
         '/api/featuredProducts/newFeaturedProduct',
         data
      ).catch((err) => {
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
         data: featuredProduct.data,
         status: featuredProduct.status,
         message: featuredProduct.message,
      };

      return response;
   },

   getAll: async () => {
      const pfeaturedProducts = await Api.get('/api/featuredProducts/').catch(
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
         data: pfeaturedProducts.data,
         status: pfeaturedProducts.status,
         message: pfeaturedProducts.message,
      };

      return response;
   },

   //    getProduct: async (id: string) => {
   //       const product = await Api.get(`/api/products/${id}`).catch((err) => {
   //          if (
   //             err.response.status === 400 ||
   //             err.response.data.status === 'error' ||
   //             err.response.data.status === 'fail' ||
   //             !err.response.data.status
   //          ) {
   //             return err.response.data;
   //          }

   //          console.log(err);

   //          return err;
   //       });

   //       const response = {
   //          data: product.data,
   //          status: product.status,
   //          message: product.message,
   //       };

   //       return response;
   //    },
};

export default featuredProductService;
