import { BsBluetooth } from "react-icons/bs"
import { FaCamera, FaUsb } from "react-icons/fa"
import { FaChildReaching } from "react-icons/fa6"
import { GrMapLocation, GrSun } from "react-icons/gr"
import { IoLockOpenOutline } from "react-icons/io5"
import { RiDvdLine } from "react-icons/ri"

export const TERMS_OF_USE = ['No Smoking', 'No Pet', 'No Food In Cars', 'Other']
export const ADDITIONAL_FUNCTIONS = [
    {
        icon: <BsBluetooth />,
        name: 'Bluetooth',
    },
    {
        icon: <GrMapLocation />,
        name: 'GPS',
    },
    {
        icon: <FaCamera />,
        name: 'Camera',
    },
    {
        icon: <GrSun />,
        name: 'Sun roof',
    },
    {
        icon: <IoLockOpenOutline />,
        name: 'Child lock',
    },
    {
        icon: <FaChildReaching />,
        name: 'Child seat',
    },
    {
        icon: <RiDvdLine />,
        name: 'DVD',
    },
    {
        icon: <FaUsb />,
        name: 'USB'
    }
]