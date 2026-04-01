import { useState } from "react";

function Dashboard() {
  // Dummy state
  const [devices, setDevices] = useState([
    { id: 1, name: "Fan", status: true },
    { id: 2, name: "Light", status: false },
  ]);

  const temperature = 28;
  const humidity = 65;
  const isOnline = true;

  // Toggle function
  const toggleDevice = (id) => {
    const updatedDevices = devices.map((device) =>
      device.id === id
        ? { ...device, status: !device.status }
        : device
    );
    setDevices(updatedDevices);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome, User</p>
      </div>

      {/* SENSOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Temperature */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Temperature</h2>
          <p className="text-3xl font-bold text-orange-600">{temperature}°C</p>
        </div>

        {/* Humidity */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">Humidity</h2>
          <p className="text-3xl font-bold text-blue-600">{humidity}%</p>
        </div>

        {/* Device Status */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">System Status</h2>
          <p className={`font-semibold ${isOnline ? "text-green-500" : "text-red-500"}`}>
            {isOnline ? "Online 🟢" : "Offline 🔴"}
          </p>
        </div>
      </div>

      {/* DEVICE CONTROL SECTION */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Device Control
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{device.name}</h3>
              <p className="text-gray-500">
                Status: {device.status ? "ON" : "OFF"}
              </p>
            </div>

            <button
              onClick={() => toggleDevice(device.id)}
              className={`px-4 py-2 rounded-lg text-white ${
                device.status
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            >
              {device.status ? "Turn OFF" : "Turn ON"}
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;