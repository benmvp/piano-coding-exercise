Uize.module ({
	name:'Site.Widgets.Keyboard',
	superclass:'Site.Widget',
	required:'Site.Widgets.Key',
	builder:function (_superclass) {
		'use strict';
		
		var
			majorKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
			minorKeys = ['cSharp', 'dSharp', 'fSharp', 'gSharp', 'aSharp'],
			allKeys = majorKeys.concat(minorKeys)
		;

		return _superclass.subclass ({
			stateProperties:{
				log:{
					value:''
				}
			},

			children:Uize.copyInto(
				
				// add major keys
				Uize.map(
					Uize.lookup(majorKeys),
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
					Uize.lookup(minorKeys),
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
			),
			
			htmlBindings:{
				log:'log'	
			},
			
			eventBindings:Uize.copyInto(
				Uize.map(
					Uize.lookup(allKeys),
					function(v, widgetName) {
						return {
							Click:function(e) {
								var
									key = e.source.get('key'),
									log = this.get('log')
								;
								this.set('log', log + (log ? ', ' : '') + key);
							}
						};
					}
				),
				{
					'#clear:click':function() { this.set('log', '') }
				}
			)
		});
	}
});
