import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCaregiverById } from "../api/caregiverApi";

function CaregiverDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        setLoading(true);
        const data = await getCaregiverById(id);
        setCaregiver(data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load caregiver details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Loading caregiver details...
          </h1>
          <p className="text-slate-600">
            Please wait while we fetch the caregiver profile.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Unable to load caregiver
          </h1>
          <p className="text-slate-600 mb-6">{error}</p>
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

  if (!caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Caregiver not found
          </h1>
          <p className="text-slate-600 mb-6">
            The caregiver profile you are looking for is not available.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef8fb] via-[#d6eef4] to-[#bfe4ed] px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/services")}
          className="mb-6 text-blue-700 font-semibold hover:text-blue-900 transition"
        >
          Back to Caregivers
        </button>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <img
                src={caregiver.image || "https://via.placeholder.com/200"}
                alt={caregiver.name || "Caregiver"}
                className="w-32 h-32 rounded-3xl object-cover shadow-lg"
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                    {caregiver.name || "Unnamed Caregiver"}
                  </h1>

                  {caregiver.verified && (
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-lg text-blue-700 font-semibold mb-2">
                  {caregiver.service || "Service not provided"}
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

            <div className="grid md:grid-cols-2 gap-4 mb-8">
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

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Languages</p>
                <p className="font-semibold text-slate-800">
                  {caregiver.languages?.length
                    ? caregiver.languages.join(", ")
                    : "Not provided"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Service Fee</p>
                <p className="font-semibold text-slate-800">
                  {caregiver.price || "Not provided"}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                About the caregiver
              </h2>
              <p className="text-slate-600 leading-7">
                {caregiver.bio || "No caregiver bio available."}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-3">
                {caregiver.certifications?.length ? (
                  caregiver.certifications.map((certification) => (
                    <span
                      key={certification}
                      className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {certification}
                    </span>
                  ))
                ) : (
                  <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium">
                    No certifications listed
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                Family reviews
              </h2>
              <div className="grid gap-4">
                {caregiver.reviews?.length ? (
                  caregiver.reviews.map((review, index) => (
                    <div
                      key={`${caregiver._id}-${index}`}
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-100"
                    >
                      <p className="text-slate-600 leading-6">"{review}"</p>
                    </div>
                  ))
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-slate-600 leading-6">
                      No reviews available yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/70 p-8 h-fit">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Book this caregiver
            </h2>
            <p className="text-slate-600 leading-7 mb-6">
              Review the caregiver profile and continue to booking when you are
              ready. This caregiver is available for trusted in-home elderly care.
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Specialty</p>
                <p className="font-semibold text-slate-800">
                  {caregiver.service || "Not provided"}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Experience</p>
                <p className="font-semibold text-slate-800">
                  {caregiver.experience || "Not provided"}
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-slate-500 mb-1">Price</p>
                <p className="font-semibold text-slate-800">
                  {caregiver.price || "Not provided"}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/booking/${caregiver._id}`)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Continue to Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaregiverDetails;
