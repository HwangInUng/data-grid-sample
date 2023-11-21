import { GlobalStyle } from "./GlobalStyle";
import { SampleTable } from "./components/react-table-sample/sample-table";

function App() {
  return (
    <>
      <GlobalStyle/>
      <div className="App">
        <SampleTable />
        {/* <FlexTable/> */}
      </div>
    </>
  );
}

export default App;
