import { useState } from "react";
import { convertToBase64 } from "../../shared/utils";
import clsx from "clsx";
import { FaUpload } from "react-icons/fa";

export default function ImageUploadItem({ title, index, imageItem, onImageChange }) {

    const [dragActive, setDragActive] = useState(false)

    const handleImageChange = async (event) => {
        const file = event.target.files[0]
        if (file) {
            const base64 = await convertToBase64(file)
            onImageChange(index, base64)
        }
    }

    const handleDrag = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true)
        } else if (event.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        
        const file = event.dataTransfer.files[0]
        if (file) {
            setDragActive(false)
            const base64 = await convertToBase64(file)
            onImageChange(index, base64)
            event.dataTransfer.clearData()
        }
    }

    return (
        <div className="col-6 mb-3">
            {title ? <div className="form-label">{title}</div> : ''}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id={`imageUpload${index}`}
                className="d-none"
            />
            <label htmlFor={`imageUpload${index}`}
                className="w-100 d-block">
                <div className="w-100 d-block position-relative cursor-pointer"
                    style={{ paddingTop: "66%" }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {imageItem ? (
                        <img
                            src={imageItem}
                            alt="Car"
                            className="position-absolute
                                w-100
                                h-100
                                top-0
                                start-0
                                rounded"
                            style={{
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <div
                            className={clsx('position-absolute w-100 h-100 top-0 start-0 d-flex flex-column align-items-center justify-content-center border border-style-dashed rounded',
                                dragActive ? 'border-primary text-primary' : 'border-secondary text-secondary'
                            )}
                        >
                            <FaUpload size={30} />
                            <span>DRAG and DROP</span>
                            <span>or</span>
                            <span>Select File</span>
                        </div>
                    )}
                </div>
            </label>
        </div>
    )
}