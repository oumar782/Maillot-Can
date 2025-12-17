import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, Loader2, Send, Shield, Truck, Clock,
  User, Phone, MapPin, Home, Flag, Shirt,
  Package, MessageSquare, Building, Navigation
} from "lucide-react";

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    quartier: "",
    city: "",
    address: "",
    country: "",
    jerseyType: "",
    size: "",
    quantity: "1",
    message: ""
  });

  // Villes du Maroc
  const citiesMorocco = [
    "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
    "Meknès", "Agadir", "Oujda", "Kenitra", "Tétouan",
    "Safi", "Mohammedia", "El Jadida", "Nador", "Settat",
    "Béni Mellal", "Khémisset", "Larache", "Khouribga", "Autre"
  ];

  // Options pour les maillots selon le pays
  const jerseyOptions = {
    "cote-divoire": [{ value: "orange", label: "🧡 Modèle Orange" }],
    "mali": [
      { value: "vert", label: "💚 Modèle Vert" },
      { value: "blanc", label: "🤍 Modèle Blanc" },
    ],
    "senegal": [
      { value: "vert", label: "💚 Modèle Vert" },
      { value: "blanc", label: "🤍 Modèle Blanc" },
    ],
  };

  const features = [
    { icon: Shield, text: "Paiement sécurisé à la livraison" },
    { icon: Truck, text: "Livraison sous 48-72h" },
    { icon: Clock, text: "Confirmation SMS sous 24h" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation simple
    const requiredFields = ['fullName', 'phone', 'quartier', 'city', 'address', 'country', 'jerseyType', 'size', 'quantity'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert("Veuillez remplir tous les champs obligatoires");
      setIsSubmitting(false);
      return;
    }

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Sauvegarder dans localStorage
    const reservation = {
      ...formData,
      id: `RES-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const existingReservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    );
    existingReservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(existingReservations));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Réinitialiser après 4 secondes
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: "",
        phone: "",
        quartier: "",
        city: "",
        address: "",
        country: "",
        jerseyType: "",
        size: "",
        quantity: "1",
        message: ""
      });
    }, 4000);
  };

  return (
    <section id="reservation" className="reservation-section" style={{
      background: 'var(--color-gray-900)',
      color: 'var(--color-white)',
      padding: '4rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Décorations */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '5rem',
        right: '2.5rem',
        width: '18rem',
        height: '18rem',
        background: 'rgba(245, 158, 11, 0.1)',
        borderRadius: '50%',
        filter: 'blur(48px)'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '2.5rem',
        width: '24rem',
        height: '24rem',
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        filter: 'blur(48px)'
      }} />

      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="reservation-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Côté gauche - Informations */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '600px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(245, 158, 11, 0.2)',
              color: 'var(--color-accent)',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              borderRadius: '9999px',
              marginBottom: '1.5rem'
            }}>
              <span style={{
                width: '0.5rem',
                height: '0.5rem',
                background: 'var(--color-accent)',
                borderRadius: '50%'
              }} />
              RÉSERVATION EXPRESS
            </div>
            
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '900',
              color: 'var(--color-white)',
              marginBottom: '1.5rem',
              lineHeight: '1.1'
            }}>
              Réservez en
              <br />
              <span style={{ color: 'var(--color-accent)' }}>2 minutes</span>
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-gray-300)',
              marginBottom: '2.5rem',
              maxWidth: '500px',
              lineHeight: '1.6'
            }}>
              Remplissez le formulaire ci-contre et recevez votre maillot 
              avant le grand événement. Livraison garantie !
            </p>

            {/* Caractéristiques */}
            <div style={{ marginBottom: '2.5rem' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '1rem',
                    background: 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <feature.icon size={20} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span style={{
                    color: 'var(--color-gray-200)',
                    fontWeight: '500'
                  }}>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Badges de confiance */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', marginRight: '-0.5rem' }}>
                {["🇨🇮", "🇲🇱", "🇸🇳"].map((flag, i) => (
                  <div
                    key={i}
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid var(--color-gray-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      marginLeft: i > 0 ? '-0.5rem' : '0'
                    }}
                  >
                    {flag}
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-gray-400)'
              }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>3 pays</span> disponibles
              </p>
            </div>
          </motion.div>

          {/* Côté droit - Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--color-white)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              padding: '2rem'
            }}>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    style={{
                      width: '5rem',
                      height: '5rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem'
                    }}
                  >
                    <CheckCircle size={40} style={{ color: 'var(--color-success)' }} />
                  </motion.div>
                  <h3 style={{
                    fontSize: '1.875rem',
                    fontWeight: '900',
                    color: 'var(--color-gray-900)',
                    marginBottom: '0.75rem'
                  }}>
                    C'est confirmé ! 🎉
                  </h3>
                  <p style={{ color: 'var(--color-gray-600)', fontSize: '1.125rem' }}>
                    Vous recevrez un SMS de confirmation sous 24h.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '1rem'
                  }}>
                    {/* Nom complet */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <User size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ex: Kouamé Jean"
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Phone size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+212 6 XX XX XX XX"
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      />
                    </div>
                  </div>

                  {/* Quartier et Ville */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Home size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Quartier *
                      </label>
                      <input
                        type="text"
                        name="quartier"
                        value={formData.quartier}
                        onChange={handleInputChange}
                        placeholder="Ex: Hay Mohammadi"
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Building size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Ville *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      >
                        <option value="">Sélectionnez votre ville</option>
                        {citiesMorocco.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Adresse détaillée */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--color-gray-900)',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Adresse détaillée *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Rue, numéro, bâtiment, étage..."
                      style={{
                        width: '100%',
                        height: '6rem',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: 'var(--color-gray-100)',
                        border: '2px solid var(--color-gray-300)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                      required
                    />
                  </div>

                  {/* Pays et Modèle */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Flag size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Équipe *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          handleInputChange(e);
                          setFormData(prev => ({ ...prev, jerseyType: "" }));
                        }}
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      >
                        <option value="">Choisir une équipe</option>
                        <option value="cote-divoire">🇨🇮 Côte d'Ivoire</option>
                        <option value="mali">🇲🇱 Mali</option>
                        <option value="senegal">🇸🇳 Sénégal</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Shirt size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Modèle *
                      </label>
                      <select
                        name="jerseyType"
                        value={formData.jerseyType}
                        onChange={handleInputChange}
                        disabled={!formData.country}
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: !formData.country ? 'var(--color-gray-200)' : 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                          appearance: 'none',
                          cursor: formData.country ? 'pointer' : 'not-allowed',
                          opacity: !formData.country ? 0.6 : 1
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      >
                        <option value="">Choisir un modèle</option>
                        {formData.country &&
                          jerseyOptions[formData.country]?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Taille et Quantité */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Navigation size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Taille *
                      </label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      >
                        <option value="">Taille</option>
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        color: 'var(--color-gray-900)',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem'
                      }}>
                        <Package size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                        Quantité *
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          height: '3rem',
                          padding: '0 1rem',
                          borderRadius: '0.75rem',
                          background: 'var(--color-gray-100)',
                          border: '2px solid var(--color-gray-300)',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'all 0.3s',
                          appearance: 'none',
                          cursor: 'pointer'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                        required
                      >
                        <option value="">Qté</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num > 1 ? "pièces" : "pièce"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message optionnel */}
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--color-gray-900)',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      <MessageSquare size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Instructions spéciales, préférences de livraison..."
                      style={{
                        width: '100%',
                        height: '5rem',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: 'var(--color-gray-100)',
                        border: '2px solid var(--color-gray-300)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s',
                        resize: 'none',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--color-gray-300)'}
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      height: '3.5rem',
                      fontSize: '1.125rem',
                      fontWeight: 'bold',
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                      color: 'var(--color-white)',
                      border: 'none',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.3s',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onMouseOver={(e) => {
                      if (!isSubmitting) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 10px 20px rgba(245, 158, 11, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Confirmer ma réservation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .reservation-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .reservation-grid > div:first-child,
          .reservation-grid > div:last-child {
            max-width: 100% !important;
          }
          
          .reservation-grid > div:last-child > div {
            padding: 1.5rem !important;
          }
          
          form > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        select:focus, input:focus, textarea:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1) !important;
        }
        
        ::placeholder {
          color: var(--color-gray-500);
        }
      `}</style>
    </section>
  );
};

export default ReservationForm;