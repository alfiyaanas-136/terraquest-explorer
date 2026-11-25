import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import tq_logo from '../../assets/Header/terraquest-logo.png'
import './Header.css'
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NavLinks = [
    {label:'Home', path:'/'},
    {label:'Explore', path:'/explore'},
    {label:'Experiences', path:'/experiences'},
    {label:'About', path:'/about'},
];
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape)
        };
    }, []);

    const closeMenu = () => setMenuOpen(false);

  return (
    <header className='tq-header'>
        <div className='tq-header-container'>
            <Link
                to='/'
                className='tq-logo'
                onClick={closeMenu}
            >
                <img 
                    src={tq_logo}
                    className='tq-logo-image' 
                    alt="" 
                />
                <span className='tq-logo-text'>
                    <span className='tq-logo-name'>
                        TerraQuest
                    </span>
                    <span className='tq-logo-subtitle'>
                        EXPLORER
                    </span>
                </span>
            </Link>

            <nav
                id='tq-main-navigation'
                className={`tq-nav ${menuOpen ? 'tq-nav-open' : ''}`}
            >
                {NavLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === '/'}
                        className={({ isActive}) =>
                            `tq-nav-link ${isActive ? 'tq-nav-active': ''}`
                        }
                        onClick={closeMenu}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className='tq-header-actions'>
                <Link
                    to='/explore'
                    className='tq-explore-btn'
                    onClick={closeMenu}
                >
                    Explore Now
                    <ArrowUpRight size={18} />
                </Link>

                <button
                    type='button'
                    className='tq-menu-btn'
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <X size={27} />
                    ) : (
                        <Menu size={27} />
                    )}
                </button>
            </div>

        </div>
    </header>
  )
}

export default Header