if (!window.B) {
	
	window.B = {
		
		build : function(id) {
			
			var s = '';
			
			s += "<tr>";
			s += "<td>";
			s += "<table width='100%'>";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 125px;' id='question_label_" + id + "'></td>";
			s += "<td><img id='info_question' src='../resources/images/info.png'/></td>";
			s += "<td><input type='text' class='text-input' size='65' id='question_" + id + "' style='height: 23px;'/></td>";
			s += "<td rowspan='3'><div class='listTranslateQuestion' id='listTranslateQuestion_" + id + "'></div></td>";
			s += "</tr> ";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 125px;' id='question_description_" + id + "'></td>";
			s += "<td><img id='info_description' src='../resources/images/info.png'/></td>";
			s += "<td><input type='text' class='text-input' size='65' id='info_" + id + "' style='height: 23px;'/></td>";
			s += "<td></td>";
			s += "</tr>";
			s += "<tr>";
			s += "<td style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; width: 125px;' id='question_indicator_" + id + "'></td>";
			s += "<td><img id='info_indicator' src='../resources/images/info.png'/></td>";
			s += "<td><input type='text' class='text-input' size='65' id='indicator_" + id + "' style='height: 23px;'/></td>";
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