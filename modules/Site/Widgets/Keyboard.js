Uize.module ({
	name:'Site.Widgets.Keyboard',
	superclass:'Site.Widget',
	required:'Site.Widgets.Key',
	builder:function (_superclass) {
		'use strict';
		
		var
			majorKeys = ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
			flatKeyLookup = {
				dFlat:'cSharp',
				eFlat:'dSharp',
				gFlat:'fSharp',
				aFlat:'gSharp',
				bFlat:'aSharp'
			},
			minorKeys = ['cSharp', 'dSharp', 'fSharp', 'gSharp', 'aSharp'],
			allKeys = majorKeys.concat(minorKeys),
			validKeyCodes = {
				16: 1, // shift
				65: 1, // A
				66: 1, // B
				67: 1, // C
				68: 1, // D
				69: 1, // E
				70: 1, // F
				71: 1, // G
				188: 1, // comma
				32: 1, // space
				51: 1, // sharp (#)
			}
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
					'#input:keydown':function(e) {
						if (!(e.keyCode in validKeyCodes)) {
							e.preventDefault();	
						}
					},
					'#play:click':function() {
						var
							m = this,
							children = m.children,
							keys = this.getNodeValue('input').split(/\s*,\s*/), // retrieve keys by getting value of text area and splitting it on comma
							keyNo = -1,
							playKey = function() {
								if (++keyNo < keys.length) { // try to play next key
									var
										typedKey = keys[keyNo].toLowerCase().replace('#', 'Sharp').replace('b', 'Flat'),
										nextKey = typedKey in children
											? typedKey
											: flatKeyLookup[typedKey]
									;
									
									if (nextKey in children) { // ignore bad tokens
										var nextKeyWidget = children[nextKey];
										nextKeyWidget.met('playing');
										m.previousKeyWidget = nextKeyWidget;
										m.timeout = setTimeout(
											function() {
												// stop playing previous key
												m.previousKeyWidget && m.previousKeyWidget.unmet('playing');
												m.timeout = setTimeout(playKey, 200);	
											},
											1000
										);
									}
								}
							},
							previousKeyWidget
						;
						
						clearTimeout(m.timeout);
						m.previousKeyWidget && m.previousKeyWidget.unmet('playing');

						playKey();
					}
				}
			)
		});
	}
});
