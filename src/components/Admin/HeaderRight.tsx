const HeaderRight = () => {
   return (
      <>
         <div className="flex justify-between bg-white w-full py-3 px-3 shadow ">
            <div className="w-5/12 flex items-center gap-4">
               <i className="fa-regular fa-bars"></i>

               <div>
                  <form>
                     <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium  sr-only "
                     >
                        Search
                     </label>
                     <div className="relative">
                        <div className=" absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                           <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                           >
                              <path
                                 stroke="currentColor"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                           </svg>
                        </div>
                        <input
                           type="search"
                           id="default-search"
                           className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Buscar"
                           required
                        />
                     </div>
                  </form>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div>
                  <i className="fa-light fa-bell text-primary text-lg font-bold"></i>
               </div>

               <div className="flex items-center justify-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary"></div>
                  <div>
                     <p className="text-sm">Nome</p>
                     <p className="text-sm">Admin</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default HeaderRight;
