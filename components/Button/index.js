const Button = ({ type = 'button', className, ...props }) => (
    <button
        type={type}
        className={`${className} items-center px-4 py-2 bg-gray-800 font-semibold tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default Button
