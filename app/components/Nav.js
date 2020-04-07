import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaMapMarkedAlt, FaGem, FaTasks, FaChartPie, FaTruck, FaUserAlt, FaClipboardList, FaCog, FaBell } from 'react-icons/fa'
import NavStyles from './styles/NavStyles'
import { theme } from './styles/Theme'
import logo from '../../static/logo-default.png'

const activeStyle = {
    fontWeight: '700',
    color: theme.grey,
}

export default () => {
    const [closed, setClosed] = React.useState(false)

    const toggleMenu = () => {
        setClosed(prev => !prev)
    }

    return (
        <NavStyles closed={closed}>
            <div className="logo-container">
                <button type="button" className="nav-button" onClick={toggleMenu}>
                    <span className="nav-icon" />
                </button>
                <img src={logo} alt="logo" />
            </div>
            <NavLink exact to="/" className="nav-link-container" activeStyle={activeStyle}>
                <FaHome />
                <p>Anasayfa</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/map" className="nav-link-container" activeStyle={activeStyle}>
                <FaMapMarkedAlt />
                <p>Harita</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/gem" className="nav-link-container" activeStyle={activeStyle}>
                <FaGem />
                <p>Cevher Yönetimi</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/tasks" className="nav-link-container" activeStyle={activeStyle}>
                <FaTasks />
                <p>Operasyonlar</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/scale" className="nav-link-container" activeStyle={activeStyle}>
                <FaChartPie />
                <p>Metrikler</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/vehicles" className="nav-link-container" activeStyle={activeStyle}>
                <FaTruck />
                <p>Araçlar</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/personnels" className="nav-link-container" activeStyle={activeStyle}>
                <FaUserAlt />
                <p>Personel</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/reports" className="nav-link-container" activeStyle={activeStyle}>
                <FaClipboardList />
                <p>Raporlar</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/notifications" className="nav-link-container" activeStyle={activeStyle}>
                <FaBell />
                <p>Bildirimler</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
            <NavLink to="/settings" className="nav-link-container" activeStyle={activeStyle}>
                <FaCog />
                <p>Ayarlar</p>
                <span className="arrow-container">&gt;</span>
            </NavLink>
        </NavStyles>
    )
}
