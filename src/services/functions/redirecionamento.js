import { useNavigate } from "react-router-dom"

function Redirecionamento(pagina) {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate(pagina)
  }, 4000)

}

export default Redirecionamento;