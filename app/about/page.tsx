

import { FaCloud, FaLock, FaHeadset } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main>
      <section>
         <div className="container m-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-600 font-semibold ">
            About Us
          </span>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-800 lg:text-5xl">
            Your Trusted Cloud Hosting Partner
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            We provide fast, secure, and reliable cloud hosting solutions
            designed to help businesses and individuals build a strong online
            presence.
          </p>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <FaCloud className="text-5xl text-blue-500 mb-5" />

            <h2 className="text-2xl font-bold text-gray-800">
              Cloud Technology
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              High-performance cloud infrastructure that keeps your website
              running smoothly.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <FaLock className="text-5xl text-blue-500 mb-5" />

            <h2 className="text-2xl font-bold text-gray-800">
              Secure Hosting
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              Advanced security with SSL certificates, backups, and malware
              protection.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <FaHeadset className="text-5xl text-blue-500 mb-5" />

            <h2 className="text-2xl font-bold text-gray-800">
              24/7 Support
            </h2>

            <p className="mt-4 text-gray-500 leading-7">
              Our support team is available around the clock whenever you need
              help.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 rounded-3xl bg-blue-600 text-white p-10">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <h3 className="text-4xl font-bold">50K+</h3>
              <p className="mt-2">Happy Clients</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">99.9%</h3>
              <p className="mt-2">Uptime</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="mt-2">Support</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">10+</h3>
              <p className="mt-2">Years Experience</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-gray-500">
            Join thousands of customers who trust us with their websites.
          </p>

          <button className="mt-8 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-500 hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
      </section>
     
    </main>
  );
}