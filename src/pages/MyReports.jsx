import { Container, Tab, Tabs } from 'react-bootstrap'
import BreadCrumb from '../components/BreadCrumb'
import StarRating from '../components/StarRating'
import { useEffect, useState } from 'react'
import { getRatingApi } from '../shared/apis/feedbackApi'
import ReportDetails from '../components/my-report/ReportDetails'
import LoadingState from '../components/LoadingState'

function MyReports() {

  const [myRatings, setMyRatings] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getRatingApi().then(data => {
      setMyRatings(data?.data?.rating ?? 0)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      <BreadCrumb
        links={[
          {
            path: '/',
            name: 'Home'
          },
          {
            name: 'My Reports'
          }
        ]}
      />
      <Container className="my-4">
        <Tabs
          defaultActiveKey="feedbackReports"
          id="reports-tabs"
          className="mb-3"
        >
          {/* <Tab eventKey="saleReports" title="Sale Reports">
            <div>
              <h5>Sale Reports</h5>
              <p>This is the Sale Reports section.</p>
            </div>
          </Tab> */}
          <Tab eventKey="feedbackReports" title="Feedback Reports">
            <div>
              <h5>Average Ratings</h5>
              <div className="d-flex flex-column align-items-center">
                {loading && <LoadingState />}
                {!loading && <>
                  <h2>{ Math.round(parseFloat(myRatings) * 100) / 100 }</h2>
                  <StarRating value={myRatings} size={36} />
                </>}
              </div>
            </div>
            <ReportDetails />
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default MyReports
