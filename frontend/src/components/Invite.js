import React, { useState } from "react";

const Invite = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    clearForm();
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Invite User</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">E-mail</label>
          <input
            className="rounded-lg bg-[#EEF2F6] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Type your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            className="rounded-lg bg-[#EEF2F6] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Type your password"
          />
        </div>
        <div className="flex items-center justify-between ">
          <button
            className="bg-[#558987] text-white py-2 px-4 rounded-lg w-full"
            type="submit"
          >
            Send Invite
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invite;
