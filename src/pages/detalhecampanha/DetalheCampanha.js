import { useState } from "react";
import natal from '../../images/natal.jfif';

// criar detalhe da campanha

const DetalheCampanha = () => {

  const campanha = {
    titulo: 'Natal solidário',
    arrecadado: 15000,
    descricao: 'Doações para o lar Santo Antônio de Porto Alegre',
    foto: natal
  }


  return (
    <>
      <h1>Detalhe da campanha</h1>
    </>
  );
}

export default DetalheCampanha;