import { Link } from "react-router-dom";
//import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage: "url('/src/assets/bg.png')",
        }}
      >

        {/* Glass Card */}
        <div className="max-w-4xl w-full text-center 
        bg-white/30 backdrop-blur-xl border border-white/40 
        p-12 rounded-3xl shadow-2xl">

          {/* Title */}
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            Compassionate Home Care for Your Loved Ones
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-700 mb-10">
            Safe, reliable, and verified caregivers delivered to your doorstep with ease.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">

            {/* Get Started */}
            <Link
              to="/login"
              className="w-[180px] text-center py-3 rounded-xl 
              bg-blue-600 text-white font-semibold 
              shadow-md hover:scale-105 hover:bg-blue-700 
              transition duration-300"
            >
              Get Started
            </Link>

            {/* Patient Profile */}
            <Link
              to="/profile"
              className="w-[180px] text-center py-3 rounded-xl 
              bg-green-600 text-white font-semibold 
              shadow-md hover:scale-105 hover:bg-green-700 
              transition duration-300"
            >
              Patient Profile
            </Link>

          </div>
        </div>
      </div>
      {/* ✅ WHY FAMILIES TRUST US SECTION */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Why Families Trust Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">

          <div className="p-6 shadow rounded-xl hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">
              Verified Caregivers
            </h3>
            <p className="text-gray-600">
              All professionals are background checked and trained.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Book services quickly with a simple interface.
            </p>
          </div>

          <div className="p-6 shadow rounded-xl hover:shadow-xl transition">
            <h3 className="font-semibold text-lg mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Our team is always available to assist you.
            </p>
          </div>

        </div>
      </section>
      {/* ✅ HOW IT WORKS SECTION */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div>1. Choose Service</div>
          <div>2. Select Caregiver</div>
          <div>3. Book Appointment</div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          What Our Users Say
        </h2>
      
      <p className="max-w-xl mx-auto">
        "This platform helped me find a caregiver for my grandmother easily. Highly recommended!"
      </p>
      </section>

      <section className="py-10 bg-blue-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Need urgent care support?
        </h2>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg">
          Contact Us
        </button>
      </section>
    </>
  );
}

export default Home;