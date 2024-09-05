export default function BasicInformationTab ({car = {}}) {

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3"><span className="fw-semibold">License plate:</span> {car?.licensePlate}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Color:</span> {car?.color}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Brand name:</span> {car?.brand}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Model:</span> {car?.model}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Production year:</span> {car?.productionYear}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">No. of seats:</span> {car?.numberOfSeats}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Trasnmission:</span> {car?.transmissionType}</div>
                <div className="col-md-6 mb-3"><span className="fw-semibold">Fuel:</span> {car?.fuelType}</div>
            </div>
            <div className="row">
                <div className="col-12 mb-3 fw-semibold">Documents:</div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Note</th>
                            <th scope="col">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Registration paper</td>
                            <td>Not available</td>
                            {/* <td><a href="http://"
                                target="_blank"
                                rel="noopener noreferrer">Link</a></td> */}
                            <td>Not available</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Certificate of Inspection</td>
                            <td>Not available</td>
                            <td>Not available</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Insurance</td>
                            <td>Not available</td>
                            <td>Not available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row">
                <div className="col-12 mb-3">Note: Please contact us if you need to update your cars basic information.</div>
            </div>
        </>
    )
}