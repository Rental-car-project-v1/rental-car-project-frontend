import styles from './styles.module.css'
import clsx from 'clsx'
import background from '../../../assets/background.svg'
import { useDispatch } from 'react-redux'
import { setShowAuthModal } from '../../../shared/toolkits/authModalSlice'

export default function HeroGuest() {

    const dispatch = useDispatch()

    return (
        <section  id="hero"
            className={clsx("hero d-flex align-items-center", styles.hero)}
            style={{
                backgroundImage: `url(${background})`
            }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex flex-column justify-content-center py-4 py-lg-5">
                        <h1 className="text-center">Looking for a vehicle?<br/>You're at the right place.</h1>
                        <p className="text-center fs-5.5 text-lg-end px-lg-5">Choose between 100's of private cars for rent at really low prices!</p>
                        <div className="d-flex justify-content-center">
                            <button onClick={() => dispatch(setShowAuthModal(true))} className={clsx("mt-3", styles.btn_hero)}>Find a Rental Car Near You</button>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex flex-column justify-content-center py-4 py-lg-5">
                        <h1 className="text-center">Are you a car owner?</h1>
                        <p className="text-center fs-5.5 text-lg-start px-lg-5">List your car and make money form your asset today!</p>
                        <div className="d-flex justify-content-center">
                            <button onClick={() => dispatch(setShowAuthModal(true))} className={clsx("mt-3", styles.btn_hero)}>List Your Car Today</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}