import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";

import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { Metadata } from "../../lib/Metadata";
import {
  fetchLogin,
  selectError,
  selectUserRole,
  selectUsers,
} from "../../redux/feature/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectUsers);
  const loginError = useSelector(selectError);
  const role = useSelector(selectUserRole);

  

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t('Invalid_email')).required(t('Required')),
    password: Yup.string().required(t('Required')),
  });

  const handleSubmit = (values) => {
    dispatch(fetchLogin(values));
  };

  
  useEffect(() => {
    if (loginStatus === "success") {
      toast.success(t("Login_successful!"));
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } else if (loginStatus === "failed") {
      toast.error(
        typeof loginError === "string"
          ? loginError
          : loginError.message || t("An_error_occurred")
      );
    }
  }, [loginStatus, loginError, navigate, role]);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div>
        <Metadata
          title="Login | TrovKa"
          description="Sign in to TrovKa to manage your services."
          author="TrovKa Team"
          keywords="services, TrovKa, login"
          thumbnail="https://i.ibb.co/s6D2gFC/trovka-icon.png"
        />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl">
          <div className="flex items-center justify-center w-full md:w-1/2 p-6 md:px-8">
            <div className="w-full max-w-md">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ touched, errors }) => (
                  <Form className="flex flex-col text-xl">
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src={"/image/logo/Trovka-logo-official.png"}
                        alt="Logo"
                        className="h-12 rounded-full mb-1"
                      />
                    </div>

                    <label
                      htmlFor="email"
                      className="text-blue-900 dark:text-gray-200"
                    >
                      {t("Email")}
                    </label>
                    <div className="relative mt-2">
                      <MdEmail className="absolute dark:text-gray-200 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder={t("Email")}
                        className={`pl-10 pr-2 py-2 bg-white rounded-xl w-full h-12 dark:bg-gray-800 ${
                          touched.email && errors.email ? "border-red-500" : ""
                        }`}
                        required
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="text-sm text-red-500">{errors.email}</div>
                    )}

                    <label
                      htmlFor="password"
                      className="mt-6 text-blue-900 dark:text-gray-300"
                    >
                      {t("Password")}
                    </label>
                    <div className="relative mt-2">
                      <HiOutlineLockClosed className="absolute dark:text-gray-200 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder={t("Password")}
                        className={`pl-10 pr-2 py-2 bg-white rounded-xl w-full h-12 dark:bg-gray-800 ${
                          touched.password && errors.password
                            ? "border-red-500"
                            : ""
                        }`}
                        required
                      />
                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <HiOutlineEyeOff className="dark:text-gray-200 text-gray-400" />
                        ) : (
                          <HiOutlineEye className="dark:text-gray-200text-gray-400" />
                        )}
                      </div>
                    </div>
                    {touched.password && errors.password && (
                      <div className="text-sm text-red-500">
                        {errors.password}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="mt-8 py-3 text-white bg-Secondary rounded-xl w-full"
                    >
                      {t("Login")}
                    </button>

                    <div className="flex justify-center mt-4 text-lg">
                      <p className="text-black dark:text-gray-300">
                        {t("Dont_Have_Acc")}
                      </p>
                      <button
                        onClick={handleRegisterClick}
                        className="ml-2 text-Secondary"
                      >
                        {t("Register")}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 justify-center items-center mt-8 md:mt-0">
            <img
              src="/image/icon/Login-icon.png"
              alt="Login Pic"
              className="w-96 rounded-xl"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
