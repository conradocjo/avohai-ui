import { Component, OnInit } from '@angular/core';
import { TreeServiceService } from '../services/tree-service.service';
import { Base } from '../utils/base';

@Component({
  selector: 'avhi-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent extends Base implements OnInit {

  constructor(private treeService: TreeServiceService) {
    super();
  }

  ngOnInit(): void {
  }

  teste(): void {
    this.treeService.serviceTeste();
  }

}
