import { useEffect, useState, createContext } from "react";
import Routes from "./Routes";
import Header from "./Helpers/Header";
import Footer from "./Helpers/Footer";
import LeagueService from "./services/LeagueService";
import style from "./App.module.css";

const MatchContext = createContext([]);

function App() {
  const { fetchData, getToken, getApiVersion } = new LeagueService();
  const [data, setData] = useState();
  const [version, setVersion] = useState();

  const getValidToken = async () => {
    const { access_token } = await getToken();
    return access_token;
  };
  useEffect(async () => {
    const token = await getValidToken();
    const matches = await fetchData(token);
    const apiVersion = await getApiVersion();
    setData(matches);
    setVersion(apiVersion);
  }, []);
  return (
    <>
      <Header />
      <MatchContext.Provider value={data}>
        <div className={style.welcomeMessage}>
          <Routes />
        </div>
      </MatchContext.Provider>
      <Footer version={version} />
    </>
  );
}

export default App;
export { MatchContext };
