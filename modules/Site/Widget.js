Uize.module ({
	name:'Site.Widget',
	superclass:'Uize.Widget.V2',
	builder:function (_superclass) {
		'use strict';

		return _superclass.subclass ({
			staticProperties:{
				mCssBindings_isMixedIn:true
			},
				
			staticMethods:{
				cssClassPrefix: function () {
					if (this.moduleName != 'Site.Widget' && this.mCssBindings_isMixedIn)
						return this.moduleName.split('.').slice(2).join('');
				}
					
			}
		});
	}
});
