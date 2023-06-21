import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function AboutUs() {
  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ mb: 4 }}>
        <StyledHeading variant="h4" align="center">
          Sobre Nós
        </StyledHeading>
      </Box>
      <StyledParagraph variant="body1" align="justify">
        Eu sou Vinícius de Souza Carvalho, um estudante de engenharia da computação no INFNET. Estou apaixonado por desenvolvimento de software e, atualmente, estou focado em aprender a desenvolver aplicativos móveis usando o framework React Native.
      </StyledParagraph>
      <StyledParagraph variant="body1" align="justify">
        Minha jornada no desenvolvimento de aplicativos móveis tem sido emocionante, e o React Native tem se mostrado uma ótima escolha para criar aplicativos nativos para iOS e Android com uma base de código compartilhada.
      </StyledParagraph>
      <StyledParagraph variant="body1" align="justify">
        Estou constantemente aprimorando minhas habilidades em React Native e explorando novas funcionalidades e bibliotecas para criar aplicativos móveis de alta qualidade e desempenho.
      </StyledParagraph>
      <StyledParagraph variant="body1" align="justify">
        Se você também está interessado em desenvolvimento de aplicativos móveis ou tem alguma pergunta, não hesite em entrar em contato. Vamos aprender e crescer juntos no mundo do React Native!
      </StyledParagraph>
      <StyledButton variant="outlined" component={Link} to="/" fullWidth>
        Voltar
      </StyledButton>
    </StyledContainer>
  );
}

export default AboutUs;