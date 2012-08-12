if (!window.SurveysManager) {
	
	window.SurveysManager = {
		
		initUI : function() {
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				theme: SurveysWebPortal.theme 
			});
			
			var data = new Array();
			
			var row = {};
			row["code"] = "001";
			row["label"] = "Market Prices in California";
			row["questions"] = 15;
			row["dateLastUpdate"] = "2012-12-24";
			data[0] = row;
			
			row = {};
			row["code"] = "002";
			row["label"] = "Public Health in the Philippines";
			row["questions"] = 25;
			row["dateLastUpdate"] = "2011-02-25";
			data[1] = row;
			
			row = {};
			row["code"] = "003";
			row["label"] = "Gender Issues in Southern Sudan";
			row["questions"] = 48;
			row["dateLastUpdate"] = "2012-06-01";
			data[2] = row;
			
			var source = {
				localdata: data,
                datatype: "array",
                sortcolumn: 'Label',
                sortdirection: 'asc'
            };
			
			var dataAdapter = new $.jqx.dataAdapter(source);
			
            $("#surveys-grid").jqxGrid({
            	width: 780,
                height: 250,
                source: dataAdapter,
                columnsresize: true,
                showheader: true,
                sortable: true,
                enablehover: true,
                columns: [
                   {text: 'Survey Name', datafield: 'label', width: 250},
                   {text: 'Questions', datafield: 'questions'},
                   {text: 'Date Last Update', datafield: 'dateLastUpdate', cellsformat: 'Y-m-d'}
                ],
                theme: SurveysWebPortal.theme
            });
            
            $("#buttonDeleteSelectedSurvey").bind('click', function () {
            	var rowindex = $('#surveys-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#surveys-grid').jqxGrid('getrows');
            	var surveyName = rows[rowindex].label;
            	var c = confirm("Are you sure you want to delete survey '" + surveyName + "'?")
            	if (c == true) {
					var value = $('#surveys-grid').jqxGrid('deleterow', rowindex);
					alert("Survey '" + surveyName + "' has been deleted.");
            	}
			});
		
		}
	
	}
	
}