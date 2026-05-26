import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCaregiverById } from "../api/caregiverApi";
import { getMyProfile } from "../api/profileApi";
import { createBooking } from "../api/bookingApi";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caregiver, setCaregiver] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        setPageLoading(true);
        setError("");

        const caregiverData = await getCaregiverById(id);
        setCaregiver(caregiverData);

        try {
          const profileData = await getMyProfile();
          setProfile(profileData);
        } catch (profileError) {
          if (profileError.response?.status !== 404) {
            throw profileError;
          }
          setProfile(null);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load booking details."
        );
      } finally {
        setPageLoading(false);
      }
    };

    loadBookingData();
  }, [id]);

  const handleBooking = async () => {
    if (!caregiver || !profile || !selectedDate || !selectedTime) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await createBooking({
        caregiverId: caregiver._id,
        patientProfileId: profile._id,
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
      });

      setConfirmedBooking(response.booking);
      setStep(4);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6">
        <div className="bg-white/80 p-10 rounded-3xl shadow-xl text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Loading booking details...
          </h1>
          <p className="text-slate-600">
            Please wait while we fetch caregiver and profile information.
          </p>
        </div>
      </div>
    );
  }

  if (!caregiver || error === "Caregiver not found") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6">
        <div className="bg-white/80 p-10 rounded-3xl shadow-xl text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Caregiver not found
          </h1>
          <p className="text-slate-600 mb-6">
            The caregiver you are trying to book is not available.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const canGoToSummary = profile && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-4 pt-28 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 mb-3">
            Secure Booking
          </p>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Book a trusted caregiver
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Review the caregiver, confirm patient details, choose a time slot,
            and complete your booking in a guided flow.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["Caregiver", "Schedule", "Review", "Confirmed"].map((label, index) => {
            const itemStep = index + 1;
            const active = step === itemStep;
            const completed = step > itemStep;

            return (
              <div
                key={label}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  active
                    ? "bg-blue-600 text-white"
                    : completed
                    ? "bg-green-100 text-green-700"
                    : "bg-white text-slate-500 border border-slate-200"
                }`}
              >
                {itemStep}. {label}
              </div>
            );
          })}
        </div>

        {error && error !== "Caregiver not found" && (
          <div className="mb-6 rounded-2xl border border-red-300/20 bg-red-500/15 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Caregiver summary
                </h2>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <img
                    src={caregiver.image || "https://via.placeholder.com/150"}
                    alt={caregiver.name || "Caregiver"}
                    className="w-28 h-28 rounded-3xl object-cover shadow-lg"
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-800">
                        {caregiver.name}
                      </h3>
                      {caregiver.verified && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Verified
                        </span>
                      )}
                    </div>

                    <p className="text-blue-700 font-semibold mb-3">
                      {caregiver.service}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                        Rating {caregiver.rating ?? "N/A"} / 5
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {caregiver.experience || "Experience not provided"}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                        {caregiver.price || "Price not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Location</p>
                    <p className="font-semibold text-slate-800">
                      {caregiver.location || "Location not provided"}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Availability</p>
                    <p className="font-semibold text-slate-800">
                      {caregiver.availability || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-5 mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Patient details
                  </h3>

                  {!profile ? (
                    <div>
                      <p className="text-red-600 mb-4">
                        Please create a patient profile before continuing.
                      </p>
                      <button
                        onClick={() => navigate("/profile")}
                        className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                      >
                        Create Patient Profile
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 text-slate-700">
                      <p>
                        <span className="font-semibold">Name:</span> {profile.name}
                      </p>
                      <p>
                        <span className="font-semibold">Age:</span> {profile.age} years
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span> {profile.phone}
                      </p>
                      {profile.notes && (
                        <p>
                          <span className="font-semibold">Notes:</span> {profile.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => navigate(`/caregiver/${caregiver._id}`)}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Profile
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!profile}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      profile
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Choose date and time
                </h2>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full p-3 mb-6 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  placeholderText="Choose a booking date"
                  minDate={new Date()}
                />

                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-2xl font-medium transition ${
                        selectedTime === time
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-blue-50 text-slate-700 hover:bg-blue-100"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!canGoToSummary}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      canGoToSummary
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    Review Booking
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Review and confirm
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Caregiver</p>
                    <p className="font-semibold text-slate-800">
                      {caregiver.name} • {caregiver.service}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Patient</p>
                    <p className="font-semibold text-slate-800">
                      {profile?.name} • {profile?.age} years
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Schedule</p>
                    <p className="font-semibold text-slate-800">
                      {selectedDate?.toDateString()} at {selectedTime}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Status</p>
                    <p className="font-semibold text-amber-700">Pending confirmation</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-sm text-slate-500 mb-1">Estimated Fee</p>
                    <p className="font-semibold text-slate-800">{caregiver.price}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className={`px-5 py-3 rounded-xl font-semibold transition ${
                      loading
                        ? "bg-slate-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Confirming..." : "Confirm Booking"}
                  </button>
                </div>

                {loading && (
                  <p className="text-center text-blue-600 mt-4">
                    Please wait while we confirm your booking...
                  </p>
                )}
              </div>
            )}

            {step === 4 && confirmedBooking && (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-3">
                  Booking confirmed
                </h2>
                <p className="text-slate-600 mb-8">
                  Your request has been saved successfully. You can track it from
                  your booking history and dashboard.
                </p>

                <div className="bg-slate-50 rounded-3xl p-6 text-left max-w-xl mx-auto mb-8 space-y-3">
                  <p>
                    <span className="font-semibold text-slate-800">Booking ID:</span>{" "}
                    {confirmedBooking._id}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Caregiver:</span>{" "}
                    {caregiver.name}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Service:</span>{" "}
                    {caregiver.service}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Date:</span>{" "}
                    {confirmedBooking.date}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Time:</span>{" "}
                    {confirmedBooking.time}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Status:</span>{" "}
                    <span className="text-amber-700 font-semibold">
                      {confirmedBooking.status}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => navigate("/history")}
                    className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="border border-slate-300 text-slate-700 px-5 py-3 rounded-xl hover:bg-slate-50 transition"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-8 h-fit">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Booking overview
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Caregiver</p>
                <p className="font-semibold text-slate-800">{caregiver.name}</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Service</p>
                <p className="font-semibold text-slate-800">{caregiver.service}</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Price</p>
                <p className="font-semibold text-slate-800">{caregiver.price}</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Selected date</p>
                <p className="font-semibold text-slate-800">
                  {selectedDate ? selectedDate.toDateString() : "Not selected yet"}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Selected time</p>
                <p className="font-semibold text-slate-800">
                  {selectedTime || "Not selected yet"}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Patient profile</p>
                <p className="font-semibold text-slate-800">
                  {profile ? profile.name : "Profile required"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;