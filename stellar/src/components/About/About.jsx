import React from 'react'
import logo from "../../assets/aboutImage.png";

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src={logo}
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                          Smart IoT Control Platform
                      </h2>
                      <p className="mt-6 text-gray-600 max-w-xl" >
                          This platform is a full-stack IoT dashboard designed to monitor and control connected devices in real-time. It provides live sensor data such as temperature and humidity, along with device status and control capabilities through an intuitive web interface.
                      </p>
                      <p className="mt-4 text-gray-600 max-w-xl" >
                          With support for real-time updates, historical data visualization, and scalable backend integration, this project demonstrates a complete IoT solution built using modern web technologies.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}