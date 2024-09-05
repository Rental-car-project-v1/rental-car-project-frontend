import EmptyState from "../../EmptyState";
import CarBookingCard from "./CarBookingCard";

export default function CarBookingList({ carBookings = [] }) {

    if(carBookings?.length == 0) return <EmptyState />

    return (
        <>
            {carBookings.map((item) => (
                <CarBookingCard key={item?.id} booking={item} />
            ))}
        </>
    )
}