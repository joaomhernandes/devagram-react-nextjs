import { useRef, useState } from "react";
import Avatar from "../components/avatar";
import Button from "../components/button";
import UploadImagem from "../components/uploadImagem";

export default function Home() {
  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  console.log(imagem);
  return (
    <>
      <h1>Olá mundo!</h1>
      <button
        onClick={() => {
          referenciaInput?.current.click();
        }}
      >
        abrir Seletor de Arquivos
      </button>
      <UploadImagem
        setImagem={setImagem}
        imagemPreview={imagem?.preview}
        aoSetarAReferencia={(ref) => (referenciaInput.current = ref)}
      />
      <div style={{ width: 200 }}>
        <Avatar />
        <Button text={"Login"} onClick={() => console.log("Botão clicado")} />
      </div>
    </>
  );
}
