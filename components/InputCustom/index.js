import { FloatingLabel, Form, InputGroup } from 'react-bootstrap'

const InputCustom = ({
    disabled = false,
    float = false,
    controlId = '',
    label = '',
    icon,
    ref,
    isCheck,
    className,
    iconClass,
    inputClass,
    feedbackError,
    ...props
}) => (
    <InputGroup>
        {float ? (
            <FloatingLabel
                controlId={controlId}
                label={label}
                className={`${className} rounded-md p-0 flex flex-row border-none focus:border-none focus:ring  focus:ring-opacity-50`}
                {...props}>
                {isCheck ? (
                    <Form.Check
                        disabled={disabled}
                        ref={ref}
                        className={`${inputClass} rounded-md shadow-sm ${
                            icon ? 'border-r-0 rounded-r-none' : ''
                        } focus:ring focus:ring-opacity-50`}
                        {...props}
                    />
                ) : (
                    <Form.Control
                        disabled={disabled}
                        ref={ref}
                        className={`${inputClass} rounded-md shadow-sm ${
                            icon ? 'border-r-0 rounded-r-none' : ''
                        } focus:ring focus:ring-opacity-50`}
                        {...props}
                    />
                )}
                {icon && (
                    <InputGroup.Text
                        className={`border-pink-300 border-start-none border-l-0  rounded-l-none bg-inherit ${iconClass}`}>
                        {icon ? icon : null}
                    </InputGroup.Text>
                )}
                {feedbackError && (
                    <Form.Control.Feedback type="invalid">
                        {feedbackError}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>
        ) : (
            <>
                {isCheck ? (
                    <Form.Check
                        disabled={disabled}
                        label={label}
                        ref={ref}
                        className={`${inputClass} rounded-md shadow-sm ${
                            icon ? 'border-r-0 rounded-r-none' : ''
                        } focus:ring focus:ring-opacity-50`}
                        {...props}
                    />
                ) : (
                    <Form.Control
                        disabled={disabled}
                        label={label}
                        ref={ref}
                        className={`${inputClass} rounded-md shadow-sm ${
                            icon ? 'border-r-0 rounded-r-none' : ''
                        } focus:ring focus:ring-opacity-50`}
                        {...props}
                    />
                )}
                {icon && (
                    <InputGroup.Text
                        className={`border-pink-300 border-start-none border-l-0  rounded-l-none bg-inherit ${iconClass}`}>
                        {icon ? icon : null}
                    </InputGroup.Text>
                )}
                {feedbackError && (
                    <Form.Control.Feedback type="invalid">
                        {feedbackError}
                    </Form.Control.Feedback>
                )}
            </>
        )}
    </InputGroup>
)

export default InputCustom
