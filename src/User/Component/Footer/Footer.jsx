import React from 'react'
import './Footer.css'
import { RiTelegram2Fill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <div className="footer">
                <div className='footer_main'>
                    <div className='footer_main_section footer_main_txt'>
                        <p className='footer_main_txt_title'>Hafez</p>
                        <p className='footer_main_txt_disc'>Exploring pixels in the dark, crafting digital experiences with passion and precision.</p>
                    </div>

                    <div className='footer_main_section footer_main_links_section'>
                        <h3 className='footer_section_title'>Quick Links</h3>
                        <ul className='footer_links_list'>
                            <li onClick={() => handleScroll('header')}>
                                <span className='link-arrow'>→</span> Landing
                            </li>
                            <li onClick={() => handleScroll('home_products')}>
                                <span className='link-arrow'>→</span> Projects
                            </li>
                            <li onClick={() => handleScroll('home_about')}>
                                <span className='link-arrow'>→</span> About
                            </li>
                            <li onClick={() => handleScroll('footer')}>
                                <span className='link-arrow'>→</span> Contact
                            </li>
                        </ul>
                    </div>

                    <div className='footer_main_section footer_social'>
                        <h3 className='footer_section_title'>Follow Me</h3>
                        <div className='footer_social_icons'>
                            <a href='#' className='social_icon' title='Telegram'>
                                <RiTelegram2Fill size={24} />
                            </a>
                            <a href='#' className='social_icon' title='GitHub'>
                                <TbBrandGithubFilled size={24} />
                            </a>
                            <a href='#' className='social_icon' title='LinkedIn'>
                                <FaLinkedinIn size={24} />
                            </a>
                            <a href='#' className='social_icon' title='Email'>
                                <MdEmail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className='footer_divider'></div>

                <div className='footer_bottom'>
                    <div className="waterfall-container">
                        <svg className="waterfall-svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                            <path
                                className="waterfall-path wave-1"
                                d="M0,50 Q180,5 360,50 T720,50 Q900,5 1080,50 T1440,50"
                            />
                            <path
                                className="waterfall-path wave-2"
                                d="M0,50 Q180,5 360,50 T720,50 Q900,5 1080,50 T1440,50"
                            />
                            <path
                                className="waterfall-path wave-3"
                                d="M0,50 Q180,5 360,50 T720,50 Q900,5 1080,50 T1440,50"
                            />
                        </svg>
                    </div>
                    <p className='footer_bottom_txt'>© 2024 Hafez. All rights reserved. | Made with <span className='heart'>♡</span> by Code</p>
                </div>
            </div>
        </>
    )
}
