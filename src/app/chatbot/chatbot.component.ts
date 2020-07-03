import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DivEnum } from '../model/enumerators/divEnum';
import { InteracaoChatEnum } from '../model/enumerators/interacaoChatEnum';
import { Mensagem } from '../model/mensagem';
import { TreeServiceService } from '../services/tree-service.service';
import { Base } from '../utils/base';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent extends Base implements OnInit {

  private respostaRoboErro: string = InteracaoChatEnum.RESPOSTA_ERRO;
  public chat: Mensagem[] = [];
  public mensagensEmitidasPeloRobo: Mensagem[] = [];
  private tempoDeRetornoDoRobo = 1000;
  private nomeUsuario: string;


  public formulario: FormGroup = new FormGroup(
    {
      "mensagem": new FormControl("", Validators.required)
    }
  )

  constructor(private treeService: TreeServiceService) {
    super();
  }

  ngOnInit(): void {
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.BEM_VINDO));
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCAO_INICIAL));
    this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.BEM_VINDO));
    this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCAO_INICIAL));
  }

  public enviarMensagem(): void {
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_ENVIADA, this.formulario.value.mensagem))

    if (this.validaSePerguntaFeitaFoiRelacionadaOpcaoUmOuDois()) {
      if (this.validaSeOpcaoDigitadaEhUmOuDois()) {
        if (this.formulario.value.mensagem == 1) {
          this.informarNome();
        } else {
          this.continuarEdicao();
        }
      } else {
        setTimeout(() => {
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, this.respostaRoboErro))
          this.rolarBarra()
        }, 1000);
      }
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobreNomeDoUsuario()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.nomeUsuario = this.chat[this.chat.length - 1].conteudo;
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, ${this.chat[this.chat.length - 1].conteudo}. Vamos continuar ...`))
      this.informarPaternalGreaterGrandFather();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandFather()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarMaternalGreaterGrandFather();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandFather()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarPaternalGreaterGrandMother();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandMother()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarMaternalGreaterGrandMother();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandMother()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarPaternalGrandFather();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandFather()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarMaternalGrandFather();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandFather()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarPaternalGrandMother();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandMother()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarMaternalGrandMother();
    }

    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandMother()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarNomeDoPai();
    }

    if (this.validaSeUltimaPerguntaFoiFeitaSobreNomeDoPai()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      this.informarNomeDaMae();
    }

    if (this.validaSeUltimaPerguntaFoiFeitaSobreNomeDaMae()) {
      console.log(this.chat[this.chat.length - 1].conteudo) //Adicionar o dado ao objeto
      //Salvar objeto completo aqui
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, ${this.nomeUsuario}. estou guardando todas suas informações...`))
      setTimeout(() => {
        window.location.reload();
      }, 8000)
    }

    this.formulario = new FormGroup(
      {
        "mensagem": new FormControl(null, Validators.required)
      }
    );

  }

  //Métodos da parte de edição

  private continuarEdicao(): void {
    setTimeout(() => {
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, Entendi.`))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  //Métodos da parte de cadasstro
  private informarNome(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_NOME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_NOME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGreaterGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_FATHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGreaterGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_FATHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGreaterGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGreaterGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_FATHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_FATHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_MOTHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_MOTHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarNomeDoPai(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.FATHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  private informarNomeDaMae(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MOTHER_NAME))
      this.rolarBarra()
    }, this.tempoDeRetornoDoRobo)
  }

  // Validações e tratativas

  private validaSePerguntaFeitaFoiRelacionadaOpcaoUmOuDois(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.OPCAO_INICIAL ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreNomeDoUsuario(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.INFORME_SEU_NOME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandFather(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.PATERNAL_GREATER_GRAND_FATHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandFather(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.MATERNAL_GREATER_GRAND_FATHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandMother(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.PATERNAL_GREATER_GRAND_MOTHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandMother(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.MATERNAL_GREATER_GRAND_MOTHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandFather(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.PATERNAL_GRAND_FATHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandFather(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.MATERNAL_GRAND_FATHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandMother(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.PATERNAL_GRAND_MOTHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandMother(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.MATERNAL_GRAND_MOTHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFoiFeitaSobreNomeDoPai(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.FATHER_NAME ? true : false;
  }

  private validaSeUltimaPerguntaFoiFeitaSobreNomeDaMae(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.MOTHER_NAME ? true : false;
  }

  private validaSeOpcaoDigitadaEhUmOuDois(): boolean {
    return this.formulario.value.mensagem == 1 || this.formulario.value.mensagem == 2;
  }

  private rolarBarra(): void {
    var el = document.querySelector('.mensagens');
    var height = el.scrollHeight;
    el.scrollTop = height;
  }

}
