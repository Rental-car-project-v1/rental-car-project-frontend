import styles from './styles.module.css'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import background from '../../../assets/background.svg'
import { FaDollarSign, FaShieldAlt, FaCar } from "react-icons/fa";
import { MdOutlineAccessTime, MdOutlinePayment } from "react-icons/md";
import { TiWarning } from "react-icons/ti";

export default function HeroCarOwner() {
    return (
        <section  id="hero"
            className={clsx("hero d-flex align-items-center", styles.hero)}
            style={{
                backgroundImage: `url(${background})`
            }}>
            <div className="container">
                <div className="row py-3">
                    <h1>Have a car for rent? Don't miss out of your benefit</h1>
                </div>
                <div className="row">
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <MdOutlineAccessTime />
                                </div>
                                <h5>How the insurance works</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                From the minute you hand the keys over till the second you get
                                them back you are covered. Your private insurance is not affected.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <FaShieldAlt />
                                </div>
                                <h5>It's completely free</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                We offer both owners and renters free sign ups. It’s only once a vehicle
                                is rented out that a share is deducted to cover admin and insurance.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <FaDollarSign />
                                </div>
                                <h5>You decide the price</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                When you list a car you decide the price. We can help with
                                recommendations as to price, but ultimately you decide!
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <FaCar />
                                </div>
                                <h5>Handling over your vehicle</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                You arrange the time and location for the exchange of your
                                vehicle with the renter. Both parties will need to agree and sign the vehicle rental sheet
                                before and after key handover.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <TiWarning />
                                </div>
                                <h5>You are in charge</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                All renters are pre-screened by us to ensure safety and get your
                                approval. If you do not feel comfortable with someone you are able to decline a booking.
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mt-3">
                        <div className={styles.box}>
                            <div className={clsx('d-flex align-items-center mb-2', styles.box_title)}>
                                <div className={styles.icon_title}>
                                    <MdOutlinePayment />
                                </div>
                                <h5>Set payment</h5>
                            </div>
                            <div className="fs-6 text-justify">
                                We pay you once a month and you can always view how much your car has
                                earned under your user profile.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row py-3 mt-4">
                    <h2>Make money on your car right away</h2>
                </div>
                <div className="row py-3 mb-4">
                    <div className="col-12 d-flex justify-content-center">
                        <Link to="/my-cars" className="btn btn-primary px-5 fw-semibold">List Your Car Today</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}