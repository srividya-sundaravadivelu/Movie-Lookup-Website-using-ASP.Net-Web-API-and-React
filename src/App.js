import Movies from "./Movies";
import Header from "./Header";
import Layout from "./Layout";
const App = () => {
  return (
    <Layout startingTheme={"light"}>   
      <>
        <Header  />
        <Movies />
      </>
    </Layout>
  );
}

export default App;