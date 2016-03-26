import {Component} from 'angular2/core';
import {CONFIG} from '../config';

@Component({
  selector: 'header-nav',
  template: `
  <header>
    <div class="title">${CONFIG.appName}</div>
  </header>
  `,
  styles: [`
    header {
      display: flex;
      height: ${CONFIG.styles.rowHeight}px;
      background: ${CONFIG.styles.baseColor};
      color: ${CONFIG.styles.baseColorForeground};
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    
    header .title {
      font-size: 26px;
      font-weight: 300;
      padding: 10px 0 10px 20px;
      line-height: ${CONFIG.styles.rowHeight - 20}px;
    }
  `]
})
export class HeaderNavComponent {
}
