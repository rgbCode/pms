!function(){
window.app = (x=>{
	let _debug=true;
	const _o={}, _svc={}, _vi={}, _pop={};
	$('head').append(`<style>
		@-webkit-keyframes progressbar {
			0% {width:0; margin-left:0}
			80% {width:100%; margin-left:0}
			100% {margin-left:100%}
		}
		@keyframes progressbar {
			0% {width:0; margin-left:0}
			80% {width:100%; margin-left:0}
			100% {width:100%; margin-left:100%}
		}

		[data-bind-view] {display:none;}
		#__resource__ {position:fixed; top:0; left:0; width:100%; z-index:99999}
		#__resource__ .__dimmed__ {position:absolute; top:0; left:0; width:100%; background:#fff; opacity:.9;}
		#__resource__ .__progress__ {position:fixed; top:0; left:0; width:100%; background:#fff; text-align:center;}
		#__resource__ .__progress__ .msg {padding:5px; color:#fff; background-color:#555;}
		#__resource__ .__progress__ .bar {height:5px; border-radius:2px; background-color:#aaa; animation:progressbar 10s infinite; -webkit-animation:progressbar 10s infinite;}
		#__resource__ .__popup__ {position:absolute; left:5%; width:90%; background:#fff; border-radius:3px; box-shadow:1px 1px 10px 0px #aaa; display:none;}
		#__resource__ .__popup__ >div {padding:10px;}
		#__resource__ .__popup__ .content {overflow-y:auto;}
		#__resource__ .__popup__ .bottom {border-top:1px solid #ccc; text-align:right; display:none;}
		#__resource__ .__popup__ .bottom button {margin-left:10px; padding:0 10px 0 10px;}
		#__resource__ .__bottomSheet__ {position:fixed; bottom:0; padding:14px 0 14px 0; width:100%; box-shadow:0px 5px 20px 0px #aaa; display:none;}
		#__resource__ .__bottomSheet__ .close {position:absolute; top:-28px; right:36px;}
		#__resource__ .__bottomSheet__ .content {padding:0 14px 0 14px; background:#fff; overflow-y:auto;}
		@media (min-width: 480px) {
			#__resource__ .__bottomSheet__ {left:15%; max-width:70%;}
		}

		.mdl-mini-footer {background-color:#ccc;}
	</style>`);
	return {log, mode, service, resource, view, popup};

	function log(...p) {
		_debug && console && console.log(...p)
	}
	function mode(m) {
		_debug = m
	}
	function service(nm,fn) {
		if(!fn) return _svc[nm]();
		_svc[nm] = fn;
	}
	function resource(nm, ...p) {
		const isResource = $('#__resource__').length;
		const resource = isResource ? $('#__resource__') : $('<div id="__resource__"/>');
		const sheet = isResource ? $('#__resource__ .__bottomSheet__') : $('<div class="__bottomSheet__"/>');
		const modal = isResource ? $('#__resource__ .__modal__') : $('<div class="__modal__"/>');

		!isResource && $('body').append(resource.append(sheet.html(`
			<button class="close mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
			<i class="material-icons">clear</i>
			</button>
			<div class="content"/>
		`)).append(modal));

		const fn = {dimmed, progressOn, progressOff, modalOn, modalOff, sheetOn, sheetOff};
		return fn[nm] && fn[nm](...p);

		// resource dimmed
		function dimmed() {
			const dim = $('<div class="__dimmed__"/>');
			dim.height($('body').height() + 100);

			modal.find('.__dimmed__').remove();
			if(modal.children().length) {
				modal.children().last().before(dim);
			} else {
				$('body').css({overflow:'auto'});				
			}
		}
		// resource progressOn
		function progressOn(msg='') {
			if(modal.find('.__progress__').length) return;

			modal.append(`<div class="__progress__">
				<div class="msg">
					<div class="bar"></div>
					${msg}
				</div>
			</div>`);

			dimmed();
		}
		// resource progressOff
		function progressOff() {
			modal.find('.__progress__').remove()
			dimmed();
		}
		// resource modalOn
		function modalOn() {
			const popup = $(`<div class="__popup__"/>`).css({
				top: `${$(window).height()*0.1}px`
			});
			const content = $('<div class="content"/>').css({
				'max-height': `${$(window).height()*0.7}px`
			});
			const bottom = $(`<div class="bottom"></div>`);

			popup.append(
				$('<div/>').append(content)
			).append(bottom)
			modal.append(popup);
			dimmed();
			return {popup, content, bottom};
		}
		function modalOff() {
			modal.find('.__popup__').last().remove();
			dimmed();
		}
		function sheetOn() {
			const close = $('#__resource__ .__bottomSheet__ .close');
			const content = $('#__resource__ .__bottomSheet__ .content');
			// sheet.css({
			// 	'max-height': $(window).height() * 0.4
			// });
			content.css({
				'max-height': $(window).height() * 0.4
			});
			return {sheet, close, content};
		}
		function sheetOff() {
			sheet.hide();
		}
	}
	function view(nm, fn) {
		const vs = $(`[data-bind-view=${nm}]`)
		if(fn) {
			_vi[nm]={fn, vo:{}, on:{}, vl:{}};
			$(vs).hide();
		}
		return {load, visible};

		// view local
		function load(pm, tpl) {
			_vi[nm]['fn'] && _vi[nm]['fn'](nm, _vi[nm]['vo'], pm);

			app.service('http').text(typeof tpl == 'string' && tpl).then(txt=>{
				vs.html(typeof tpl == 'string' ? txt : tpl);
				ko.cleanNode(vs.get(0));
				ko.applyBindings(_vi[nm]['vo'], vs.get(0));
				setTimeout(x=>{vs.show()}, 1)
			});
		}
		function visible(b) {
			b ? vs.show() : vs.hide()
		}
	}
	function popup(nm, fn) {
		if(fn) {
			_pop[nm] = {fn, vo:{}, df:{}};
		}
		return {modal, close, bottomSheet};

		// modal dialog
		function modal(pm, tpl) {
			if(!_pop[nm]) throw 'not instance popup';
			
			$('body').css({overflow:'hidden'});
			const {popup, content, bottom} = resource('modalOn');
			const btnClass = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';

			defPopup({
				alert: `<button class="${btnClass} mdl-button--primary" data-bind="click:ok">확 인</button>`,
				confirm: `<button class="${btnClass} mdl-button--primary" data-bind="click:ok">확 인</button>
					<button class="${btnClass}" data-bind="click:cancel">취 소</button>`,
				yesno: `<button class="${btnClass} mdl-button--primary" data-bind="click:ok">예</button>
					<button class="${btnClass}" data-bind="click:cancel">아니오</button>`
			}[nm]);

			_pop[nm]['fn'] && _pop[nm]['fn'](nm, _pop[nm]['vo'], pm)
			app.service('http').text(typeof tpl == 'string' && tpl).then(txt=>{
				content.html(typeof tpl == 'string' ? txt : tpl);
				ko.cleanNode(popup.get(0));
				ko.applyBindings(_pop[nm]['vo'], popup.get(0));
				popup.find('.mdl-button').each((k,v)=>{
					componentHandler.upgradeElement(v);
				})
				popup.show();
			});

			_pop[nm]['df'] = $.Deferred();
			return _pop[nm]['df'].promise();

			function defPopup(btn) {
				if(!btn) return;
				content.html('<div data-bind="html:msg"/>').css({
					padding: '20px 10px 20px 10px',
					'text-align': 'center',
				});
				bottom.html(btn).show();
			}
		}
		// modal dialog close
		function close(ro) {
			resource('modalOff');
			_pop[nm]['df'].resolve(ro)
		}
		// modeless dialog
		function bottomSheet(pm, tpl) {
			if(!_pop[nm]) throw 'not instance popup';

			const {sheet, close, content} = resource('sheetOn');
			defSheet({
				toast: true,
			}[nm]);

			_pop[nm]['fn'] && _pop[nm]['fn'](nm, _pop[nm]['vo'], pm)
			app.service('http').text(typeof tpl == 'string' && tpl).then(txt=>{
				content.html(typeof tpl == 'string' ? txt : tpl);
				sheet.find('.mdl-button').each((k,v)=>{
					componentHandler.upgradeElement(v);
				})
				ko.cleanNode(content.get(0));
				ko.applyBindings(_pop[nm]['vo'], content.get(0));
				sheet.show();
			});

			close.off('click').on('click', e=>{
				resource('sheetOff');
			});

			function defSheet(is) {
				if(!is) return;
				content.html('<div data-bind="html:msg"/>');
				close.hide();
				setTimeout(x=>{
					close.trigger('click');
				}, 3000);
			}
		}
	}
})();
}();
