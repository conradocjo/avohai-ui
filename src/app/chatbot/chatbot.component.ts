import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { github, linkedin, githubPerfil, linkedinPerfil } from '../utils/links';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  public faPaperPlane = faPaperPlane;
  public github = github;
  public linkedin = linkedin;
  public githubPerfil = githubPerfil;
  public linkedinPerfil = linkedinPerfil;

  constructor() { }

  ngOnInit(): void {
  }

  teste():void {
    console.log("teste")
  }

}
