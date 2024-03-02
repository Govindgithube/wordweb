import "./App.css";

import UserContextProvider from "./context/UserContextProvider";
import Layout from "./layout/Layout";

function App() {
  return (
    <UserContextProvider>
      <Layout />
    </UserContextProvider>
  );
}

export default App;
