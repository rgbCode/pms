app.view('search', (nm, vo, pm)=>{
	vo.list = ko.observableArray([
		{name:'상품1', amt:'10000'},
		{name:'상품2', amt:'20000'}
	]);

	vo.orderList = function(ev) {
		app.log('-', this)
		app.popup('pOrderList').bottomSheet({pop:'t'}, '/pms/biz/product/pOrderList.html');
	};
});
