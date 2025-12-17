import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="accueil"
      className="hero-section"
    >
      {/* Background avec effet parallax */}
      <motion.div 
        className="hero-background"
        style={{ y: backgroundY }}
      >
        {/* Image de fond principale */}
        <div className="hero-bg-main"></div>
        
        {/* Overlay de couleur professionnelle */}
        <div className="color-overlay">
          <div className="gradient-1"></div>
          <div className="gradient-2"></div>
          <div className="gradient-3"></div>
        </div>
        
        {/* Motifs géométriques abstraits */}
        <div className="geometric-patterns">
          <div className="pattern pattern-1"></div>
          <div className="pattern pattern-2"></div>
          <div className="pattern pattern-3"></div>
          <div className="pattern pattern-4"></div>
        </div>
        
        {/* Lignes dynamiques */}
        <div className="dynamic-lines">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="dynamic-line"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
              style={{ top: `${20 + i * 10}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Contenu principal avec effet parallax */}
      <motion.div 
        className="hero-content"
        style={{ 
          y: textY,
          opacity: opacity 
        }}
      >
        <div className="content-container">
          
          {/* Badge d'exclusivité premium */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100,
              damping: 12 
            }}
            className="exclusive-badge"
          >
            <div className="badge-content">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="badge-text">ÉDITION PRÉMIUM 2024</span>
              <div className="badge-divider"></div>
              <span className="badge-urgency">STOCK LIMITÉ</span>
            </div>
          </motion.div>

          {/* Titre principal */}
          <div className="title-section">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="main-title-container"
            >
              <h1 className="main-title">
                <span className="title-line title-line-1">
                  L&apos;ART DU
                </span>
                <span className="title-line title-line-2">
                  <span className="title-highlight">SPORT</span> D&apos;EXCELLENCE
                </span>
              </h1>
              
              <div className="title-underline">
                <div className="underline-core"></div>
                <div className="underline-glow"></div>
              </div>
              
              <p className="hero-subtitle">
                Maillots officiels des équipes nationales africaines
              </p>
            </motion.div>
          </div>

          {/* Bannière des nations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="nations-banner"
          >
            <div className="nations-grid">
              {[
                { code: "CIV", name: "CÔTE D'IVOIRE", color: "#FF9F00" },
                { code: "SEN", name: "SÉNÉGAL", color: "#00853F" },
                { code: "MLI", name: "MALI", color: "#CE1126" },
                { code: "CMR", name: "CAMEROUN", color: "#007A5E" },
              ].map((nation, index) => (
                <motion.div
                  key={nation.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="nation-card"
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div 
                    className="nation-color"
                    style={{ backgroundColor: nation.color }}
                  ></div>
                  <div className="nation-content">
                    <div className="nation-code">{nation.code}</div>
                    <div className="nation-name">{nation.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Caractéristiques premium */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="features-showcase"
          >
            <div className="features-container">
              <div className="feature-highlights">
                <div className="highlight-column">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 12C19.333 16.667 16 19 12 19C8 19 4.667 16.667 2 12C4.667 7.333 8 5 12 5C16 5 19.333 7.333 22 12Z" 
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-text">
                      <div className="highlight-title">QUALITÉ SUPREME</div>
                      <div className="highlight-desc">Tissus techniques de haute performance</div>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-text">
                      <div className="highlight-title">COULEURS VIVANTES</div>
                      <div className="highlight-desc">Teintes résistantes à la décoloration</div>
                    </div>
                  </div>
                </div>
                
                <div className="highlight-column">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-text">
                      <div className="highlight-title">EXPÉDITION 24H</div>
                      <div className="highlight-desc">Livraison express garantie</div>
                    </div>
                  </div>
                  
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="highlight-text">
                      <div className="highlight-title">CERTIFIÉ OFFICIEL</div>
                      <div className="highlight-desc">Licences officielles des fédérations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action Premium */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="cta-premium"
          >
            <div className="cta-container">
              <motion.a
                href="#reservation"
                className="premium-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="button-content">
                  <div className="button-main">
                    <span className="button-text">DÉCOUVRIR LA COLLECTION</span>
                    <div className="button-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="button-sub">Édition limitée • Pièces numérotées</div>
                </div>
                <div className="button-glow"></div>
              </motion.a>
              
              <div className="cta-stats">
                <div className="stat">
                  <div className="stat-number">250+</div>
                  <div className="stat-label">Exemplaires vendus</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <div className="stat-number">4.9★</div>
                  <div className="stat-label">Avis clients</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <div className="stat-number">30</div>
                  <div className="stat-label">Jours garantie</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur de défilement premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="scroll-indicator-premium"
      >
        <a href="#collection" className="scroll-link-premium">
          <div className="scroll-progress-container">
            <motion.div 
              className="scroll-progress-bar"
              animate={{ 
                scaleY: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <span className="scroll-label-premium">Explorer la collection</span>
        </a>
      </motion.div>

      <style jsx>{`
        /* Variables CSS premium */
        :root {
          --black: #0A0A0A;
          --black-dark: #050505;
          --black-light: #1A1A1A;
          --gold: #D4AF37;
          --gold-dark: #B8860B;
          --gold-light: #F5E6B3;
          --white: #FFFFFF;
          --white-off: #F8F9FA;
          --gray-light: #E9ECEF;
          --gray: #6C757D;
          --gray-dark: #343A40;
          --accent: #FF6B35;
          --success: #28A745;
          --glass: rgba(255, 255, 255, 0.05);
          --glass-dark: rgba(10, 10, 10, 0.8);
          --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          --shadow-gold: 0 0 30px rgba(212, 175, 55, 0.3);
        }

        /* Reset et base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Section Hero */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: var(--black);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Background avec parallax */
        .hero-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 120%;
          transform: translateZ(0);
          will-change: transform;
        }

        .hero-bg-main {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(45deg, var(--black-dark) 0%, transparent 100%),
            url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.4) contrast(1.2);
          transform: scale(1.1);
        }

        .color-overlay {
          position: absolute;
          inset: 0;
        }

        .gradient-1 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
        }

        .gradient-2 {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(0deg, rgba(10, 10, 10, 0.9) 0%, transparent 100%);
        }

        .gradient-3 {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255, 107, 53, 0.03) 0%, transparent 50%);
        }

        /* Motifs géométriques */
        .geometric-patterns {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .pattern {
          position: absolute;
          border: 1px solid rgba(212, 175, 55, 0.1);
          pointer-events: none;
        }

        .pattern-1 {
          top: 20%;
          left: 10%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
        }

        .pattern-2 {
          bottom: 30%;
          right: 15%;
          width: 150px;
          height: 150px;
          transform: rotate(45deg);
          animation: float 25s ease-in-out infinite reverse;
        }

        .pattern-3 {
          top: 50%;
          left: 5%;
          width: 100px;
          height: 100px;
          border-radius: 20px;
          animation: float 30s ease-in-out infinite;
        }

        .pattern-4 {
          bottom: 20%;
          right: 5%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          animation: float 35s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }

        /* Lignes dynamiques */
        .dynamic-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .dynamic-line {
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
        }

        /* Contenu principal */
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1400px;
          padding: 6rem 2rem;
          margin: 0 auto;
          will-change: transform, opacity;
        }

        .content-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
        }

        /* Badge d'exclusivité */
        .exclusive-badge {
          width: 100%;
          max-width: 500px;
        }

        .badge-content {
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(10, 10, 10, 0.3));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
        }

        .badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: var(--gold);
        }

        .badge-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gold-light);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .badge-divider {
          width: 1px;
          height: 20px;
          background: rgba(212, 175, 55, 0.3);
        }

        .badge-urgency {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Titre principal */
        .title-section {
          width: 100%;
          text-align: center;
        }

        .main-title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .main-title {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .title-line {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 800;
          color: var(--white-off);
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .title-line-2 {
          position: relative;
          padding-bottom: 1rem;
        }

        .title-highlight {
          background: linear-gradient(135deg, var(--gold) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .title-highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--gold), var(--accent));
          border-radius: 1px;
        }

        .title-underline {
          position: relative;
          width: 300px;
          height: 3px;
          margin: 2rem auto;
        }

        .underline-core {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          border-radius: 2px;
        }

        .underline-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          filter: blur(8px);
          opacity: 0.5;
          border-radius: 4px;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--gray-light);
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 1rem;
          opacity: 0.9;
        }

        /* Bannière des nations */
        .nations-banner {
          width: 100%;
          max-width: 1000px;
        }

        .nations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .nation-card {
          position: relative;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          transition: var(--transition);
          cursor: pointer;
          overflow: hidden;
        }

        .nation-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl), var(--shadow-gold);
        }

        .nation-color {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          border-radius: 16px 16px 0 0;
        }

        .nation-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .nation-code {
          font-size: 2rem;
          font-weight: 900;
          color: var(--white);
          letter-spacing: 0.1em;
        }

        .nation-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--gray-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
        }

        /* Caractéristiques */
        .features-showcase {
          width: 100%;
          max-width: 800px;
        }

        .features-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .feature-highlights {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .feature-highlights {
            grid-template-columns: 1fr;
          }
        }

        .highlight-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          transition: var(--transition);
        }

        .highlight-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 175, 55, 0.1);
          transform: translateX(5px);
        }

        .highlight-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          color: var(--gold);
        }

        .highlight-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .highlight-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .highlight-desc {
          font-size: 0.875rem;
          color: var(--gray);
          line-height: 1.5;
        }

        /* CTA Premium */
        .cta-premium {
          width: 100%;
          max-width: 600px;
        }

        .cta-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .premium-button {
          position: relative;
          display: block;
          width: 100%;
          padding: 2.5rem 3rem;
          background: linear-gradient(135deg, var(--black-light), var(--black-dark));
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          text-decoration: none;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: var(--shadow-xl);
          cursor: pointer;
        }

        .premium-button:hover {
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: var(--shadow-xl), var(--shadow-gold);
        }

        .button-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .button-main {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .button-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .button-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: var(--gold);
          border-radius: 50%;
          color: var(--black);
          transition: var(--transition);
        }

        .premium-button:hover .button-arrow {
          transform: translateX(5px);
        }

        .button-sub {
          font-size: 0.875rem;
          color: var(--gold-light);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .premium-button:hover .button-glow {
          opacity: 1;
        }

        .cta-stats {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--gold);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Scroll Indicator Premium */
        .scroll-indicator-premium {
          position: absolute;
          bottom: 3rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 20;
          pointer-events: none;
        }

        .scroll-link-premium {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          pointer-events: auto;
        }

        .scroll-progress-container {
          width: 2px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
        }

        .scroll-progress-bar {
          width: 100%;
          height: 30px;
          background: linear-gradient(180deg, var(--gold), transparent);
          border-radius: 1px;
          transform-origin: top;
        }

        .scroll-label-premium {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gray-light);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.8;
          transition: var(--transition);
        }

        .scroll-link-premium:hover .scroll-label-premium {
          color: var(--gold-light);
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            padding: 4rem 2rem;
          }
          
          .content-container {
            gap: 3rem;
          }
          
          .nations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .premium-button {
            padding: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 3rem 1.5rem;
          }
          
          .title-line {
            font-size: clamp(2.5rem, 6vw, 4rem);
          }
          
          .nations-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
            margin: 0 auto;
          }
          
          .badge-content {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
            padding: 1.5rem;
          }
          
          .badge-divider {
            width: 100px;
            height: 1px;
          }
          
          .premium-button {
            padding: 1.5rem;
          }
          
          .button-main {
            flex-direction: column;
            gap: 1rem;
          }
          
          .button-text {
            font-size: 1rem;
            text-align: center;
          }
          
          .cta-stats {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          
          .stat-divider {
            width: 100px;
            height: 1px;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 2rem 1rem;
          }
          
          .content-container {
            gap: 2rem;
          }
          
          .highlight-item {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .title-underline {
            width: 200px;
          }
        }

        /* Support pour les navigateurs sans backdrop-filter */
        @supports not (backdrop-filter: blur(20px)) {
          .badge-content,
          .nation-card,
          .highlight-item,
          .premium-button,
          .cta-stats {
            background: rgba(10, 10, 10, 0.9);
          }
        }

        /* Prévention des problèmes de performance */
        .hero-section * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Correction pour les guillemets */
        .nation-name {
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
};

export default Hero;