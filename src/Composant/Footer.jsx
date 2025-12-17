import React from "react";
import { 
  Facebook, Instagram, Twitter,
  PhoneCall, Mail, MapPin,
  ShoppingBag
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <style jsx>{`
        .main-footer {
          background: var(--color-gray-900);
          color: var(--color-white);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
          width: 100%;
        }

        .footer-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-column h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a {
          color: var(--color-gray-400);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--color-white);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: var(--color-accent);
          transform: translateY(-3px);
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-gray-400);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .main-footer {
            padding: 3rem 0 1.5rem;
          }
        }
      `}</style>

      <footer className="main-footer">
        <div className="footer-wrapper">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Maillots Pro</h3>
              <p style={{ color: 'var(--color-gray-400)', lineHeight: '1.6' }}>
                Votre destination pour les maillots officiels africains.
                Livraison rapide dans tout le Maroc.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3>Liens rapides</h3>
              <ul className="footer-links">
                <li><a href="#">Accueil</a></li>
                <li><a href="#maillots">Collection</a></li>
                <li><a href="#">Nouveautés</a></li>
                <li><a href="#">Bestsellers</a></li>
                <li><a href="#">Guide des tailles</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><a href="#">Contactez-nous</a></li>
                <li><a href="#">Livraison & Retours</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Politique de confidentialité</a></li>
                <li><a href="#">Conditions générales</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PhoneCall size={16} />
                  <span>+212 6 XX XX XX XX</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} />
                  <span>contact@maillotspro.ma</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} />
                  <span>Casablanca, Maroc</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Maillots Pro. Tous droits réservés.</p>
            <p style={{ marginTop: '0.5rem' }}>
              Paiements acceptés: Espèces à la livraison • Virement bancaire
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;