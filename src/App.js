import{useState} from 'react';
import{FiSearch} from 'react-icons/fi'
import './style.css';
import api from './services/api'


function App() {


  const[input, setInput] = useState('')
  const[cep, setCep] = useState({})


  async function handleSearch() {
    if (input === '') {
      alert('PREENCHA ALGUM CEP');
      return;
    }
  
    try{
      const response = await api.get(`${input}/json`);
     setCep(response.data)
     setInput("")

    } catch (error) {
      
      alert('Ops, ocorreu um erro ao buscar o CEP. Verifique se o CEP é válido e tente novamente.')
      setInput("")
     
    }
  }
  
  return (
    <div className="container">

      <h1 className="title"> BUSCAR CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
       
        />


        <button  onClick={handleSearch} className="buttonSearch">
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>
           

           {Object.keys(cep).length > 0 && (   //estou verificando o "cep" atraves do "object" caso tenha alguma coisa é pra mostrar o main
            <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            
            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade}</span>

           </main>

           )}
           
      
    </div>
  );
}

export default App;
