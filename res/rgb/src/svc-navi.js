app.service('navi', x=>{
	const [header, drawer] = [$('.mdl-layout__header'), $('.mdl-layout__drawer')];
	return {render, title, search}

	function render() {
		header.html(`<div class="mdl-layout__header-row">
			<span class="mdl-layout-title">PMS</span>
			<div class="mdl-layout-spacer"></div>
			<nav class="mdl-navigation">
				<a class="mdl-navigation__link" href=""><i class="material-icons">power_settings_new</i></a>
			</nav>
		</div>`);
		drawer.html(`
			<span class="mdl-layout-title">PMS</span>
			<nav class="mdl-navigation">
				<a class="mdl-navigation__link" href="">상품조회</a>
				<a class="mdl-navigation__link" href="">상품등록</a>
				<a class="mdl-navigation__link" href="">주문내역</a>
				<a class="mdl-navigation__link" href="">주문내역</a>
			</nav>
		`);
	}
	function title(vl) {
		if(!vl) return $('.mdl-layout-title').text()
		$('.mdl-layout-title').text(vl)
	}
	function search(fn) {
		const srch = $('<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right"/>')
			.html(`
				<label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-search">
				<i class="material-icons">search</i>
				</label>
				<div class="mdl-textfield__expandable-holder">
				<input class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-search">
				</div>
			`);
		$('.mdl-layout__header .mdl-layout__header-row').append(`
			<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
			<label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-search">
			<i class="material-icons">search</i>
			</label>
			<div class="mdl-textfield__expandable-holder">
			<input class="mdl-textfield__input" type="text" name="sample" id="fixed-header-drawer-search">
			</div>
		</div>`)
		$('#fixed-header-drawer-search').keypress(e=>{
			e.which==13 && fn && fn(e.target.value)
		})
	}
});
app.service('navi').render();
