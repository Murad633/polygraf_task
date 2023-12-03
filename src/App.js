import { Route, BrowserRouter, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { Analyzer } from "./pages/Analyzer";

  
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Layout><SignIn/></Layout>}/>
          <Route path="/signup" element={<Layout><SignUp/></Layout>}/>
          <Route path="/analyze" element={<Analyzer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
