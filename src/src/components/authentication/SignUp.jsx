//ds
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth } from './firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore();

function SignUp({ onSignUp }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newUser = await auth.createUserWithEmailAndPassword(email, password);
      await setDoc(doc(db, 'users', newUser.user.uid), {
        email: email,
      });
      console.log('Conta criada com sucesso');
      setIsSignUpSuccess(true);
    } catch (error) {
      console.error('Erro ao criar conta:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center">
          Cadastro
        </Typography>
      </Box>
      {isSignUpSuccess ? (
        <Typography variant="h5" align="center" color="success">
          Cadastro efetuado com sucesso!
        </Typography>
      ) : (
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
            <Button fullWidth type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
}

export default SignUp;