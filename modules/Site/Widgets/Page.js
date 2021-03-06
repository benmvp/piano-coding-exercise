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
							
			children:Uize.map(
				Uize.lookup(['keyboard', 'keyboard2', 'keyboard3']),
				function(v, widgetName) {
					return function() {
						return {
							extraClasses:'page-keyboard',
							widgetClass:Site.Widgets.Keyboard
						}
					};
				}
			)
		});
	}
});
