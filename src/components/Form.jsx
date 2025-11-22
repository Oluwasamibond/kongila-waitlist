import React, { useState } from "react";

const BACKEND_URL = "https://kongila-waitlist-backend.onrender.com";

const skillSets = [
  "Software Engineering",
  "Software Development",
  "Product Management",
  "UI/UX Design",
  "Data & Analytics",
  "Cybersecurity",
  "Digital Marketing",
  "Content Writing",
  "Virtual Assistance",
  "Customer Support",
  "Sales & Lead Generation",
  "Project Management",
  "Finance & Accounting",
  "HR & Talent Support",
  "Operations & Admin",
  "Graphic Design",
  "Video Editing",
  "QA & Testing",
  "DevOps / Cloud",
  "Social Media Management",
  "Legal & Compliance",
  "Health Care",
  "Research & Analytics",
  "Others",
];

const industries = [
  "Technology",
  "Software Development",
  "AI, Data Science & Analytics",
  "Cybersecurity & Cloud Computing",
  "Design, Creative & Multimedia",
  "Digital Marketing & Content Creation",
  "E-commerce & Retail",
  "Finance & Accounting",
  "Healthcare",
  "Education",
  "Consulting & Business Services",
  "Human Resources",
  "Sales & Operations",
  "Engineering",
  "Media & Entertainment",
  "Construction",
  "Manufacturing",
  "Power & Energy",
  "Other",
];

const experienceLevels = [
  "Intern",
  "Entry-Level",
  "Mid-Level",
  "Senior",
  "Expert",
  "Specialist",
  "Executive",
];

const hiringTimelineOptions = ["1–3 months", "4–6 months", "7–12 months"];

const companySizes = ["1–10", "11–50", "51–200", "201–500", "500+"];

export default function Form() {
  const [tab, setTab] = useState("talent");

  const [form, setForm] = useState({
    // Shared fields
    fullName: "",
    email: "",
    country: "",

    // Talent fields
    phone: "",
    skillSet: "",
    professionalLevel: "",

    // Employer fields
    companyName: "",
    industry: "",
    companySize: "",
    hqLocation: "",
    website: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    engagementTypes: [],
    rolesNeeded: [],
    numberOfTalents: "",
    preferredExperience: "",
    timezone: "",
    hiringTimeline: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(e) {
    let { name, value, type, checked } = e.target;

    // Multi-select for checkboxes
    if (type === "checkbox" && name === "engagementTypes") {
      const updated = checked
        ? [...form.engagementTypes, value]
        : form.engagementTypes.filter((v) => v !== value);

      return setForm({ ...form, engagementTypes: updated });
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.fullName || !form.email) {
      return setError("Full Name and Email are required.");
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        userType: tab === "talent" ? "Talent" : "Employer",
      };

      const res = await fetch(`${BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed.");

      setSuccess("You're on the waitlist 🚀");
      setForm({
        fullName: "",
        email: "",
        country: "",

        phone: "",
        skillSet: "",
        professionalLevel: "",

        companyName: "",
        industry: "",
        companySize: "",
        hqLocation: "",
        website: "",
        contactName: "",
        contactTitle: "",
        contactEmail: "",
        contactPhone: "",
        engagementTypes: [],
        rolesNeeded: [],
        numberOfTalents: "",
        preferredExperience: "",
        timezone: "",
        hiringTimeline: "",
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <section className="w-full max-w-[650px] mt-12 mx-auto max-w-3xl px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <p className="text-center text-gray-600 mb-6">I am joining as...</p>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-6 bg-gray-100 px-6 py-3 rounded-full border border-gray-300">
            {/* TALENT */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="talent"
                checked={tab === "talent"}
                onChange={() => setTab("talent")}
                className="h-5 w-5 text-[#004aad] accent-[#004aad] cursor-pointer"
              />
              <span className="text-gray-800 font-medium">I am a Talent</span>
            </label>

            {/* EMPLOYER */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="employer"
                checked={tab === "employer"}
                onChange={() => setTab("employer")}
                className="h-5 w-5 text-[#004aad] accent-[#004aad] cursor-pointer"
              />
              <span className="text-gray-800 font-medium">
                I am an Employer
              </span>
            </label>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="text-sm font-medium text-gray-700">Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Nigeria, United States..."
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* ===========================
              TALENT FORM
              =========================== */}

          {tab === "talent" && (
            <>
              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Skill Set */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Skill Set
                </label>
                <select
                  name="skillSet"
                  value={form.skillSet}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select your skill...</option>
                  {skillSets.map((skill, i) => (
                    <option key={i} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              {/* Professional Level */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Professional Level
                </label>
                <select
                  name="professionalLevel"
                  value={form.professionalLevel}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select level...</option>
                  {experienceLevels.map((lvl, i) => (
                    <option key={i} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* ===========================
              EMPLOYER FORM
              =========================== */}

          {tab === "employer" && (
            <>
              {/* Company Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Tech Solutions Ltd"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Industry / Sector
                </label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select industry...</option>
                  {industries.map((i, idx) => (
                    <option key={idx} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company Size */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Company Size
                </label>
                <select
                  name="companySize"
                  value={form.companySize}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select size...</option>
                  {companySizes.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Headquarters Location
                </label>
                <input
                  name="hqLocation"
                  value={form.hqLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Website */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Company Website
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Contact Info */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Contact Person Full Name
                </label>
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  name="contactTitle"
                  value={form.contactTitle}
                  onChange={handleChange}
                  placeholder="HR Manager, CTO, Founder"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  placeholder="example@company.com"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Engagement Types */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Type of Engagement
                </label>

                <div className="space-y-2 mt-2">
                  {[
                    "Direct Hire",
                    "Outsourcing",
                    "Short-Term Project",
                    "Contract Management",
                  ].map((type, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <input
                        type="checkbox"
                        name="engagementTypes"
                        value={type}
                        checked={form.engagementTypes.includes(type)}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Roles Needed */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Roles & Skills Needed
                </label>
                <select
                  multiple
                  name="rolesNeeded"
                  value={form.rolesNeeded}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rolesNeeded: [...e.target.options]
                        .filter((o) => o.selected)
                        .map((o) => o.value),
                    })
                  }
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white h-32"
                >
                  {skillSets.map((skill, i) => (
                    <option key={i} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Talents */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Number of Talents Needed
                </label>
                <input
                  type="number"
                  name="numberOfTalents"
                  value={form.numberOfTalents}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Experience Level
                </label>
                <select
                  name="preferredExperience"
                  value={form.preferredExperience}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select level...</option>
                  {experienceLevels.map((lvl, i) => (
                    <option key={i} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timezone */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Timezone / Location
                </label>
                <input
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              {/* Hiring Timeline */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Hiring Timeline
                </label>
                <select
                  name="hiringTimeline"
                  value={form.hiringTimeline}
                  onChange={handleChange}
                  className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >
                  <option value="">Select timeline...</option>
                  {hiringTimelineOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-[#004aad] text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && <p className="text-center text-red-600">{error}</p>}
          {success && <p className="text-center text-green-600">{success}</p>}
        </form>
      </div>
    </section>
  );
}
