import InputPublico from "../inputPublico";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";
import { useState } from "react";

import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemKey from "../../public/imagens/key.svg";
import imagemLogo from "../../public/imagens/logo.svg";
import { validarEmail, validarSenha } from "../../utils/validadores";
import UsuarioService from "../../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);

  const validarFormulario = () => {
    return validarEmail(email) && validarSenha(senha);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario) {
      return;
    }

    setEstaSubmetendo(true);
    try {
      await usuarioService.login({
        login: email,
        senha,
      });
    } catch (error) {
      alert("Erro ao realizar login. " + error?.response?.data?.erro);
    }

    setEstaSubmetendo(false);
  };

  return (
    <section className={`paginaLogin paginaPublica`}>
      <div className="logoContainer">
        <Image src={imagemLogo} alt="Logotipo" layout="fill" className="logo" />
      </div>

      <div className="conteudoPaginaPublica">
        <form onSubmit={onSubmit}>
          <InputPublico
            imagem={imagemEnvelope}
            tipo="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            mensagemValidacao="O e-mail informado é invalido"
            exibirMensagemValidacao={email && !validarEmail(email)}
          />
          <InputPublico
            imagem={imagemKey}
            tipo="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
            mensagemValidacao="Precisa ter pelo menos 3 caracteres"
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <Button
            text={"Login"}
            type="submit"
            disabled={!validarFormulario() || estaSubmetendo}
          />
        </form>

        <div className="rodapePaginaPublica">
          <p>Não possui uma conta?</p>
          <Link href="/cadastro">Faça seu catrastro agora!</Link>
        </div>
      </div>
    </section>
  );
}
