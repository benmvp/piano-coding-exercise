Uize.module ({
	name:'Site.Widgets.Page',
	superclass:'Uize.Widget.Page',
	required:[
		'Site.Widgets.Keyboard',
		'Uize.Widget.mDeclarativeChildren'
	],
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			mixins:Uize.Widget.mDeclarativeChildren,
							
			children:{
				keyboard:Site.Widgets.Keyboard
			}
		});
	}
});
