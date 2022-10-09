import Image from "next/image";
import Link from "next/link";
import Button from "../../components/button";
import InputPublico from "../../components/inputPublico";
import UploadImagem from "../../components/uploadImagem";
import { useState } from "react";
import {
  validarEmail,
  validarSenha,
  validarNome,
  validarConfirmacaoSenha,
} from "../../utils/validadores";
import UsuarioService from "../../services/UsuarioService";

import imagemLogo from "../../public/imagens/logo.svg";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemKey from "../../public/imagens/key.svg";
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imagemAvatar from "../../public/imagens/avatar.svg";

const usuarioService = new UsuarioService();

export default function Cadastro() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [estaSubmetendo, setEstaSubmetendo] = useState(false);

  const validarFormulario = () => {
    return (
      validarNome(nome) &&
      validarEmail(email) &&
      validarSenha(senha) &&
      validarConfirmacaoSenha(senha, confirmarSenha)
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }

    setEstaSubmetendo(true);

    try {
      const corpoReqCadastro = new FormData();
      corpoReqCadastro.append("nome", nome);
      corpoReqCadastro.append("email", email);
      corpoReqCadastro.append("senha", senha);

      if (imagem?.arquivo) {
        corpoReqCadastro.append("file", imagem.arquivo);
      }

      await usuarioService.cadastro(corpoReqCadastro);
      alert("Sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar usuário. " + error?.response?.data?.erro);
    }
    setEstaSubmetendo(false);
  };

  return (
    <section className={`paginaCadastro paginaPublica`}>
      <div className="logoContainer desktop">
        <Image src={imagemLogo} alt="Logotipo" layout="fill" className="logo" />
      </div>

      <div className="conteudoPaginaPublica">
        <form onSubmit={onSubmit}>
          <UploadImagem
            setImagem={setImagem}
            imagemPreview={imagem?.preview || imagemAvatar.src}
            imagemPreviewClassName="avatar avatarPreview"
          />

          <InputPublico
            imagem={imagemUsuarioAtivo}
            tipo="text"
            placeholder="Nome Completo"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            mensagemValidacao="O nome precisa possuir pelo menos 2 caracteres"
            exibirMensagemValidacao={nome && !validarNome(nome)}
          />

          <InputPublico
            imagem={imagemEnvelope}
            tipo="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            mensagemValidacao="O e-masil informado é inválido"
            exibirMensagemValidacao={email && !validarEmail(email)}
          />
          <InputPublico
            imagem={imagemKey}
            tipo="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
            mensagemValidacao="A senha deve possuir pelo menos 3 caracteres"
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <InputPublico
            imagem={imagemKey}
            tipo="password"
            placeholder="Confirmar senha"
            onChange={(e) => setConfirmarSenha(e.target.value)}
            value={confirmarSenha}
            mensagemValidacao="As senhas devem ser iguais"
            exibirMensagemValidacao={
              confirmarSenha && !validarConfirmacaoSenha(senha, confirmarSenha)
            }
          />
          <Button
            text={"Cadastrar"}
            type="submit"
            disabled={!validarFormulario() || estaSubmetendo}
          />
        </form>

        <div className="rodapePaginaPublica">
          <p>Já possui uma conta?</p>
          <Link href="/">Faça seu Login!</Link>
        </div>
      </div>
    </section>
  );
}
