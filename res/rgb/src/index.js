// app.service('navi').search(v=>{
// 	app.log('v', v)
// });

// test
//--------------------------------------------------
app.view('index', (nm, vo, pm)=>{
	app.service('navi').title('PMS22');

	vo.test = e=>{
		app.service('http').submit('https://rgb-code.000webhostapp.com/data/biz/list.json').then(rs=>{
			app.log('rs',rs)
		})
	};
	vo.alert = e=>{
		app.popup('alert').modal('aaaa')
	};
});
app.view('index').load();

app.popup('mobfmSheet', (nm, vo, pm)=>{
	app.log('-', pm)
	setTimeout(x=>{
		$('#btnPopup').click(e=>{
			app.popup('confirm').modal('----')
		})
	},100)
});


/*
// test
//--------------------------------------------------
$(document).ready(x=>{
//	app.service('http').text('/conts/html/myPage/limitService/MOBFM054/MOBFM054C0902.html')
//	.then(x=>{
//		app.log('-', x)
//		return app.service('http').submit('http://127.0.0.1:8080/mob/MOBFM054N/MOBFM054C0101.ajax', {mbw_json:'{"a":"2"}', aa:''})
//	}).then(x=>{
//		app.log('-', x)
//	});
	app.view('MOBFM054C05', (nm, vo, pm)=>{
		vo.t = ko.observable("중고차판매점 이용가능");
		vo.a = e=>{
			app.log(nm, pm);
			app.popup('mobfmTest').open({pop:'t'}, '/conts/html/myPage/limitService/MOBFM054/MOBFM054C0902.html');
//			app.resource('progressOn');
//			setTimeout(x=>{
//				app.resource('progressOff');
//			}, 2000)
		};
	});
	app.view('MOBFM054C05').load({a:'----'}, '');
//	app.view('MOBFM054C05').load({a:'----'}, '/conts/html/myPage/limitService/MOBFM054/MOBFM054C0902.html');
	app.popup('mobfmTest', (nm, vo, pm)=>{
		app.log(nm, pm)
		vo.xxx = ko.observable("중고차판매점 이용가능22");
		vo.zzz = e=>{
			app.popup('alert').open('aaaa').then(x=>{
//				app.popup(nm).close()
			})
		};
		vo.kkk = e=>{
			app.popup(nm).close()
		};
	});
});
*/