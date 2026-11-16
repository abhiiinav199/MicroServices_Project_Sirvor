import {
  forgotPasswordApi,
  forgotPasswordOtpVerifyApi,
  resetPasswordApi,
} from "../../../api/auth";
import type {
  forgotPasswordOtpVerifyPayload,
  forgotPasswordPayload,
  resetPasswordPayload,
} from "../../../types/auth";

export const forgotPasswordApiCall = async (data: forgotPasswordPayload) => {
  const res = await forgotPasswordApi(data);

  if (!res?.data?.success) {
    throw new Error("Error occured during forgot password api call");
  }
  return res.data;
};

export const forgotPasswordOtpApiCall = async (
  data: forgotPasswordOtpVerifyPayload,
) => {
  const res = await forgotPasswordOtpVerifyApi(data);
  if (!res?.data?.success) {
    throw new Error("Error occured during forgot password api call");
  }
  return res.data;
};

export const resetPasswordApiCall = async (data: resetPasswordPayload) => {
  const res = await resetPasswordApi(data);

  if (!res?.data?.success) {
    throw new Error("Error occured during reset password api call");
  }
  return res.data;
};
