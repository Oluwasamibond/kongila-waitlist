import React, { useState } from "react";

const BACKEND_URL = "https://kongila-pre-backend.vercel.app";

const countries = [
  { code: "+234", name: "Nigeria" },
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+1", name: "Canada" },
  { code: "+49", name: "Germany" },
  { code: "+254", name: "Kenya" },
  { code: "+233", name: "Ghana" },
  { code: "+27", name: "South Africa" },
  { code: "+20", name: "Egypt" },
  { code: "+254", name: "Kenya" },
  { code: "+233", name: "Ghana" },
  { code: "+244", name: "Angola" },
  { code: "+972", name: "Israel" },
  { code: "+60", name: "Malaysia" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+237", name: "Cameroon" },
  { code: "+86", name: "China" },
  { code: "+225", name: "Côte d'Ivoire" },
  { code: "+33", name: "France" },
  { code: "+231", name: "Liberia" },
  { code: "+223", name: "Mali" },
  { code: "+212", name: "Morocco" },
  { code: "+31", name: "Netherlands" },
  { code: "+351", name: "Portugal" },
  { code: "+250", name: "Rwanda" },
  { code: "+221", name: "Senegal" },
  { code: "+248", name: "Seychelles" },
  { code: "+232", name: "Sierra Leone" },
  { code: "+66", name: "Thailand" },
  { code: "+228", name: "Togo" },
  { code: "+216", name: "Tunisia" },
  { code: "+256", name: "Uganda" },
];

const sectors = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Marketing",
  "Other",
];

const Form = () => {
  const [tab, setTab] = useState("employer");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    companySector: "",
    companyName: "",
    companySize: "",
    hiringTimeline: "",

    // talent fields
    phoneCode: "",
    phoneNumber: "",
    competency: "",
    role: "",
    whatsappUpdates: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.firstName || !form.lastName || !form.email) {
      setError("Please fill first name, last name and email.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        userType: tab === "employer" ? "Employer" : "Talent",
      };

      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");

      setSuccess("You're on the waitlist 🚀");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        companySector: "",
        companyName: "",
        companySize: "",
        hiringTimeline: "",
        phoneCode: "",
        phoneNumber: "",
        competency: "",
        role: "",
        whatsappUpdates: false,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 mx-auto max-w-3xl px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <p className="text-center text-gray-600 mb-6">
          I am primarily interested as a ...
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-6 border border-gray-300 rounded-2xl p-1">
          <div
            onClick={() => setTab("employer")}
            className={`flex-1 cursor-pointer rounded-xl py-4 text-center transition ${
              tab === "employer"
                ? "bg-[#004aad] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <p className="font-semibold text-lg">Employer</p>
            <p className="text-sm mt-1">Looking to hire</p>
          </div>

          <div
            onClick={() => setTab("talent")}
            className={`flex-1 cursor-pointer rounded-xl py-4 text-center transition ${
              tab === "talent"
                ? "bg-[#004aad] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <p className="font-semibold text-lg">Talent</p>
            <p className="text-sm mt-1">Seeking opportunities</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Names */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
            >
              <option value="">Select your country...</option>
              {countries.map((c, i) => (
                <option key={i} value={`${c.name} (${c.code})`}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Sector / Company Sector
            </label>
            <select
              name="companySector"
              value={form.companySector}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
            >
              <option value="">Select your industry...</option>
              {sectors.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* EMPLOYER FIELDS */}
          {tab === "employer" && (
            <>
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
                />
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
                >
                  <option value="">Select size...</option>
                  <option value="1-10">1–10 employees</option>
                  <option value="11-50">11–50 employees</option>
                  <option value="51-200">51–200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              {/* Hiring Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hiring Timeline
                </label>
                <select
                  name="hiringTimeline"
                  value={form.hiringTimeline}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
                >
                  <option value="">When do you plan to hire?</option>
                  <option value="Immediately">Immediately</option>
                  <option value="1-3 months">1–3 months</option>
                  <option value="3-6 months">3–6 months</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </>
          )}

          {/* TALENT FIELDS */}
          {tab === "talent" && (
            <>
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <div className="flex gap-3 mt-1">
                  <select
                    name="phoneCode"
                    value={form.phoneCode}
                    onChange={handleChange}
                    className="w-32 border border-gray-300 rounded-xl px-3 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
                  >
                    <option value="">Code</option>
                    {countries.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
                  />
                </div>

                {/* WhatsApp checkbox */}
                <label className="flex items-center gap-2 mt-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="whatsappUpdates"
                    checked={form.whatsappUpdates}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Send me updates via WhatsApp
                </label>
              </div>

              {/* Competency Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Level of Competency
                </label>
                <select
                  name="competency"
                  value={form.competency}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-[#004aad]"
                >
                  <option value="">Select your level...</option>
                  <option value="Executive">Executive</option>
                  <option value="Senior Management">Senior Management</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Entry Level">Entry Level</option>
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Role
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="e.g. Product Manager, Software Engineer"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#004aad]"
                />
              </div>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#004aad] text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : tab === "employer"
              ? "Notify me when you launch"
              : "Join as talent"}
          </button>

          {/* FEEDBACK */}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>
      </div>
    </section>
  );
};

export default Form;
