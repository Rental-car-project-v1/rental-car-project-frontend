import clsx from "clsx"
import { useEffect, useState } from "react"
import ImageUploadItem from "./ImageUploadItem"
const IMAGES_TITLE = ['Front', 'Back', 'Left', 'Right']

/**
 * Example <ImagesUpload
 *  className=""
 *  images={images}
 *  onChange=((data) => setImages(data)) />
 * @param images - The array has 4 elements - [ { id: ..., imageItems: ... } ]
 * @param onChange - Return images
 */
export default function ImagesUpload({className = '', images = [], onChange}) {

    const [currentImages, setCurrentImages] = useState(images || new Array(4).fill({ id: null, imageItem: null }))

    useEffect(() => {
        setCurrentImages(images || new Array(4).fill({ id: null, imageItem: null }))
    }, [images])

    const handleImageChange = async (index, base64) => {
        const updatedImages = [...currentImages]
        updatedImages[index] = { ...updatedImages[index], imageItem: base64, changed: true }
        setCurrentImages(updatedImages)
        onChange(updatedImages)
    }

    return (
        <div className={clsx('row', className)}>
            {IMAGES_TITLE.map((item, index) => 
                <ImageUploadItem
                    title={item}
                    key={currentImages[index]?.id || index}
                    index={index}
                    imageItem={currentImages[index]?.imageItem}
                    onImageChange={handleImageChange}
                />
            )}
        </div>
    )
}