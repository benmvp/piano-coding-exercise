Uize.module ({
	name:'Site.Widgets.Keyboard',
	superclass:'Site.Widget',
	required:'Site.Widgets.Key',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			children:Uize.copyInto(
				
				// add major keys
				Uize.map(
					Uize.lookup(['c', 'd', 'e', 'f', 'g', 'a', 'b']),
					function(v, widgetName) {
						return {
							key:widgetName.toUpperCase(),
							type:'major',
							widgetClass:Site.Widgets.Key
						}
					}
				),
				
				// for the minor keys we need to add in extra CSS class defined
				// by keyboard in order to do positioning
				Uize.map(
					Uize.lookup(['cSharp', 'dSharp', 'fSharp', 'gSharp', 'aSharp']),
					function (v, widgetName) {
						return function() {
							return {
								extraClasses:this.cssClass(widgetName),
								key:widgetName.replace('Sharp', '#').toUpperCase(),
								type:'minor',
								widgetClass:Site.Widgets.Key	
							};
						}
					}
				)
			)
		});
	}
});
