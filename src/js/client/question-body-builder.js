if (!window.B) {
	
	window.B = {
		
		build : function(id) {
			
			var s = '';
			
			s += "<tr>";
			s += "<td>";
			s += "<table width='100%'>";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 150px;' id='question_label_" + id + "'></td>";
			s += "<td><input type='text' class='text-input' size='50' id='question_" + id + "' style='height: 23px;'/></td>";
			s += "<td rowspan='2'><div class='listTranslateQuestion' id='listTranslateQuestion_" + id + "'></div></td>";
			s += "</tr> ";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 150px;' id='question_description_" + id + "'></td>";
			s += "<td><input type='text' class='text-input' size='50' id='info_" + id + "' style='height: 23px;'/></td>";
			s += "<td></td>";
			s += "</tr>";
			s += "</table>";
			s += "</td>";
			s += "</tr>";
			
			s += "<tr>";
			s += "<td>";
			s += "<table width='100%'>";
			s += "<tr>";
			s += "<td width='95%;'>&nbsp;</td> ";
			s += "<td align='right'><input class='model-manager-button-i18n' type='button' id='buttonDeleteTranslation_" + id + "' /></td>";
			s += "<td align='right'><input class='model-manager-button-i18n' type='button' id='buttonAddTranslation_" + id + "' /></td>";
			s += "</tr>";
			s += "</table>";
			s += "</td>";
			s += "</tr>";
			
			return s;
			
		}
	
	}
	
}