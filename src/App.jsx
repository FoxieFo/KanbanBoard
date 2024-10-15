import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Columns from './components/Columns/Columns';
import TaskDetail from './components/TaskDetail/TaskDetail';


function App() {
    const [isDark, setIsDark] = useLocalStorage("isDark", false);

    return (
        <div className="app__container" data-theme={isDark ? 'dark' : 'light'}>
            <Router>
                <Header isDark={isDark} setIsDark={setIsDark} />
                <Routes>
                    <Route path="/" element={<Columns />} />
                    <Route path="/tasks/:taskId" element={<TaskDetail />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
