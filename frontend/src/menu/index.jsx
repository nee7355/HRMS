// @project
import { getUser } from '../services/auth/auth';
import manage from './manage';
import other from './other';
import pages from './pages';
import menuList from './sidebarMenu';
import uiElements from './ui-elements';

/***************************  MENU ITEMS  ***************************/
let menus = [];
const user = getUser();
menus = menuList[user?.role.toLowerCase()];
console.log("menussssssss", menus)
const menuItems = {
  // items: [manage, uiElements, pages, other]
  items: [...menus]
};

export default menuItems;
