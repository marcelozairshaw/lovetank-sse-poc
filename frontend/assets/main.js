let PORT = 5000;
let eventSource = null;

const $locationForm = document.getElementById("location-form");
const $serverPort = document.getElementById("server-port");
const $distance = document.getElementById("distance");


/* ## UPDATE LOCATION ### */
async function updateLocation(e) {
  e.preventDefault();

  const latitude = e.target.latitude.value;
  const longitude = e.target.longitude.value;

  await fetch(`http://localhost:${PORT}/user/location`, {
    method: 'PUT',
    headers: {
			'x-geolocation-latitude': latitude,
			'x-geolocation-longitude': longitude,
		},
  });

  console.log('Location updated successful');
}


/* ## SELECT SERVER ### */

function updateServer(port) {
  PORT = port;
  eventSource.close();
  startServerConnect();

  updateServerView();
}

function startServerConnect() {
  eventSource = new EventSource(`http://localhost:${PORT}/sse/partnership-distance`);

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    $distance.innerHTML += `<li>${Math.round(data.distanceValue)} ${data.distanceUnid}</li>`;
  };

  eventSource.onerror = () => {
    eventSource.close();
  };
}

function updateServerView() {
  $serverPort.innerHTML = PORT;
}


(() => {
  updateServerView();
  startServerConnect();

  $locationForm.addEventListener('submit', updateLocation);
})()
