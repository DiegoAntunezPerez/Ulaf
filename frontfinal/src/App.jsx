import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Cart from './pages/Cart/Cart';
import Admin from './pages/Admin/Admin';
import Category from './pages/Category/Category';
import Favorites from './pages/Favorites/Favorites';
import About from './pages/About/About';
import Help from './pages/Help/Help';
import Contact from './pages/Contact/Contact';
import Shipping from './pages/Shipping/Shipping';
import Payment from './pages/Payment/Payment';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Jobs from './pages/Jobs/Jobs';
import Tracking from './pages/Tracking/Tracking';
import GiftCard from './pages/GiftCard/GiftCard';
import Legal from './pages/Legal/Legal';
import Cookies from './pages/Cookies/Cookies';

// Components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        {/* avisos Toaster */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#000',
              color: '#fff',
              fontSize: '14px'
            }
          }}
        />

        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="app-main">
          {/* Routes */}
          <Routes>
          {/* rutas publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* rutas privadas */}
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />

          {/* rutas de admin */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } 
          />

          {/* rutas de informacion del footer */}
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/ayuda" element={<Help />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/trabaja-con-nosotros" element={<Jobs />} />
          
          {/* rutas de compra del footer */}
          <Route path="/envios-devoluciones" element={<Shipping />} />
          <Route path="/formas-pago" element={<Payment />} />
          <Route path="/seguimiento-pedido" element={<Tracking />} />
          <Route path="/tarjeta-regalo" element={<GiftCard />} />
          
          {/* rutas legales del footer */}
          <Route path="/politica-privacidad" element={<Privacy />} />
          <Route path="/condiciones-compra" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/aviso-legal" element={<Legal />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

