import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Form from "./components/Form";
import Admin from "./page/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public waitlist form */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center px-4 py-10">
              <Hero />
              <Form />
            </div>
          }
        />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
