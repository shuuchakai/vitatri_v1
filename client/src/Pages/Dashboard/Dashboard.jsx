const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <h1>No user logged in</h1>
    }

    const { firstName, lastName, email, weight, height } = user.result;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    return (
        <div>
            <h1>Welcome, {firstName} {lastName}</h1>
            <p>Email: {email}</p>
            <p>Weight: {weight} kg</p>
            <p>Height: {height} cm</p>
            <p>BMI: {bmi.toFixed(2)}</p>
        </div>
    );
}

export default Dashboard;