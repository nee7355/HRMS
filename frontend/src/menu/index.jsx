import { useSelector } from "react-redux";

import manage from "./manage";
import other from "./other";
import pages from "./pages";
import menuList from "./sidebarMenu";
import uiElements from "./ui-elements";

import { authSelector } from "../store/slices/authSllice";

const useMenuItems = () => {
    const { user } = useSelector(authSelector);

    const menus = menuList[user.role.name.toLowerCase()] || [];

    return {
        items: menus
    };
};

export default useMenuItems;