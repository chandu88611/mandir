import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import {
  useSentOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/services/campaignApi";
import { CircularProgress } from "@mui/material";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const LoginModel = ({ open, onClose }) => {
  const [stepCount, setStepCount] = useState(null);
  const [sendOtp, { isLoading: sendOtpLoading, isSuccess, reset }] =
    useSentOtpMutation();

  const [
    verifyOtp,
    {
      data,
      isLoading: verifyOtpLoading,
      isSuccess: verifyOtpSuccess,
      reset: verifyOtpReset,
      error: verifyOtpError,
    },
  ] = useVerifyOtpMutation();

  function removeCountryCode(phoneNumber) {
    // Remove the country code starting with + followed by 1 to 3 digits
    const cleanedNumber = phoneNumber.replace(/^\+\d{1,2}/, "");
    return cleanedNumber;
  }
  useEffect(() => {
    if (isSuccess) {
      setStepCount(1);
      reset();
    }

    return () => {};
  }, [isSuccess, reset]);
  useEffect(() => {
    if (verifyOtpSuccess) {
      if (typeof window !== 'undefined') {

        localStorage?.setItem("authToken", data?.token);
      }
      // close model fun
      onClose();
    }

    return () => {};
  }, [verifyOtpSuccess, data?.token, onClose]);

  const phoneForm = useFormik({
    initialValues: {
      mobile_number: "",
    },
    onSubmit: async (values) => {
      const { mobile_number } = values;
      await sendOtp({
        mobile_number: removeCountryCode(mobile_number),
      });
    },
  });
  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      const { otp } = values;
      await verifyOtp({
        otp,
        mobile_number: removeCountryCode(phoneForm.values?.mobile_number),
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose} className="bg-[#fff0e2]">
      <DialogContent className="sm:max-w-md px-16">
        <DialogHeader className={"pb-4"}>
          {stepCount ? (
            <DialogTitle className="text-center">
              Verify OTP <br />
              <p className="text-sm font-thin pt-2">
                Sent to {phoneForm.values?.mobile_number}
              </p>
            </DialogTitle>
          ) : (
            <DialogTitle className="text-center">
              Start to Donate{" "}
            </DialogTitle>
          )}
        </DialogHeader>
        <div className="flex w-full justify-center  items-center space-x-2">
          {stepCount ? (
            <CaptureOtp form={otpForm} />
          ) : (
            <CapturePhoneNumber form={phoneForm} />
          )}
        </div>

        {!stepCount && (
          <div className="w-full text-xs text-center text-gray-400">
            Enter 10 digit number to login your account
          </div>
        )}

        {verifyOtpError && (
          <div className="w-full text-xs text-center text-red-500">
            {verifyOtpError?.data?.error}
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          {/* <DialogClose asChild> */}
          {stepCount ? (
            <>
              <Button
                type="button"
                onClick={() => otpForm.handleSubmit()}
                variant="secondary"
              >
                {verifyOtpLoading ? <CircularProgress size={16} /> : "Verify"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => phoneForm.handleSubmit()}
              variant="secondary"
              className="!text-white !bg-red-500"
            >
              {sendOtpLoading ? <CircularProgress size={16} /> : "Submit"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModel;

const CapturePhoneNumber = ({ form }) => {
  return (
    <PhoneInput
      defaultCountry="IN"
      value={form.values?.mobile_number}
      onChange={(value) => form.setFieldValue("mobile_number", value)}
      className="w-full"
      placeholder={"Phone Number"}
    />
  );
};
const CaptureOtp = ({ form }) => {
  return (
    <InputOTP
      maxLength={6}
      onChange={(value) => form.setFieldValue("otp", value)}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
};
