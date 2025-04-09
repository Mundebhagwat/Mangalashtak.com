import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./compnent/PrivateRoute";
import AuthWrapper from "./compnent/AuthWrapper";
import NavBar from "./compnent/NavBar";
import FindPartner from "./compnent/FindPartner";
import ProfileDetail from "./compnent/ProfileDetails";
import ChatPage from "../src/compnent/ChatPage";
import { ChatProvider } from "../src/compnent/ChatContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./compnent/AboutPage";
import ContactPage from "./compnent/ContactPage";
import PrivacyPage from "./compnent/PrivacyPage";
import PageTemplate from "./compnent/PageTemplate";
import NotificationSystem from "./compnent/NotificationSystem";
import { NotificationProvider } from "./context/NotificationContext"; // Import the new provider

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <NotificationProvider> 
          <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/template" element={<PageTemplate />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={
                  <>
                    <NavBar />
                    <AuthWrapper>
                      <Dashboard />
                    </AuthWrapper>
                  </>
                } />
              </Route>
              <Route path="/find-partner" element={
                <>
                  <NavBar />
                  <AuthWrapper>
                    <FindPartner />
                  </AuthWrapper>
                </>
              } />
              <Route path="/profile/:userId" element={
                <>
                  <NavBar />
                  <AuthWrapper>
                    <ProfileDetail />
                  </AuthWrapper>
                </>
              } />
              <Route path="/chats" element={
                <>
                  <NavBar />
                  <AuthWrapper>
                    <ChatPage />
                  </AuthWrapper>
                </>
              } />
              <Route path="/chat/:chatId" element={
                <>
                  <NavBar />
                  <AuthWrapper>
                    <ChatPage />
                  </AuthWrapper>
                </>
              } />
              <Route
                path="/notifications"
                element={
                  <>
                    <NavBar /> {/* Add NavBar here for consistency */}
                    <AuthWrapper>
                      <NotificationSystem />
                    </AuthWrapper>
                  </>
                }
              />
            </Routes>
          </Router>
        </NotificationProvider>
      </ChatProvider>
    </AuthProvider>
  )
}

export default App