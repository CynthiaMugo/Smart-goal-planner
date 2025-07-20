import React from "react"
import Header from './Header.jsx';
import './css.css';
import GoalList from './GoalList.jsx';
import Overview from './Overview.jsx';

function App() {
    return (
        <div>
            <Header />
            <Overview />
            <GoalList />
        </div>
    );
}
export default App;