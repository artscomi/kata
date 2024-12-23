import "./App.css";
import Chips from "./components/Chips";
import CountryCapitalGame from "./components/CountryCapitalGame";
import CountryCapitalGameColumn from "./components/CountryCapitalGameColumn";

const chips = Array.from({ length: 30 }, (_, index) => ({
  label: `chip${index + 1}`,
}));

function App() {
  return (
    <div className="App">
      <CountryCapitalGame />
      <div style={{ margin: "40px" }} />
      <CountryCapitalGameColumn />
      <div style={{ margin: "40px" }} />
      <Chips chips={chips} maxChips={10} maxTextLength={4} />
    </div>
  );
}

export default App;
