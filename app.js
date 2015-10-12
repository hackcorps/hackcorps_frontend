import mainCss from './components/styles/main.scss';

import string from './components/layout/header/header_app.js';
document.write(string);

/*import _ from 'lodash'; */
/*var _ = require('lodash');*/
console.log(_.isEqual(2,2));

import hbs_template from './components/layout/header/templates/hbs_template.hbs';
document.write(hbs_template({name: 'webpack'}) );

import html_template from './components/layout/header/templates/html_template.html';
$('h1').after(html_template);

$('h1').css('color', 'green');
