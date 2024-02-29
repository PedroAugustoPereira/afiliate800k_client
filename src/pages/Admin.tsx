import '@/styles/Admin.scss';

import Content from '@/components/Admin/Content';

import HeaderLeft from '../components/Admin/HeaderLeft';
import HeaderRight from '../components/Admin/HeaderRight';

const Admin = () => {
   return (
      <>
         <main id="mainAdmin" className="bg-[#F4F4F4] h-screen">
            <div className="flex h-full">
               <div className="w-2/12 h-full ">
                  <HeaderLeft />
               </div>

               <div className="w-9/12 h-full overflow-hidden">
                  <HeaderRight />
                  <Content />
               </div>
            </div>
         </main>
      </>
   );
};

export default Admin;
