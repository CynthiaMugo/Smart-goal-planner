import React, { useState } from "react";

function GoalCard({ goal, onDeposit, onDelete }) {
    const { id, name, targetAmount, savedAmount, category, deadline, createdAt } = goal;
    const remaining = targetAmount - savedAmount;
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
    const percentage = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(0);
    //Functionality to deposit button
        const [showDeposit, setShowDeposit] = useState(false);
        const [depositAmount, setDepositAmount] = useState("");

        const handleDeposit = (e) => {
            e.preventDefault();
            const newAmount = Number(savedAmount) + Number(depositAmount);

            fetch(`http://localhost:3000/goals/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ savedAmount: newAmount }),
            })
            .then((res) => res.json())
            .then((updatedGoal) => {
                onDeposit(updatedGoal);
                setDepositAmount("");
                setShowDeposit(false);
            });
        };
        // functionality to delete button
        const handleDelete = () => {
            fetch(`http://localhost:3000/goals/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                onDelete(id);
                });
            };

    return (
        <div className="goal-card">
            <h2>{name}</h2>
            <p>Category: {category}</p>
            <p>Target: ${targetAmount}</p>
            <p>Saved: ${savedAmount}</p>
            <p>Remaining: ${remaining}</p>
            <p>Deadline: {deadline}</p>
            <p>Created On: {formattedCreatedAt}</p>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${percentage}%`, 
                                    backgroundColor: percentage === "100" ? "green" : "forestgreen", 
                                    padding: "5px", 
                                    color: "white", 
                                    borderRadius: "10px", 
                                    textAlign: "center" }}>
                    {percentage}%
                </div>
            </div>
            <div className="actions">
                <button className="actions-button" id="edit">Edit</button>
                <button className="actions-button" id="deposit" onClick={() => setShowDeposit(!showDeposit)}>{showDeposit ? "Cancel" : "Deposit"}</button>
                <button className="actions-button" id="delete"onClick={handleDelete}>Delete</button>
            </div>
            <div className="deposit-container">
                {showDeposit && (
                    <form onSubmit={handleDeposit} className="deposit-form">
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="1"
                        required/>
                    <button type="submit">Add</button>
                    </form>
                )}
            </div>
        </div>
    );
}
export default GoalCard;