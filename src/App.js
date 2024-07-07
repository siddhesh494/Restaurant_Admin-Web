import { Bounce, ToastContainer, toast } from 'react-toastify';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Navbar from './Components/Navbar/Navbar';
import './Styles/standard.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifySuccess = (text) => toast.success(text || "Success", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
  const notifyError = (text) => toast.error(text || "Something went wrong!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });;
  return (
    <>
    <div>
        <ToastContainer 
          
        />
      </div>

    <div>
      <Navbar />
      <HomePage 
        notifyError={notifyError}
        notifySuccess={notifySuccess}
      />
    </div>
    </>
    
  );
}

export default App;
