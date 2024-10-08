import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { URL } from "../../api/url";

import Header from "../../partials/Header";
import Banner from "../../partials/Banner";

const Registration = () => {
  const nav = useNavigate();

  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    pwd: "",
  });

  const handleInputChange = (e) => {
    let { value, name } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const registerUser = async () => {
    console.log(credentials);
    const res = await URL.post("/register", credentials);
    if (res.status === 200) {
      nav("/login");
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Page content */}
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">
                    Register to begin exploring our products.
                  </h1>
                </div>

                {/* Form */}
                <div className="max-w-sm mx-auto">
                  {" "}
                  <form>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3 justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Username <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your name"
                          name="username"
                          required
                          onChange={handleInputChange}
                          value={credentials.username}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your email address"
                          name="email"
                          onChange={handleInputChange}
                          value={credentials.email}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1 justify-start"
                          htmlFor="password"
                        >
                          Password <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="pwd"
                          className="form-input w-full text-gray-800"
                          placeholder="Enter your password"
                          onChange={handleInputChange}
                          value={credentials.pwd}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                          onClick={registerUser}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-600 text-center mt-6">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Banner />
      </div>
    </>
  );
};

export default Registration;
