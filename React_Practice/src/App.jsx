import "./App.css";
import { DataProvider } from "./contextAPI/ContextData";
import { RouterFile } from "./RouterFile";

function App() {
  return (
    <>
      <DataProvider>
        <RouterFile />
      </DataProvider>
    </>
  );
}

export default App;
