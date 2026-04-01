import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/homeImage.jpg";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50">

        {/* LEFT */}
        <div className="max-w-xl" data-aos="fade-right">
          <p className="text-sm text-orange-600 font-medium mb-2">
            Smart IoT Platform
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Monitor & Control Your{" "}
            <span className="text-orange-600">IoT Devices</span> in Real-Time
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Track temperature, humidity, and device status with a secure, role-based dashboard.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700 transition"
            >
              Get Started
            </button>

            <button
            onClick={() => navigate("/about")}
            className="border border-gray-300 px-6 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
            >
            Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="mt-10 md:mt-0 md:w-1/2 flex justify-center"
          data-aos="fade-left"
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <img
              src={logo}
              alt="IoT Dashboard"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20 px-10">
        <h2
          className="text-3xl font-bold text-center text-gray-800"
          data-aos="fade-up"
        >
          Key Features
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-xl font-semibold">Real-time Monitoring</h3>
            <p className="text-gray-600 mt-2">
              View live temperature and humidity data from connected devices.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold">Device Control</h3>
            <p className="text-gray-600 mt-2">
              Turn devices ON/OFF remotely with a simple interface.
            </p>
          </div>

          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-xl font-semibold">Secure Access</h3>
            <p className="text-gray-600 mt-2">
              Role-based authentication ensures secure access.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-10 text-center bg-white">
        <h2
          className="text-3xl font-bold text-gray-800"
          data-aos="zoom-in"
        >
          Get Started with Your IoT Dashboard
        </h2>

        <p
          className="mt-4 text-gray-600"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          Secure, scalable, and built for real-time monitoring.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-orange-700 transition"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Get Started
        </button>
      </section>

    </div>
  );
}

export default Home;