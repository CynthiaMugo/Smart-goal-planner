import React, { useState, useEffect, use} from "react";
import GoalCard from './GoalCard.jsx';

function GoalList() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/goals")
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched goals:", data);
            setGoals(data);
        })
        .catch((error) => console.error("Error fetching goals:", error));
    }, []);
    return (
        <div className="goal-list-container">
            <h2>My Savings Goals</h2>
            <div className="goal-list">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
}
export default GoalList;