
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Step { id:number; title:string; subtitle?:string; status?: 'completed'|'active'|'pending' }

@Component({
  selector: 'app-stepper',
  // standalone:true,
  // imports: [   ],
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css'
})
export class Stepper {
  @Input() steps: any[] = [];
  // @Input() current: number = 0;
  // @Output() stepChanged = new EventEmitter<number>();
  @Input() current: number = 0;
  @Output() currentChange = new EventEmitter<number>();
  ngOnChanges() { this.updateStatuses(); }
  ngOnInit() { this.updateStatuses(); }

  updateStatuses(){
    this.steps = this.steps.map((s, i) => ({ ...s, status: i < this.current ? 'completed' : (i === this.current ? 'active' : 'pending') }));
  }

  // Called by parent after successful submit of current step
  markCurrentCompleteAndNext(){
    if(this.current < this.steps.length){
      // mark current completed and move to next
      this.current++;
      this.updateStatuses();
      this.currentChange.emit(this.current);
    }
  }

  // optionally expose next/prev too
  next(){ this.markCurrentCompleteAndNext(); }
  prev(){ if(this.current>0){ this.current--; this.updateStatuses(); this.currentChange.emit(this.current); } }
}
