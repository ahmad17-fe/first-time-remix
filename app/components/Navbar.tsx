import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Link } from "@remix-run/react";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import PowerIcon from "@heroicons/react/24/outline/PowerIcon";
import type { FC } from "react";

interface NavbarProps {
  user?: AR_User | null;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between gap-4 items-center">
      <Link to="/" className="font-bold text-xl">
        Gruire
      </Link>
      <nav className="flex gap-2">
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="text" color="white" className="text-black">
                Sign In
              </Button>
            </Link>
            <Button color="white">Create Account</Button>
          </>
        ) : null}
        {user ? (
          <Menu>
            <MenuHandler>
              <div className="flex items-center gap-2">
                {user?.name}
                <Avatar
                  variant="circular"
                  alt="candice wu"
                  className="cursor-pointer border"
                  src="https://api.dicebear.com/6.x/open-peeps/svg?seed=Chloe"
                  size="sm"
                />
              </div>
            </MenuHandler>
            <MenuList>
              <MenuItem className="flex items-center gap-2">
                <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <form method="post" action="/logout">
                <MenuItem className="flex items-center gap-2 ">
                  <PowerIcon strokeWidth={2} className="h-4 w-4" />
                  <Typography variant="small" className="font-normal">
                    Sign Out
                  </Typography>
                </MenuItem>
              </form>
            </MenuList>
          </Menu>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
