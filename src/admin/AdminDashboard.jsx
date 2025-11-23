import React, { useEffect, useState } from "react";

const BACKEND_URL = "https://kongila-waitlist-backend.onrender.com";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch leads
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/leads/admin`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      setLeads(data);
      setFiltered(data);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filtering + Searching + Sorting
  useEffect(() => {
    let results = [...leads];

    // Filter userType
    if (filter === "employer") {
      results = results.filter((l) => l.userType?.toLowerCase() === "employer");
    } else if (filter === "talent") {
      results = results.filter((l) => l.userType?.toLowerCase() === "talent");
    }

    // Search by name or email
    if (search.trim()) {
      const term = search.toLowerCase();
      results = results.filter(
        (l) =>
          (l.fullName || "").toLowerCase().includes(term) ||
          (l.email || "").toLowerCase().includes(term)
      );
    }

    // Sorting logic
    results.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "createdAt") {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      } else {
        valA = (valA || "").toString().toLowerCase();
        valB = (valB || "").toString().toLowerCase();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFiltered(results);
    setCurrentPage(1);
  }, [filter, search, leads, sortField, sortOrder]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Pagination
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-[#004aad] mb-6 text-center">
        Kongila Admin Dashboard
      </h1>

      {/* Filters */}
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-4 mb-6">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="border p-2 rounded-xl"
        >
          <option value="all">All Users</option>
          <option value="employer">Employers</option>
          <option value="talent">Talents</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded-xl min-w-[220px]"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading users...</div>
      ) : (
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#004aad] text-white">
              <tr>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => toggleSort("fullName")}
                >
                  Name{" "}
                  {sortField === "fullName"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th className="p-3">Email</th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => toggleSort("userType")}
                >
                  Type{" "}
                  {sortField === "userType"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th className="p-3">Country</th>
                <th className="p-3">Details</th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => toggleSort("createdAt")}
                >
                  Date{" "}
                  {sortField === "createdAt"
                    ? sortOrder === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((lead) => (
                  <tr key={lead._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{lead.fullName || "N/A"}</td>
                    <td className="p-3">{lead.email || "N/A"}</td>
                    <td className="p-3">{lead.userType || "N/A"}</td>
                    <td className="p-3">{lead.country || "N/A"}</td>

                    {/* FORM DETAILS COLUMN */}
                    <td className="p-3 text-sm">
                      {lead.userType?.toLowerCase() === "employer" ? (
                        <div>
                          <p>
                            <b>Company:</b> {lead.companyName || "N/A"}
                          </p>
                          <p>
                            <b>Industry:</b> {lead.industry || "N/A"}
                          </p>
                          <p>
                            <b>Company Size:</b> {lead.companySize || "N/A"}
                          </p>
                          <p>
                            <b>Website:</b> {lead.website || "N/A"}
                          </p>
                          <p>
                            <b>Job Title:</b> {lead.contactJobTitle || "N/A"}
                          </p>
                          <p>
                            <b>Phone:</b> {lead.contactPhone || "N/A"}
                          </p>
                          <p>
                            <b>Needed Talents:</b>{" "}
                            {lead.numberOfTalents || "N/A"}
                          </p>
                          <p>
                            <b>Timezone:</b> {lead.preferredTimezone || "N/A"}
                          </p>
                          <p>
                            <b>Timeline:</b> {lead.hiringTimeline || "N/A"}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            <b>Skillset:</b> {lead.skillset || "N/A"}
                          </p>
                          <p>
                            <b>Level:</b> {lead.professionalLevel || "N/A"}
                          </p>
                          <p>
                            <b>Preferred Role:</b> {lead.preferredRole || "N/A"}
                          </p>
                          <p>
                            <b>Phone:</b> {lead.phone || "N/A"}
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-gray-600">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4 p-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-[#004aad] text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
