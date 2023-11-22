import { useState } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { SampleTable } from "./components/react-table/sample-table";

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <SampleTable />
      </div>
    </>
  );
}

export default App;
