import Movies from "./Movies";
import Header from "./Header";
import Layout from "./Layout";
import Footer from "./Footer";
const App = () => {
  return (
    <Layout startingTheme={"light"}>   
      <>
        <Header  />
        <Movies />
        <Footer />
      </>
    </Layout>
  );
}

export default App;