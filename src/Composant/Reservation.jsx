import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, Send, Shield, Truck, Clock,
  Loader2, User, Phone, MapPin, Flag, Shirt,
  Package, MessageSquare, ChevronDown
} from "lucide-react";

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    country: "",
    jerseyType: "",
    size: "",
    quantity: "1",
    message: ""
  });

  // Options pour les maillots selon le pays
  const jerseyOptions = {
    "cote-divoire": [{ value: "orange", label: "🧡 Modèle Orange" }],
    mali: [
      { value: "vert", label: "💚 Modèle Vert" },
      { value: "blanc", label: "🤍 Modèle Blanc" },
    ],
    senegal: [
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
    if (!formData.fullName || !formData.phone || !formData.address || !formData.country || 
        !formData.jerseyType || !formData.size || !formData.quantity) {
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
    <section id="reservation" className="py-16 md:py-24 relative overflow-hidden" style={{
      background: 'var(--color-gray-900)',
      color: 'var(--color-white)'
    }}>
      {/* Décorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-var(--color-accent)/50 to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-var(--color-accent)/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-var(--color-primary)/10 rounded-full blur-3xl" />
      
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Côté gauche - Informations */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-var(--color-accent)/20 text-var(--color-accent) font-bold text-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-var(--color-accent) rounded-full" />
              RÉSERVATION EXPRESS
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Réservez en
              <br />
              <span style={{ color: 'var(--color-accent)' }}>2 minutes</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-md">
              Remplissez le formulaire ci-contre et recevez votre maillot 
              avant le grand événement. Livraison garantie !
            </p>

            {/* Caractéristiques */}
            <div className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-var(--color-accent)/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Badges de confiance */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {["🇨🇮", "🇲🇱", "🇸🇳"].map((flag, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/10 border-2 border-gray-800 flex items-center justify-center text-xl"
                  >
                    {flag}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
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
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10" style={{ color: 'var(--color-success)' }} />
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    C'est confirmé ! 🎉
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Vous recevrez un SMS de confirmation sous 24h.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom complet */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        <User size={16} className="inline mr-2" />
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ex: Kouamé Jean"
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+225 07 XX XX XX XX"
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      <MapPin size={16} className="inline mr-2" />
                      Adresse de livraison *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Quartier, rue, repère..."
                      className="w-full h-24 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pays */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        <Flag size={16} className="inline mr-2" />
                        Équipe *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          handleInputChange(e);
                          setFormData(prev => ({ ...prev, jerseyType: "" }));
                        }}
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent appearance-none pr-10"
                        required
                      >
                        <option value="">Choisir une équipe</option>
                        <option value="cote-divoire">🇨🇮 Côte d'Ivoire</option>
                        <option value="mali">🇲🇱 Mali</option>
                        <option value="senegal">🇸🇳 Sénégal</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>

                    {/* Type de maillot */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        <Shirt size={16} className="inline mr-2" />
                        Modèle *
                      </label>
                      <select
                        name="jerseyType"
                        value={formData.jerseyType}
                        onChange={handleInputChange}
                        disabled={!formData.country}
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent appearance-none pr-10 disabled:opacity-50"
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

                  <div className="grid grid-cols-2 gap-4">
                    {/* Taille */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        Taille *
                      </label>
                      <select
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent appearance-none pr-10"
                        required
                      >
                        <option value="">Taille</option>
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    {/* Quantité */}
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">
                        <Package size={16} className="inline mr-2" />
                        Quantité *
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent appearance-none pr-10"
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
                    <label className="block text-gray-900 font-semibold mb-2">
                      <MessageSquare size={16} className="inline mr-2" />
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Instructions spéciales..."
                      className="w-full h-20 px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-var(--color-accent) focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Bouton de soumission */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
                      color: 'var(--color-white)'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
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
    </section>
  );
};

export default ReservationForm;