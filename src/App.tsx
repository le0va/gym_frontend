import Header from "./components/header";
import { Outlet } from "react-router-dom";
import './app.scss';

const App = () => {
    return (
        <div className="app__container">
            <Header />
            <Outlet />
        </div>
    );
}

export default App;