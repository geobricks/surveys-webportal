if (!window.MB) {
	
	window.MB = {
		
		build : function(id) {
			
			var s = '';
			
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold;' id='model_name_" + id + "'></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td><input type='text' id='modelTitle_" + id + "' class='text-input' size='78'/></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold;' id='abstract_" + id + "'></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td><textarea rows='3' cols='102' id='modelDescription_" + id + "'></textarea></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold;' id='default_language_" + id + "'></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td><div class='listLanguages' id='listLanguages_" + id + "'></div></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td align='right'><input class='addTranslationButton' type='button' id='addTranslationButton_" + id + "' /></td>";
			s += "</tr>";
			
			return s;
			
		}
	
	}
	
}