if (!window.MCB) {
	
	window.MCB = {
			
		build : function () {
			
			var s = "";
			
			s += "<tr id='multiple_choice_row_1'>";
			s += "<td align='left' style='font-family: sans-serif; font-size: 12px; color: #46A3CA; font-weight: bold; padding-left: 10px;' id='multiple_choice'></td>";
			s += "</tr>";
			s += "<tr id='multiple_choice_row_2'>";
			s += "<td align='left' style='padding-left: 10px;'>";
			s += "<div id='grid_multiple_choice'></div>";
			s += "</td>";
			s += "</tr>";
			s += "<tr id='multiple_choice_row_3'>";
			s += "<td align='left' style='padding-left: 10px;'>";
			s += "<input class='model-manager-button' type='button' id='buttonAddAnotherMultipleChoice' />";
			s += "<input class='model-manager-button' type='button' id='buttonDeleteSelectedChoice' />";
			s += "</td>";
			s += "</tr>";
			
			return s;
			
		}
			
	};
	
}