import React from "react";
import { Provider } from "react-redux";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Header from "./components/Header";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header></Header>
        <div className="row">
          <div className="col">
            <ContactList></ContactList>
          </div>
          <div className="col">
            <ContactForm></ContactForm>
          </div>
          <div className="col"></div>
        </div>
      </Provider>
    </>
  );
}

export default App;
