"use client";
import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import GuestLayout from "@/layouts/GuestLayout";
import Input from "@/components/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams ,useParams} from "next/navigation";
import SubmitButton from "@/components/submitbutton";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";
import { toast } from "react-toastify";

const PasswordReset = () => {
  const router = useRouter();
  const params = useSearchParams();
  const {token} = useParams()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try { 
        if (Object.values(formData).some(value => value === "")) {
            toast.error("All Fields Are Required");
            return
        }
        if (formData.password !== formData.password_confirmation) {
            toast.error("Password and Confirm Password Should Match");
            return
        }
        const {data,status} = await axios.post(apis.resetPassword,{...formData,token});
        if (status === 200) {
            toast.success(data.message);
            router.push("/")
        }
    } catch (error) {
        handleError(error)   
    }
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: params.get("email") || "" }));
  }, [params]);

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link href="/" className="text-gray-600 cursor-pointer">
            <ApplicationLogo logo="dark" className="w-28 h-20 fill-current text-gray-500" />
          </Link>
        }
      >
        <h2 className="text-2xl mb-4 text-center font-black font-Poppins"> Reset Password</h2>
        <p className="text-center">Enter the new password if you want to change your password.</p>

        <Form className="w-full" onSubmit={submitForm}>
          {/* Email Address */}
          <Form.Group className="mt-4">
            <Input
              controlId="email"
              label="Email"
              type="email"
              value={formData.email}
              className="mt-1 w-full"
              onChange={handleChange}
              required
              name="email"
              placeholder="Email..."
              disabled
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mt-4">
            <Input
              controlId="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              className="mt-1 w-full"
              onChange={handleChange}
              required
              icon={
                <FontAwesomeIcon
                  icon={!showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              }
              placeholder="Password..."
              name={"password"}
              minLength={8}
            />
          </Form.Group>
          {/* Confirm Password */}
          <Form.Group className="mt-4">
            <Input
              controlId="passwordConfirmation"
              label="Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.password_confirmation}
              className="mt-1 w-full"
              onChange={handleChange}
              required
              icon={
                <FontAwesomeIcon
                  icon={!showConfirmPassword ? faEyeSlash : faEye}
                  onClick={() => setshowConfirmPassword((prev) => !prev)}
                />
              }
              placeholder="Confirm Password..."
              name="password_confirmation"
              minLength={8}
            />
          </Form.Group>

          <div className="flex items-center justify-end mt-4">
            <SubmitButton className="mt-3 bg-primary">Reset Password</SubmitButton>
          </div>
        </Form>
      </AuthCard>
    </GuestLayout>
  );
};

export default PasswordReset;
