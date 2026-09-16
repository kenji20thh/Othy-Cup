'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, Gamepad2, Menu, Search, Trophy, Users, X, Play, BarChart3 } from 'lucide-react'
import { siteContent } from '@/lib/winners-content'

const iconMap = { trophy: Trophy, gamepad: Gamepad2, users: Users, chart: BarChart3, play: Play, clock: Clock3 }

function Logo({ compact = false }: { compact?: boolean }) {
  return <Image src={siteContent.logo} alt="Winners" width={compact ? 58 : 70} height={compact ? 58 : 70} className="object-contain" />
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <header className={`site-nav ${scrolled ? 'site-nav-scrolled' : ''}`}><div className="nav-inner">
    <a href="#top" aria-label="Winners home"><Logo compact /></a>
    <nav className="desktop-nav" aria-label="Primary navigation">{siteContent.nav.map((item, i) => <a key={item} className={i === 0 ? 'active' : ''} href={`#${item.toLowerCase()}`}>{item}</a>)}<details><summary>More</summary><div className="more-menu">{siteContent.more.map(item => <a href="#universe" key={item}>{item}</a>)}</div></details></nav>
    <div className="nav-actions"><button aria-label="Search"><Search size={17} /></button><button className="mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
  </div>{open && <nav className="mobile-nav">{[...siteContent.nav, 'More'].map(item => <a key={item} href={`#${item === 'More' ? 'universe' : item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}</nav>}</header>
}

function Hero() { return <section id="top" className="hero"><Image src={siteContent.heroImage} alt="Winners creator holding a rifle" fill priority className="hero-image" sizes="100vw" /><div className="hero-shade" /><div className="hero-grid" /><div className="hero-content page-shell"><p className="eyebrow">WINNERS <span>//</span> FREE FIRE ECOSYSTEM</p><h1>MORE THAN<br /><em>JUST A GAME</em></h1><p className="hero-sub">Tournaments <span>•</span> Players <span>•</span> Fantasy <span>•</span> Community</p><div className="hero-actions"><a href="#fantasy" className="button button-primary"><Gamepad2 size={17} /> Fantasy League <ArrowRight size={15} /></a><a href="#tournaments" className="button button-ghost"><Trophy size={17} /> Othy Cup</a></div></div><div className="hero-scroll">SCROLL TO EXPLORE <span /></div></section> }

function FeaturedCarousel() { const [current, setCurrent] = useState(0); const [paused, setPaused] = useState(false); const items = siteContent.featured; const next = () => setCurrent((current + 1) % items.length); const prev = () => setCurrent((current - 1 + items.length) % items.length)
  useEffect(() => { if (paused) return; const timer = setInterval(next, 4500); return () => clearInterval(timer) }, [paused, current])
  return <section id="tournaments" className="showcase page-shell"><div className="section-heading"><div><p className="eyebrow">01 / FEATURED</p><h2>THE <span>SPOTLIGHT</span></h2></div><p className="section-note">The moments, competitions and drops<br className="desktop-only" /> defining the Winners community.</p></div><div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>{items.map((item, index) => { const offset = (index - current + items.length) % items.length; const position = offset === 0 ? 'center' : offset === 1 ? 'right' : 'left'; return <article key={item.title} className={`feature-card ${position}`} onClick={() => setCurrent(index)}><div className="card-image"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 88vw, 58vw" /><div className="image-fallback" /></div><div className="card-overlay" /><div className="card-content"><p className="card-kicker">{item.kicker}</p><h3>{item.title}</h3><p className="card-description">{item.description}</p><span className="card-cta">{item.cta} <ArrowRight size={15} /></span></div></article> })}</div><div className="carousel-controls"><button onClick={prev} aria-label="Previous slide"><ChevronLeft size={18} /></button><div className="dots">{items.map((item, index) => <button key={item.title} className={index === current ? 'selected' : ''} onClick={() => setCurrent(index)} aria-label={`Go to ${item.title}`} />)}</div><span className="slide-count">0{current + 1} <i>/ 03</i></span><button onClick={next} aria-label="Next slide"><ChevronRight size={18} /></button></div></section> }

function SocialLinks() { return <section className="social-section page-shell"><div className="social-label"><p className="eyebrow">STAY CONNECTED</p><h2>FOLLOW <span>WINNERS</span></h2></div><div className="social-links">{siteContent.socials.map(({ name, url, icon }) => <a key={name} href={url} target="_blank" rel="noreferrer" className="social-link">{icon === 'instagram' ? <span className="instagram-mark">◎</span> : icon === 'discord' ? <span className="discord-mark">◌</span> : <span className="kick-mark">K</span>}<span>{name}</span><ArrowRight size={15} /></a>)}</div></section> }

function UniverseSection() { return <section id="universe" className="universe page-shell"><div className="section-heading"><div><p className="eyebrow">02 / THE ECOSYSTEM</p><h2>THE WINNERS <span>UNIVERSE</span></h2></div><p className="section-note">One home for the entire Free Fire<br className="desktop-only" /> competitive community.</p></div><div className="universe-grid">{siteContent.universe.map(item => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <a href="#top" className="universe-card" key={item.title}><Icon size={22} /><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowRight size={16} className="universe-arrow" /></a> })}</div></section> }

function Footer() { return <footer className="footer"><div className="page-shell footer-top"><div className="footer-brand"><Logo /><p>More than just a game.<br />The home of Winners.</p></div><div className="footer-columns"><div><h4>Explore</h4>{['Tournaments', 'Fantasy', 'Teams', 'Players', 'Standings'].map(x => <a href="#universe" key={x}>{x}</a>)}</div><div><h4>Content</h4>{['News', 'Videos', 'Clips', 'Gallery'].map(x => <a href="#universe" key={x}>{x}</a>)}</div><div><h4>Community</h4>{siteContent.socials.map(x => <a href={x.url} key={x.name} target="_blank" rel="noreferrer">{x.name}</a>)}</div></div></div><div className="page-shell footer-bottom"><span>© 2026 Winners. All rights reserved.</span><span>BUILT FOR THE COMMUNITY <b>●</b></span></div></footer> }

export default function Page() { return <main><Navbar /><Hero /><FeaturedCarousel /><SocialLinks /><UniverseSection /><Footer /></main> }
