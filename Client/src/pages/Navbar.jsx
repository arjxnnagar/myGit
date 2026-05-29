import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="
        h-16
        bg-[#161b22]
        border-b
        border-[#30363d]
        px-8
        flex
        items-center
        justify-between
      "
    >
      <div className="flex items-center gap-5">

        <Link
          to="/"
          className="
            flex
            items-center
            gap-3
            text-white
            no-underline
          "
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
            className="
              w-9
              h-9
              rounded-full
            "
          />

          <h3 className="text-xl font-semibold">GitHub</h3>
        </Link>
        <input
          type="text"
          placeholder="Search or jump to..."
          className="
            w-72
            bg-[#0d1117]
            border
            border-[#30363d]
            rounded-md
            px-4
            py-2
            text-sm
            text-white
            outline-none
            focus:border-[#58a6ff]
          "
        />
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/create"
          className="
            text-[#c9d1d9]
            text-sm
            font-medium
            hover:text-[#58a6ff]
            transition
          "
        >
          Create Repository
        </Link>

        <Link
          to="/profile"
          className="
            text-[#c9d1d9]
            text-sm
            font-medium
            hover:text-[#58a6ff]
            transition
          "
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
