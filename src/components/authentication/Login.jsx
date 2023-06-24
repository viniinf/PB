import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Login({ onLogin, onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, 'users'), {
        email: email,
        role: role,
      });

      onSignUp();
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center">
          Sistema de cadastro de dados
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            required
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            required
            label="Senha"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            //required
            select
            label="Função"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Selecione a função</option>
            <option value="Administrador">Administrador</option>
            <option value="Gerente">Gerente</option>
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button fullWidth variant="outlined" color="primary" onClick={handleSignUp}>
            Cadastrar
          </Button>
        </Box>
      </form>
      <Box sx={{ mt: 4 }}>
        <Typography align="center">
          © 2023 Vinícius de Souza Carvalho. Todos os direitos reservados.
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button fullWidth variant="outlined" component={Link} to="/sobre-nos">
          Sobre Nós
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
