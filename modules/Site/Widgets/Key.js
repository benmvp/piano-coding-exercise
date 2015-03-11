Uize.module ({
	name:'Site.Widgets.Key',
	superclass:'Site.Widget',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			stateProperties:{
				key:{},
				playing:{
					value:false
				},
				type:{
					value:'major'
				}
			},
			
			cssBindings:{
				playing:['', 'playing'], // add css class to the root DOM node when playing is truthy
				type:'value' // set css class equal to the value of the type state property
			},
			
			htmlBindings:{
				key:'label' // bind the key state property to the label DOM element
			},
			
			eventBindings:{
				'#:click':function() { this.fire('Click') }	// clicking root DOM node fires 'Click' event
			}
		});
	}
});
