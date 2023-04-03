import "./detalhes.css";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import DetailsUser from "./DetailsUser";

const DetalhesPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="detalhes">
          <DetailsUser acompanhante={null} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetalhesPage;
