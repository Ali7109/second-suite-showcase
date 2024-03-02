import "./App.css";
import MapComp from "./component/MapComp";
import { Location } from "./types/Location";
import "leaflet/dist/leaflet.css";

function App() {
	const locations: Location[] = [
		{
			lat: 51.505,
			lng: -0.09,
		},
		{
			lat: 51.497,
			lng: -0.09,
		},
		{
			lat: 51.507,
			lng: -0.09,
		},
	];

	return (
		<div className="w-full h-full min-h-screen flex justify-center items-center">
			<div className="w-full h-64">
				<MapComp locations={locations} />
			</div>
		</div>
	);
}

export default App;
