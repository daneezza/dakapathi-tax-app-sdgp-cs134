import '../styles/Dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Tax Management Dashboard</h1>
            <div className="overview-section">
                <h2 className="section-title">Overview</h2>
                <p className="overview-description">Welcome to your tax management dashboard. Here you can efficiently manage your tax information, track your income, deductions, and overall tax obligations.</p>
            </div>
            <div className="tax-statistics">
                <h2 className="section-title">Your Tax Statistics</h2>
                <div className="tax-statistics-container">
                    <div className="statistic-item">
                        <h3>Total Income</h3>
                        <p>$0.00</p>
                    </div>
                    <div className="statistic-item">
                        <h3>Total Deductions</h3>
                        <p>$0.00</p>
                    </div>
                    <div className="statistic-item">
                        <h3>Estimated Tax Liability</h3>
                        <p>$0.00</p>
                    </div>
                </div>
            </div>
            <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions-container">
                    <button className="action-button">Add Income</button>
                    <button className="action-button">Add Deduction</button>
                    <button className="action-button">View Tax Reports</button>
                    <button className="action-button">Calculate Tax</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;