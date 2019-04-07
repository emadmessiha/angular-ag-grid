import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'tooltip',
    template: `<span>{{ message }}</span>`
})
export class TooltipComponent implements OnInit {
    @Input() message: string;
    @Input() for: HTMLElement;

    ngOnInit() {
    }
}