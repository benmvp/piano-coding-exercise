Uize.module ({
	name:'Site.Widgets.Key',
	superclass:'Site.Widget',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			stateProperties:{
				key:{},
				type:{
					value:'major'
				}
			},
			
			cssBindings:{
				type:'value'	
			},
			
			htmlBindings:{
				key:'label'	
			},
			
			eventBindings:{
				'#:click':function() { this.fire('Click') }	
			}
		});
	}
});
