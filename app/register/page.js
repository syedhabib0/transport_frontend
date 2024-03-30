"use client";
import ApplicationLogo from "@/components/ApplicationLogo";
import AuthCard from "@/components/AuthCard";
import Input from "@/components/input";
import Link from "next/link";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "@/components/submitbutton";
import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";
import { toast } from "react-toastify";

const Register = () => {
  const [formData,setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);


  const submitForm = async (event) => {
    event.preventDefault();
    try { 
      const {data,status} = await axios.post(apis.registration,formData)
      if (status === 200) {
        toast.success(data.message)
      }
    } catch (error) {
      handleError(error) 
    }
  };

 

  const handleChange = (e) =>{
    const {name, value} = e.target
    setFormData(prev => ({...prev , [name]:value}))
  }


  return (
    <AuthCard
      logo={
        <Link href="/" className="text-gray-600 cursor-pointer">
          <ApplicationLogo logo="dark" className=" w-28 h-20 fill-current text-gray-500" />
        </Link>
      }
    >
      <h2 className="text-2xl mb-4 text-center font-black font-Poppins"> Create an Account</h2>
      <p className="text-center">
        Tell us more about your company so we can adapt your experience to your needs
      </p>
      <Form className="w-full" onSubmit={submitForm}>
        {/* First Name */}
        <Form.Group className="mt-4">
          <Input
            controlId="first_name"
            label="First Name"
            type="text"
            value={formData.first_name}
            className="mt-1 w-full"
            onChange={handleChange}
            required
            placeholder="First Name"
            autoFocus
            name="first_name"
          />
        </Form.Group>
        {/* Last Name */}
        <Form.Group className="mt-4">
          <Input
            controlId="last_name"
            label="Last Name"
            type="text"
            value={formData.last_name}
            className="mt-1 w-full"
            onChange={handleChange}
            required
            placeholder="Last Name"
            name="last_name"
          />
        </Form.Group>
        
        <Form.Group className="mt-4">
          <Input
            controlId="email"
            label="Username or Email"
            type="email"
            value={formData.email}
            className="mt-1 w-full"
            onChange={handleChange}
            required
            placeholder="Username or Email"
            name="email"
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mt-4">
          <Input
            controlId="password"
            label="Password"
            type={showPassword? "text": "password"}
            value={formData.password}
            className="mt-1 w-full"
            onChange={handleChange}
            required
            icon={<FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} onClick={()=>setShowPassword(prev => !prev)} />}
            placeholder="Password"
            autoComplete="current-password"
            name="password"
          />
        </Form.Group>
        {/* Confirm Password */}
        <Form.Group className="mt-4">
          <Input
            controlId="passwordConfirmation"
            label="Password"
            type={showConfirmPassword? "text" :"password"}
            value={formData.confirm_password}
            className="mt-1 w-full"
            onChange={handleChange}
            required
            icon={<FontAwesomeIcon icon={!showConfirmPassword ? faEyeSlash : faEye} onClick={()=> setshowConfirmPassword(prev => !prev)} />}
            placeholder="Password"
            autoComplete="password_confirmation"
            name="confirm_password"
          />
        </Form.Group>

        <div className="flex flex-col justify-end mt-4">
          <SubmitButton className="mt-3 bg-pink-700">Create Account</SubmitButton>
          <div className="text-center italic mt-4">
            <p>
              Dont have an account?{" "}
              <span className="primary-color">
                <Link href="/">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </Form>
    </AuthCard>
  );
};

export default Register;
