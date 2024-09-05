import imgp1 from '../../../assets/testimonials/p-1.jpg'
import imgp2 from '../../../assets/testimonials/p-2.jpg'
import imgp3 from '../../../assets/testimonials/p-3.jpg'
import imgp4 from '../../../assets/testimonials/p-4.jpg'
import styles from './styles.module.css'


export default function Testimonial() {

    return (
        <section id="testimonial" className="testimonial py-4">
            <div className="container">
                <h1 className="text-center text-md-start">What people say?</h1>
                <div className="row py-3">
                    <div className="col-md-6 mt-3" data-aos="zoom-in" data-aos-delay="0">
                        <div className={styles.box}>
                            <div className={styles.box_image}>
                                <img src={imgp1} alt=""/>
                            </div>
                            <div className="box-body ms-3">
                                <div className="box-title fs-5 fw-bold">Sarah</div>
                                <div className="box-content fs-5.5 fst-italic">"The user prefers eco-friendly vehicles for their car rentals."</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3" data-aos="zoom-in" data-aos-delay="100">
                        <div className={styles.box}>
                            <div className={styles.box_image}>
                                <img src={imgp2} alt=""/>
                            </div>
                            <div className="box-body ms-3">
                                <div className="box-title fs-5 fw-bold">Peter</div>
                                <div className="box-content fs-5.5 fst-italic">"The user frequently rents cars for business trips and prefers premium models."</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3" data-aos="zoom-in" data-aos-delay="200">
                        <div className={styles.box}>
                            <div className={styles.box_image}>
                                <img src={imgp3} alt=""/>
                            </div>
                            <div className="box-body ms-3">
                                <div className="box-title fs-5 fw-bold">Ellen</div>
                                <div className="box-content fs-5.5 fst-italic">"The user has a history of renting cars for family vacations and values spacious interiors."</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3" data-aos="zoom-in" data-aos-delay="300">
                        <div className={styles.box}>
                            <div className={styles.box_image}>
                                <img src={imgp4} alt=""/>
                            </div>
                            <div className="box-body ms-3">
                                <div className="box-title fs-5 fw-bold">Anton</div>
                                <div className="box-content fs-5.5 fst-italic">"The user often books last-minute rentals and values the availability of 24/7 customer support."</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}