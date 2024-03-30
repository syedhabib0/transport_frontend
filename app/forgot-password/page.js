"use client";

import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import GuestLayout from "@/layouts/GuestLayout";
import Input from "@/components/input";
import Link from "next/link";
import { useState } from "react";
import { Form } from "react-bootstrap";
import SubmitButton from "@/components/submitbutton";
import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      if (email === "") {
        return;
      }
      const { data } = await axios.post(apis.forgotPassword, { email });
      console.log(data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSkip = () => {};

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/" className="text-gray-600 cursor-pointer">
            <ApplicationLogo logo="dark" className="w-28 h-20 fill-current text-gray-500" />
          </Link>
        }
        skipButton={
          <p className="text-gray-600 cursor-pointer" onClick={handleSkip}>
            Skip
          </p>
        }
      >
        <h2 className="text-2xl font-black font-Poppins mb-4 text-center"> Forgot Password</h2>
        <p className="text-center">
          Enter your email for the verification process, we will send verification link to your email.
        </p>
        <Form className="w-full" onSubmit={submitForm}>
          {/* Email Address */}
          <Form.Group className="mt-4">
            {/* <Label htmlFor="email">Email</Label> */}

            <Input
              controlId="email"
              label="Username or Email"
              type="email"
              value={email}
              className="mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Username or Email"
            />
          </Form.Group>

          <div className="flex flex-col justify-end mt-4">
            <SubmitButton className="mt-3 bg-primary">Continue</SubmitButton>
          </div>
        </Form>
      </AuthCard>
    </GuestLayout>
  );
};

export default ForgotPassword;
