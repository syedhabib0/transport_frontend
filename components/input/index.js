import { FloatingLabel, Form, InputGroup } from "react-bootstrap";

const Input = ({ disabled = false, controlId = "", label = "", icon, className, ...props }) => (
  <InputGroup>
    <FloatingLabel
      controlId={controlId}
      label={label}
      className={`${className} rounded-md p-0 flex flex-row border-none focus:border-none focus:ring focus:ring-gray-200 focus:ring-opacity-50`}
      {...props}
    >
      <Form.Control
        disabled={disabled}
        className={`rounded-md shadow-sm border-pink-300 ${
          icon ? "border-r-0 rounded-r-none" : ""
        } focus:border-indigo-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50`}
        {...props}
      />
      {icon && (
        <InputGroup.Text className="border-pink-300 border-start-none border-l-0  rounded-l-none bg-inherit cursor-pointer">
          {icon ? icon : null}
        </InputGroup.Text>
      )}
    </FloatingLabel>
  </InputGroup>
);

export default Input;
