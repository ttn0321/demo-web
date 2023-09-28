import { Link, Route, Routes, useNavigate } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import Title from "../../components/Tiltle/Title"
import SideBarProfile from "../../components/sideBarProfile/SideBarProfile"
import SectionProfile from "../../components/SectionProfile/SectionProfile"
import ChangePassword from "../../components/SectionProfile/ChangePassword"
import MyBooking from "../../components/SectionProfile/MyBooking"
import DetailOrder from "../../components/SectionProfile/DetailOrder"
import styles from './Profile.module.css'
import ChangePhone from "../../components/ChangePhone/ChangePhone"
const ProfileUser: React.FC<{ children: React.ReactNode }> = (props) => {
    return (
        <div>
            <Header />
            <div style={{ backgroundColor: '#F9FAFA' }}>
                <div className={`container-lg`} style={{ paddingBottom: '50px' }}>
                    <Title>
                        <ul>
                            <li>
                                <Link to='/' style={{ whiteSpace: 'pre' }}>Tài khoản  {'>'} </Link>
                            </li>
                            <li>
                                <Link to=''>Thông tin tài khoản</Link>
                            </li>
                        </ul>
                    </Title>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className={`col-lg-3 ${styles.hide}`}>
                            <div>
                                <div>
                                    <SideBarProfile />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12 col-sm-12 col-12">
                            <div>
                                <div>
                                    {
                                        props.children
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProfileUser