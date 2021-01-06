import { Component, OnInit } from "@angular/core";
import { JwtService } from 'src/app/core/services/jwt.service';
import { HistoryService } from './history.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  flag = false;
  search: any;
  userId = this.jwtServ.getUserId();
  // Array
  history: History[];
  constructor(private historyServ: HistoryService,
    private jwtServ: JwtService) {}
  ngOnInit() {
    this.viewHistory();
  }

  viewHistory(){
    this.historyServ.view(this.userId).subscribe(data => {
      console.log(data);
      if(data.success){
        this.history = data.view;
        this.flag = true;
      } else {
        this.flag = false;
      }
    });
  }
  deleteHistory(){
    
    this.historyServ.delete(this.userId).subscribe(data => {
      console.log(data);
      this.history = data.view;
      this.flag = false;
      this.viewHistory();
    });   
  }
}

export class History{
  history: object;
}