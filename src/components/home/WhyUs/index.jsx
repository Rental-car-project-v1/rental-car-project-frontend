import styles from './styles.module.css'
import { BsCash } from "react-icons/bs";
import { PiMapPinArea, PiHeadsetDuotone, PiGavel } from "react-icons/pi";


export default function WhyUs() {
    return (
        <section id="about-us" className="py-4">
            <div className="container">
                <h1 className="text-center text-md-start">Why us?</h1>
                <div className="row py-3">
                    <div className="col-lg-3 col-md-6 mt-5">
                        <div className={styles.box}>
                            <div className={styles.box_icon}><BsCash /></div>
                            <h3 className={styles.box_title}>Save money</h3>
                            <p>We have no setup of registration fees. You are only changed when you rent a car. So get started for FREE!</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-5">
                        <div className={styles.box}>
                            <div className={styles.box_icon}><PiMapPinArea /></div>
                            <h3 className={styles.box_title}>Conveninent</h3>
                            <p>We have a large selection of privately owned cars to suit your needs throughout the country.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-5">
                        <div className={styles.box}>
                            <div className={styles.box_icon}><PiGavel /></div>
                            <h3 className={styles.box_title}>Legal and insurance</h3>
                            <p>We fully cover all rentals and even provide roadside assistance. Our rating system and extended member profile checks provide safety.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-5">
                        <div className={styles.box}>
                            <div className={styles.box_icon}><PiHeadsetDuotone /></div>
                            <h3 className={styles.box_title}>24/7 support</h3>
                            <p>Our team is ready to support you every step of the way with our hotline and 24/7 service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}