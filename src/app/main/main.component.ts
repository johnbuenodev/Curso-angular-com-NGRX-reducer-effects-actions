import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  numberChoose: number = 26;
  stringChoose: string = 'Cientista';

  constructor() { }

  ngOnInit(): void {
  }

}
