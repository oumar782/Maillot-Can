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
  Headphones, Zap, RefreshCw, Lock
} from "lucide-react";

// Import des images (à remplacer par vos images réelles)
import jersey1 from "../assets/1.jpg";
import jersey2 from "../assets/1.jpg";
import jersey3 from "../assets/1.jpg";
import jersey4 from "../assets/1.jpg";
import jersey5 from "../assets/1.jpg";

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
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showCartPanel, setShowCartPanel] = useState(false);

  // Taux de conversion
  const EUR_TO_MAD = 11;
  const DELIVERY_FEE = 29; // MAD

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
      image: jersey1,
      priceEUR: 349.00,
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
      image: jersey2,
      priceEUR: 329.00,
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
      image: jersey3,
      priceEUR: 329.00,
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
      image: jersey4,
      priceEUR: 349.00,
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
      image: jersey5,
      priceEUR: 369.00,
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

  // Convertir EUR en MAD
  const convertToMAD = (euros) => {
    return (euros * EUR_TO_MAD).toFixed(2);
  };

  // Formater le prix
  const formatPrice = (priceEUR) => {
    const mad = convertToMAD(priceEUR);
    return {
      euro: `${priceEUR}€`,
      mad: `${mad} MAD`
    };
  };

  // Calculer le total
  const calculateTotal = () => {
    if (!selectedProduct) return { euro: "0.00€", mad: "0.00 MAD" };
    const subtotalEUR = selectedProduct.priceEUR * quantity;
    const totalMAD = (parseFloat(convertToMAD(subtotalEUR)) + DELIVERY_FEE).toFixed(2);
    return {
      euro: `${subtotalEUR.toFixed(2)}€`,
      mad: `${totalMAD} MAD`,
      subtotal: convertToMAD(subtotalEUR),
      delivery: DELIVERY_FEE
    };
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
      alert("Veuillez sélectionner une taille");
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
  };

  // Soumettre la commande
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);

      // Réinitialiser après 5 secondes
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
      }, 5000);
    }, 2000);
  };

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    if (activeCategory === "all") return true;
    if (activeCategory === "coteivoire") return product.country === "Côte d'Ivoire";
    if (activeCategory === "mali") return product.country === "Mali";
    if (activeCategory === "senegal") return product.country === "Sénégal";
    if (activeCategory === "new") return product.labels.includes("Nouveau");
    if (activeCategory === "bestseller") return product.labels.includes("Bestseller");
    return true;
  });

  // Styles CSS complets
  const pageStyles = `
    /* Variables globales */
    :root {
      --color-primary: #000000;
      --color-primary-light: #1a1a1a;
      --color-accent: #F59E0B;
      --color-accent-dark: #D97706;
      --color-white: #ffffff;
      --color-gray-50: #f9fafb;
      --color-gray-100: #f3f4f6;
      --color-gray-200: #e5e7eb;
      --color-gray-300: #d1d5db;
      --color-gray-400: #9ca3af;
      --color-gray-500: #6b7280;
      --color-gray-600: #4b5563;
      --color-gray-700: #374151;
      --color-gray-800: #1f2937;
      --color-gray-900: #111827;
      --color-success: #10b981;
      --color-success-dark: #059669;
      --color-error: #ef4444;
      --color-info: #3b82f6;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      --shadow-gold: 0 0 20px rgba(245, 158, 11, 0.3);
      --radius-sm: 4px;
      --radius: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 24px;
      --radius-2xl: 32px;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Reset et styles de base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      overflow-x: hidden;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background-color: var(--color-gray-50);
      color: var(--color-gray-900);
      line-height: 1.5;
    }

    /* Conteneur principal full width */
    .page-container {
      width: 100vw;
      min-height: 100vh;
      position: relative;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      background: linear-gradient(135deg, var(--color-gray-50) 0%, var(--color-white) 100%);
      overflow-x: hidden;
    }

    /* Header */
    .main-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--color-white);
      border-bottom: 1px solid var(--color-gray-200);
      padding: 1rem 0;
      width: 100%;
    }

    .header-wrapper {
      max-width: 100%;
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
      color: var(--color-primary);
    }

    .logo-symbol {
      width: 40px;
      height: 40px;
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
    }

    .logo-highlight {
      color: var(--color-accent);
    }

    .header-tools {
      display: flex;
      align-items: center;
      gap: 1rem;
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
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      width: 300px;
      font-size: 0.875rem;
      background: var(--color-white);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-gray-500);
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
      background: var(--color-gray-100);
      border: none;
      border-radius: var(--radius-lg);
      color: var(--color-gray-700);
      cursor: pointer;
      transition: var(--transition);
      position: relative;
    }

    .icon-button:hover {
      background: var(--color-gray-200);
      color: var(--color-gray-900);
    }

    .badge-count {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--color-accent);
      color: var(--color-white);
      font-size: 0.75rem;
      font-weight: 700;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-toggle {
      display: block;
    }

    @media (min-width: 768px) {
      .menu-toggle {
        display: none;
      }
    }

    /* Bannière hero */
    .hero-banner {
      width: 100%;
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
      color: var(--color-white);
      border-radius: var(--radius-2xl);
      padding: 3rem 2rem;
      margin: 2rem 0;
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
      color: var(--color-gray-300);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .stats-grid {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .stat-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-accent);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--color-gray-400);
    }

    /* Section principale */
    .main-content {
      width: 100%;
      padding: 0 1rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: var(--color-white);
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      border-radius: var(--radius-2xl);
      margin-bottom: 1.5rem;
    }

    .section-heading {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 900;
      line-height: 1.1;
      color: var(--color-gray-900);
      margin-bottom: 1rem;
    }

    .section-subheading {
      font-size: 1.125rem;
      color: var(--color-gray-600);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Filtres */
    .filters-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--color-white);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
      width: 100%;
    }

    .filter-tab {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--color-gray-300);
      background: var(--color-white);
      color: var(--color-gray-700);
      font-weight: 600;
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: var(--transition);
    }

    .filter-tab:hover {
      border-color: var(--color-gray-400);
      background: var(--color-gray-50);
    }

    .filter-tab.active {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
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
      background: var(--color-white);
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: var(--shadow);
      border: 2px solid var(--color-gray-200);
      transition: var(--transition);
      position: relative;
      width: 100%;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-accent);
    }

    .product-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: var(--color-accent);
      color: var(--color-white);
      padding: 0.5rem 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: var(--radius);
      z-index: 2;
    }

    .favorite-toggle {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      background: var(--color-white);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 2;
      transition: var(--transition);
      box-shadow: var(--shadow);
    }

    .favorite-toggle:hover {
      background: var(--color-gray-100);
      transform: scale(1.1);
    }

    .favorite-toggle.active {
      background: var(--color-error);
      color: var(--color-white);
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

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      padding: 1rem;
      color: var(--color-white);
    }

    .product-country {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 1.125rem;
    }

    .product-details {
      padding: 1.5rem;
      width: 100%;
    }

    .product-name {
      color: var(--color-gray-600);
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .price-row {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .price-euro {
      font-size: 1rem;
      color: var(--color-gray-500);
      text-decoration: line-through;
    }

    .price-mad {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-gray-900);
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .feature-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-gray-700);
    }

    .feature-line svg {
      color: var(--color-success);
      flex-shrink: 0;
    }

    .action-buttons {
      display: flex;
      gap: 0.75rem;
      width: 100%;
    }

    .primary-action {
      flex: 1;
      padding: 0.875rem;
      background: var(--color-primary);
      color: var(--color-white);
      border: none;
      border-radius: var(--radius-lg);
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .primary-action:hover {
      background: var(--color-primary-light);
      transform: translateY(-2px);
    }

    .secondary-action {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-gray-100);
      border: none;
      border-radius: var(--radius-lg);
      color: var(--color-gray-700);
      cursor: pointer;
      transition: var(--transition);
    }

    .secondary-action:hover {
      background: var(--color-gray-200);
      color: var(--color-gray-900);
    }

    /* Modal produit */
    .product-modal-overlay {
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
      z-index: 2000;
      padding: 1rem;
      width: 100vw;
      animation: fadeIn 0.3s ease;
    }

    .product-modal {
      width: 100%;
      max-width: 800px;
      max-height: 90vh;
      background: var(--color-white);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      animation: slideUp 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .product-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: var(--color-gray-900);
      color: var(--color-white);
    }

    .product-modal-body {
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }

    .product-modal-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    @media (max-width: 768px) {
      .product-modal-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .product-modal-image {
      width: 100%;
      height: 350px;
      object-fit: cover;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow);
    }

    .product-modal-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .product-modal-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-gray-900);
      line-height: 1.2;
    }

    .product-modal-price {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-accent);
    }

    .product-modal-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    /* Sélection taille dans modal */
    .modal-size-selection {
      margin-top: 1.5rem;
      width: 100%;
    }

    .modal-size-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-size-guide-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--color-gray-100);
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      color: var(--color-gray-700);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
    }

    .modal-size-guide-link:hover {
      background: var(--color-gray-200);
      border-color: var(--color-gray-400);
    }

    .modal-sizes-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
    }

    .modal-size-option {
      padding: 1.25rem 1rem;
      background: var(--color-gray-100);
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      text-align: center;
      cursor: pointer;
      transition: var(--transition);
    }

    .modal-size-option:hover {
      border-color: var(--color-gray-400);
      background: var(--color-gray-200);
    }

    .modal-size-option.selected {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-white);
    }

    .modal-size-text {
      font-size: 1.125rem;
      font-weight: 800;
    }

    /* Sélection quantité dans modal */
    .modal-quantity-selector {
      margin-top: 1.5rem;
      width: 100%;
    }

    .modal-quantity-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .modal-quantity-button {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-gray-100);
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      font-size: 1.5rem;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
    }

    .modal-quantity-button:hover {
      background: var(--color-gray-200);
      border-color: var(--color-gray-400);
    }

    .modal-quantity-display {
      min-width: 60px;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--color-gray-900);
    }

    .modal-stock-info {
      margin-left: auto;
      padding: 0.75rem 1rem;
      background: var(--color-gray-100);
      border-radius: var(--radius-lg);
      color: var(--color-gray-700);
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    /* Récapitulatif dans modal */
    .modal-order-summary {
      background: var(--color-white);
      border-radius: var(--radius-xl);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      margin-top: 2rem;
      width: 100%;
      border: 2px solid var(--color-gray-200);
    }

    .modal-summary-line {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .modal-summary-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--color-gray-900);
    }

    .modal-checkout-button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
      color: var(--color-white);
      border: none;
      border-radius: var(--radius-lg);
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .modal-checkout-button:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-gold);
    }

    .modal-checkout-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Modal formulaire */
    .form-modal-overlay {
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
      z-index: 2001;
      padding: 1rem;
      width: 100vw;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .form-modal {
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      background: var(--color-white);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      box-shadow: var(--shadow-xl);
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background: var(--color-gray-900);
      color: var(--color-white);
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 800;
    }

    .close-modal {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: var(--color-white);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }

    .close-modal:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
    }

    .modal-body {
      padding: 2rem;
      overflow-y: auto;
      max-height: 60vh;
    }

    .form-group {
      margin-bottom: 1.5rem;
      width: 100%;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--color-gray-700);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-control {
      width: 100%;
      padding: 1rem;
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      transition: var(--transition);
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    }

    .form-textarea {
      font-family: inherit;
      resize: vertical;
      min-height: 100px;
    }

    .payment-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }

    .payment-choice {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: var(--transition);
    }

    .payment-choice.selected {
      border-color: var(--color-accent);
      background: rgba(245, 158, 11, 0.05);
    }

    .submit-order {
      width: 100%;
      padding: 1.25rem;
      background: linear-gradient(135deg, var(--color-success-dark), var(--color-success));
      color: var(--color-white);
      border: none;
      border-radius: var(--radius-lg);
      font-size: 1.125rem;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .submit-order:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
    }

    .submit-order:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: var(--color-white);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Message succès */
    .success-view {
      text-align: center;
      padding: 4rem 2rem;
    }

    .success-icon-wrapper {
      width: 80px;
      height: 80px;
      background: var(--color-success);
      color: var(--color-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
    }

    .success-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-gray-900);
      margin-bottom: 1rem;
    }

    .success-message {
      color: var(--color-gray-600);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    /* Section avantages */
    .advantages-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
      padding: 2rem;
      background: var(--color-white);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow);
      width: 100%;
    }

    .advantage-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem;
      background: var(--color-gray-50);
      border-radius: var(--radius-xl);
      transition: var(--transition);
    }

    .advantage-card:hover {
      transform: translateY(-5px);
      background: var(--color-white);
      box-shadow: var(--shadow-md);
    }

    .advantage-icon {
      width: 60px;
      height: 60px;
      background: var(--color-accent);
      color: var(--color-white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .advantage-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 0.75rem;
    }

    .advantage-description {
      color: var(--color-gray-600);
      line-height: 1.6;
    }

    /* Footer */
    .main-footer {
      background: var(--color-gray-900);
      color: var(--color-white);
      padding: 4rem 0 2rem;
      margin-top: 4rem;
      width: 100%;
    }

    .footer-wrapper {
      max-width: 100%;
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
    }

    .footer-links li {
      margin-bottom: 0.75rem;
    }

    .footer-links a {
      color: var(--color-gray-400);
      text-decoration: none;
      transition: var(--transition);
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
      transition: var(--transition);
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

    /* Menu mobile */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-white);
      z-index: 1001;
      padding: 2rem;
      overflow-y: auto;
      animation: fadeIn 0.3s ease;
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

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--color-gray-50);
      border-radius: var(--radius-lg);
      text-decoration: none;
      color: var(--color-gray-900);
      font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-banner {
        padding: 2rem 1rem;
      }
      
      .stats-grid {
        flex-direction: column;
        gap: 1rem;
      }
      
      .filters-row {
        flex-direction: column;
      }
      
      .modal-body {
        padding: 1rem;
      }
      
      .payment-options {
        grid-template-columns: 1fr;
      }
      
      .modal-sizes-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Scrollbar personnalisée */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-gray-100);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-gray-400);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-gray-500);
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      
      <div className="page-container">
        {/* Header */}
        <header className="main-header">
          <div className="header-wrapper">
            <a href="#" className="brand-logo">
              <div className="logo-symbol">
                <ShoppingBag size={24} />
              </div>
              <div className="logo-text">
                Maillots<span className="logo-highlight">Pro</span>
              </div>
            </a>
            
            <div className="header-tools">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="search-field"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search size={20} className="search-icon" />
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
                  className="icon-button"
                  onClick={() => setShowCartPanel(!showCartPanel)}
                >
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="badge-count">{cartItems.length}</span>
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
          </div>
        </header>

        {/* Bannière Hero */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">
              Maillots Officiels Africains
              <br />
              <span style={{ color: 'var(--color-accent)' }}>Livraison au Maroc</span>
            </h1>
            <p className="hero-description">
              Commandez votre maillot préféré des équipes nationales.
              Livraison express dans toutes les villes du Maroc.
            </p>
            
            <div className="stats-grid">
              <div className="stat-box">
                <CheckCircle size={20} color="var(--color-accent)" />
                <div>
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Clients satisfaits</div>
                </div>
              </div>
              
              <div className="stat-box">
                <Truck size={20} color="var(--color-accent)" />
                <div>
                  <div className="stat-value">24h</div>
                  <div className="stat-label">Livraison express</div>
                </div>
              </div>
              
              <div className="stat-box">
                <Shield size={20} color="var(--color-accent)" />
                <div>
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Garantie qualité</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <main className="main-content">
          {/* En-tête section */}
          <div className="section-header">
            <div className="section-tag">
              <Award size={20} />
              COLLECTION 2024
            </div>
            
            <h2 className="section-heading">
              Nos Maillots Officiels
            </h2>
            
            <p className="section-subheading">
              Choisissez parmi notre collection exclusive. Tous les prix sont en Dirhams Marocains (MAD).
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
            
            <button 
              className={`filter-tab ${activeCategory === "new" ? "active" : ""}`}
              onClick={() => setActiveCategory("new")}
            >
              Nouveautés
            </button>
            
            <button 
              className={`filter-tab ${activeCategory === "bestseller" ? "active" : ""}`}
              onClick={() => setActiveCategory("bestseller")}
            >
              Bestsellers
            </button>
          </div>

          {/* Grille de produits */}
          <div className="products-grid">
            {filteredProducts.map(product => {
              const price = formatPrice(product.priceEUR);
              const isFav = favoriteItems.includes(product.id);
              
              return (
                <div key={product.id} className="product-card">
                  {product.labels.includes("Nouveau") && (
                    <div className="product-badge">NOUVEAU</div>
                  )}
                  
                  <button 
                    className={`favorite-toggle ${isFav ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart size={20} />
                  </button>
                  
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={`${product.country} - ${product.name}`}
                      className="product-image"
                    />
                    <div className="image-overlay">
                      <div className="product-country">
                        <span>{product.flag}</span>
                        <span>{product.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    
                    <div className="price-row">
                      <span className="price-euro">{price.euro}</span>
                      <span className="price-mad">{price.mad}</span>
                    </div>
                    
                    <div className="features-list">
                      {product.highlights.slice(0, 2).map((feature, index) => (
                        <div key={index} className="feature-line">
                          <Check size={14} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="action-buttons">
                      <button 
                        className="primary-action"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <ShoppingCart size={18} />
                        Voir détails
                      </button>
                      
                      <button 
                        className="secondary-action"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section avantages */}
          <div className="advantages-section">
            <div className="advantage-card">
              <div className="advantage-icon">
                <Truck size={24} />
              </div>
              <h3 className="advantage-title">Livraison Rapide</h3>
              <p className="advantage-description">
                Livraison en 24-48h dans toutes les villes du Maroc.
                Suivi en temps réel.
              </p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <Shield size={24} />
              </div>
              <h3 className="advantage-title">100% Authentique</h3>
              <p className="advantage-description">
                Maillots officiels certifiés. 
                Garantie de qualité et d'authenticité.
              </p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <Headphones size={24} />
              </div>
              <h3 className="advantage-title">Support Client</h3>
              <p className="advantage-description">
                Notre équipe est disponible 7j/7 pour vous accompagner.
              </p>
            </div>
            
            <div className="advantage-card">
              <div className="advantage-icon">
                <RefreshCw size={24} />
              </div>
              <h3 className="advantage-title">Retour Facile</h3>
              <p className="advantage-description">
                Retour gratuit sous 14 jours si le produit ne vous convient pas.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
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

        {/* Modal détail produit */}
        <AnimatePresence>
          {showProductModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="product-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="product-modal"
              >
                <div className="product-modal-header">
                  <div>
                    <h2 className="modal-title">Configuration de votre commande</h2>
                    <p style={{ color: 'var(--color-gray-300)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      Sélectionnez la taille et la quantité
                    </p>
                  </div>
                  <button 
                    className="close-modal"
                    onClick={() => setShowProductModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="product-modal-body">
                  <div className="product-modal-content">
                    <div>
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.country}
                        className="product-modal-image"
                      />
                      <div style={{ marginTop: '1.5rem' }}>
                        <h3 className="product-modal-title">
                          {selectedProduct.country} - {selectedProduct.name}
                        </h3>
                        <div className="product-modal-price">
                          {formatPrice(selectedProduct.priceEUR).mad}
                        </div>
                        <div className="product-modal-rating">
                          <Star size={18} fill="var(--color-accent)" color="var(--color-accent)" />
                          <span>{selectedProduct.rating} ({selectedProduct.reviewCount} avis)</span>
                          <span style={{ margin: '0 0.5rem' }}>•</span>
                          <Clock size={18} />
                          <span>Livraison: {selectedProduct.shippingTime}</span>
                        </div>
                        <div style={{ marginTop: '1rem', color: 'var(--color-gray-600)' }}>
                          <p>{selectedProduct.shortDesc}</p>
                          <div style={{ marginTop: '1rem' }}>
                            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Caractéristiques:</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                              {selectedProduct.highlights.map((feature, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                  <Check size={16} color="var(--color-success)" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="product-modal-info">
                      {/* Sélection taille */}
                      <div className="modal-size-selection">
                        <div className="modal-size-header">
                          <h3 style={{ color: 'var(--color-gray-900)' }}>Choisissez votre taille</h3>
                          <button 
                            className="modal-size-guide-link"
                          >
                            <Ruler size={16} />
                            Guide des tailles
                          </button>
                        </div>
                        
                        <div className="modal-sizes-container">
                          {selectedProduct.availableSizes.map(size => (
                            <div
                              key={size}
                              className={`modal-size-option ${selectedSize === size ? "selected" : ""}`}
                              onClick={() => setSelectedSize(size)}
                            >
                              <div className="modal-size-text">{size}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sélection quantité */}
                      <div className="modal-quantity-selector">
                        <h3 style={{ color: 'var(--color-gray-900)', marginBottom: '1rem' }}>Quantité</h3>
                        <div className="modal-quantity-controls">
                          <button 
                            className="modal-quantity-button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            <Minus size={20} />
                          </button>
                          <span className="modal-quantity-display">{quantity}</span>
                          <button 
                            className="modal-quantity-button"
                            onClick={() => setQuantity(Math.min(selectedProduct.inventory, quantity + 1))}
                          >
                            <Plus size={20} />
                          </button>
                          <div className="modal-stock-info">
                            <Package size={14} />
                            Stock: {selectedProduct.inventory} unités
                          </div>
                        </div>
                      </div>

                      {/* Récapitulatif */}
                      <div className="modal-order-summary">
                        <h3 style={{ color: 'var(--color-gray-900)', marginBottom: '1rem' }}>
                          Récapitulatif de commande
                        </h3>
                        
                        <div className="modal-summary-line">
                          <span>Sous-total:</span>
                          <span>{formatPrice(selectedProduct.priceEUR * quantity).mad}</span>
                        </div>
                        
                        <div className="modal-summary-line">
                          <span>Livraison:</span>
                          <span>{DELIVERY_FEE} MAD</span>
                        </div>
                        
                        <div className="modal-summary-total">
                          <span>Total à payer:</span>
                          <span>{calculateTotal().mad}</span>
                        </div>
                        
                        <button 
                          className="modal-checkout-button"
                          onClick={handleOpenOrderForm}
                          disabled={!selectedSize}
                        >
                          <CreditCard size={20} />
                          {selectedSize ? "Passer la commande" : "Choisissez une taille"}
                          <ArrowRight size={20} />
                        </button>
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
              className="form-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="form-modal"
              >
                {orderConfirmed ? (
                  <div className="success-view">
                    <div className="success-icon-wrapper">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="success-title">Commande confirmée !</h3>
                    <p className="success-message">
                      Votre commande a été enregistrée avec succès. 
                      <br />
                      Notre équipe vous contactera sous 24h pour confirmer la livraison.
                    </p>
                    <p style={{ 
                      color: 'var(--color-gray-500)', 
                      fontSize: '0.875rem',
                      marginTop: '1rem'
                    }}>
                      Numéro de commande: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="modal-header">
                      <h2 className="modal-title">Informations de livraison</h2>
                      <button 
                        className="close-modal"
                        onClick={() => setShowOrderForm(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="modal-body">
                      {/* Récap commande */}
                      <div style={{ 
                        background: 'var(--color-gray-50)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                      }}>
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
                              borderRadius: 'var(--radius-lg)',
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <h4 style={{ fontWeight: '700', color: 'var(--color-gray-900)' }}>
                              {selectedProduct?.country} - {selectedProduct?.name}
                            </h4>
                            <p style={{ color: 'var(--color-gray-600)', fontSize: '0.875rem' }}>
                              Taille: {selectedSize} • Quantité: {quantity}
                            </p>
                          </div>
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          fontWeight: '700',
                          color: 'var(--color-gray-900)'
                        }}>
                          <span>Total:</span>
                          <span>{calculateTotal().mad}</span>
                        </div>
                      </div>
                      
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
                            className="form-control"
                            placeholder="Votre nom et prénom"
                            required
                          />
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
                            className="form-control"
                            placeholder="06 XX XX XX XX"
                            required
                          />
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
                            className="form-control"
                            placeholder="votre@email.com"
                            required
                          />
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
                            className="form-control"
                            required
                          >
                            <option value="">Sélectionnez votre ville</option>
                            {citiesMorocco.map(city => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
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
                            className="form-control"
                            placeholder="Adresse, quartier, bâtiment, étage..."
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">
                            Méthode de paiement
                          </label>
                          <div className="payment-options">
                            <label className={`payment-choice ${customerData.paymentMethod === "cash" ? "selected" : ""}`}>
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
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                                  Espèces
                                </div>
                              </div>
                            </label>
                            
                            <label className={`payment-choice ${customerData.paymentMethod === "transfer" ? "selected" : ""}`}>
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
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
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
                            className="form-control form-textarea"
                            placeholder="Informations supplémentaires pour la livraison, préférences horaires..."
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          className="submit-order"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="loading-spinner"></div>
                              Traitement en cours...
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
              className="mobile-menu-overlay"
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
                  className="close-modal"
                  style={{ background: 'var(--color-gray-100)', color: 'var(--color-gray-900)' }}
                  onClick={() => setShowMobileNav(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mobile-nav">
                <a href="#" className="mobile-nav-link">
                  <Home size={20} />
                  Accueil
                </a>
                
                <a href="#maillots" className="mobile-nav-link">
                  <ShoppingBag size={20} />
                  Collection
                </a>
                
                <a href="#" className="mobile-nav-link">
                  <Heart size={20} />
                  Favoris ({favoriteItems.length})
                </a>
                
                <a href="#" className="mobile-nav-link">
                  <ShoppingCart size={20} />
                  Panier ({cartItems.length})
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FootballJerseysShop;