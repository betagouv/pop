import Footer from "./Footer";
import Header from "./Header";

export default ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);
