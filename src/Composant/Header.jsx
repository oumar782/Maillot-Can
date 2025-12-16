import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['accueil', 'maillots', 'reservation', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { id: "accueil", label: "Accueil", href: "#accueil" },
    { id: "maillots", label: "Maillots", href: "#maillots" },
    { id: "reservation", label: "Réservation", href: "#reservation" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Injecter les styles CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --primary-color: #000000;
        --primary-light: #1a1a1a;
        --primary-dark: #000000;
        --accent-color: #f59e0b;
        --accent-gradient: linear-gradient(135deg, #f59e0b, #d97706);
        --background: #ffffff;
        --surface: #f8fafc;
        --text-primary: #000000;
        --text-secondary: #404040;
        --border-color: rgba(0, 0, 0, 0.08);
        --shadow-color: rgba(0, 0, 0, 0.06);
        --transition-standard: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --glass-effect: rgba(255, 255, 255, 0.95);
        --glass-blur: blur(20px);
      }

      /* Styles de base */
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        transition: var(--transition-standard);
        padding: 1.5rem 0;
        background: transparent;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif;
      }

      .header-scrolled {
        background: var(--glass-effect);
        backdrop-filter: var(--glass-blur);
        -webkit-backdrop-filter: var(--glass-blur);
        padding: 0.875rem 0;
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 8px 24px -4px var(--shadow-color);
      }

      .header-container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 2.5rem;
      }

      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4rem;
        gap: 2rem;
      }

      /* Logo Styles - Élégant et responsive */
      .logo-link {
        text-decoration: none;
        transition: var(--transition-standard);
        flex-shrink: 0;
      }

      .logo-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
      }

      .logo-icon {
        position: relative;
        width: 3.75rem;
        height: 3.75rem;
        flex-shrink: 0;
      }

      .logo-icon-inner {
        width: 100%;
        height: 100%;
        border-radius: 1.125rem;
        background: linear-gradient(135deg, var(--primary-color), #1a1a1a);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        transition: var(--transition-standard);
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }

      .logo-icon-inner::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50%;
        background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
      }

      .logo-link:hover .logo-icon-inner {
        transform: rotate(8deg) scale(1.08);
        box-shadow: 0 16px 56px rgba(0, 0, 0, 0.25);
      }

      .logo-dot {
        position: absolute;
        top: -0.375rem;
        right: -0.375rem;
        width: 1rem;
        height: 1rem;
        background: var(--accent-color);
        border-radius: 50%;
        border: 3px solid var(--background);
        box-shadow: 0 3px 12px rgba(245, 158, 11, 0.4);
        animation: pulse 2s ease-in-out infinite;
        z-index: 2;
      }

      @keyframes pulse {
        0%, 100% { 
          transform: scale(1); 
          box-shadow: 0 3px 12px rgba(245, 158, 11, 0.4);
        }
        50% { 
          transform: scale(1.25); 
          box-shadow: 0 5px 20px rgba(245, 158, 11, 0.6);
        }
      }

      .shirt-icon {
        width: 1.75rem;
        height: 1.75rem;
        fill: white;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
        transition: transform 0.3s ease;
      }

      .logo-link:hover .shirt-icon {
        transform: scale(1.1);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        line-height: 1;
        transition: var(--transition-standard);
      }

      .logo-main {
        font-size: 1.625rem;
        font-weight: 900;
        color: var(--text-primary);
        letter-spacing: -0.025em;
        line-height: 1.1;
        text-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }

      .logo-accent {
        font-size: 1.375rem;
        font-weight: 800;
        background: linear-gradient(135deg, #000000, #404040);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        letter-spacing: -0.025em;
        line-height: 1.1;
        margin-top: 0.125rem;
      }

      /* Version compacte du logo pour mobile */
      .logo-compact {
        display: none;
        font-size: 1.375rem;
        font-weight: 900;
        background: linear-gradient(135deg, #000000, #404040);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-left: 0.5rem;
        letter-spacing: -0.025em;
      }

      /* Desktop Navigation - Sophistiqué */
      .desktop-nav {
        display: flex;
        gap: 0.125rem;
        margin-left: auto;
        margin-right: 3rem;
        position: relative;
      }

      .nav-item {
        position: relative;
        padding: 0.875rem 1.75rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.975rem;
        letter-spacing: -0.01em;
        transition: var(--transition-standard);
        border-radius: 0.875rem;
        overflow: hidden;
        background: transparent;
      }

      .nav-item::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle at center, rgba(0, 0, 0, 0.05), transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.4s ease, height 0.4s ease;
      }

      .nav-item:hover {
        color: var(--text-primary);
        background: rgba(0, 0, 0, 0.03);
      }

      .nav-item:hover::before {
        width: 200%;
        height: 200%;
      }

      .nav-item-active {
        color: var(--text-primary);
        font-weight: 700;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(245, 158, 11, 0.05));
      }

      .nav-item-active::after {
        content: '';
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1.5rem;
        height: 2px;
        background: var(--accent-gradient);
        border-radius: 1px;
        animation: slideIn 0.4s ease forwards;
      }

      @keyframes slideIn {
        from {
          width: 0;
          opacity: 0;
        }
        to {
          width: 1.5rem;
          opacity: 1;
        }
      }

      /* CTA Button - Noir élégant */
      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.875rem;
        padding: 1rem 2.25rem;
        background: linear-gradient(135deg, #000000, #1a1a1a);
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.975rem;
        letter-spacing: -0.01em;
        border-radius: 2.25rem;
        transition: var(--transition-standard);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border: none;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        z-index: 1;
        flex-shrink: 0;
      }

      .cta-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #1a1a1a, #000000);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: -1;
        border-radius: 2.25rem;
      }

      .cta-button:hover {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 16px 56px rgba(0, 0, 0, 0.25);
        background: linear-gradient(135deg, #1a1a1a, #000000);
      }

      .cta-button:hover::before {
        opacity: 1;
      }

      .cta-icon {
        width: 1.375rem;
        height: 1.375rem;
        transition: transform 0.3s ease;
      }

      .cta-icon svg {
        width: 100%;
        height: 100%;
        fill: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
      }

      .cta-button:hover .cta-icon {
        transform: rotate(15deg) scale(1.1);
      }

      /* Mobile Menu Button - Design moderne */
      .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        padding: 0.625rem;
        cursor: pointer;
        transition: var(--transition-standard);
        border-radius: 0.75rem;
        background: rgba(0, 0, 0, 0.05);
      }

      .mobile-menu-button:hover {
        background: rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
      }

      .hamburger {
        width: 2.25rem;
        height: 1.75rem;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .hamburger span {
        display: block;
        width: 100%;
        height: 2.5px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: var(--transition-standard);
        transform-origin: left center;
      }

      .hamburger span:nth-child(1) {
        width: 70%;
      }

      .hamburger span:nth-child(2) {
        width: 85%;
      }

      .hamburger-open span:nth-child(1) {
        transform: rotate(45deg) translate(2px, -1px);
        width: 100%;
      }

      .hamburger-open span:nth-child(2) {
        opacity: 0;
        transform: translateX(-10px);
      }

      .hamburger-open span:nth-child(3) {
        transform: rotate(-45deg) translate(2px, 2px);
        width: 100%;
      }

      /* Mobile Menu - Premium */
      .mobile-menu {
        position: fixed;
        top: 5.5rem;
        left: 0;
        right: 0;
        background: var(--glass-effect);
        backdrop-filter: blur(30px) saturate(200%);
        -webkit-backdrop-filter: blur(30px) saturate(200%);
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
        max-height: calc(100vh - 5.5rem);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      .mobile-menu-container {
        padding: 2.5rem;
      }

      .mobile-nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .mobile-nav-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.375rem 1.75rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: 600;
        font-size: 1.15rem;
        border-radius: 1.125rem;
        transition: var(--transition-standard);
        background: rgba(0, 0, 0, 0.02);
        border: 1.5px solid transparent;
        overflow: hidden;
      }

      .mobile-nav-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.05), transparent);
        transition: width 0.3s ease;
      }

      .mobile-nav-item:hover {
        color: var(--text-primary);
        background: rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 0, 0, 0.15);
        transform: translateX(8px);
        padding-left: 2.25rem;
      }

      .mobile-nav-item:hover::before {
        width: 4px;
      }

      .mobile-nav-item-active {
        color: var(--text-primary);
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(245, 158, 11, 0.08));
        border-color: rgba(0, 0, 0, 0.2);
        font-weight: 700;
      }

      .mobile-nav-arrow {
        color: var(--accent-color);
        opacity: 0;
        transform: translateX(-15px);
        transition: var(--transition-standard);
        font-weight: 700;
        font-size: 1.25rem;
      }

      .mobile-nav-item:hover .mobile-nav-arrow {
        opacity: 1;
        transform: translateX(0) rotate(-45deg);
      }

      .mobile-cta-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.875rem;
        padding: 1.375rem 2rem;
        margin-top: 2rem;
        background: linear-gradient(135deg, #000000, var(--accent-color));
        color: white;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.15rem;
        border-radius: 1.125rem;
        transition: var(--transition-standard);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        position: relative;
        overflow: hidden;
      }

      .mobile-cta-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.6s ease;
      }

      .mobile-cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 56px rgba(0, 0, 0, 0.25);
        background: linear-gradient(135deg, #1a1a1a, #f59e0b);
      }

      .mobile-cta-button:hover::before {
        left: 100%;
      }

      .mobile-cta-icon {
        width: 1.375rem;
        height: 1.375rem;
      }

      .mobile-cta-icon svg {
        width: 100%;
        height: 100%;
        fill: white;
      }

      /* ============ RESPONSIVE DE TRÈS HAUTE QUALITÉ ============ */

      /* Grands écrans (1440px+) */
      @media (min-width: 1440px) {
        .header-container {
          max-width: 1600px;
          padding: 0 4rem;
        }
        
        .logo-icon {
          width: 4rem;
          height: 4rem;
        }
        
        .logo-main {
          font-size: 1.75rem;
        }
        
        .logo-accent {
          font-size: 1.5rem;
        }
      }

      /* Tablettes paysage (1024px - 1199px) */
      @media (max-width: 1199px) {
        .header-container {
          padding: 0 2rem;
        }
        
        .desktop-nav {
          margin-right: 2rem;
        }
        
        .nav-item {
          padding: 0.75rem 1.5rem;
        }
        
        .logo-main {
          font-size: 1.5rem;
        }
        
        .logo-accent {
          font-size: 1.25rem;
        }
      }

      /* Tablettes portrait (768px - 1023px) */
      @media (max-width: 1023px) {
        .header-container {
          padding: 0 1.75rem;
        }
        
        .header-content {
          height: 3.75rem;
          gap: 1.5rem;
        }
        
        .logo-icon {
          width: 3.25rem;
          height: 3.25rem;
        }
        
        .logo-main {
          font-size: 1.375rem;
        }
        
        .logo-accent {
          font-size: 1.125rem;
        }
        
        .nav-item {
          padding: 0.625rem 1.25rem;
          font-size: 0.9rem;
        }
        
        .cta-button {
          padding: 0.875rem 1.75rem;
          font-size: 0.9rem;
        }
      }

      /* Tablettes petites et grands mobiles (640px - 767px) */
      @media (max-width: 767px) {
        .header-container {
          padding: 0 1.5rem;
        }
        
        .header-content {
          height: 3.5rem;
          gap: 1rem;
        }
        
        .logo-icon {
          width: 3rem;
          height: 3rem;
        }
        
        /* Affiche la version compacte du texte */
        .logo-text .logo-main {
          display: none;
        }
        
        .logo-text .logo-accent {
          display: none;
        }
        
        .logo-compact {
          display: block;
          font-size: 1.25rem;
          font-weight: 900;
        }
        
        .desktop-nav {
          display: none;
        }
        
        .cta-button {
          display: none;
        }
        
        .mobile-menu-button {
          display: block;
        }
      }

      /* Mobiles moyens (480px - 639px) */
      @media (max-width: 639px) {
        .header-container {
          padding: 0 1.25rem;
        }
        
        .header-content {
          height: 3.25rem;
        }
        
        .logo-icon {
          width: 2.75rem;
          height: 2.75rem;
        }
        
        .logo-icon-inner {
          border-radius: 0.875rem;
        }
        
        .logo-dot {
          width: 0.875rem;
          height: 0.875rem;
          border-width: 2px;
        }
        
        .logo-compact {
          font-size: 1.125rem;
        }
        
        .mobile-menu {
          top: 4.75rem;
        }
        
        .mobile-menu-container {
          padding: 2rem;
        }
        
        .mobile-nav-item {
          padding: 1.125rem 1.5rem;
          font-size: 1.05rem;
        }
        
        .mobile-cta-button {
          padding: 1.25rem 1.75rem;
          font-size: 1.05rem;
        }
      }

      /* Petits mobiles (320px - 479px) */
      @media (max-width: 479px) {
        .header-container {
          padding: 0 1rem;
        }
        
        .header-content {
          height: 3rem;
        }
        
        .logo-icon {
          width: 2.5rem;
          height: 2.5rem;
        }
        
        .logo-icon-inner {
          border-radius: 0.75rem;
        }
        
        .shirt-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
        
        .logo-compact {
          font-size: 1rem;
          margin-left: 0.375rem;
        }
        
        .mobile-menu {
          top: 4.5rem;
        }
        
        .mobile-menu-container {
          padding: 1.5rem;
        }
        
        .mobile-nav-item {
          padding: 1rem 1.25rem;
          font-size: 1rem;
        }
        
        .mobile-cta-button {
          padding: 1rem 1.5rem;
          font-size: 1rem;
          margin-top: 1.5rem;
        }
      }

      /* Très petits mobiles (moins de 320px) */
      @media (max-width: 319px) {
        .header-container {
          padding: 0 0.75rem;
        }
        
        .logo-icon {
          width: 2.25rem;
          height: 2.25rem;
        }
        
        .logo-compact {
          font-size: 0.875rem;
        }
        
        .mobile-menu-container {
          padding: 1.25rem;
        }
      }

      /* Animation d'entrée */
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .header {
        animation: slideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* Améliorations de performance */
      .header-scrolled {
        will-change: transform, background, box-shadow;
      }

      .nav-item, .cta-button {
        will-change: transform, background-color;
      }

      /* Support pour les appareils avec notch */
      @supports (padding: max(0px)) {
        .header-container {
          padding-left: max(1rem, env(safe-area-inset-left));
          padding-right: max(1rem, env(safe-area-inset-right));
        }
        
        .mobile-menu {
          padding-bottom: env(safe-area-inset-bottom);
        }
      }

      /* Mode sombre automatique */
      @media (prefers-color-scheme: dark) {
        :root {
          --background: #0a0a0a;
          --surface: #171717;
          --text-primary: #ffffff;
          --text-secondary: #a3a3a3;
          --border-color: rgba(255, 255, 255, 0.1);
          --shadow-color: rgba(0, 0, 0, 0.4);
          --glass-effect: rgba(10, 10, 10, 0.95);
        }
        
        .logo-icon-inner {
          background: linear-gradient(135deg, #000000, #404040);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo-main {
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .logo-accent {
          background: linear-gradient(135deg, #ffffff, #d4d4d4);
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .logo-compact {
          background: linear-gradient(135deg, #ffffff, #d4d4d4);
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .mobile-nav-item {
          background: rgba(255, 255, 255, 0.03);
        }
        
        .mobile-menu-button {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Logo avec texte responsive */}
          <a 
            href="#accueil" 
            className="logo-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#accueil');
            }}
          >
            <div className="logo-wrapper">
              <div className="logo-icon">
                <div className="logo-icon-inner">
                  <svg className="shirt-icon" viewBox="0 0 24 24">
                    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46A2 2 0 0 0 2 5.27V12a2 2 0 0 0 1.46 1.92l3.16.79a2 2 0 0 1 1.43 1.57l.52 3.64A2 2 0 0 0 10.56 22h2.88a2 2 0 0 0 1.99-1.78l.52-3.64a2 2 0 0 1 1.43-1.57l3.16-.79A2 2 0 0 0 22 12V5.27a2 2 0 0 0-1.62-1.81z"/>
                  </svg>
                </div>
                <div className="logo-dot"></div>
              </div>
              <div className="logo-text">
                <span className="logo-main">Maillots</span>
                <span className="logo-accent">West Africa</span>
              </div>
              {/* Version compacte visible uniquement en mobile */}
              <span className="logo-compact">MWA</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-item ${activeSection === item.id ? 'nav-item-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#reservation"
            className="cta-button"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#reservation');
            }}
          >
            <span className="cta-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 9l1.25 2.75L23 13l-2.75 1.26L19 17l-1.25-2.74L15 13l2.75-1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z"/>
              </svg>
            </span>
            Réserver
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-container">
              <nav className="mobile-nav">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mobile-nav-item ${activeSection === item.id ? 'mobile-nav-item-active' : ''}`}
                  >
                    {item.label}
                    <span className="mobile-nav-arrow">→</span>
                  </motion.a>
                ))}
                <motion.a
                  href="#reservation"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#reservation');
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mobile-cta-button"
                >
                  <span className="mobile-cta-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 9l1.25 2.75L23 13l-2.75 1.26L19 17l-1.25-2.74L15 13l2.75-1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z"/>
                    </svg>
                  </span>
                  Réserver maintenant
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;