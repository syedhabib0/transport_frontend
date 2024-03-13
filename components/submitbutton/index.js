const SubmitButton = ({ type = "submit", className, ...props }) => (
  <button
    type={type}
    className={`items-center w-full px-4 py-2 border border-transparent rounded-md font-semibold text-white tracking-widest hover:!bg-pink-600 active:!bg-pink-700 focus:outline-none focus:border-gray-300 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
    {...props}
  />
);

export default SubmitButton;
