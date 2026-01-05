import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ShoppingCart, Star, Truck, Shield, Check, Heart, 
  MapPin, User, Phone, Mail, CreditCard,
  Package, Users, Ruler, ChevronRight, Info, 
  DollarSign, Gift, Award, Globe,
  CheckCircle, ShoppingBag, Home,
  Clock, Map, Smartphone,
  Facebook, Instagram, Twitter,
  PhoneCall, MessageSquare,
  ArrowRight, Filter,
  Grid, List, Plus, Minus,
  Search, Menu, Eye, TrendingUp,
  Headphones, Zap, RefreshCw, Lock,
  Flame, Tag, Percent, Calendar,
  AlertCircle, Loader2, ExternalLink
} from "lucide-react";

const FootballJerseysShop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerData, setCustomerData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: "cash"
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showCartPanel, setShowCartPanel] = useState(false);
  
  // États pour les notifications
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL de l'API
  const API_URL = "https://backend-foot-omega.vercel.app/api/commande";

  // Prix et promotion
  const DELIVERY_FEE = 29;
  const PROMOTION_END_DATE = new Date("2025-12-22");
  const currentDate = new Date();
  const isPromotionActive = currentDate <= PROMOTION_END_DATE;
  const NORMAL_PRICE = 180;
  const PROMOTION_PRICE = 150;
  
  const getProductPrice = () => {
    return isPromotionActive ? PROMOTION_PRICE : NORMAL_PRICE;
  };

  // Villes du Maroc
  const citiesMorocco = [
    "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
    "Meknès", "Agadir", "Oujda", "Kenitra", "Tétouan",
    "Safi", "Mohammedia", "El Jadida", "Nador", "Settat",
    "Béni Mellal", "Khémisset", "Larache", "Khouribga", "Autre"
  ];

  // Données des produits
  const products = [
    {
      id: 1,
      country: "Côte d'Ivoire",
      name: "Édition Or 2024",
      mainColor: "orange",
      highlightColor: "#FF6B00",
      flag: "🇨🇮",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      shortDesc: "Maillot officiel domicile des Éléphants de Côte d'Ivoire.",
      highlights: [
        "Technologie Dri-FIT ADVANCE™",
        "Logo brodé premium",
        "Tissu respirant 4-way stretch"
      ],
      availableSizes: ["S", "M", "L", "XL"],
      inventory: 15,
      rating: 4.8,
      reviewCount: 142,
      labels: ["Nouveau", "Bestseller"],
      shippingTime: "24-48h"
    },
    {
      id: 2,
      country: "Mali",
      name: "Édition Émeraude",
      mainColor: "green",
      highlightColor: "#14532D",
      flag: "🇲🇱",
      image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=400&fit=crop",
      shortDesc: "Maillot domicile officiel des Aigles du Mali.",
      highlights: [
        "Tissu Climacool®",
        "Écusson brodé premium",
        "Manches ergonomiques"
      ],
      availableSizes: ["S", "M", "L", "XL"],
      inventory: 8,
      rating: 4.6,
      reviewCount: 89,
      labels: ["Exclusif"],
      shippingTime: "48-72h"
    },
    {
      id: 3,
      country: "Mali",
      name: "Édition Blanche",
      mainColor: "white",
      highlightColor: "#FFFFFF",
      flag: "🇲🇱",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w-400&h=400&fit=crop",
      shortDesc: "Maillot extérieur officiel des Aigles du Mali.",
      highlights: [
        "Tissu micro-mesh",
        "Logo métallique",
        "Col V premium"
      ],
      availableSizes: ["S", "M", "L", "XL"],
      inventory: 12,
      rating: 4.7,
      reviewCount: 67,
      labels: ["Populaire"],
      shippingTime: "24-48h"
    },
    {
      id: 4,
      country: "Sénégal",
      name: "Édition Lions",
      mainColor: "green",
      highlightColor: "#14532D",
      flag: "🇸🇳",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      shortDesc: "Maillot officiel domicile des Lions de la Teranga.",
      highlights: [
        "Technologie AeroSwift",
        "Écusson 3D",
        "Tissu stretch 360°"
      ],
      availableSizes: ["S", "M", "L", "XL"],
      inventory: 10,
      rating: 4.9,
      reviewCount: 203,
      labels: ["Bestseller", "Signature"],
      shippingTime: "24-48h"
    },
    {
      id: 5,
      country: "Sénégal",
      name: "Édition Blanche Premium",
      mainColor: "white",
      highlightColor: "#FFFFFF",
      flag: "🇸🇳",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=400&fit=crop",
      shortDesc: "Maillot extérieur officiel des Lions de la Teranga.",
      highlights: [
        "Tissu carbon pro",
        "Logo diamant",
        "Col rond premium"
      ],
      availableSizes: ["S", "M", "L", "XL", "XXL"],
      inventory: 18,
      rating: 4.8,
      reviewCount: 156,
      labels: ["Premium"],
      shippingTime: "24-48h"
    }
  ];

  // Ajouter le prix aux produits
  const productsWithPrice = products.map(product => ({
    ...product,
    priceMAD: getProductPrice()
  }));

  // Formater le prix
  const formatPrice = (priceMAD) => {
    return `${priceMAD} DH`;
  };

  // Calculer le total
  const calculateTotal = () => {
    if (!selectedProduct) return { subtotal: 0, delivery: DELIVERY_FEE, total: DELIVERY_FEE };
    
    const subtotal = selectedProduct.priceMAD * quantity;
    const total = subtotal + DELIVERY_FEE;
    
    return {
      subtotal: subtotal,
      delivery: DELIVERY_FEE,
      total: total,
      formatted: {
        subtotal: `${subtotal} DH`,
        delivery: `${DELIVERY_FEE} DH`,
        total: `${total} DH`
      }
    };
  };

  // Calculer les jours restants pour la promotion
  const getDaysRemaining = () => {
    const diffTime = PROMOTION_END_DATE - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Afficher une notification
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
    
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 5000);
  };

  // Valider les données du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^0[5-7][0-9]{8}$/.test(customerData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Numéro de téléphone invalide (ex: 0612345678)";
    }
    
    if (customerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!customerData.city) {
      newErrors.city = "La ville est requise";
    }
    
    if (!customerData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la sélection d'un produit
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize(null);
    setQuantity(1);
    setShowProductModal(true);
  };

  // Ouvrir le formulaire de commande
  const handleOpenOrderForm = () => {
    if (!selectedProduct || !selectedSize) {
      showNotification("Veuillez sélectionner une taille", "error");
      return;
    }
    setShowProductModal(false);
    setShowOrderForm(true);
  };

  // Basculer favori
  const toggleFavorite = (productId) => {
    setFavoriteItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Soumettre la commande à l'API
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const orderData = {
        nom_complet: customerData.fullName.trim(),
        telephone: customerData.phone.trim(),
        email: customerData.email.trim() || null,
        ville: customerData.city,
        adresse_complete: customerData.address.trim(),
        produit_id: selectedProduct.id,
        nom_produit: `${selectedProduct.country} - ${selectedProduct.name}`,
        prix_unitaire: selectedProduct.priceMAD,
        quantite: quantity,
        taille: selectedSize,
        sous_total: calculateTotal().subtotal,
        frais_livraison: DELIVERY_FEE,
        total: calculateTotal().total,
        statut: "en_attente",
        methode_paiement: customerData.paymentMethod === "cash" ? "livraison" : "virement",
        promotion_appliquee: isPromotionActive,
        montant_promotion: isPromotionActive ? (NORMAL_PRICE - PROMOTION_PRICE) * quantity : 0,
        prix_original: isPromotionActive ? NORMAL_PRICE : selectedProduct.priceMAD,
        notes: customerData.notes.trim() || null
      };
      
      console.log("Envoi de la commande:", orderData);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi de la commande");
      }
      
      if (data.success) {
        setOrderNumber(data.data.numero_commande);
        setIsSubmitting(false);
        setOrderConfirmed(true);
        
        showNotification("Commande confirmée avec succès !", "success");
        
        // Réinitialiser après 8 secondes
        setTimeout(() => {
          setOrderConfirmed(false);
          setShowOrderForm(false);
          setSelectedProduct(null);
          setSelectedSize(null);
          setQuantity(1);
          setCustomerData({
            fullName: "",
            phone: "",
            email: "",
            city: "",
            address: "",
            notes: "",
            paymentMethod: "cash"
          });
          setErrors({});
        }, 8000);
      } else {
        throw new Error(data.message);
      }
      
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
      setIsSubmitting(false);
      showNotification(error.message || "Erreur lors de l'envoi de la commande", "error");
    }
  };

  // Filtrer les produits
  const filteredProducts = productsWithPrice.filter(product => {
    if (activeCategory === "all") return true;
    if (activeCategory === "coteivoire") return product.country === "Côte d'Ivoire";
    if (activeCategory === "mali") return product.country === "Mali";
    if (activeCategory === "senegal") return product.country === "Sénégal";
    if (activeCategory === "new") return product.labels.includes("Nouveau");
    if (activeCategory === "bestseller") return product.labels.includes("Bestseller");
    return true;
  });

  // Composant de notification
  const Notification = () => {
    if (!notification.show) return null;
    
    const bgColor = notification.type === "success" ? "bg-green-100 border-green-400 text-green-700" :
                    notification.type === "error" ? "bg-red-100 border-red-400 text-red-700" :
                    "bg-blue-100 border-blue-400 text-blue-700";
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} shadow-lg max-w-md`}
      >
        <div className="flex items-center gap-3">
          {notification.type === "success" ? (
            <CheckCircle className="text-green-600" size={24} />
          ) : notification.type === "error" ? (
            <AlertCircle className="text-red-600" size={24} />
          ) : (
            <Info className="text-blue-600" size={24} />
          )}
          <div className="flex-1">
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification({ show: false, message: "", type: "success" })}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    );
  };

  // Styles CSS
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
      color: #111827;
      overflow-x: hidden;
    }

    .page-container {
      width: 100%;
      min-height: 100vh;
      position: relative;
    }

    /* Header */
    .main-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 0;
      width: 100%;
    }

    .header-wrapper {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #000000;
    }

    .logo-symbol {
      width: 40px;
      height: 40px;
      background: #000000;
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
    }

    .logo-highlight {
      color: #F59E0B;
    }

    .search-container {
      position: relative;
      display: none;
    }

    @media (min-width: 768px) {
      .search-container {
        display: block;
      }
    }

    .search-field {
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 2px solid #d1d5db;
      border-radius: 12px;
      width: 300px;
      font-size: 0.875rem;
      background: white;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .header-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .icon-button {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
      border: none;
      border-radius: 12px;
      color: #374151;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .icon-button:hover {
      background: #e5e7eb;
      color: #111827;
    }

    .badge-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #F59E0B;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Bannière promotion */
    .promotion-banner {
      background: linear-gradient(135deg, #EF4444, #DC2626);
      color: white;
      border-radius: 24px;
      padding: 1.5rem;
      margin: 1rem 1rem 2rem 1rem;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      border: 2px solid #EF4444;
    }

    .promotion-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      position: relative;
      z-index: 2;
    }

    .promotion-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
      font-weight: 800;
    }

    .promotion-text {
      flex: 1;
      min-width: 200px;
    }

    .promotion-countdown {
      background: rgba(255, 255, 255, 0.15);
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .promotion-badge {
      position: absolute;
      top: -10px;
      right: 20px;
      background: white;
      color: #EF4444;
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 800;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 3;
      transform: rotate(5deg);
      animation: pulse 2s infinite;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @keyframes pulse {
      0%, 100% { transform: rotate(5deg) scale(1); }
      50% { transform: rotate(5deg) scale(1.05); }
    }

    /* Bannière hero */
    .hero-banner {
      width: calc(100% - 2rem);
      background: linear-gradient(135deg, #000000, #1a1a1a);
      color: white;
      border-radius: 32px;
      padding: 3rem 2rem;
      margin: 0 1rem 2rem 1rem;
      position: relative;
      overflow: hidden;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 600px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1rem;
    }

    .hero-description {
      font-size: 1.125rem;
      color: #d1d5db;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    /* Section principale */
    .main-content {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-heading {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      line-height: 1.1;
      color: #111827;
      margin-bottom: 1rem;
    }

    /* Filtres */
    .filters-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .filter-tab {
      padding: 0.75rem 1.5rem;
      border: 2px solid #d1d5db;
      background: white;
      color: #374151;
      font-weight: 600;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-tab:hover {
      border-color: #9ca3af;
      background: #f9fafb;
    }

    .filter-tab.active {
      background: #000000;
      color: white;
      border-color: #000000;
    }

    /* Grille de produits */
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
      width: 100%;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Carte produit */
    .product-card {
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 2px solid #e5e7eb;
      transition: all 0.3s ease;
      position: relative;
      width: 100%;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      border-color: #F59E0B;
    }

    .product-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: #F59E0B;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 8px;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .product-badge.promo-badge {
      background: #EF4444;
      left: auto;
      right: 1rem;
      animation: pulse 2s infinite;
    }

    .favorite-toggle {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      background: white;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .favorite-toggle:hover {
      background: #f3f4f6;
      transform: scale(1.1);
    }

    .favorite-toggle.active {
      background: #ef4444;
      color: white;
    }

    .product-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
      width: 100%;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .product-card:hover .product-image {
      transform: scale(1.05);
    }

    .product-details {
      padding: 1.5rem;
      width: 100%;
    }

    .product-name {
      color: #4b5563;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .price-mad {
      font-size: 1.5rem;
      font-weight: 800;
      color: #111827;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
      width: 100%;
    }

    .primary-action {
      flex: 1;
      padding: 0.875rem;
      background: #000000;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .primary-action:hover {
      background: #1a1a1a;
      transform: translateY(-2px);
    }

    .primary-action.promo-action {
      background: linear-gradient(135deg, #EF4444, #DC2626);
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      width: 100vw;
      height: 100vh;
    }

    .modal-container {
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      background: white;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: #111827;
      color: white;
    }

    .modal-body {
      padding: 2rem;
      overflow-y: auto;
      max-height: 70vh;
    }

    .close-button {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }

    /* Formulaire */
    .form-group {
      margin-bottom: 1.5rem;
      width: 100%;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #d1d5db;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #F59E0B;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    }

    .error {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .submit-button {
      width: 100%;
      padding: 1.25rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.125rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Succès */
    .success-container {
      text-align: center;
      padding: 4rem 2rem;
    }

    .success-icon {
      width: 80px;
      height: 80px;
      background: #10b981;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
    }

    .success-title {
      font-size: 2rem;
      font-weight: 800;
      color: #111827;
      margin-bottom: 1rem;
    }

    .order-number-display {
      background: #f3f4f6;
      border: 2px solid #d1d5db;
      border-radius: 12px;
      padding: 1.5rem;
      margin: 2rem 0;
      font-family: monospace;
      font-size: 1.5rem;
      font-weight: 800;
      color: #000000;
      letter-spacing: 1px;
    }

    /* Avantages */
    .advantages-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
      padding: 2rem;
      background: white;
      border-radius: 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      width: 100%;
    }

    .advantage-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
      background: #f9fafb;
      border-radius: 20px;
      transition: all 0.3s ease;
    }

    .advantage-card:hover {
      transform: translateY(-5px);
      background: white;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    /* Menu mobile */
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 1001;
      padding: 2rem;
      overflow-y: auto;
    }

    .mobile-menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    /* Loader */
    .loader {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-banner {
        padding: 2rem 1rem;
        margin: 0 1rem 1rem 1rem;
      }
      
      .promotion-banner {
        margin: 1rem;
        padding: 1rem;
      }
      
      .filters-row {
        flex-direction: column;
      }
      
      .modal-header {
        padding: 1rem;
      }
      
      .modal-body {
        padding: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      {/* Notification */}
      <Notification />
      
      <div className="page-container">
        {/* Header */}
        <header className="main-header">
          <div className="header-wrapper">
            <div className="brand-logo">
              <div className="logo-symbol">
                <ShoppingBag size={24} />
              </div>
              <div className="logo-text">
                Maillots<span className="logo-highlight">Pro</span>
              </div>
            </div>
            
            <div className="header-buttons">
              <button 
                className="icon-button"
                onClick={() => toggleFavorite(selectedProduct?.id)}
              >
                <Heart size={20} />
                {favoriteItems.length > 0 && (
                  <span className="badge-count">{favoriteItems.length}</span>
                )}
              </button>
              
              <button 
                className="icon-button menu-toggle"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Bannière promotion */}
        {isPromotionActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="promotion-banner"
          >
            <div className="promotion-badge">
              <Flame size={12} /> PROMO
            </div>
            <div className="promotion-content">
              <div className="promotion-text">
                <h3 className="promotion-title">
                  <Percent size={24} />
                  PROMOTION SPÉCIALE
                </h3>
                <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
                  <strong>150 DH</strong> au lieu de <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.8)' }}>180 DH</span> par maillot
                  <br />
                  Offre valable jusqu'au 22 décembre 2025
                </p>
              </div>
              <div className="promotion-countdown">
                <div className="countdown-timer">
                  <Calendar size={20} />
                  <span>Il reste {getDaysRemaining()} jours</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bannière Hero */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">
              Maillots Officiels Africains
              <br />
              <span style={{ color: '#F59E0B' }}>
                {isPromotionActive ? 'À partir de 150 DH' : 'À partir de 180 DH'}
              </span>
            </h1>
            <p className="hero-description">
              Commandez votre maillot préféré des équipes nationales.
              Livraison express dans toutes les villes du Maroc.
              {isPromotionActive && (
                <div style={{ 
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)', 
                  color: 'white', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '12px',
                  marginTop: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Tag size={16} />
                  PROMOTION EN COURS : 150 DH le maillot
                </div>
              )}
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="main-content">
          {/* En-tête section */}
          <div className="section-header">
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: '#000000',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '700',
              borderRadius: '32px',
              marginBottom: '1.5rem'
            }}>
              <Award size={20} />
              {isPromotionActive ? 'PROMOTION 2024' : 'COLLECTION 2024'}
            </div>
            
            <h2 className="section-heading">
              Nos Maillots Officiels
            </h2>
            
            <p style={{ 
              fontSize: '1.125rem',
              color: '#4b5563',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {isPromotionActive 
                ? "Profitez de notre promotion spéciale ! Tous les maillots à 150 DH jusqu'au 22 décembre 2025."
                : "Choisissez parmi notre collection exclusive. Tous les maillots à 180 DH."
              }
            </p>
          </div>

          {/* Filtres */}
          <div className="filters-row">
            <button 
              className={`filter-tab ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              Tous
            </button>
            
            <button 
              className={`filter-tab ${activeCategory === "coteivoire" ? "active" : ""}`}
              onClick={() => setActiveCategory("coteivoire")}
            >
              Côte d'Ivoire
            </button>
            
            <button 
              className={`filter-tab ${activeCategory === "mali" ? "active" : ""}`}
              onClick={() => setActiveCategory("mali")}
            >
              Mali
            </button>
            
            <button 
              className={`filter-tab ${activeCategory === "senegal" ? "active" : ""}`}
              onClick={() => setActiveCategory("senegal")}
            >
              Sénégal
            </button>
          </div>

          {/* Grille de produits */}
          <div className="products-grid">
            {filteredProducts.map(product => {
              const isFav = favoriteItems.includes(product.id);
              
              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.labels.includes("Nouveau") && (
                    <div className="product-badge">NOUVEAU</div>
                  )}
                  
                  {isPromotionActive && (
                    <div className="product-badge promo-badge">
                      <Tag size={12} /> PROMO
                    </div>
                  )}
                  
                  <button 
                    className={`favorite-toggle ${isFav ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                  </button>
                  
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={`${product.country} - ${product.name}`}
                      className="product-image"
                    />
                  </div>
                  
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <span className="price-mad">
                        {formatPrice(product.priceMAD)}
                      </span>
                      {isPromotionActive && (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.75rem',
                          marginTop: '0.25rem'
                        }}>
                          <span style={{ textDecoration: 'line-through', color: '#6b7280', fontSize: '0.875rem' }}>
                            180 DH
                          </span>
                          <span style={{ 
                            background: '#FEE2E2',
                            color: '#EF4444',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            border: '1px solid #EF4444'
                          }}>
                            Économisez 30 DH
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="action-buttons">
                      <button 
                        className={`primary-action ${isPromotionActive ? 'promo-action' : ''}`}
                        onClick={() => handleSelectProduct(product)}
                      >
                        <ShoppingCart size={18} />
                        {isPromotionActive ? "Profiter de l'offre" : "Voir détails"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Section avantages */}
          <div className="advantages-section">
            <motion.div 
              className="advantage-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="advantage-icon">
                <Truck size={24} />
              </div>
              <h3 className="advantage-title">Livraison Rapide</h3>
              <p className="advantage-description">
                Livraison en 24-48h dans toutes les villes du Maroc.
                Suivi en temps réel.
              </p>
            </motion.div>
            
            <motion.div 
              className="advantage-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="advantage-icon">
                <Shield size={24} />
              </div>
              <h3 className="advantage-title">100% Authentique</h3>
              <p className="advantage-description">
                Maillots officiels certifiés. 
                Garantie de qualité et d'authenticité.
              </p>
            </motion.div>
            
            <motion.div 
              className="advantage-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="advantage-icon">
                <Headphones size={24} />
              </div>
              <h3 className="advantage-title">Support Client</h3>
              <p className="advantage-description">
                Notre équipe est disponible 7j/7 pour vous accompagner.
              </p>
            </motion.div>
            
            <motion.div 
              className="advantage-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="advantage-icon">
                <RefreshCw size={24} />
              </div>
              <h3 className="advantage-title">Retour Facile</h3>
              <p className="advantage-description">
                Retour gratuit sous 14 jours si le produit ne vous convient pas.
              </p>
            </motion.div>
          </div>
        </main>

        {/* Modal détail produit */}
        <AnimatePresence>
          {showProductModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="modal-container"
              >
                <div className="modal-header">
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Configuration de votre commande</h2>
                    <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {isPromotionActive 
                        ? "Profitez de notre promotion spéciale !" 
                        : "Sélectionnez la taille et la quantité"}
                    </p>
                  </div>
                  <button 
                    className="close-button"
                    onClick={() => setShowProductModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="modal-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                      {isPromotionActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          style={{
                            background: '#FEE2E2',
                            border: '2px solid #EF4444',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                          }}
                        >
                          <Flame size={20} color="#EF4444" />
                          <div>
                            <strong style={{ color: '#EF4444' }}>
                              PROMOTION EN COURS
                            </strong>
                            <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#DC2626' }}>
                              Prix spécial : 150 DH au lieu de 180 DH
                            </p>
                          </div>
                        </motion.div>
                      )}
                      
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.country}
                        style={{ 
                          width: '100%',
                          height: '350px',
                          objectFit: 'cover',
                          borderRadius: '20px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#111827' }}>
                          {selectedProduct.country} - {selectedProduct.name}
                        </h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          {formatPrice(selectedProduct.priceMAD)}
                          {isPromotionActive && (
                            <span style={{ fontSize: '1.5rem', color: '#6b7280', textDecoration: 'line-through' }}>
                              180 DH
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <Star size={18} fill="#F59E0B" color="#F59E0B" />
                          <span>{selectedProduct.rating} ({selectedProduct.reviewCount} avis)</span>
                          <span style={{ margin: '0 0.5rem' }}>•</span>
                          <Clock size={18} />
                          <span>Livraison: {selectedProduct.shippingTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {/* Sélection taille */}
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <h3 style={{ color: '#111827' }}>Choisissez votre taille</h3>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
                          {selectedProduct.availableSizes.map(size => (
                            <motion.button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{ 
                                padding: '1.25rem 1rem',
                                background: selectedSize === size ? '#F59E0B' : '#f3f4f6',
                                border: `2px solid ${selectedSize === size ? '#F59E0B' : '#d1d5db'}`,
                                borderRadius: '12px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                color: selectedSize === size ? 'white' : '#374151',
                                fontSize: '1.125rem',
                                fontWeight: '800'
                              }}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Sélection quantité */}
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#111827', marginBottom: '1rem' }}>Quantité</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <motion.button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ 
                              width: '48px',
                              height: '48px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f3f4f6',
                              border: '2px solid #d1d5db',
                              borderRadius: '12px',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <Minus size={20} />
                          </motion.button>
                          <span style={{ minWidth: '60px', textAlign: 'center', fontSize: '1.5rem', fontWeight: '800', color: '#111827' }}>
                            {quantity}
                          </span>
                          <motion.button 
                            onClick={() => setQuantity(Math.min(selectedProduct.inventory, quantity + 1))}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ 
                              width: '48px',
                              height: '48px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f3f4f6',
                              border: '2px solid #d1d5db',
                              borderRadius: '12px',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={20} />
                          </motion.button>
                          <div style={{ 
                            marginLeft: 'auto',
                            padding: '0.75rem 1rem',
                            background: '#f3f4f6',
                            borderRadius: '12px',
                            color: '#374151',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <Package size={14} />
                            Stock: {selectedProduct.inventory} unités
                          </div>
                        </div>
                      </div>

                      {/* Récapitulatif */}
                      <div style={{ 
                        background: 'white',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '2px solid #e5e7eb'
                      }}>
                        <h3 style={{ color: '#111827', marginBottom: '1rem' }}>
                          Récapitulatif de commande
                        </h3>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                          <span>Prix unitaire:</span>
                          <span>{formatPrice(selectedProduct.priceMAD)}</span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                          <span>Sous-total ({quantity} × {selectedProduct.priceMAD} DH):</span>
                          <span>{calculateTotal().formatted.subtotal}</span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
                          <span>Livraison:</span>
                          <span>{calculateTotal().formatted.delivery}</span>
                        </div>
                        
                        {isPromotionActive && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', color: '#EF4444', fontWeight: '600' }}>
                            <span>Économie réalisée:</span>
                            <span>{(NORMAL_PRICE - PROMOTION_PRICE) * quantity} DH</span>
                          </div>
                        )}
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>
                          <span>Total à payer:</span>
                          <span>{calculateTotal().formatted.total}</span>
                        </div>
                        
                        <motion.button 
                          onClick={handleOpenOrderForm}
                          disabled={!selectedSize}
                          whileHover={{ scale: selectedSize ? 1.02 : 1 }}
                          whileTap={{ scale: selectedSize ? 0.98 : 1 }}
                          style={{ 
                            width: '100%',
                            padding: '1rem',
                            background: selectedSize ? (isPromotionActive ? 'linear-gradient(135deg, #EF4444, #DC2626)' : '#000000') : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: selectedSize ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            marginTop: '1rem'
                          }}
                        >
                          <CreditCard size={20} />
                          {selectedSize 
                            ? isPromotionActive 
                              ? "Profiter de l'offre" 
                              : "Passer la commande"
                            : "Choisissez une taille"}
                          <ArrowRight size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal formulaire de commande */}
        <AnimatePresence>
          {showOrderForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="modal-container"
              >
                {orderConfirmed ? (
                  <div className="success-container">
                    <div className="success-icon">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="success-title">Commande confirmée !</h3>
                    <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.6' }}>
                      Votre commande a été enregistrée avec succès. 
                      <br />
                      Notre équipe vous contactera sous 24h pour confirmer la livraison.
                    </p>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{ fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                        Votre numéro de commande :
                      </h4>
                      <div className="order-number-display">
                        {orderNumber}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                        <Clock size={16} />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Conservez ce numéro pour tout suivi</span>
                      </div>
                    </div>
                    
                    {isPromotionActive && (
                      <motion.p 
                        style={{ 
                          color: '#EF4444', 
                          fontWeight: '600',
                          marginTop: '1rem'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        ✅ Vous avez bénéficié de notre promotion spéciale !
                      </motion.p>
                    )}
                    
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.875rem',
                      marginTop: '2rem'
                    }}>
                      La fenêtre se fermera automatiquement dans quelques secondes...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="modal-header">
                      <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Informations de livraison</h2>
                      <button 
                        className="close-button"
                        onClick={() => setShowOrderForm(false)}
                        disabled={isSubmitting}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="modal-body">
                      {/* Récap commande */}
                      <motion.div 
                        style={{ 
                          background: '#f9fafb',
                          borderRadius: '12px',
                          padding: '1.5rem',
                          marginBottom: '2rem'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <img 
                            src={selectedProduct?.image} 
                            alt={selectedProduct?.country}
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              borderRadius: '12px',
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <h4 style={{ fontWeight: '700', color: '#111827' }}>
                              {selectedProduct?.country} - {selectedProduct?.name}
                            </h4>
                            <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>
                              Taille: {selectedSize} • Quantité: {quantity}
                            </p>
                            <p style={{ 
                              color: '#374151', 
                              fontWeight: '700',
                              marginTop: '0.25rem'
                            }}>
                              {formatPrice(selectedProduct?.priceMAD)} par maillot
                            </p>
                          </div>
                        </div>
                        {isPromotionActive && (
                          <motion.div 
                            style={{ 
                              background: '#FEE2E2',
                              border: '1px solid #EF4444',
                              borderRadius: '8px',
                              padding: '0.75rem',
                              marginBottom: '0.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            <Tag size={16} color="#EF4444" />
                            <span style={{ fontSize: '0.875rem', color: '#EF4444' }}>
                              Promotion appliquée : -30 DH par maillot
                            </span>
                          </motion.div>
                        )}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontWeight: '700',
                          color: '#111827'
                        }}>
                          <span>Total:</span>
                          <span>{calculateTotal().formatted.total}</span>
                        </div>
                      </motion.div>
                      
                      <form onSubmit={handleSubmitOrder}>
                        <div className="form-group">
                          <label className="form-label">
                            <User size={16} />
                            Nom complet
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={customerData.fullName}
                            onChange={handleInputChange}
                            className={`form-input ${errors.fullName ? 'border-red-500' : ''}`}
                            placeholder="Votre nom et prénom"
                            required
                          />
                          {errors.fullName && (
                            <div className="error">
                              <AlertCircle size={14} />
                              {errors.fullName}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            <Phone size={16} />
                            Numéro de téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={customerData.phone}
                            onChange={handleInputChange}
                            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="06 12 34 56 78"
                            required
                          />
                          {errors.phone && (
                            <div className="error">
                              <AlertCircle size={14} />
                              {errors.phone}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            <Mail size={16} />
                            Adresse email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={customerData.email}
                            onChange={handleInputChange}
                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="votre@email.com"
                          />
                          {errors.email && (
                            <div className="error">
                              <AlertCircle size={14} />
                              {errors.email}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            <MapPin size={16} />
                            Ville
                          </label>
                          <select
                            name="city"
                            value={customerData.city}
                            onChange={handleInputChange}
                            className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                            required
                          >
                            <option value="">Sélectionnez votre ville</option>
                            {citiesMorocco.map(city => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          {errors.city && (
                            <div className="error">
                              <AlertCircle size={14} />
                              {errors.city}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            <Home size={16} />
                            Adresse complète
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={customerData.address}
                            onChange={handleInputChange}
                            className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                            placeholder="Adresse, quartier, bâtiment, étage..."
                            required
                          />
                          {errors.address && (
                            <div className="error">
                              <AlertCircle size={14} />
                              {errors.address}
                            </div>
                          )}
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            Méthode de paiement
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                            <label style={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '1rem',
                              border: `2px solid ${customerData.paymentMethod === "cash" ? '#F59E0B' : '#d1d5db'}`,
                              borderRadius: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: customerData.paymentMethod === "cash" ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                            }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={customerData.paymentMethod === "cash"}
                                onChange={handleInputChange}
                                style={{ display: 'none' }}
                              />
                              <DollarSign size={20} />
                              <div>
                                <div style={{ fontWeight: '600' }}>Paiement à la livraison</div>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                  Espèces
                                </div>
                              </div>
                            </label>
                            
                            <label style={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '1rem',
                              border: `2px solid ${customerData.paymentMethod === "transfer" ? '#F59E0B' : '#d1d5db'}`,
                              borderRadius: '12px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              background: customerData.paymentMethod === "transfer" ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                            }}>
                              <input
                                type="radio"
                                name="paymentMethod"
                                value="transfer"
                                checked={customerData.paymentMethod === "transfer"}
                                onChange={handleInputChange}
                                style={{ display: 'none' }}
                              />
                              <CreditCard size={20} />
                              <div>
                                <div style={{ fontWeight: '600' }}>Virement bancaire</div>
                                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                  CIH, Attijariwafa
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            <Info size={16} />
                            Notes supplémentaires (optionnel)
                          </label>
                          <textarea
                            name="notes"
                            value={customerData.notes}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Informations supplémentaires pour la livraison, préférences horaires..."
                            style={{ minHeight: '100px', resize: 'vertical' }}
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          className="submit-button"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="loader" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Check size={20} />
                              Confirmer la commande
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Menu mobile */}
        <AnimatePresence>
          {showMobileNav && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="mobile-menu"
            >
              <div className="mobile-menu-header">
                <div className="brand-logo">
                  <div className="logo-symbol">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="logo-text">
                    Maillots<span className="logo-highlight">Pro</span>
                  </div>
                </div>
                <button 
                  className="close-button"
                  style={{ background: '#f3f4f6', color: '#111827' }}
                  onClick={() => setShowMobileNav(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mobile-nav">
                <button style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  color: '#111827',
                  fontWeight: '600'
                }}>
                  <Home size={20} />
                  Accueil
                </button>
                
                {isPromotionActive && (
                  <button style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: '#FEE2E2',
                    border: '2px solid #EF4444',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#EF4444',
                    fontWeight: '600'
                  }}>
                    <Flame size={20} />
                    Promotion 150 DH
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FootballJerseysShop;