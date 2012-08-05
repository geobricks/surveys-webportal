if (!window.SurveysManager) {
	
	window.SurveysManager = {
		
		theme : "energyblue",
		
		source : [
		          "Affogato",
	              "Americano",
	              "Bicerin"
			     ],
	
		initUI : function() {
			
			$(".survey-manager-button").jqxButton({ 
				width: '150', 
				height: '30', 
				theme: SurveysManager.theme 
			});
		
			var data = new Array();
			
			var row = {};
			row["code"] = "001";
			row["label"] = "Market Prices in California";
			row["questions"] = 15;
			row["dateLastUpdate"] = "2012-12-24";
			data[0] = row;
			
			row = {};
			row["code"] = "001";
			row["label"] = "Market Prices in California";
			row["questions"] = 15;
			row["dateLastUpdate"] = "2012-05-24";
			data[1] = row;
			
			var source = {
				localdata: data,
                datatype: "array",
                sortcolumn: 'Label',
                sortdirection: 'asc'
            };
			
			var dataAdapter = new $.jqx.dataAdapter(source);
			
            $("#surveys-grid").jqxGrid({
            	width: 500,
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
                theme: SurveysManager.theme
            });
		
		}
	
	}
	
}