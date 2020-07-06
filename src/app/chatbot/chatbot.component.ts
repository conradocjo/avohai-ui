import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DadosDoUsuario } from '../model/dadosDoUsuario';
import { DivEnum } from '../model/enumerators/divEnum';
import { InteracaoChatEnum } from '../model/enumerators/interacaoChatEnum';
import { Mensagem } from '../model/mensagem';
import { TreeServiceService } from '../services/tree-service.service';
import { UsersService } from '../services/users.service';
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
  private opcaoDigitadaParaEdicao: string;

  public formulario: FormGroup = new FormGroup(
    {
      "mensagem": new FormControl("", Validators.required)
    }
  )

  constructor(
    private treeService: TreeServiceService,
    private userService: UsersService
  ) {
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
    this.realizaTratativaAtravesDaEscolhaCadastroEdicao();
    this.preencheNomeEChamaFuncaoPraPreencherCPF();
    this.preencheCpfEChamaFuncaoPraPreencherPaternalGreaterGrandFather();
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
    this.verificaSeUsuarioExisteNoBancoParaDarContinuidadeAEdicaoOuCadastro();
    this.enviaRespostasRelacionadasAContinuacaoCadastrouOuEdicao();
    this.guardaOpcaoEscolhidaEDirecionaParaEdicao();
    this.gravarDadosDaEdicao();
    ;


    setInterval(() => {
      var el = document.querySelector('.mensagens');
      var height = el.scrollHeight;
      el.scrollTop = height;
    }, 100)
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
      this.dadosDoUsuario.maternalGreaterGrandMotherName = this.chat[this.chat.length - 1].conteudo;
      this.informarPaternalGrandFather();
    }
  }

  private preenchePaternalGrandMotherEChamaGreaterGrandMother() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobrePaternalGreaterGrandMother()) {
      this.dadosDoUsuario.paternalGreaterGrandMotherName = this.chat[this.chat.length - 1].conteudo;
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

  private preencheNomeEChamaFuncaoPraPreencherCPF() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreNomeDoUsuario()) {
      this.dadosDoUsuario.nomeUsuario = this.chat[this.chat.length - 1].conteudo;
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, ${this.dadosDoUsuario.nomeUsuario}. Vamos continuar ...`));
      this.informeCPF();
    }
  }

  private preencheCpfEChamaFuncaoPraPreencherPaternalGreaterGrandFather() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreCPFDoUsuario()) {
      this.dadosDoUsuario.cpf = this.chat[this.chat.length - 1].conteudo;
      this.informarPaternalGreaterGrandFather();
    }
  }

  private realizaTratativaAtravesDaEscolhaCadastroEdicao() {
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
          ;
        }, this.tempoDeRetornoDoRobo);
      }
    }
  }

  //Métodos da parte de edição

  private continuarEdicao(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_CPF_EDICAO))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_CPF_EDICAO))

    }, this.tempoDeRetornoDoRobo)
  }

  private verificaSeUsuarioExisteNoBancoParaDarContinuidadeAEdicaoOuCadastro() {
    if (this.validaSeUltimaPerguntaFeitaFoiSobreCpfEdicao()) {
      this.userService.verificaSeUsuarioExiste(this.chat[this.chat.length - 1].conteudo)
        .then((existe) => {
          if (existe) {
            setTimeout(() => {
              this.treeService.buscarUsuario(this.chat[this.chat.length - 1].conteudo)
                .then((reposta) => {
                  this.dadosDoUsuario = reposta;
                })
              this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO));
              this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCOES_EDICAO));
              this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO))
              this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.OPCOES_EDICAO));
            }, this.tempoDeRetornoDoRobo);
          } else {
            setTimeout(() => {
              this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_USUARIO_NAO_CADASTRADO));
              this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_CONTINUAR_CADASTRO));
              this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_USUARIO_NAO_CADASTRADO));
              this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_CONTINUAR_CADASTRO));
            }, this.tempoDeRetornoDoRobo);
          }
        }).then(() => {
          ;
        })
    }

  }


  private guardaOpcaoEscolhidaEDirecionaParaEdicao() {
    if (this.validaSeUltimaOpcaoFoiSugestaoDeEdicaoPorOpcoes()) {
      setTimeout(() => {
        this.opcaoDigitadaParaEdicao = this.chat[this.chat.length - 1].conteudo;
        this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_DIGITE_NOVO_VALOR));
        this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_DIGITE_NOVO_VALOR));
      }, this.tempoDeRetornoDoRobo);
    }
  }

  private gravarDadosDaEdicao(): void {
    if (this.validaSeUltimaOpcaoDigitadaFoiParaDigitarNovoValor()) {
      switch (this.opcaoDigitadaParaEdicao) {
        case '1':
          this.dadosDoUsuario.nomePai = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do seu pai para ${this.dadosDoUsuario.nomePai} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;

        case '2':
          this.dadosDoUsuario.nomeMae = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome da sua mãe para ${this.dadosDoUsuario.nomeMae} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '3':
          this.dadosDoUsuario.paternalGrandFatherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do seu avô paterno para ${this.dadosDoUsuario.paternalGrandFatherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '4':
          this.dadosDoUsuario.paternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do sua avó paterna para ${this.dadosDoUsuario.paternalGrandMotherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '5':
          this.dadosDoUsuario.maternalGrandFatherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do seu avô materno para ${this.dadosDoUsuario.maternalGrandFatherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '6':
          this.dadosDoUsuario.maternalGrandMotherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome da sua avó materna para ${this.dadosDoUsuario.maternalGrandMotherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '7':
          this.dadosDoUsuario.paternalGreaterGrandFatherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do seu bisavô paterno para ${this.dadosDoUsuario.paternalGreaterGrandFatherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '8':
          this.dadosDoUsuario.paternalGreaterGrandMotherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome da sua bisavó paterna para ${this.dadosDoUsuario.paternalGreaterGrandMotherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '9':
          this.dadosDoUsuario.maternalGreaterGrandFatherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome do seu bisavô materno para ${this.dadosDoUsuario.maternalGreaterGrandFatherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;
        case '10':
          this.dadosDoUsuario.maternalGreaterGrandMotherName = this.chat[this.chat.length - 1].conteudo;
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Muito obrigado por sua colaboração, 
          ${this.dadosDoUsuario.nomeUsuario}. estou atualizando nome da sua bisavó materna para ${this.dadosDoUsuario.maternalGreaterGrandMotherName} .`));

          this.treeService.salvarDadosDoUsuario(this.dadosDoUsuario);
          break;

        default:
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO_INVALIDA));
          this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO_INVALIDA));
          break;
      }
      ;
    }
  }

  private enviaRespostasRelacionadasAContinuacaoCadastrouOuEdicao() {
    if (this.validaSeUltimaOpcaoFoiSugestaoDeCadastroPorNaoEncontrarCPF()) {
      setTimeout(() => {
        switch (this.chat[this.chat.length - 1].conteudo) {
          case '1':
            this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.CONTINUAR_CADASTRO));
            this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.CONTINUAR_CADASTRO));
            this.informarNome();
            break;

          case '2':
            this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_ATE_LOGO));
            this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_ATE_LOGO));
            break;

          default:
            this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO_INVALIDA));
            this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.RESPOSTA_OPCAO_EDICAO_INVALIDA));
            break;
        }
        ;
      }, this.tempoDeRetornoDoRobo)
    }
  }

  //Métodos da parte de cadasstro
  private informarNome(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_NOME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_NOME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informeCPF(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_CPF))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_CPF))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGreaterGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_FATHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGreaterGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_FATHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGreaterGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GREATER_GRAND_MOTHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGreaterGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GREATER_GRAND_MOTHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_FATHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGrandFather(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_FATHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarPaternalGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.PATERNAL_GRAND_MOTHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarMaternalGrandMother(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MATERNAL_GRAND_MOTHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarNomeDoPai(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.FATHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.FATHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  private informarNomeDaMae(): void {
    setTimeout(() => {
      this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MOTHER_NAME))
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.MOTHER_NAME))

    }, this.tempoDeRetornoDoRobo)
  }

  // Validações e tratativas

  private validaSeUltimaOpcaoFoiSugestaoDeCadastroPorNaoEncontrarCPF(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.RESPOSTA_CONTINUAR_CADASTRO ? true : false;
  }

  private validaSeUltimaOpcaoDigitadaFoiParaDigitarNovoValor(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.RESPOSTA_DIGITE_NOVO_VALOR ? true : false;
  }

  private validaSeUltimaOpcaoFoiSugestaoDeEdicaoPorOpcoes(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.OPCOES_EDICAO ? true : false;
  }

  private validaSePerguntaFeitaFoiRelacionadaOpcaoUmOuDois(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.OPCAO_INICIAL ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreNomeDoUsuario(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.INFORME_SEU_NOME ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreCPFDoUsuario(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.INFORME_SEU_CPF ? true : false;
  }

  private validaSeUltimaPerguntaFeitaFoiSobreCpfEdicao(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.INFORME_SEU_CPF_EDICAO ? true : false;
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

  mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log(mutation);
    });
  });

}
