import Api from './Api';

const saleService = {
   getAll: async () => {
      const sales = await Api.get('/api/sale/salesUser').catch((err) => {
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
         data: sales.data,
         status: sales.status,
         message: sales.message,
      };

      return response;
   },
};

export default saleService;
