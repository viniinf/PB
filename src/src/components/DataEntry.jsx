import React, { useState, useEffect } from 'react';
import { useRoutes, Link, Outlet, Navigate } from 'react-router-dom';
import { db, auth } from '../utils/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { FiLogOut, FiEdit, FiTrash2, FiCheck, FiX, FiSearch } from 'react-icons/fi';
import data from '.././.././../public/data.json';
import './DataEntry.css';

function DataEntry() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [savedData, setSavedData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRandomUserData = async () => {
      try {
        const randomUser = data[Math.floor(Math.random() * data.length)];

        setName(randomUser.name);
        setEmail(randomUser.email);
        setCpf(randomUser.cpf);
        setPhone(randomUser.phone);
      } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
      }
    };

    fetchRandomUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        // Editar o dado existente
        const dataRef = doc(db, 'data', editingId);
        await updateDoc(dataRef, { name, cpf, phone, email });
        setEditingId(null); // Limpar o modo de edição
      } else {
        // Adicionar novo dado
        await addDoc(collection(db, 'data'), { name, cpf, phone, email });
      }

      setName('');
      setCpf('');
      setPhone('');
      setEmail('');
      setMessage('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error.message);
      setMessage('Ocorreu um erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  const handleShowData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'data'));
      const data = [];
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          data.push(item);
        }
      });
      setSavedData(data);
    } catch (error) {
      console.error('Erro ao obter os dados:', error.message);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await deleteDoc(doc(db, 'data', id));
      const updatedData = savedData.filter((data) => data.id !== id);
      setSavedData(updatedData);
    } catch (error) {
      console.error('Erro ao excluir dados:', error.message);
    }
  };

  const handleEditData = (id) => {
    const dataToEdit = savedData.find((data) => data.id === id);
    if (dataToEdit) {
      setEditingId(id);
      setName(dataToEdit.name);
      setCpf(dataToEdit.cpf);
      setPhone(dataToEdit.phone);
      setEmail(dataToEdit.email);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setCpf('');
    setPhone('');
    setEmail('');
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="logout-button" onClick={handleLogout}>
        <FiLogOut size={24} />
      </div>
      <h2>Preencha os dados</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insira o nome"
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Insira o CPF"
            required
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insira o telefone"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira o e-mail"
            required
          />
        </label>
        <div>
          {editingId ? (
            <>
              <button type="submit">
                <FiCheck size={16} /> Atualizar
              </button>
              <button type="button" onClick={handleCancelEdit}>
                <FiX size={16} /> Cancelar
              </button>
            </>
          ) : (
            <button type="submit">
              <FiCheck size={16} /> Salvar
            </button>
          )}
        </div>
      </form>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por nome"
        />
        <button type="button" onClick={handleShowData}>
          <FiSearch size={16} /> Pesquisar
        </button>
      </div>
      {message && <p>{message}</p>}
      {savedData.length > 0 && (
        <div>
          <h3>Lista com dados cadastrados</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.cpf}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditData(data.id)}>
                      <FiEdit size={16} /> 
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteData(data.id)}>
                      <FiTrash2 size={16} /> 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataEntry;