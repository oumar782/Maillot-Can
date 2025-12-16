import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
      const progress = Math.min(window.scrollY / 500, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="accueil"
      className="hero-section"
      style={{
        '--scroll-progress': scrollProgress,
      }}
    >
      {/* Fond principal avec image professionnelle */}
      <div className="hero-background">
        {/* Image de fond professionnelle */}
        <div className="hero-bg-image"></div>
        
        {/* Overlay professionnel */}
        <div className="hero-overlay"></div>
        
        {/* Gradient overlay élégant */}
        <div className="hero-gradient"></div>
        
        {/* Lignes géométriques élégantes */}
        <div className="geometric-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
        
        {/* Particules animées */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="hero-content-wrapper">
        <div className="hero-container">
          {/* En-tête d'urgence professionnel */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              type: "spring", 
              stiffness: 100,
              damping: 12 
            }}
            className="urgency-header"
          >
            <div className="urgency-content">
              <div className="urgency-indicator">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="pulse-circle"
                />
                <div className="pulse-core"></div>
              </div>
              <svg className="urgency-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
              </svg>
              <div className="urgency-text">
                <span className="urgency-label">OFFRE LIMITÉE</span>
                <span className="urgency-timer">• 6 JOURS RESTANTS •</span>
              </div>
            </div>
          </motion.div>

          {/* Titre principal professionnel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="hero-header"
          >
            <div className="title-wrapper">
              <h1 className="main-title">
                <span className="title-line">L'EXCELLENCE</span>
                <span className="title-line accent-line">SPORTIVE AFRICAINE</span>
              </h1>
              
              <div className="title-divider">
                <div className="divider-line"></div>
                <div className="divider-dot"></div>
                <div className="divider-line"></div>
              </div>
              
              <p className="hero-subtitle">
                Maillots officiels édition limitée 2024
              </p>
            </div>
          </motion.div>

          {/* Bannière drapeaux professionnelle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flags-banner"
          >
            <div className="flags-container">
              <div className="flag-item">
                <span className="flag-emoji">🇨🇮</span>
                <span className="flag-name">CÔTE D'IVOIRE</span>
              </div>
              <div className="flag-separator">•</div>
              <div className="flag-item">
                <span className="flag-emoji">🇸🇳</span>
                <span className="flag-name">SÉNÉGAL</span>
              </div>
              <div className="flag-separator">•</div>
              <div className="flag-item">
                <span className="flag-emoji">🇲🇱</span>
                <span className="flag-name">MALI</span>
              </div>
            </div>
          </motion.div>

          {/* Points de vente professionnels */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="features-grid"
          >
            {[
              { 
                icon: "✓", 
                title: "QUALITÉ PREMIUM", 
                description: "Tissus techniques haute performance" 
              },
              { 
                icon: "🎨", 
                title: "COULEURS VIVES", 
                description: "Impression HD résistante au lavage" 
              },
              { 
                icon: "⚡", 
                title: "LIVRAISON RAPIDE", 
                description: "Expédition sous 24-48h" 
              },
              { 
                icon: "🏆", 
                title: "OFFICIEL", 
                description: "Certifié par les fédérations" 
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="feature-card"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Professionnel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="cta-section"
          >
            <div className="cta-wrapper">
              <a
                href="#reservation"
                className="primary-cta"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="cta-content">
                  <svg className="cta-icon" viewBox="0 0 24 24">
                    <path d="M19 9l1.25 2.75L23 13l-2.75 1.26L19 17l-1.25-2.74L15 13l2.75-1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5z"/>
                  </svg>
                  <span className="cta-text">RÉSERVER MAINTENANT</span>
                </div>
                <div className="cta-subtext">Édition limitée • Stock restreint</div>
                <div className="cta-hover-effect"></div>
              </a>
              
              <a
                href="#maillots"
                className="secondary-cta"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span className="secondary-cta-text">VOIR LA COLLECTION</span>
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Statistiques professionnelles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="stats-section"
          >
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">CLIENTS SATISFAITS</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">TAUX DE SATISFACTION</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">24H</div>
                <div className="stat-label">EXPÉDITION RAPIDE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll professionnel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="scroll-indicator"
      >
        <div className="scroll-progress">
          <motion.div 
            className="progress-bar"
            animate={{ scaleX: scrollProgress }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <a href="#maillots" className="scroll-link">
          <span className="scroll-label">EXPLORER LA COLLECTION</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="scroll-arrow"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </motion.div>
        </a>
      </motion.div>

      <style jsx>{`
        /* Variables CSS professionnelles */
        :root {
          --black: #000000;
          --black-light: #1a1a1a;
          --accent: #f59e0b;
          --accent-dark: #d97706;
          --white: #ffffff;
          --gray-light: #f5f5f5;
          --gray: #666666;
          --gray-dark: #333333;
          --red: #dc2626;
          --glass: rgba(255, 255, 255, 0.95);
          --glass-dark: rgba(0, 0, 0, 0.8);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 30px 80px rgba(0, 0, 0, 0.15);
        }

        /* Section Hero - Full Width */
        .hero-section {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          left: 0;
          right: 0;
        }

        /* Background professionnel */
        .hero-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          filter: blur(6px) brightness(0.7) contrast(1.1);
          transform: scale(1.05);
          transition: filter 0.5s ease;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.85) 100%
          );
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            transparent 0%,
            rgba(245, 158, 11, 0.03) 50%,
            transparent 100%
          );
          animation: gradientShift 20s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Lignes géométriques */
        .geometric-lines {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.1), transparent);
        }

        .line-1 {
          top: 20%;
          left: -100px;
          width: 400px;
          height: 1px;
          transform: rotate(45deg);
          animation: lineMove 25s linear infinite;
        }

        .line-2 {
          bottom: 30%;
          right: -100px;
          width: 300px;
          height: 1px;
          transform: rotate(-45deg);
          animation: lineMove 30s linear infinite reverse;
        }

        .line-3 {
          top: 60%;
          left: -50%;
          width: 200%;
          height: 1px;
          animation: lineMove 40s linear infinite;
        }

        @keyframes lineMove {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        /* Particules */
        .particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(245, 158, 11, 0.3);
          border-radius: 50%;
        }

        /* Contenu principal */
        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          padding: 6rem 2rem;
          margin: 0 auto;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
        }

        /* En-tête d'urgence */
        .urgency-header {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .urgency-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.25rem 2.5rem;
          background: rgba(220, 38, 38, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 12px;
          box-shadow: var(--shadow);
        }

        .urgency-indicator {
          position: relative;
          width: 24px;
          height: 24px;
        }

        .pulse-circle {
          position: absolute;
          inset: 0;
          border: 2px solid var(--red);
          border-radius: 50%;
        }

        .pulse-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: var(--red);
          border-radius: 50%;
        }

        .urgency-icon {
          width: 20px;
          height: 20px;
          fill: var(--red);
        }

        .urgency-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .urgency-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--red);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .urgency-timer {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--red);
          letter-spacing: 0.05em;
        }

        /* Titre principal */
        .hero-header {
          width: 100%;
          text-align: center;
        }

        .title-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .main-title {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .title-line {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          color: var(--white);
          line-height: 0.9;
          letter-spacing: -0.02em;
        }

        .accent-line {
          background: linear-gradient(135deg, var(--white) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          padding-bottom: 1rem;
        }

        .accent-line::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 3px;
          background: var(--accent-gradient);
          border-radius: 2px;
        }

        .title-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }

        .divider-line {
          width: 100px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }

        .divider-dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
          border-radius: 50%;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 1rem;
        }

        /* Bannière drapeaux */
        .flags-banner {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .flags-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 1.5rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }

        .flag-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .flag-emoji {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
        }

        .flag-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .flag-separator {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }

        /* Features Grid */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          transition: var(--transition);
          cursor: pointer;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: var(--shadow-hover);
        }

        .feature-icon-wrapper {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245, 158, 11, 0.1);
          border: 2px solid rgba(245, 158, 11, 0.2);
          border-radius: 50%;
          margin-bottom: 1.5rem;
        }

        .feature-icon {
          font-size: 1.5rem;
          color: var(--accent);
        }

        .feature-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--white);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .feature-description {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        /* CTA Section */
        .cta-section {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .primary-cta {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 4rem;
          background: linear-gradient(135deg, var(--black-light), var(--black));
          border: none;
          border-radius: 16px;
          text-decoration: none;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 600px;
        }

        .primary-cta:hover {
          box-shadow: var(--shadow-hover);
        }

        .cta-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .cta-icon {
          width: 24px;
          height: 24px;
          fill: var(--white);
        }

        .cta-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .cta-subtext {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
        }

        .cta-hover-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent), var(--accent-dark));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .primary-cta:hover .cta-hover-effect {
          opacity: 0.1;
        }

        .secondary-cta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          text-decoration: none;
          transition: var(--transition);
        }

        .secondary-cta:hover {
          border-color: var(--accent);
          background: rgba(245, 158, 11, 0.05);
        }

        .secondary-cta-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--white);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .arrow-icon {
          width: 16px;
          height: 16px;
          fill: var(--white);
        }

        /* Statistiques */
        .stats-section {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 3rem;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .scroll-progress {
          width: 200px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 100%;
          background: var(--accent);
          transform-origin: left;
          transform: scaleX(0);
        }

        .scroll-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .scroll-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .scroll-arrow {
          width: 20px;
          height: 20px;
        }

        .scroll-arrow svg {
          width: 100%;
          height: 100%;
          fill: var(--accent);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content-wrapper {
            padding: 4rem 2rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 800px;
          }
          
          .stats-grid {
            gap: 2rem;
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content-wrapper {
            padding: 3rem 1.5rem;
          }
          
          .hero-container {
            gap: 3rem;
          }
          
          .title-line {
            font-size: clamp(2.5rem, 5vw, 4rem);
          }
          
          .flags-container {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          
          .flag-separator {
            display: none;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .stat-divider {
            width: 100px;
            height: 1px;
          }
          
          .primary-cta {
            padding: 1.5rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content-wrapper {
            padding: 2rem 1rem;
          }
          
          .urgency-content {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
            padding: 1rem;
          }
          
          .cta-wrapper {
            width: 100%;
          }
          
          .primary-cta,
          .secondary-cta {
            width: 100%;
            justify-content: center;
          }
        }

        /* Mode sombre */
        @media (prefers-color-scheme: dark) {
          .hero-overlay {
            background: linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.9) 0%,
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0.9) 100%
            );
          }
          
          .feature-card,
          .flags-container,
          .primary-cta,
          .stats-grid {
            background: rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.05);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;