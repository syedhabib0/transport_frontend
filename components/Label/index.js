import { Form } from 'react-bootstrap'

const Label = ({ className, children, ...props }) => (
    <Form.Label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </Form.Label>
)

export default Label
