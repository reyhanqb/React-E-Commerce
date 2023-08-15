import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../api/url";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (credentials.password && credentials.username !== null) {
      try {
        const res = await URL.post("/auth/user/login", credentials);
        console.log(res);
        if (res.data.status !== 200) {
          nav("/");
        }
        let user = res.data.user;
        localStorage.setItem("user", user.username);
        localStorage.setItem("email", user.email);
        nav("/shop");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
      return error;
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Log in to start shopping</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        id="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        onClick={handleSubmit}
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form></form>
                <div className="text-gray-600 text-center mt-6">
                  Dont have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default SignIn;
