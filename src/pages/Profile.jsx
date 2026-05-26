import { useEffect, useState } from "react";
import {
  createProfile,
  getMyProfile,
  updateProfile,
} from "../api/profileApi";

function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicines, setMedicines] = useState("");
  const [mobility, setMobility] = useState("");
  const [notes, setNotes] = useState("");
  const [profileId, setProfileId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();

        setProfileId(data._id);
        setName(data.name || "");
        setAge(data.age || "");
        setGender(data.gender || "");
        setPhone(data.phone || "");
        setEmergencyContact(data.emergencyContact || "");
        setAddress(data.address || "");
        setMedicalConditions(data.medicalConditions || "");
        setAllergies(data.allergies || "");
        setMedicines(data.medicines || "");
        setMobility(data.mobility || "");
        setNotes(data.notes || "");
        setError("");
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name || !age || !phone || !emergencyContact || !address) {
      setError("Please fill all required fields.");
      setSuccess("");
      return;
    }

    const profileData = {
      name,
      age: Number(age),
      gender,
      phone,
      emergencyContact,
      address,
      medicalConditions,
      allergies,
      medicines,
      mobility,
      notes,
    };

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (profileId) {
        const response = await updateProfile(profileId, profileData);
        setSuccess(response.message || "Profile updated successfully.");
      } else {
        const response = await createProfile(profileData);
        setProfileId(response.profile._id);
        setSuccess(response.message || "Profile created successfully.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#d9f1f6] via-[#9fd0dc] to-[#2f7b8d] px-4 pt-28 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-8 md:p-10 rounded-3xl shadow-[0_12px_40px_rgba(31,38,135,0.18)] text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Loading Profile...
            </h2>
            <p className="text-slate-600">
              Please wait while we fetch your patient details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9f1f6] via-[#9fd0dc] to-[#2f7b8d] px-4 pt-28 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-8 md:p-10 rounded-3xl shadow-[0_12px_40px_rgba(31,38,135,0.18)]">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 mb-3">
              Patient Information
            </p>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Patient Profile
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Save essential health and contact details so booking a caregiver is
              faster, safer, and more personalized.
            </p>
          </div>

          <form onSubmit={handleSave}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="number"
                placeholder="Age *"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Emergency Contact *"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />

              <input
                type="text"
                placeholder="Mobility Status"
                value={mobility}
                onChange={(e) => setMobility(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <textarea
              placeholder="Home Address *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 mb-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 min-h-[90px]"
            />

            <textarea
              placeholder="Medical Conditions"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
              className="w-full p-3 mb-4 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 min-h-[90px]"
            />

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <textarea
                placeholder="Allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 min-h-[90px]"
              />

              <textarea
                placeholder="Current Medicines"
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 min-h-[90px]"
              />
            </div>

            <textarea
              placeholder="Special Care Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 mb-6 border border-slate-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 min-h-[110px]"
            />

            {error && (
              <p className="mb-4 rounded-2xl border border-red-300/20 bg-red-500/15 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {success && (
              <p className="mb-4 rounded-2xl border border-green-300/20 bg-green-500/15 px-4 py-3 text-sm text-green-700">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition disabled:opacity-70"
            >
              {saving
                ? "Saving..."
                : profileId
                ? "Update Patient Profile"
                : "Save Patient Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;