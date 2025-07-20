import React, { useState, useEffect } from "react";
function Overview() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/goals")
            .then((res) => res.json())
            .then(setGoals);
    }, []);

    const totalGoals = goals.length;
    const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.savedAmount), 0);
    const completedGoals = goals.filter(goal => Number(goal.savedAmount) >= Number(goal.targetAmount)).length;

    const getStatus = (goal) => {
        const deadline = new Date(goal.deadline);
        const today = new Date();
        const timeDiff = deadline - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft < 0 && goal.savedAmount < goal.targetAmount) {
            return "Overdue!";
        } else if (daysLeft <= 30 && goal.savedAmount < goal.targetAmount) {
            return `${daysLeft} days left Warning!`;
        } else if (goal.savedAmount >= goal.targetAmount) {
            return "Goal Completed";
        } else {
            return `${daysLeft} days left`;
        }
    };
    return (
        <div className="overview">
            <h2>Savings Overview</h2>
            <p><strong>Total Goals:</strong> {totalGoals}</p>
            <p><strong>Total Saved:</strong> ${totalSaved.toLocaleString()}</p>
            <p><strong>Goals Completed:</strong> {completedGoals}</p>

            <h3>Status by Goal:</h3>
            <ul className="goal-status-list">
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <strong>{goal.name}:</strong> {getStatus(goal)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Overview;