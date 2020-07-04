import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DadosDoUsuario } from '../model/dadosDoUsuario';
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
  private tempoDeRetornoDoRobo = 1500;
  private tempoPraReiniciarAplicacao = 8000;
  private dadosDoUsuario: DadosDoUsuario;


  public formulario: FormGroup = new FormGroup(
    {
      "mensagem": new FormControl("", Validators.required)
    }
  )

  constructor(private treeService: TreeServiceService) {
    super();
  }

  ngOnInit(): void {
    this.dadosDoUsuario = new DadosDoUsuario();
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.BEM_VINDO));
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCAO_INICIAL));
    this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.BEM_VINDO));
    this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCAO_INICIAL));
  }

  public enviarMensagem(): void {
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_ENVIADA, this.formulario.value.mensagem))
    this.tratativaEscolhaCadastroEdicao();
    this.preencheNomeEChamaFuncaoPraPreencherPaternalGreaterGrandFather();
    this.preenchePaternalGreaterGrandFatherEChamaMaternal();
    this.preencheMaternalGreaterGrandFatherEChamaPaternalGreaterGrandMother();
    this.preenchePaternalGrandMotherEChamaGreaterGrandMother();
    this.preencheMaternalGrandMotherEChamaPaternal();
    this.preenchePaternalGrandFatherEChamaGrandFather();
    this.preencheMaternalGrandFatherEChamaPaternalGrandMother();
    this.preenchePaternalGrandMotherChamaMaternalGrandMother();
    this.preencheMaternalGrandMotherEChamaNomePai();
    this.preencheNomeDoPaiEChamaNomeMae();
    this.preencheNomeMaeESalvaObjeto();
    this.limpaComponenteDeTexto();
  }

  //Métodos Auxiliares ao método "enviarMensagem()"

  private limpaComponenteDeTexto() {
    this.formulario = new FormGroup(
      {
        "mensagem": new FormControl(null, Validators.required)
      }
    );
  }

  private preencheNomeMaeESalvaObjeto() {
    if (this.validaSeUltimaPerguntaFoiFeitaSobreNomeDaMae()) {
      this.dadosDoUsuario.nomeMae = this.chat[this.chat.length - 1].conteudo;
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, ${this.dadosDoUsuario.nomeUsuario}. estou guardando todas suas informações...`));
      this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
      setTimeout(() => {
        window.location.reload();
      }, this.tempoPraReiniciarAplicacao);
    }
  }

  private preencheNomeDoPaiEChamaNomeMae() {
    if (this.validaSeUltimaPerguntaFoiFeitaSobreNomeDoPai()) {
      this.dadosDoUsuario.nomePai = this.chat[this.chat.length - 1].conteudo;
      this.informarNomeDaMae();
    }
  }

  private preencheMaternalGrandMotherEChamaNomePai() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandMother()) {
      this.dadosDoUsuario.maternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
      this.informarNomeDoPai();
    }
  }

  private preenchePaternalGrandMotherChamaMaternalGrandMother() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandMother()) {
      this.dadosDoUsuario.paternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
      this.informarMaternalGrandMother();
    }
  }

  private preencheMaternalGrandFatherEChamaPaternalGrandMother() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGrandFather()) {
      this.dadosDoUsuario.maternalGrandFatherName = this.chat[this.chat.length - 1].conteudo;
      this.informarPaternalGrandMother();
    }
  }

  private preenchePaternalGrandFatherEChamaGrandFather() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGrandFather()) {
      this.dadosDoUsuario.paternalGrandFatherName = this.chat[this.chat.length - 1].conteudo;
      this.informarMaternalGrandFather();
    }
  }

  private preencheMaternalGrandMotherEChamaPaternal() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandMother()) {
      this.dadosDoUsuario.maternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
      this.informarPaternalGrandFather();
    }
  }

  private preenchePaternalGrandMotherEChamaGreaterGrandMother() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandMother()) {
      this.dadosDoUsuario.paternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
      this.informarMaternalGreaterGrandMother();
    }
  }

  private preencheMaternalGreaterGrandFatherEChamaPaternalGreaterGrandMother() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreMaternalGreaterGrandFather()) {
      this.dadosDoUsuario.maternalGreaterGrandFatherName = this.chat[this.chat.length - 1].conteudo;
      this.informarPaternalGreaterGrandMother();
    }
  }

  private preenchePaternalGreaterGrandFatherEChamaMaternal() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandFather()) {
      this.dadosDoUsuario.paternalGreaterGrandFatherName = this.chat[this.chat.length - 1].conteudo;
      this.informarMaternalGreaterGrandFather();
    }
  }

  private preencheNomeEChamaFuncaoPraPreencherPaternalGreaterGrandFather() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreNomeDoUsuario()) {
      this.dadosDoUsuario.nomeUsuario = this.chat[this.chat.length - 1].conteudo;
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, ${this.dadosDoUsuario.nomeUsuario}. Vamos continuar ...`));
      this.informarPaternalGreaterGrandFather();
    }
  }

  private tratativaEscolhaCadastroEdicao() {
    if (this.validaSePerguntaFeitaFoiRelacionadaOpcaoUmOuDois()) {
      if (this.validaSeOpcaoDigitadaEhUmOuDois()) {
        if (this.formulario.value.mensagem == 1) {
          this.informarNome();
        }
        else {
          this.continuarEdicao();
        }
      }
      else {
        setTimeout(() => {
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, this.respostaRoboErro));
          this.rolarBarra();
        }, this.tempoDeRetornoDoRobo);
      }
    }
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
