import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchVerifyEmail, selectUser } from "../../redux/feature/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const VerifyCode = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userVerificationResponse = useSelector(selectUser);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      navigate("/register");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const verificationData = {
        email,
        otp_code: values.code,
      };

      try {
        const resultAction = await dispatch(fetchVerifyEmail(verificationData));
        const originalPromiseResult = unwrapResult(resultAction);

        console.log("Verification successful:", originalPromiseResult);
        navigate("/"); // Navigate to home page
        resetForm();
      } catch (rejectedValueOrSerializedError) {
        console.error("Verification failed:", rejectedValueOrSerializedError);
      }
    },
  });

  return (
    <div>
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center dark:bg-gray-900 rounded-2xl p-8">
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col text-xl md:w-1/2">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/image/logo/Trovka-logo-offcial.png"
              alt="Logo"
              className="h-12 rounded-full"
            />
          </div>
          <p className="text-blue-900 mb-4">
            {t('Vty')} {email}.
          </p>
          <label htmlFor="code" className="text-blue-900">
          {t('Vty_Code')}
          </label>
          <div className="relative mt-2">
            <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="code"
              {...formik.getFieldProps("code")}
              className={`pl-10 pr-2 py-2 bg-white rounded-xl w-full h-12 ${
                formik.touched.code && formik.errors.code ? "border-red-500" : ""
              }`}
              required
            />
          </div>
          {formik.touched.code && formik.errors.code && (
            <div className="text-sm text-red-500">{formik.errors.code}</div>
          )}
          <button
            type="submit"
            className="mt-8 py-3 text-white bg-[#FFB600] rounded-xl w-full"
          >
            {('Verify')}
          </button>
          <div className="flex justify-center mt-4 text-lg">
            <p className="text-black">{t('Didnt_receive_the_code?')}</p>
            <a href="#" className="ml-2 text-[#FFB600]">
            {t('Resend')}
            </a>
          </div>
        </form>
        <div className="hidden md:flex md:w-1/2 justify-center items-center mt-8 md:mt-0">
          <img src="/image/icon/otp.png" alt="OTP Icon" className="w-72" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default VerifyCode;
