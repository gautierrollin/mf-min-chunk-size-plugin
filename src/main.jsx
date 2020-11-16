import React from "react";
import { render } from "react-dom";

const HelloWorld = React.lazy(() => import("app2/HelloWorld"));

function App() {
  return (
    <>
      <h1>App 1</h1>
      <React.Suspense fallback="Loading HelloWorld...">
        <HelloWorld />
      </React.Suspense>
    </>
  );
}

render(
  <App />,
  document.getElementById("react")
);
