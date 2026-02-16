import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../Component/Header/Header.jsx'
import Footer from '../../Component/Footer/Footer.jsx'
import { supabase } from '../../../lib/supabaseClient'

export default function Home() {
    const [projects, setProjects] = useState([])
    const [loadingProjects, setLoadingProjects] = useState(true)
    const [projectsError, setProjectsError] = useState('')
    const [viewerOpen, setViewerOpen] = useState(false)
    const [activeProject, setActiveProject] = useState(null)
    const [viewerUrl, setViewerUrl] = useState('')

    const fallbackProjects = [
        {
            id: 'fallback-1',
            title: 'Portfolio Starter',
            description: 'A clean starter portfolio with smooth sections and animations.',
            image: '/Home/landing.jpg',
            languages: ['HTML', 'CSS', 'JavaScript'],
            frameworks: ['Vite'],
            plugins: ['Swiper'],
            demoUrl: '',
            isFallback: true,
        },
        {
            id: 'fallback-2',
            title: 'E-Commerce UI',
            description: 'Modern product listing with filters, cards, and a checkout flow.',
            image: '/Home/Products/cafe.jpg',
            languages: ['React'],
            frameworks: ['Tailwind'],
            plugins: ['Formik'],
            demoUrl: '',
            isFallback: true,
        },
        {
            id: 'fallback-3',
            title: 'Dashboard Concept',
            description: 'Analytics dashboard concept with charts and KPIs.',
            image: '/Home/aboutMe.jpg',
            languages: ['React'],
            frameworks: ['Chart.js'],
            plugins: ['ApexCharts'],
            demoUrl: '',
            isFallback: true,
        },
    ]

    const normalizeArray = (val) => {
        if (Array.isArray(val)) return val
        if (typeof val === 'string') return val.split(',').map(v => v.trim()).filter(Boolean)
        return []
    }

    useEffect(() => {
        const fetchProjects = async () => {
            setLoadingProjects(true)
            setProjectsError('')
            const { data, error } = await supabase
                .from('Project')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                setProjectsError('Failed to load projects: ' + error.message)
            } else if (data) {
                const mapped = data.map(row => ({
                    id: row.id,
                    title: row.title || 'Untitled project',
                    description: row.desc || 'No description added yet.',
                    image: row.img || '/Home/Products/admin.jpg',
                    languages: normalizeArray(row.language),
                    frameworks: normalizeArray(row.framework),
                    plugins: normalizeArray(row.plugin),
                    demoUrl: row.viewerUrl || '',
                }))
                setProjects(mapped)
            }
            setLoadingProjects(false)
        }

        fetchProjects()
    }, [])

    const openProjectViewer = (project) => {
        if (!project.demoUrl) {
            setProjectsError('No demo link provided for this project.')
            return
        }
        setActiveProject(project)
        setViewerUrl(project.demoUrl)
        setViewerOpen(true)
    }

    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <>
            <Header />
            <div className='home'>
                <div className='home_landing' id='home_landing'>
                    <div className='home_landing_txt'>
                        <div className="home_landing_txt_title">My site</div>
                        <div className="home_landing_txt_buld">Programmer Hafez</div>
                        <div className="home_landing_txt_child">Hello, welcome to my site! Are you ready to go visit the site? Have a great time! 😋</div>
                        <button onClick={() => handleScroll('home_products')} className='home_landing_txt_btn'>My Projects</button>
                    </div>
                    <div className='home_landing_img'>
                        <img src="/Home/landing.jpg" alt="Img Landing" />
                    </div>
                </div>

                <div className='home_about' id='home_about'>
                    <div className='home_about_img'>
                        <img src="/Home/aboutMe.jpg" alt="About Me" />
                    </div>
                    <div className='home_about_txt'>
                        <div className='home_about_txt_title'>About Me</div>
                        <div className='home_about_txt_main'>Learn more about me</div>
                        <div className='home_about_txt_disc'>
                            Hi, <b>I'm Hafez </b>a student and front-end developer. For me, the web is
                            more than HTML tags; it's a place where computer engineering meets
                            creativity
                        </div>
                    </div>
                </div>

                <div className='home_products' id='home_products'>
                    <p className='home_products_title'>My Projects</p>

                    {loadingProjects ? (
                        <div className='home_products_loading'>Loading projects...</div>
                    ) : projectsError ? (
                        <div className='home_products_content'>
                            {fallbackProjects.map(project => (
                                <div className='home_products_content_card is_disabled' key={project.id}>
                                    <img src={project.image} alt={project.title} />
                                    <div className='home_products_content_card_title'>{project.title}</div>
                                    <div className='home_products_content_card_disc'>{project.description}</div>
                                    {(project.languages.length > 0 || project.frameworks.length > 0 || project.plugins.length > 0) && (
                                        <div className='home_products_tags'>
                                            {project.languages.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Languages</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.languages.map(tag => (
                                                            <span className='home_products_tag' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {project.frameworks.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Frameworks</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.frameworks.map(tag => (
                                                            <span className='home_products_tag secondary' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {project.plugins.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Plugins</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.plugins.map(tag => (
                                                            <span className='home_products_tag tertiary' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className='home_products_empty'>No projects published yet.</div>
                    ) : (
                        <div className='home_products_content'>
                            {projects.map(project => (
                                <div
                                    className='home_products_content_card'
                                    key={project.id}
                                    onClick={() => openProjectViewer(project)}
                                >
                                    <img src={project.image} alt={project.title} />
                                    <div className='home_products_content_card_title'>{project.title}</div>
                                    <div className='home_products_content_card_disc'>{project.description}</div>
                                    {(project.languages.length > 0 || project.frameworks.length > 0 || project.plugins.length > 0) && (
                                        <div className='home_products_tags'>
                                            {project.languages.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Languages</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.languages.map(tag => (
                                                            <span className='home_products_tag' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {project.frameworks.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Frameworks</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.frameworks.map(tag => (
                                                            <span className='home_products_tag secondary' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {project.plugins.length > 0 && (
                                                <div className='home_products_tag_group'>
                                                    <span className='home_products_tag_label'>Plugins</span>
                                                    <div className='home_products_tag_list'>
                                                        {project.plugins.map(tag => (
                                                            <span className='home_products_tag tertiary' key={tag}>{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {viewerOpen && (
                <div className='project_viewer_overlay' onClick={() => setViewerOpen(false)}>
                    <div className='project_viewer_modal' onClick={(e) => e.stopPropagation()}>
                        <div className='project_viewer_header'>
                            <div>
                                <p className='project_viewer_label'>Live Preview</p>
                                <h3>{activeProject?.title}</h3>
                                <span className='project_viewer_url'>{viewerUrl}</span>
                            </div>
                            <button className='close_btn' onClick={() => setViewerOpen(false)}>✕</button>
                        </div>
                        {viewerUrl ? (
                            <iframe
                                src={viewerUrl}
                                title={activeProject?.title || 'Project preview'}
                                className='project_viewer_iframe'
                                sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
                            />
                        ) : (
                            <div className='project_viewer_empty'>No demo link for this project.</div>
                        )}
                        <div className='project_viewer_actions'>
                            <a href={viewerUrl || '#'} target='_blank' rel='noreferrer' className='primary_btn'>Open in new tab</a>
                            <button className='ghost_btn' onClick={() => setViewerOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <div id='footer'>
                <Footer />
            </div>
        </>

    )
}
