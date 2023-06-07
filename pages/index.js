import Avatar from '@/componentes/avatar';
import Botao from '@/componentes/botao';
import { UploadImagem } from '@/componentes/uploadImagem'
import { useRef, useState } from 'react'

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <h1>Olá mundo!</h1>
      <Avatar/>
      <Botao texto={'Login'} cor='invertido' manipularClique={() => console.log('botão clicado')}/>
      <button onClick={() => referenciaInput?.current?.click()}>Abrir seletor de arquivos</button>

      <UploadImagem 
      setImagem={setImagem} 
      imagemPreview={imagem?.preview}
      aoSetarAReferencia={(ref) => referenciaInput.current = ref}
      />
    </>
  )
}
