import { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Countries = () => {
  const { backendUrl } = useContext(AuthContext);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    titleShort: '',
    titleShortAr: '',
    isActive: true,
    flag: null,
  });

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/countries`, { params: { search } });
      if (res.data.success) setCountries(res.data.countries);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ name: '', nameAr: '', titleShort: '', titleShortAr: '', isActive: true, flag: null });
    setFormOpen(true);
  };

  const openEdit = (country) => {
    setEditingId(country._id);
    setFormData({
      name: country.name || '',
      nameAr: country.nameAr || '',
      titleShort: country.titleShort || '',
      titleShortAr: country.titleShortAr || '',
      isActive: country.isActive,
      flag: null,
    });
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Delete this country?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/countries/${id}`, { withCredentials: true });
      if (res.data.success) {
        await MySwal.fire('Deleted!', res.data.message, 'success');
        fetchCountries();
      }
    } catch (err) {
      console.error(err);
      MySwal.fire('Error', 'Failed to delete country', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('nameAr', formData.nameAr);
      data.append('titleShort', formData.titleShort);
      data.append('titleShortAr', formData.titleShortAr);
      data.append('isActive', formData.isActive);
      if (formData.flag) data.append('flag', formData.flag);

      if (editingId) {
        const res = await axios.put(`${backendUrl}/api/countries/${editingId}`, data, { withCredentials: true });
        if (res.data.success) {
          MySwal.fire('Updated', 'Country updated successfully', 'success');
          setFormOpen(false);
          fetchCountries();
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/countries`, data, { withCredentials: true });
        if (res.data.success) {
          MySwal.fire('Created', 'Country created successfully', 'success');
          setFormOpen(false);
          fetchCountries();
        }
      }
    } catch (err) {
      console.error(err);
      MySwal.fire('Error', 'Failed to save country', 'error');
    }
  };

  const filtered = countries.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.titleShort?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-600/10 to-green-800/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-3">Countries</h1>
                <p className="text-lg text-slate-600 font-medium">Create, update, and manage countries</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <button onClick={openCreate} className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95">New Country</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or short title"
              className="block w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 font-medium"
            />
            <button onClick={fetchCountries} className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-2xl">Search</button>
          </div>

          {loading ? (
            <div className="text-slate-600">Loading...</div>
          ) : error ? (
            <div className="text-red-600 font-semibold">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-50/90 to-slate-100/90 backdrop-blur-sm border-b border-slate-200/60">
                  <tr>
                    {['Flag', 'Name', 'Short Title', 'Active', 'Created', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40">
                  {filtered.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/50 transition-all duration-200">
                      <td className="px-6 py-4">
                        <img src={c.flagUrl} alt={c.name} className="h-8 w-12 object-cover rounded shadow" />
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-slate-700">{c.titleShort}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-xl text-xs font-semibold ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{c.isActive ? 'Yes' : 'No'}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{new Date(c.createdAt).toLocaleString()}</td>
                      <td className="px-6 py-4 space-x-3">
                        <button onClick={() => openEdit(c)} className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700">Edit</button>
                        <button onClick={() => handleDelete(c._id)} className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Country' : 'New Country'}</h2>
                <button onClick={() => setFormOpen(false)} className="px-3 py-1 rounded-lg bg-slate-100">Close</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Country Name"
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
                <input
                  type="text"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="اسم الدولة (Arabic)"
                  className="w-full px-4 py-3 border rounded-xl"
                />
                <input
                  type="text"
                  value={formData.titleShort}
                  onChange={(e) => setFormData({ ...formData, titleShort: e.target.value })}
                  placeholder="Short Title"
                  className="w-full px-4 py-3 border rounded-xl"
                  required
                />
                <input
                  type="text"
                  value={formData.titleShortAr}
                  onChange={(e) => setFormData({ ...formData, titleShortAr: e.target.value })}
                  placeholder="عنوان قصير (Arabic)"
                  className="w-full px-4 py-3 border rounded-xl"
                />
                <div className="flex items-center gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <span className="text-sm font-semibold text-slate-700">Active</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, flag: e.target.files?.[0] || null })}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 font-semibold">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold">{editingId ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Countries;


