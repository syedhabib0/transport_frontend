import { Card, Col, Container, Row } from 'react-bootstrap'

const AuthCard = ({ logo, skipButton, children }) => (
    <Container fluid className="min-h-screen bg-grays flex flex-col">
        {/* <Container fluid> */}
        <Row>
            {/* Left Top Corner - Logo */}
            {logo && <Col className="text-left pt-4 pl-4">{logo}</Col>}
            {/* Right Top Corner - Skip */}
            {skipButton && (
                <Col className="text-right pt-4 pl-4">{skipButton}</Col>
            )}
        </Row>
        {/* </Container> */}

        {/* <Container fluid className='flex flex-col justify-center'> */}
        <Row className="m-auto">
            <Col>
                <Card className="w-screen sm:max-w-md mt-6 px-6 pb-10 pt-7 mb-10 bg-white-100 shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </Card>
            </Col>
        </Row>
        {/* </Container> */}
    </Container>
)

export default AuthCard
