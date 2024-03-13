// BulkUploadModal.js
import React, { useState } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'

const BulkUploadModal = ({ show, onHide, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState(null)

    const handleFileChange = event => {
        const file = event.target.files[0]
        setSelectedFile(file)
        setError(null) // Clear any previous error messages
    }

    const handleUpload = () => {
        // Validate file type and columns before upload
        if (validateFile(selectedFile)) {
            onUpload(selectedFile)
            setSelectedFile(null)
            onHide()
        }
    }

    const validateFile = file => {
        if (!file) {
            setError('Please select a file.')
            return false
        }

        const allowedFileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]
        if (!allowedFileTypes.includes(file.type)) {
            setError('File type should be xlsx or csv.')
            return false
        }

        // Add additional validation for columns if needed

        const maxSize = 100 * 1024 * 1024 // 100 MB
        if (file.size > maxSize) {
            setError('File size should be less than 100 MB.')
            return false
        }

        return true
    }

    const handleSubmit = event => {
        event.preventDefault()
        // Handle form submission here, e.g., call handleUpload()
        handleUpload()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Drivers in Bulk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>
                        <p>Notes:</p>
                        <ul className="list-disc ps-4 pt-3 pb-5">
                            <li>File type should be xlsx or csv.</li>
                            <li>File must have the following columns:</li>
                            <ul className="list-decimal ps-4">
                                <li>First Name</li>
                                <li>Last Name</li>
                                <li>Profile Picture (optional)</li>
                                <li>Email</li>
                                <li>Phone Number</li>
                            </ul>
                            <li>File size should be less than 100 MB.</li>
                        </ul>
                    </strong>
                    <input
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv, application/vnd.ms-excel"
                        onChange={handleFileChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className="bg-primary border-primary">
                        Upload
                    </Button>
                    <Button
                        className="bg-secondary border-secondary"
                        onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default BulkUploadModal
