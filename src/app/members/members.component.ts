import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(
    private memberService: MemberService,
    // private MessageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getMembers();
  }

  // 後で出てくる?
  // onSelect(member: Member): void{
  //   this.selectedMember = member;
  // this.MessageService.add(`MembersComponent: 社員データ(id=${member.id})が選択されました`)；
  // }


  getMembers(): void {
    this.memberService.getMembers() //observable
    .subscribe(members => this.members= members);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.memberService.addMember({ name } as Member)
      .subscribe(member => {
        this.members.push(member);
      });
  }

  delete(member: Member): void{
    this.members = this.members.filter(m => m !== member);
    this.memberService.deleteMember(member).subscribe();
  }
}
