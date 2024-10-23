import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UploadRequirements from "./components/UploadRequirements";
import { AuthContext } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/uploadRequirements"
          element={currentUser ? <UploadRequirements /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
};

export default App;
