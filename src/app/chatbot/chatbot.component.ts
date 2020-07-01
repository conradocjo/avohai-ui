import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  faPaperPlane = faPaperPlane;

  constructor() { }

  ngOnInit(): void {
  }

}
