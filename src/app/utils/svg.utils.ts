import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer)=> {
    const imgDir = 'assets/img/';
    const sidebarImgDir = `${imgDir}sidebar/`;
    const daysImgDir = `${imgDir}days/`;
    const avatarImgDir = `${imgDir}avatar/`;
    const iconsImgDir = `${imgDir}icons/`;
    ir.addSvgIconSetInNamespace('avatars',ds.bypassSecurityTrustResourceUrl(`${avatarImgDir}avatars.svg`));
    ir.addSvgIcon('unassigned',ds.bypassSecurityTrustResourceUrl(`${avatarImgDir}unassigned.svg`));
    
    ir.addSvgIcon('day',ds.bypassSecurityTrustResourceUrl(`${sidebarImgDir}day.svg`));
    ir.addSvgIcon('week',ds.bypassSecurityTrustResourceUrl(`${sidebarImgDir}week.svg`));
    ir.addSvgIcon('month',ds.bypassSecurityTrustResourceUrl(`${sidebarImgDir}month.svg`));
    ir.addSvgIcon('project',ds.bypassSecurityTrustResourceUrl(`${sidebarImgDir}project.svg`));
    ir.addSvgIcon('projects',ds.bypassSecurityTrustResourceUrl(`${sidebarImgDir}projects.svg`));
    ir.addSvgIcon('move',ds.bypassSecurityTrustResourceUrl(`${iconsImgDir}move.svg`));
    ir.addSvgIcon('add',ds.bypassSecurityTrustResourceUrl(`${iconsImgDir}add.svg`));
    ir.addSvgIcon('delete',ds.bypassSecurityTrustResourceUrl(`${iconsImgDir}delete.svg`));
    
    
    for(let i=1; i<=31; i++) {
        ir.addSvgIcon(`day${i}`, ds.bypassSecurityTrustResourceUrl(`${daysImgDir}day${i}.svg`));
    }
    
    ir.addSvgIcon('user1',ds.bypassSecurityTrustResourceUrl('assets/user.svg'));
}