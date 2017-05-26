var lang = localStorage ? (localStorage.getItem('user-lang') || 'zh_CN') : 'zh_CN';
var appFile = 'translations/app-lang-' + lang + '.js';
var extFile = 'ext/locale/ext-lang-' + lang + '.js';
document.write('<script type="text/javascript" src="' + appFile + '"></script>');
document.write('<script type="text/javascript" src="' + extFile + '"></script>');