import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DivEnum } from '../model/enumerators/divEnum';
import { Mensagem } from '../model/mensagem';
import { TreeServiceService } from '../services/tree-service.service';
import { Base } from '../utils/base';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent extends Base implements OnInit {

  public respostaRoboErro: string = "Não entendi, por favor certifique-se de que digitou a opção correta."
  // public respostaRoboContinuacao: string = "Ok, por favor certifique-se de que digitou a opção correta."
  public chat: Mensagem[] = [];
  public formulario: FormGroup = new FormGroup(
    {
      "mensagem": new FormControl("")
    }
  )

  constructor(private treeService: TreeServiceService) {
    super();
  }

  ngOnInit(): void {
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, "Seja bem vindo(a). Digite a opção desejada, para continuarmos:"))
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `1 - Cadastrar parente.    2 - Editar parente.`));
  }

  public enviarMensagem(): void {
    this.chat.push(new Mensagem(DivEnum.MENSAGEM_ENVIADA, this.formulario.value.mensagem))
    if (this.validaSePerguntaFeitaFoiRelacionadaOpcaoDesejada()) {
      if (this.validaSeOpcaoDigitadaEhUmOuDois()) {
        if (this.formulario.value.mensagem == 1) {
          this.continuarCadastro();
        } else {
          this.continuarEdicao();
        }
      } else {
        setTimeout(() => {
          this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, this.respostaRoboErro))
        }, 2000)
      }
    }
  }

  public continuarCadastro(): void {
    setTimeout(() => {
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, Entendi.`))
    }, 2000)

  }

  public continuarEdicao(): void {
    setTimeout(() => {
      this.chat.push(new Mensagem(DivEnum.MENSAGEM_RECEBIDA, `Ok, Entendi.`))
    }, 2000)
  }

  testerino(): void {
    var el = document.querySelector('.mensagens');
    var height = el.scrollHeight;
    el.scrollTop = height;
  }

  // Validações

  public validaSePerguntaFeitaFoiRelacionadaOpcaoDesejada(): boolean {
    return this.chat[this.chat.length - 1] ? true : false;
  }

  public validaSeOpcaoDigitadaEhUmOuDois(): boolean {
    return this.formulario.value.mensagem == 1 || this.formulario.value.mensagem == 2;
  }

}
