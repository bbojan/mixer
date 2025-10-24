import "./App.css";
import { ViewChild } from "./example/ViewChild";
import { ViewParent } from "./example/ViewParent";

function App() {
  return (
    <>
      <div className="card">
        <ViewParent />
        <br />
        <br />
        <br />
        <ViewChild />
        <br />
        <br />
        <a href="https://github.com/bbojan/mixer/blob/main/src/example/ViewChild.tsx">
          GitHub
        </a>
      </div>
    </>
  );
}

export default App;
