import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[selectMessage]'
})

export class SelectMessage {
    private counter: number = 0;
    constructor(private elRef: ElementRef) {}
    
    public highlight(activeClass: string) {
        this.elRef.nativeElement.classList.toggle(activeClass);
    }

    @HostListener('click') public onClick(): void {
        this.highlight('selected');
    }
}