import { GlobalStyle } from "./GlobalStyle";
import TestTableContainer from "./components/test/TestTableContainer";
import { SampleTable } from "./components/sample-table";

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <TestTableContainer />
        {/* <SampleTable /> */}
      </div>
    </>
  );
}

export default App;
