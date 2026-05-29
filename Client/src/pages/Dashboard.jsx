import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/repo/user/${userId}`,
        );

        setRepositories(response.data.result);
      } catch (err) {
        console.error("Error fetching repos", err);
      }
    };

    const fetchSuggestedRepo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/repo/all`);

        setSuggestedRepositories(response.data);
      } catch (err) {
        console.error("Error fetching repos", err);
      }
    };

    fetchRepo();
    fetchSuggestedRepo();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
        <section className="max-w-7xl mx-auto flex gap-6 px-6 py-8">
          <aside className="w-70 sticky top-5 h-fit">
            <div className="border border-[#30363d] rounded-xl bg-[#161b22] p-4">
              <h3 className="text-lg font-semibold mb-5">
                Suggested Repositories
              </h3>

              <div className="space-y-4">
                {suggestedRepositories.map((repo) => {
                  return (
                    <div
                      key={repo._id}
                      className="border border-[#30363d] rounded-lg p-3 hover:bg-[#1c2128] transition"
                    >
                      <h4 className="text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                        {repo.name}
                      </h4>

                      <p className="text-sm text-[#8b949e] mt-1">
                        {repo.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
          <main className="flex-1">
            {/* SEARCH */}
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                placeholder="Search repositories..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                w-full
                bg-[#0d1117]
                border
                border-[#30363d]
                rounded-md
                px-4
                py-2.5
                text-sm
                outline-none
                focus:border-[#58a6ff]
              "
              />
            </div>
            <div className="border border-[#30363d] rounded-xl bg-[#161b22]">
              <div className="border-b border-[#30363d] px-5 py-4">
                <h2 className="text-xl font-semibold">Your Repositories</h2>
              </div>

              <div>
                {searchResults.map((repo) => {
                  return (
                    <div
                      key={repo._id}
                      className="
                      px-5
                      py-5
                      border-b
                      border-[#30363d]
                      hover:bg-[#1c2128]
                      transition
                    "
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-[#58a6ff] font-semibold text-lg cursor-pointer hover:underline">
                            {repo.name}
                          </h3>

                          <p className="text-sm text-[#8b949e] mt-1">
                            {repo.description}
                          </p>
                        </div>

                        <button
                          className="
                          px-3
                          py-1.5
                          text-sm
                          rounded-md
                          border
                          border-[#30363d]
                          bg-[#21262d]
                          hover:bg-[#30363d]
                          transition
                        "
                        >
                          View
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
          <aside className="w-65 sticky top-5 h-fit">
            <div className="border border-[#30363d] rounded-xl bg-[#161b22] p-4">
              <h3 className="text-lg font-semibold mb-5">Upcoming Events</h3>

              <div className="space-y-4">
                <div className="border border-[#30363d] rounded-lg p-3">
                  <p className="font-medium">Tech Conference</p>

                  <p className="text-sm text-[#8b949e] mt-1">Dec 15</p>
                </div>

                <div className="border border-[#30363d] rounded-lg p-3">
                  <p className="font-medium">Developer Meetup</p>

                  <p className="text-sm text-[#8b949e] mt-1">Dec 25</p>
                </div>

                <div className="border border-[#30363d] rounded-lg p-3">
                  <p className="font-medium">React Summit</p>

                  <p className="text-sm text-[#8b949e] mt-1">Jan 5</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
