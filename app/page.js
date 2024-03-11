"use client"
import { Container, Row, Col, Card, Form, CardBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faEye, faEyeSlash, faPlay } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/input";
import SubmitButton from "@/components/submitbutton";
import { useState } from "react";
export default function Home() {
  const [showPassword , setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  const submitForm = async event => {
    event.preventDefault()

    login({
        email,
        password,
        setErrors,
        setStatus,
    })
}
  const handleChange = (e) => {
    const {name , value} = e.target
    setFormData(prev => ({...prev , [name] : value}))
  }


  return (
    <main >
      <Container fluid className="h-screen">
        <Row className="h-100">
          {/* Left Half Section */}
          <Col
            lg="6"
            className="p-8"
            style={{
              background: "var(--gradient-top-to-bottom-left)",
            }}
          >
            <div className="h-full flex flex-col justify-center items-center">
              <Card className=" p-14 bg-opacity-10 bg-gray-100 border-transparent max-w-[60%] min-h-[60%]">
                <CardBody>
                  <h5 className="text-white text-md font-bold mb-4">All Digital</h5>
                  <h1 className="text-white fs-md-1 display-6 font-bold mb-4">
                    Platforms in one Go{" "}
                    <span className="text-white pl-2">
                      <FontAwesomeIcon icon={faPlay} />
                    </span>
                  </h1>
                  <p className="text-white text-left">
                    The customer service solution that helps you delivery peachy experience across all
                    touchpoints, at once.
                  </p>
                </CardBody>
              </Card>
            </div>
          </Col>
          {/* Right Half Section */}
          <Col lg="6" className="bg-white p-8 flex justify-center flex-col">
            {/* Top Right Corner */}
            <div className="text-right mb-4">
              <p>
                Dont have an account?{" "}
                <span className="primary-color">
                  <Link href="/register">Sign Up</Link>
                </span>
              </p>
            </div>

            {/* Session Status */}
            {/* <AuthSessionStatus className="mb-4" status={status} /> */}

            {/* Middle Container */}
            <div className="flex flex-col items-center w-3/4 m-auto">
              {/* <ApplicationLogo
                                logo="dark"
                                className="w-28 h-20 fill-current text-gray-500 mb-4"
                                style={{
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                            /> */}
              
              <Form className="w-full" onSubmit={submitForm}>
                <Form.Group>

                  <Input
                    controlId="email"
                    label="Username or Email"
                    type="email"
                    value={formData.email}
                    className="mt-1 w-full"
                    onChange={handleChange}
                    required
                    placeholder="Username or Email"
                    autoFocus
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mt-4">
                  <Input
                    controlId="password"
                    label="Password"
                    type={showPassword? "text" : "password"}
                    value={formData.password}
                    className="mt-1 w-full"
                    onChange={handleChange}
                    required
                    icon={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(prev => !prev)} />}
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </Form.Group>

                <div className="flex flex-col justify-end mt-4">
                  <Link
                    href="/forgot-password"
                    className="underline block italic text-end text-sm text-gray-600 float-right hover:text-gray-900"
                  >
                    Forgot your password?
                  </Link>

                  <SubmitButton className="mt-3 bg-primary">Login Now</SubmitButton>
                  <div className="text-center italic mt-4">
                    <p>
                      Dont have an account?{" "}
                      <span className="primary-color">
                        <Link href="/register">Sign Up</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
