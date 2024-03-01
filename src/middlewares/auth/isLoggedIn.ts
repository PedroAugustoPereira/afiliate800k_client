import { createBrowserHistory } from 'history';

import AuthMiddleware from './auth';

export const history = createBrowserHistory();

const checkLoginStatus = async () => {
   const logged = await AuthMiddleware();
   if (logged?.data) {
      return logged.data;
   }

   return null;
};

const isLoggedIn = async () => {
   const user = await checkLoginStatus();

   if (user && user.data.data !== undefined) {
      console.log(user);
      return user.data.data.user;
   } else {
      return null;
   }
};

export default isLoggedIn;
