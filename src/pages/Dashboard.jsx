import { Link } from "react-router-dom";

function Dashboard() {
	return (
		<div className="fixed bottom-36 right-0 left-0 z-1">
			<div className="flex flex-col  gap-6 text-xl">
				<Link to="/themes" className="basicShadow">
					Themes
				</Link>
				<Link to="/edit-themes" className="basicShadow">
					New Theme
				</Link>
        <Link to="/search" className="basicShadow">
					Search
				</Link>
			</div>
		</div>
	);
}

export default Dashboard;
