import Navabr from "./navbar";
import Footer from "./footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Navabr />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
