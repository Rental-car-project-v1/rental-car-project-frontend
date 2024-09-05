import CarGridItem from "./CarGridItem";

export default function CarGrid({cars = []}) {

    return (
        <div className="row">
            {cars.map((item, index) => <CarGridItem key={item?.id || index} car={item}/>)}
        </div>
    )
}