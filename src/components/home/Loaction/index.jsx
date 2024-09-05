import styles from './styles.module.css'
import haNoi from '../../../assets/locations/ha-noi.webp'
import daLat from '../../../assets/locations/da-lat.jpeg'
import hcmc from '../../../assets/locations/ho-chi-minh-city.jpg'
import hoiAn from '../../../assets/locations/hoi-an.jpg'
import nhaTrang from '../../../assets/locations/nha-trang.jpeg'
import quangNinh from '../../../assets/locations/quang-ninh.png'

export default function Location() {

    return (
        <section id="location" className="location py-4">
            <div className="container">
                <h1 className="text-center text-md-start">Where to find us?</h1>
                <div className="row py-3">
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={haNoi} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Hanoi</div>
                                <div className={styles.box_content}>50+ cars</div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={hcmc} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Ho Chi Minh city</div>
                                <div className={styles.box_content}>100+ cars</div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={hoiAn} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Da Nang - Hoi An</div>
                                <div className={styles.box_content}>50+ cars</div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={nhaTrang} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Nha Trang</div>
                                <div className={styles.box_content}>50+ cars</div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={daLat} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Da Lat</div>
                                <div className={styles.box_content}>50+ cars</div>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 col-6 mt-3">
                        <div className={styles.box}>
                            <div className={styles.box_bg}>
                                <img src={quangNinh} alt=""/>
                            </div>
                            <div className={styles.box_body}>
                                <div className={styles.box_title}>Quang Ninh</div>
                                <div className={styles.box_content}>50+ cars</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}