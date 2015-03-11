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
				log:'log' // bind the log state property to the log DOM element
			},
			
			eventBindings:Uize.copyInto(
				// wire/handle Click event fired by each key and append to the log appropriately
				Uize.map(
					Uize.lookup(allKeys),
					function(v, widgetName) {
						return {
							Click:function(e) {
								var log = this.get('log');
								
								// append to the log state property
								this.set('log', log + (log ? ', ' : '') + e.source.get('key'));
							}
						};
					}
				),
				
				{
					'#clear:click':function() { this.set('log', '') }, // clicking clear button DOM node empties out long
					'#play:click':function() {
						var
							children = this.children,
							keys = this.getNodeValue('input').split(/\s*,\s*/),
							keyNo = -1,
							playKey = function() {
								// stop playing previous key
								previousKeyWidget && previousKeyWidget.unmet('playing');
								
								
								if (++keyNo < keys.length) { // try to play next key
									var nextKey = keys[keyNo].toLowerCase().replace('#', 'Sharp');
									
									if (nextKey in children) { // ignore bad tokens
										var nextKeyWidget = children[nextKey];
										nextKeyWidget.met('playing');
										previousKeyWidget = nextKeyWidget;
									}
								}
								else // no more keys so stop
									clearInterval(interval);
							},
							interval = setInterval(playKey, 1000),
							previousKeyWidget
						;

						playKey();
					}
				}
			)
		});
	}
});
