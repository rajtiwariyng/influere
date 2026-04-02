import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ModalProvider } from "./context/ModalContext";
import LoginModal from "./components/LoginModal";
import { useModal } from "./context/ModalContext";

function AppContent() {
  const { isLoginModalOpen, closeLoginModal } = useModal();
  
  return (
    <>
      <AppRoutes />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
