import { trigger, state, transition, style, animate, keyframes, group } from '@angular/animations';

export const slideToRight = trigger(
    'routerAnim', [
        state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
        state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
    
        // transition('void => *', [
        transition(':enter', [
            style({transform: 'translateX(-100%)', opacity: 0}),
            group([
                animate('500ms ease-in-out', style({transform: 'translateX(0)'})),
                animate('500ms', style({opacity: 1}))
            ])
            
        ]),
        // transition('* => void', [
        transition(':leave', [
            style({transform: 'translateX(0)', 'opacity':'1'}),
            animate('500ms ease-in-out', style({transform: 'translateX(100%)', opacity: '0'}))
        ]),
    ]
)