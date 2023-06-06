import "./App.css";
import AutoSuggestion from "./components/AutoSuggestion";
import { SUGGESTIONS } from "./constants";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AutoSuggestion suggestions={SUGGESTIONS} />
      </header>
    </div>
  );
}

export default App;
