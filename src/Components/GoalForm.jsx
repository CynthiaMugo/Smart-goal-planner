import React, { useState } from "react";

function GoalForm({ onAddGoal }) {
    const [name, setName] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const newGoal = {name,
                targetAmount: parseFloat(targetAmount),
                savedAmount: 0,
                category,
                deadline,
                createdAt: new Date().toISOString().split("T")[0],
                };

    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddGoal(data);
        // reset form
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
      });
    }
    return (
        <div className="goal-form-container">
            <form onSubmit={handleSubmit} className="goal-form">
                <h2>Add New Goal</h2>
        <div className="goal-form-fields">
            <input
                type="text"
                placeholder="Goal Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Target Amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
            />
            <button type="submit">Add Goal</button>
        </div>
        </form>
        </div>
    );
}
export default GoalForm;