import { useDropzone } from 'react-dropzone'
import { useEffect, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import clsx from 'clsx'
import { convertToBase64 } from '../../shared/utils'

const IMAGES_TITLE = ['Front', 'Back', 'Left', 'Right']

/**
 * Example <ImagesUpload
 *  className=""
 *  images={images}
 *  onChange={(data) => setImages(data)} />
 * @param images - The array has 4 elements - [ { id: ..., imageItem: ... } ]
 * @param onChange - Return images
 */
export default function ImagesUpload({
  className = '',
  images = [],
  onChange
}) {
  const [currentImages, setCurrentImages] = useState(
    images || new Array(4).fill({ id: null, imageItem: null })
  )

  useEffect(() => {
    setCurrentImages(images || new Array(4).fill({ id: null, imageItem: null }))
  }, [images])

  const handleDrop = async (acceptedFiles, index) => {
    const file = acceptedFiles[0]
    if (file) {
      const base64 = await convertToBase64(file)
      const updatedImages = [...currentImages]
      updatedImages[index] = { ...updatedImages[index], imageItem: base64 }
      setCurrentImages(updatedImages)
      onChange(updatedImages)
    }
  }

  return (
    <div className={clsx('row', className)}>
      {IMAGES_TITLE.map((item, index) => {
        const { getRootProps, getInputProps } = useDropzone({
          onDrop: (acceptedFiles) => handleDrop(acceptedFiles, index)
        })

        return (
          <div key={index} className="col-6 mb-3">
            <div className="form-label">{item}</div>
            <div
              {...getRootProps({ className: 'dropzone' })}
              style={{ position: 'relative', paddingTop: '66%' }}
            >
              <input {...getInputProps()} />
              {currentImages[index]?.imageItem ? (
                <img
                  src={currentImages[index]?.imageItem}
                  alt="Car"
                  className="position-absolute w-100 h-100 top-0 start-0 rounded"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="position-absolute w-100 h-100 top-0 start-0 d-flex flex-column align-items-center justify-content-center border border-secondary border-style-dashed rounded text-secondary"
                  style={{ cursor: 'pointer' }}
                >
                  <FaUpload size={30} />
                  <span>Drag and drop</span>
                  <span>OR</span>
                  <span className="text-primary text-decoration-underline">
                    Select File
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
