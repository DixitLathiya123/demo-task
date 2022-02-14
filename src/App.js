import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from "./routes/";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function App() {
  return (
    <div className="App">
        <Router>
          <MainRoutes />
        </Router>
    </div>
  );
}
export default App;