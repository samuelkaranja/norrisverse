import { Provider } from "react-redux";
import "./App.css";
import Card from "./components/Card/Card";
import NavBar from "./components/NavBar/NavBar";
import { Store } from "./store/Store";

function App() {
  return (
    <>
      <Provider store={Store}>
        <NavBar />
        <Card />
      </Provider>
    </>
  );
}

export default App;
