import './estilo.css'
import logo from '../../imagens/logo.svg'

function Logo() {
    return(
        <div className='Logo'>
            <img 
                src={logo} 
                alt='logo da alura books em formato de triângulo na cor laranja e arestas achatadas' 
                className='logo-img'
                ></img>
            <p><strong>JRF</strong> Gestora de Marcas</p>
      </div>
    )
}

export default Logo