import { useDispatch, useSelector } from 'react-redux'
import styles from './ChangePassword.module.css'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../../slices/authSlice'
import axios from 'axios'
import { useState } from 'react'
import { handleNotify } from '../../slices/notifySlice'
import { RootState } from '../../store/store'
import Loader from '../loader/Loader'
import { hideLoader, showLoader } from '../../slices/loaderSlice'
interface CHANGE_PASSWORD {
    passwordCurrent: string,
    password: string,
    passwordConfirm: string
}
const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoader = useSelector((state: RootState) => state.loader)

    const [objUpdatePassword, setUpdatePassword] = useState<CHANGE_PASSWORD>({
        passwordCurrent: "",
        password: "",
        passwordConfirm: ""
    })
    const handleChangePassword = async (objUpdatePassword: CHANGE_PASSWORD) => {
        try {
            dispatch(hideLoader())
            const res = await axios.patch('/myway/api/users/updateMyPassword', objUpdatePassword)
            dispatch(showLoader())

            if (res.data.status === 'success') {
                console.log(res.data.data.timeExpire)
                dispatch(login({ tokenDispatch: res.data.token, userDispatch: res.data.data.user, timeExpire: res.data.timeExpire }))
                dispatch(handleNotify({ message: "Thay đổi mật khẩu thành công", show: true, status: 200 }))
                setTimeout(() => {
                    dispatch(handleNotify({ message: "", show: false, status: 0 }))
                    navigate('/profile/account/user')
                }, 1500)
            }
        }
        catch (err) {
            alert("Đã có lỗi xảy ra")
        }
    }
    return (
        <div className='col-lg-10 offset-lg-1'>
            {handleLoader.loader && <Loader />}
            <div className={styles.sectionTitle}>
                <p>Thay đổi mật khẩu</p>
            </div>

            <form onSubmit={event => {
                event.preventDefault();
                handleChangePassword(objUpdatePassword)
            }}>
                <div className={styles.formGroup}>
                    <label>Mật khẩu hiện tại</label>
                    <input type='password' minLength={8} placeholder='Nhập mật khẩu cũ' required value={objUpdatePassword.passwordCurrent} onChange={event => setUpdatePassword({ ...objUpdatePassword, passwordCurrent: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Mật khẩu mới</label>
                    <input type='password' minLength={8} placeholder='Nhập mật mới' required value={objUpdatePassword.password} onChange={event => setUpdatePassword({ ...objUpdatePassword, password: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <label>Nhập lại mật khẩu</label>
                    <input type='password' minLength={8} placeholder='Nhập lại mật khẩu mới' required value={objUpdatePassword.passwordConfirm} onChange={event => setUpdatePassword({ ...objUpdatePassword, passwordConfirm: event.target.value })} />
                </div>
                <div className={styles.formGroup}>
                    <button>XÁC NHẬN</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword