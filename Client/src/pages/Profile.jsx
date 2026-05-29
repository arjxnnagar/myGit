import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import HeatMapProfile from "./HeatMap";

import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";

import  useAuth  from "../context/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "username",
  });

  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/getuserprofile/${userId}`,
          );
          setUserDetails(response.data.user);

        } catch (err) {
          console.error("Cannot fetch user details:", err);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />

      <div className="border-b border-[#0d0e0f] px-10">
        <UnderlineNav aria-label="Repository">
          <UnderlineNav.Item aria-current="page" icon={BookIcon}>
            <p className="text-white hover:underline">Overview</p>
          </UnderlineNav.Item>

          <UnderlineNav.Item
            onClick={() => navigate("/repo")}
            icon={RepoIcon}
            className="text-white hover:underline"
          >
            <p className="text-white hover:underline">Starred Repositiry</p>
          </UnderlineNav.Item>
        </UnderlineNav>
      </div>

      <section className="max-w-7xl mx-auto flex gap-10 px-8 py-10">
        <aside className="w-75">
          <div
            className="
              w-72
              h-72
              rounded-full
              bg-[#161b22]
              border
              border-[#30363d]
            "
          ></div>

          <div className="mt-5">
            <h2 className="text-2xl font-bold">{userDetails.username}</h2>

            <p className="text-[#8b949e] mt-1">Full Stack Developer</p>
          </div>

          {/* FOLLOW BUTTON */}
          <button
            className="
              w-full
              mt-5
              bg-[#21262d]
              border
              border-[#30363d]
              rounded-md
              py-2
              font-medium
              hover:bg-[#30363d]
              transition
            "
          >
            Follow
          </button>

          <div className="flex gap-5 mt-5 text-sm text-[#8b949e]">
            <p>
              <span className="text-white font-semibold">10</span> Followers
            </p>

            <p>
              <span className="text-white font-semibold">3</span> Following
            </p>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");

              setCurrentUser(null);

              window.location.href = "/auth";
            }}
            className="
              mt-8
              w-full
              py-2
              rounded-md
              bg-red-600
              hover:bg-red-700
              transition
              font-medium
            "
          >
            Logout
          </button>
        </aside>

        <main className="flex-1">
          <div
            className="
              border
              border-[#30363d]
              rounded-xl
              bg-[#161b22]
              p-6
            "
          >
            <h3 className="text-lg font-semibold mb-5">
              Contribution Activity
            </h3>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-5">Pinned Repositories</h3>

            <div className="grid grid-cols-2 gap-5">
              <div
                className="
                  border
                  border-[#30363d]
                  rounded-xl
                  bg-[#161b22]
                  p-5
                  hover:bg-[#1c2128]
                  transition
                "
              >
                <h4 className="text-[#58a6ff] font-semibold">portfolio-app</h4>

                <p className="text-sm text-[#8b949e] mt-2">
                  Personal portfolio website built using React.
                </p>
              </div>

              <div
                className="
                  border
                  border-[#30363d]
                  rounded-xl
                  bg-[#161b22]
                  p-5
                  hover:bg-[#1c2128]
                  transition
                "
              >
                <h4 className="text-[#58a6ff] font-semibold">github-clone</h4>

                <p className="text-sm text-[#8b949e] mt-2">
                  Full stack GitHub clone using MERN stack.
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
      <HeatMapProfile />
    </div>
  );
};

export default Profile;
