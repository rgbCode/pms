app.service('http', x=>{
	return {text, ajax, submit};

	function text(url) {
		return (p => {
			url ? $.ajax({
				type: 'get',
				contentType: 'text/html',
				url: `${url}?v=${Date.now()}`,
				success: r => p.resolve(r),
				error: r => r.status==200 ? p.resolve(r.responseText) : p.reject(r)
			}) : p.resolve()
			return p.promise()
		})($.Deferred());
	}
	function ajax() {
	}
	function submit(url, prm={}, bProg=true) {
		bProg && app.resource('progressOn');
        return (p=>{
        	$.ajax({
				type: 'post',
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded;charset=utf-8',
				xhrFields: {withCredentials:true},
				url: url,
				data: Object.entries(prm).map((v)=>encodeURIComponent(v.join('='))).join('&'),
				success: r => {return bProg && app.resource('progressOff'), p.resolve(r)},
				error: r => r.status==200 ? p.resolve(r.responseText) : p.reject(r)
        	})
			return p.promise()
        })($.Deferred());
	}
});
app.popup('alert', (nm, vo, pm)=>{
	vo.msg = ko.observable(pm);
	vo.ok = x => app.popup(nm).close(true);
})
app.popup('confirm', (nm, vo, pm)=>{
	vo.msg = ko.observable(pm);
	vo.ok = x => app.popup(nm).close(true);
	vo.cancel = x => app.popup(nm).close(false);
})
app.popup('yesno', (nm, vo, pm)=>{
	vo.msg = ko.observable(pm);
	vo.ok = x => app.popup(nm).close(true);
	vo.cancel = x => app.popup(nm).close(false);
})
app.popup('toast', (nm, vo, pm)=>{
	vo.msg = ko.observable(pm);
})
