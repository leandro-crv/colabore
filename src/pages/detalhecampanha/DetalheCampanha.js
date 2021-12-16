// import { useContext, useEffect,useState } from "react";
// import {FaUserAlt} from 'react-icons/fa'
// import { useMenuContext } from '../../context/context';
// import { CampanhaContext } from "../../context/CampanhaContext";
// import { useNavigate } from "react-router-dom"; 
// import styles from './DetalheCampanha.module.css'

// const DetalheCampanha = () => {
//   const navigate = useNavigate();
//   const { user, setNameLogo } = useMenuContext();
//   const {detalheCampanha,prepararEdicao, putDoar} = useContext(CampanhaContext);
//   const [edit, setEdit] = useState(false);
//   const [inputContribuicao, setInputContribuicao] = useState(false);
//   const [contribuicao, setContribuicao] = useState('');

//   const irParaEdicao = (id)=>{
//     prepararEdicao(id);
//     navigate('/cadastrocampanha')
//   }

//   useEffect(()=>{
//     setNameLogo("Detalhe Campanha");
//     if(detalheCampanha.criadorCampanha.idUsuario===user.idUsuario){
//       setEdit(true);
//     }
//     else{
//       setEdit(false);
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])

//   const handleContribuicao = (valor) => {
//     valor = valor.replace(/\D/g, "");
//     valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");
//     valor = valor.replace(/(?=(\d{3})+(\D))\B/g, ".");
//     setContribuicao('R$' + valor);
//   }

//   const removerMascaraMoeda = (mascara) => {
//     mascara = mascara.replace('R$','');
//     mascara = mascara.replace(/\./g,'');
//     mascara = mascara.replace(',','.');
      
//     return mascara;
//   }

//   const enviarContribuicao = async () => {
//     const contribuicaoNumero = Number(removerMascaraMoeda(contribuicao))
//     console.log('contribuição número',contribuicaoNumero)
//     if(!contribuicaoNumero){
//       alert('Sua contribuição tem que ser um valor positivo')
//     }
//     else{
//       const retorno = await putDoar(detalheCampanha.idCampanha,contribuicaoNumero);
//       if(retorno){
//         alert('Parabéns, você contribuiu com nossa campanha!')
//       }
//       else{
//         alert()
//       }

//     }
    
//   }
  
//   const cancelarContribuicao = ()=>{
//     setContribuicao('');
//     setInputContribuicao(false);
//   }

//   return (
//     <>
//       <h1>Detalhe da Campanha</h1>
//       <div className={styles.campanha}>
//         <div>
//         <h1>{detalheCampanha.titulo}</h1>
//         <h3>Meta de arrecadação {detalheCampanha.metaArrecadacao}</h3>
//       </div>
//       <div>
//         <img src={detalheCampanha.foto} alt={detalheCampanha.titulo} />
//       </div>
//       <div>
//         <p>
//           {detalheCampanha.descricaoCampanha}
//         </p>
//       </div>
//       <div>
//         <ul>
//           {detalheCampanha.categorias.map(categoria => (
//             <li>{categoria.nome}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <p>Usuários que contribuíram ()</p>
//       </div>
//         {edit ? (<button>Editar campanha</button>) :
//          (<button> Contribuir </button>)}
//          <div>
//          <input value={contribuicao} name="metaArrecadacao" onChange={(e)=> handleContribuicao(e.target.value)}/>
//            <button onClick={()=>cancelarContribuicao()}>Cancelar</button>
//            <button onClick={()=>enviarContribuicao()}>Enviar</button>
//          </div>
//      </div>
//     </>
//   );
// }

// export default DetalheCampanha;
