import clsx from 'clsx'
import { FaAngleRight } from "react-icons/fa6"
import style from './styles.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {

    return (
        <footer id="footer" className={style.footer}>
            <div className="footer-top">
                <div className="container">
                    <div className="row py-3">
                        <div className={clsx('col-md-4', style.footer_links)}>
                            <h4>RENT CAR</h4>
                            <ul>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/search">Search Car and Rates</Link></li>
                            </ul>
                        </div>
                        <div className={clsx('col-md-4', style.footer_links)}>
                            <h4>CUSTOMER ACCESS</h4>
                            <ul>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/my-booking">Manage My Booking</Link></li>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/wallet">My Wallet</Link></li>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/my-cars">My Car</Link></li>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/">Log In</Link></li>
                            </ul>
                        </div>
                        <div className={clsx('col-md-4', style.footer_links)}>
                            <h4>JOIN US</h4>
                            <ul>
                                <li><FaAngleRight className={style.nav_link_icon}/> <Link to="/">New User Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )

}