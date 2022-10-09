import Image from "next/image";

export default function InputPublico({
  imagem,
  tipo,
  placeholder,
  value = "",
  exibirMensagemValidacao = false,
  mensagemValidacao = "",
  onChange,
}) {
  return (
    <div className="inputPublicoContainer">
      <div className="inputPublico">
        <Image
          src={imagem}
          alt="imagem do campo"
          className="iconeInputPublico"
          width={20}
          height={20}
        />
        <input
          type={tipo}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {exibirMensagemValidacao && (
        <p className="mensagemValidacao">{mensagemValidacao}</p>
      )}
    </div>
  );
}
