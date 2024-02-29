import useMenu from '@/states/Admin/menu';

import FeaturedProducts from './contents/Featureds/FeaturedProducts';
import Produtos from './contents/Products/Produtos';
import Users from './contents/Users/Users';

const Content = () => {
   const [{ page }] = useMenu((state) => [state.dataMenu]);

   switch (page) {
      case 'Produtos':
         return (
            <main className="p-5 text-left w-full h-full overflow-scroll">
               <Produtos />
            </main>
         );
      case 'Dashboard':
         return 'Dashboard';

      case 'Featured':
         return (
            <main className="p-5 text-left w-full h-full overflow-scroll">
               <FeaturedProducts />
            </main>
         );

      case 'Usuarios':
         return (
            <main className="p-5 text-left w-full h-full overflow-scroll">
               <Users />
            </main>
         );
   }
};

export default Content;
