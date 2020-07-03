import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DivEnum } from '../model/enumerators/divEnum';
import { Mensagem } from '../model/mensagem';
import { TreeServiceService } from '../services/tree-service.service';
import { Base } from '../utils/base';
import { InteracaoChatEnum } from '../model/enumerators/interacaoChatEnum';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent extends Base implements OnInit {

  private respostaRoboErro: string = InteracaoChatEnum.RESPOSTA_ERRO;
  public chat: Mensagem[] = [];
  public mensagensEmitidasPeloRobo: Mensagem[] = [];
  public formulario: FormGroup = new FormGroup(
    {
      "mensagem": new FormControl("")
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
          this.mensagensEmitidasPeloRobo.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, this.respostaRoboErro))
          this.rolarBarra()
        }, 1000);
      }
    }

  }

  private informarNome(): void {
    setTimeout(() => {
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, InteracaoChatEnum.INFORME_SEU_NOME))
      this.rolarBarra()
    }, 1000)
  }

  private continuarEdicao(): void {
    setTimeout(() => {
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, Entendi.`))
      this.rolarBarra()
    }, 1000)
  }

  // Validações e tratativas

  private validaSePerguntaFeitaFoiRelacionadaOpcaoUmOuDois(): boolean {
    return this.mensagensEmitidasPeloRobo[this.mensagensEmitidasPeloRobo.length - 1].conteudo == InteracaoChatEnum.OPCAO_INICIAL ? true : false;
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
