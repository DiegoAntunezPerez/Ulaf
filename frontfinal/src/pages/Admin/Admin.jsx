import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { API_URL } from '../../utils/constants';
import useAuthStore from '../../store/authStore';
import './Admin.css';

const Admin = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const [activeTab, setActiveTab] = useState('articulos');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productos, setProductos] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const user = useAuthStore((state) => state.user);

  // Cargar productos cuando se abre la pestaña gestionar
  useEffect(() => {
    if (activeTab === 'gestionar') {
      fetchProductos();
    }
  }, [activeTab]);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${API_URL}/articulos?limit=1000`);
      const data = await response.json();
      setProductos(data.articulos || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setServerError('Formato de imagen no válido. Usa JPG, PNG, GIF o WebP');
        e.target.value = '';
        return;
      }

      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setServerError('La imagen no debe superar los 5MB');
        e.target.value = '';
        return;
      }

      setImageFile(file);
      setServerError('');

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setServerError('');
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // Crear FormData para enviar archivo
      const formData = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
          formData.append(key, data[key]);
        }
      });

      // Agregar la imagen si existe
      if (imageFile) {
        formData.append('imagen', imageFile);
      }

      const response = await fetch(`${API_URL}/articulos`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result?.error || 'Error al crear el artículo');
      } else {
        setSuccess(true);
        setServerError(''); // limpiar errores previos
        reset();
        setImageFile(null);
        setImagePreview(null);
        fetchProductos(); // Recargar lista de productos
        // Mantener mensaje de éxito visible más tiempo
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };
//back clientes
  const onSubmitCliente = async (data) => {
    setServerError('');
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result?.error || 'Error al crear el cliente');
      } else {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };
//back ventas
  const onSubmitVenta = async (data) => {
    setServerError('');
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/ventas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result?.error || 'Error al crear la venta');
      } else {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/articulos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        fetchProductos(); // Recargar lista
      } else {
        setServerError('Error al eliminar el producto');
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    }
  };

  const handleEditProduct = (producto) => {
    setEditingProduct(producto);
    setServerError('');
    setSuccess(false);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setServerError('No hay sesión activa. Por favor, inicia sesión de nuevo.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/articulos/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          precio: editingProduct.precio,
          stock_s: editingProduct.stock_s,
          stock_m: editingProduct.stock_m,
          stock_l: editingProduct.stock_l,
          stock_xl: editingProduct.stock_xl
        })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setEditingProduct(null);
        fetchProductos(); // recargamos lista
      } else {
        const result = await response.json();
        if (response.status === 401) {
          setServerError('Sesión expirada. Por favor, cierra sesión y vuelve a iniciarla.');
        } else {
          setServerError(result?.error || result || 'Error al actualizar el producto');
        }
      }
    } catch (error) {
      setServerError('Error de conexión con el servidor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setServerError('');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user?.nombre}</p>
      </div>

      {/* Pestañas */}
      <div className="admin-tabs">
        <button 
          className={activeTab === 'articulos' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('articulos');
            reset();
            setServerError('');
            setSuccess(false);
          }}
        >
          Artículos
        </button>
        <button 
          className={activeTab === 'clientes' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('clientes');
            reset();
            setServerError('');
            setSuccess(false);
          }}
        >
          Clientes
        </button>
        <button 
          className={activeTab === 'ventas' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('ventas');
            reset();
            setServerError('');
            setSuccess(false);
          }}
        >
          Ventas
        </button>
        <button 
          className={activeTab === 'gestionar' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('gestionar');
            reset();
            setServerError('');
            setSuccess(false);
          }}
        >
          Gestionar Productos
        </button>
      </div>

      {/* Contenido de Artículos */}
      {activeTab === 'articulos' && (
        <div className="admin-form-container">
          <h2>Crear Nuevo Artículo</h2>
        
        {serverError && <div className="alert alert-error">{serverError}</div>}
        {success && (
          <div className="alert alert-success">
            <strong>¡Artículo creado correctamente!</strong>
            <p>El producto se ha añadido y está visible en la galería.</p>
            <a href="/products" className="btn-view-products">Ver en Productos</a>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="idArticulo">ID Artículo *</label>
              <input
                {...register('idArticulo', {
                  required: 'El ID es obligatorio'
                })}
                type="text"
                id="idArticulo"
                placeholder="Ej: ART-001"
              />
              {formState.errors.idArticulo && (
                <span className="error-msg">{formState.errors.idArticulo.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoría *</label>
              <select
                {...register('categoria', {
                  required: 'La categoría es obligatoria'
                })}
                id="categoria"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Abrigos">Abrigos</option>
                <option value="Camisas">Camisas</option>
                <option value="Camisetas">Camisetas</option>
                <option value="Cazadoras">Cazadoras</option>
                <option value="Conjuntos">Conjuntos</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Punto">Punto</option>
                <option value="Sudaderas">Sudaderas</option>
                <option value="Tops">Tops</option>
                <option value="Vestidos">Vestidos</option>
              </select>
              {formState.errors.categoria && (
                <span className="error-msg">{formState.errors.categoria.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marca">Marca *</label>
              <input
                {...register('marca', {
                  required: 'La marca es obligatoria'
                })}
                type="text"
                id="marca"
                placeholder="Ej: Zara"
              />
              {formState.errors.marca && (
                <span className="error-msg">{formState.errors.marca.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="nombre">Nombre *</label>
              <input
                {...register('nombre', {
                  required: 'El nombre es obligatorio'
                })}
                type="text"
                id="nombre"
                placeholder="Ej: Camisa oversize"
              />
              {formState.errors.nombre && (
                <span className="error-msg">{formState.errors.nombre.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precio">Precio (€) *</label>
              <input
                {...register('precio', {
                  required: 'El precio es obligatorio',
                  min: { value: 0, message: 'El precio debe ser mayor a 0' }
                })}
                type="number"
                step="0.01"
                id="precio"
                placeholder="29.99"
              />
              {formState.errors.precio && (
                <span className="error-msg">{formState.errors.precio.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                {...register('estado', {
                  required: 'El estado es obligatorio'
                })}
                id="estado"
              >
                <option value="">Selecciona estado</option>
                <option value="nuevo">Nuevo</option>
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
              </select>
              {formState.errors.estado && (
                <span className="error-msg">{formState.errors.estado.message}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Stock por Talla</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stock_s">Stock S *</label>
                <input
                  {...register('stock_s', {
                    required: 'El stock S es obligatorio',
                    min: { value: 0, message: 'Mínimo 0' }
                  })}
                  type="number"
                  id="stock_s"
                  placeholder="0"
                />
                {formState.errors.stock_s && (
                  <span className="error-msg">{formState.errors.stock_s.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="stock_m">Stock M *</label>
                <input
                  {...register('stock_m', {
                    required: 'El stock M es obligatorio',
                    min: { value: 0, message: 'Mínimo 0' }
                  })}
                  type="number"
                  id="stock_m"
                  placeholder="0"
                />
                {formState.errors.stock_m && (
                  <span className="error-msg">{formState.errors.stock_m.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="stock_l">Stock L *</label>
                <input
                  {...register('stock_l', {
                    required: 'El stock L es obligatorio',
                    min: { value: 0, message: 'Mínimo 0' }
                  })}
                  type="number"
                  id="stock_l"
                  placeholder="0"
                />
                {formState.errors.stock_l && (
                  <span className="error-msg">{formState.errors.stock_l.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="stock_xl">Stock XL *</label>
                <input
                  {...register('stock_xl', {
                    required: 'El stock XL es obligatorio',
                    min: { value: 0, message: 'Mínimo 0' }
                  })}
                  type="number"
                  id="stock_xl"
                  placeholder="0"
                />
                {formState.errors.stock_xl && (
                  <span className="error-msg">{formState.errors.stock_xl.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imagen">Imagen del Producto *</label>
            <input
              type="file"
              id="imagen"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleImageChange}
              required
            />
            <small className="form-descrip">
              Formatos: JPG, PNG, GIF, WebP. Tamaño máximo: 5MB
            </small>
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Vista previa" />
                <button 
                  type="button" 
                  className="btn-remove-image"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    document.getElementById('imagen').value = '';
                  }}
                >
                  ✕ Eliminar imagen
                </button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              {...register('descripcion', {
                maxLength: { value: 500, message: 'Máximo 500 caracteres' }
              })}
              id="descripcion"
              rows="4"
              placeholder="Descripción del producto (opcional, máx. 500 caracteres)"
            />
            {formState.errors.descripcion && (
              <span className="error-msg">{formState.errors.descripcion.message}</span>
            )}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Artículo'}
          </button>
        </form>
      </div>
      )}

      {/* Contenido de Clientes */}
      {activeTab === 'clientes' && (
        <div className="admin-form-container">
          <h2>Crear Nuevo Cliente</h2>
          
          {serverError && <div className="alert alert-error">{serverError}</div>}
          {success && <div className="alert alert-success">¡Cliente creado correctamente!</div>}

          <form onSubmit={handleSubmit(onSubmitCliente)} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="idCliente">ID Cliente</label>
                <input
                  {...register('idCliente')}
                  type="text"
                  id="idCliente"
                  placeholder="Ej: CLI-001"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  {...register('nombre', {
                    required: 'El nombre es obligatorio'
                  })}
                  type="text"
                  id="nombre"
                  placeholder="Nombre completo"
                />
                {formState.errors.nombre && (
                  <span className="error-msg">{formState.errors.nombre.message}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email no válido'
                    }
                  })}
                  type="email"
                  id="email"
                  placeholder="cliente@email.com"
                />
                {formState.errors.email && (
                  <span className="error-msg">{formState.errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  {...register('telefono')}
                  type="text"
                  id="telefono"
                  placeholder="123456789"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ciudad">Ciudad</label>
                <input
                  {...register('ciudad')}
                  type="text"
                  id="ciudad"
                  placeholder="Madrid"
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  {...register('direccion')}
                  type="text"
                  id="direccion"
                  placeholder="Calle ejemplo, 123"
                />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Cliente'}
            </button>
          </form>
        </div>
      )}

      {/* Contenido de Ventas */}
      {activeTab === 'ventas' && (
        <div className="admin-form-container">
          <h2>Crear Nueva Venta</h2>
          
          {serverError && <div className="alert alert-error">{serverError}</div>}
          {success && <div className="alert alert-success">¡Venta creada correctamente!</div>}

          <form onSubmit={handleSubmit(onSubmitVenta)} className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="idVenta">ID Venta</label>
                <input
                  {...register('idVenta')}
                  type="text"
                  id="idVenta"
                  placeholder="Ej: VEN-001"
                />
              </div>

              <div className="form-group">
                <label htmlFor="articuloVendido">Artículo Vendido *</label>
                <input
                  {...register('articuloVendido', {
                    required: 'El artículo es obligatorio'
                  })}
                  type="text"
                  id="articuloVendido"
                  placeholder="Nombre del artículo"
                />
                {formState.errors.articuloVendido && (
                  <span className="error-msg">{formState.errors.articuloVendido.message}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="clienteAsociado">Cliente Asociado *</label>
                <input
                  {...register('clienteAsociado', {
                    required: 'El cliente es obligatorio'
                  })}
                  type="text"
                  id="clienteAsociado"
                  placeholder="Nombre o ID del cliente"
                />
                {formState.errors.clienteAsociado && (
                  <span className="error-msg">{formState.errors.clienteAsociado.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="metodoPago">Método de Pago</label>
                <select
                  {...register('metodoPago')}
                  id="metodoPago"
                >
                  <option value="">Selecciona método</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="PayPal">PayPal</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaVenta">Fecha de Venta</label>
                <input
                  {...register('fechaVenta')}
                  type="date"
                  id="fechaVenta"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fechaEntrega">Fecha de Entrega</label>
                <input
                  {...register('fechaEntrega')}
                  type="date"
                  id="fechaEntrega"
                />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Venta'}
            </button>
          </form>
        </div>
      )}

      {/* Contenido de Gestionar Productos */}
      {activeTab === 'gestionar' && (
        <div className="admin-form-container">
          <h2>Gestionar Productos</h2>
          
          {serverError && <div className="alert alert-error">{serverError}</div>}
          {success && <div className="alert alert-success">¡Operación exitosa!</div>}

          {/* Formulario de edición */}
          {editingProduct && (
            <div className="edit-form-container">
              <h3>Editar Producto - {editingProduct.nombre}</h3>
              <form onSubmit={handleUpdateProduct} className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Precio (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={editingProduct.precio || 0}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        precio: parseFloat(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>

                <h4>Stock por Talla</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Stock S</label>
                    <input
                      type="number"
                      min="0"
                      value={editingProduct.stock_s || 0}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        stock_s: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock M</label>
                    <input
                      type="number"
                      min="0"
                      value={editingProduct.stock_m || 0}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        stock_m: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock L</label>
                    <input
                      type="number"
                      min="0"
                      value={editingProduct.stock_l || 0}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        stock_l: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock XL</label>
                    <input
                      type="number"
                      min="0"
                      value={editingProduct.stock_xl || 0}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        stock_xl: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="productos-lista">
            {productos.length === 0 ? (
              <p>No hay productos disponibles</p>
            ) : (
              <table className="productos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto._id}>
                      <td>{producto.idArticulo}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.precio}€</td>
                      <td>
                        {(producto.stock_s || 0) + 
                         (producto.stock_m || 0) + 
                         (producto.stock_l || 0) + 
                         (producto.stock_xl || 0)}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditProduct(producto)}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteProduct(producto._id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
