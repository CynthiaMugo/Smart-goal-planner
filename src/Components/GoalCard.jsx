function GoalCard({ goal}) {
    const { name, targetAmount, savedAmount, category, deadline, createdAt } = goal;
    const remaining = targetAmount - savedAmount;
    const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
    const percentage = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(0);
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
                                    backgroundColor: percentage === "100" ? "green" : "blue", 
                                    padding: "5px", 
                                    color: "white", 
                                    borderRadius: "10px", 
                                    textAlign: "center" }}>
                    {percentage}%
                </div>
            </div>
            <div className="actions">
                <button className="actions-button" id="edit">Edit</button>
                <button className="actions-button" id="deposit">Deposit</button>
                <button className="actions-button" id="delete">Delete</button>
            </div>
        </div>
    );
}
export default GoalCard;