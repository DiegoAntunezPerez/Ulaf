import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { API_URL } from '../../utils/constants';
import useAuthStore from '../../store/authStore';
import './Admin.css';

const Admin = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const user = useAuthStore((state) => state.user);

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
        reset();
        setImageFile(null);
        setImagePreview(null);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user?.nombre}</p>
      </div>

      <div className="admin-form-container">
        <h2>Crear Nuevo Artículo</h2>
        
        {serverError && <div className="alert alert-error">{serverError}</div>}
        {success && <div className="alert alert-success">¡Artículo creado correctamente!</div>}

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
    </div>
  );
};

export default Admin;
