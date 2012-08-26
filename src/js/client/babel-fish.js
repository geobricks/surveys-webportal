if (!window.BabelFish) {
	
	window.BabelFish = {
			
		init : function() {
			
			var lang = $.url().param('lang');
			if (lang == null)
				lang = 'en';
		
			$.i18n.properties({
			
				name: 'i18n', 
				path: '../src/i18n/', 
				mode: 'both',
				language: lang, 
				
				callback: function() {
					
					// translate the <head> title
					document.title = $.i18n.prop('html_title');
					
//					$.each($.i18n.map, function(k, v) {
//						try {
//							if (!k.match("^button")) {
//								document.getElementById(k).innerHTML = $.i18n.prop(k);
//							}
//						} catch (err) {
//						}
//						
//					});
					
				}
			
			});
		
		},
		
		translateHTML : function (id) {
			document.getElementById(id).innerHTML = $.i18n.prop(id);
		},
		
		translateHTMLWithLabel : function (id, label) {
			try {
				document.getElementById(id).innerHTML = $.i18n.prop(label);
			} catch (err) {
				console.log(id + ", " + label + ", " + err);
			}
		},
		
		translateButton : function (id) {
			$('#' + id).attr('value', $.i18n.prop(id));
		},
		
		translateButtonWithLabel : function (id, label) {
			$('#' + id).attr('value', $.i18n.prop(label));
		}
		
	}
	
}