import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import MainLayout from "./components/mainLayout";
import StoreScreen from "./pages/StoreScreen";
import { Provider } from "react-redux";
import store from "./redux/slices/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} Link to="/admin" />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/stores" element={<StoreScreen />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<MainLayout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
