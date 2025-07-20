import React, { useState, useEffect, use} from "react";
import GoalCard from './GoalCard.jsx';
import GoalForm from './GoalForm.jsx';


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

    // deposit functionality
    const handleDeposit = (updatedGoal) => {
    setGoals((prevGoals) =>
        prevGoals.map((goal) => goal.id === updatedGoal.id ? updatedGoal : goal)
    );
    };

    return (
        <div className="goal-list-container">
            <h2>My Savings Goals</h2>
            <GoalForm onAddGoal={(newGoal) => setGoals([...goals, newGoal])} />
            <div className="goal-list">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} onDeposit={handleDeposit} onDelete={(id) => {
                            setGoals(goals.filter((goal) => goal.id !== id));
                        }}
                        onEdit={(updatedGoal) => {
                            setGoals(goals.map((goal) => goal.id === updatedGoal.id ? updatedGoal : goal));
                        }}/>
                ))}
            </div>
        </div>
    );
}
export default GoalList;