import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCaregivers } from "../api/caregiverApi";

function Services() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        const data = await getAllCaregivers();
        setCaregivers(data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load caregivers."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  const serviceOptions = [
    "All",
    ...new Set(caregivers.map((c) => c.service).filter(Boolean)),
  ];

  const cityOptions = [
    "All",
    ...new Set(caregivers.map((c) => c.location).filter(Boolean)),
  ];

  const filteredCaregivers = useMemo(() => {
    let results = caregivers.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const service = c.service?.toLowerCase() || "";
      const location = c.location?.toLowerCase() || "";
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        name.includes(searchTerm) ||
        service.includes(searchTerm) ||
        location.includes(searchTerm);

      const matchesService =
        selectedService === "All" || c.service === selectedService;

      const matchesCity = selectedCity === "All" || c.location === selectedCity;

      const matchesRating =
        selectedRating === "All" || Number(c.rating) >= Number(selectedRating);

      return matchesSearch && matchesService && matchesCity && matchesRating;
    });

    if (sortBy === "rating") {
      results.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortBy === "experience") {
      results.sort(
        (a, b) =>
          parseInt(b.experience, 10) - parseInt(a.experience, 10)
      );
    } else if (sortBy === "name") {
      results.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return results;
  }, [
    caregivers,
    search,
    selectedService,
    selectedCity,
    selectedRating,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf7fb] via-[#d2eef5] to-[#b9e3ee] px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 mb-3">
            Trusted Elder Care
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            Find the right caregiver for your family
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg">
            Browse verified professionals for nursing, physiotherapy, post-surgery
            care, and daily elderly assistance.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/60 p-6 md:p-8 mb-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              placeholder="Search by name, service, or city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            />

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            >
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              >
                <option value="All">All Ratings</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              >
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/75 rounded-3xl p-10 text-center shadow-lg">
            <p className="text-slate-700 text-lg font-medium">Loading caregivers...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-3xl p-10 text-center shadow-lg border border-red-100">
            <h2 className="text-2xl font-bold text-red-700 mb-3">
              Unable to load caregivers
            </h2>
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <p className="text-slate-700 font-medium text-sm sm:text-base">
                {filteredCaregivers.length} caregiver
                {filteredCaregivers.length !== 1 ? "s" : ""} found
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {serviceOptions.slice(0, 6).map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedService === service
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/70 text-slate-700 hover:bg-blue-100"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {filteredCaregivers.length === 0 ? (
              <div className="bg-white/75 rounded-3xl p-6 sm:p-10 text-center shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                  No caregivers match your search
                </h2>
                <p className="text-slate-600 mb-5">
                  Try changing the filters or searching with a different city or service.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedService("All");
                    setSelectedCity("All");
                    setSelectedRating("All");
                    setSortBy("rating");
                  }}
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredCaregivers.map((c) => (
                  <div
                    key={c._id}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-lg border border-white/70 hover:-translate-y-1 hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                        <img
                          src={c.image || "https://via.placeholder.com/150"}
                          alt={c.name || "Caregiver"}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-md shrink-0"
                        />
                        <div className="min-w-0">
                          <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">
                            {c.name || "Unnamed Caregiver"}
                          </h2>
                          <p className="text-sm text-slate-600 truncate">
                            {c.service || "Service not provided"}
                          </p>
                        </div>
                      </div>

                      {c.verified && (
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Number(c.rating) >= 4.8 && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                          Top Rated
                        </span>
                      )}
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {c.experience || "Experience not provided"}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">
                        {c.price || "Price not provided"}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <p>
                        <span className="font-semibold text-slate-800">Rating:</span>{" "}
                        {c.rating ?? "N/A"} / 5
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">Location:</span>{" "}
                        {c.location || "Location not provided"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">Availability:</span>{" "}
                        {c.availability || "Not provided"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800">Languages:</span>{" "}
                        {c.languages?.length ? c.languages.join(", ") : "Not provided"}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-6 mb-5">
                      {c.bio || "No caregiver bio available."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.certifications?.length ? (
                        c.certifications.map((certification) => (
                          <span
                            key={certification}
                            className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                          >
                            {certification}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                          No certifications listed
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate(`/caregiver/${c._id}`)}
                        className="w-full py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/booking/${c._id}`)}
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Services;
