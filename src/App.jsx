import './App.css';

import useLocalStorage from "use-local-storage";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Columns from './components/Columns/Columns';


function App() {
    const [isDark, setIsDark] = useLocalStorage("isDark", false);

    return (
        <div className="app__container" data-theme={isDark ? 'dark' : 'light'}>
            <Header isDark={isDark} setIsDark={setIsDark} />
            <Columns />
            <Footer />
        </div>
    );
}

export default App;
