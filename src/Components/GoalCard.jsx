function GoalCard({ goal}) {
    const { name, targetAmount, savedAmount, category, deadline, createdAt } = goal;
    const remaining = targetAmount - savedAmount;
    return (
        <div className="goal-card">
            <h2>{name}</h2>
            <p>Category: {category}</p>
            <p>Target: ${targetAmount}</p>
            <p>Saved: ${savedAmount}</p>
            <p>Remaining: ${remaining}</p>
            <p>Deadline: {deadline}</p>
        </div>
    );
}
export default GoalCard;