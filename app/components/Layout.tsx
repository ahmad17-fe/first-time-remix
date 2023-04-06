import type { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  user?: AR_User | null;
}
const Layout: FC<LayoutProps> = ({ children, user }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="container py-4 mx-auto">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
