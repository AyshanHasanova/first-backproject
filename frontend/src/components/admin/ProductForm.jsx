import React, { useState } from 'react'
import { useCreateProductMutation } from '../../redux/api/productsApi' // öz yoluna görə dəyiş
import { categories } from '../../constants/categories'
const initialFormState = {
  name: '',
  price: '',
  description: '',
  category: '',
  seller: '',
  stock: '',
  image: null
}


const ProductForm = () => {
  const [form, setForm] = useState(initialFormState)
  const [preview, setPreview] = useState(null)
  const [createProduct, { isLoading }] = useCreateProductMutation()

  const onChange = e => {
    const { name, value, files } = e.target
    if (name === 'image' && files && files.length > 0) {
      setForm(prev => ({ ...prev, image: files[0] }))
      setPreview(URL.createObjectURL(files[0]))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const onSubmit = async e => {
    e.preventDefault()

    if (!form.image) {
      alert('Zəhmət olmasa şəkil əlavə edin.')
      return
    }

    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (val !== null) formData.append(key, val)
      })

      await createProduct(formData).unwrap()
      alert('Məhsul əlavə olundu!')
      setForm(initialFormState)
      setPreview(null)
    } catch (error) {
      console.error('Xəta:', error)
      alert('Məhsul əlavə edilərkən xəta baş verdi.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Ad</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Qiymət</label>
        <input
          name="price"
          type="number"
          min="0"
          value={form.price}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Təsvir</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Kateqoriya</label>
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Seçin</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Satıcı</label>
        <input
          name="seller"
          value={form.seller}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Stok sayı</label>
        <input
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={onChange}
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Şəkil</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={onChange}
          required
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Yüklənir...' : 'Əlavə et'}
      </button>
    </form>
  )
}

export default ProductForm