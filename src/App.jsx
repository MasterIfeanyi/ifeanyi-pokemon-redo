import './App.css';
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout';
import Missing from "./components/Missing"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import RequireAuth from "./components/RequireAuth"

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* public routes */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login/>} />

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
