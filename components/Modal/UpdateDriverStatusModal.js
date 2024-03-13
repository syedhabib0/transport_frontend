import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const UpdateDriverStatusModal = ({
    show,
    handleClose,
    handleUpdateStatus,
    driverId,
    status,
}) => {
    const [selectedStatus, setSelectedStatus] = useState('')
    const handleStatusChange = e => {
        setSelectedStatus(e.target.value)
    }

    useEffect(() => {
        setSelectedStatus(status) // Replace with the actual logic
    }, [show, driverId])

    const handleUpdate = () => {
        // Call the function to update the status
        handleUpdateStatus(driverId, selectedStatus)
        handleClose() // Close the modal after updating status
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Driver Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="status">
                        <Form.Label>Select Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            onChange={handleStatusChange}
                            value={selectedStatus}>
                            <option value="" disabled>
                                Select Status
                            </option>
                            <option value="available">Available</option>
                            <option value="not available">Not Available</option>
                            <option value="will be available">
                                Will be available
                            </option>
                            <option value="under our load">
                                Under Our Load
                            </option>
                            <option value="under our bid">Under Our Bid</option>
                            <option value="suspended">Suspended</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="bg-secondary border-none"
                    onClick={handleClose}>
                    Close
                </Button>
                <Button
                    className="bg-primary border-none"
                    onClick={handleUpdate}>
                    Update Status
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateDriverStatusModal
