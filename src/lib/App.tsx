import "./app.css";
import { ModalProvider } from "./Modal";
import { Component } from "./Component";

export default function App() {
  return (
    <div className="App">
      <ModalProvider escapeClose={true} clickClose={true}>
        <Component />
      </ModalProvider>
    </div>
  );
}
