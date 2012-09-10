if (!window.Products) {
	
	window.Products = {
		
		init : function() {
			
			/**
			 * Initiate buttons
			 */
			$(".model-manager-button").jqxButton({ 
				width: '200', 
				theme: ModelsWebPortal.theme 
			});
			
			/**
			 * Show Table button
			 */
			$("#buttonShowTable").bind('click', function() {
				Products.initTable();
			});
			
			/**
			 * Show Map button
			 */
			$("#buttonShowMap").bind('click', function() {
				
				/**
				 * Get selected model's ID
				 */
				var rowindex = $('#models-grid').jqxGrid('getselectedrowindex');
            	var rows = $('#models-grid').jqxGrid('getrows');
            	var modelName = rows[rowindex].title;
            	var modelID = rows[rowindex].id;
            	
            	/**
            	 * Fetch answers by model ID
            	 */
            	$.ajax({
    				
    				type: 'GET',
    				url: 'http://localhost:3000/select/answer/' + modelID + '?callback=?',
    				dataType: 'jsonp',
    				jsonp: 'callback',
    				
    				/**
    				 * Show the answers on the map
    				 */
    				success : function(answers) {
    					Products.initMap(answers);
    				},
    				
    				/**
    				 * Alert the user of the error
    				 */
    				error : function(err, b, c) {
    					alert(err.status + ", " + b + ", " + c);
    				}
    				
    			});
            	
			});
			
			/**
			 * Show Chart button
			 */
			$("#buttonShowChart").bind('click', function() {
				Products.initChart();
			});
			
			/**
			 * Fill the grid with available models
			 */
			ModelsManager.findAllModels();
			
			/**
			 * Translate elements
			 */
			Products.initI18N();
			
		},
		
		initI18N : function() {
			BabelFish.translateButton('buttonShowTable');
			BabelFish.translateButton('buttonShowMap');
			BabelFish.translateButton('buttonShowChart');
		},
		
		initTable : function() {
			
			var data = new Array();
			
			var row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'North';
			row["average_income"] = 750;
			data[0] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'South';
			row["average_income"] = 315;
			data[1] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'East';
			row["average_income"] = 590;
			data[2] = row;
			
			row = {};
			row["gender"] = 'Male';
			row["city_area"] = 'West';
			row["average_income"] = 615;
			data[3] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'North';
			row["average_income"] = 680;
			data[4] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'South';
			row["average_income"] = 150;
			data[5] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'East';
			row["average_income"] = 400;
			data[6] = row;
			
			row = {};
			row["gender"] = 'Female';
			row["city_area"] = 'West';
			row["average_income"] = 485;
			data[7] = row;
			
			var source = {
				localdata: data,
	            datatype: "array"
			};
				
			var dataAdapter = new $.jqx.dataAdapter(source);

			$("#table").jqxGrid({
				width: 768,
				height: 320,
				source: dataAdapter,
				columnsresize: true,
				showheader: true,
				sortable: true,
				enablehover: true,
				columns: [
				          {text: 'Gender', datafield: 'gender'},
				          {text: 'City Area', datafield: 'city_area'},
				          {text: 'Average Income', datafield: 'average_income'}
	                ],
	            theme: "ui-start"
			});
			
		},
		
		initChart : function() {
			
			var chart = new Highcharts.Chart({
		    
				chart: {
					renderTo: 'chart',
		            type: 'column',
		            height: 320
		        },
		    
		        title: {
		        	text: 'Average Income, Grouped By Gender'
		        },
		    
		        xAxis: {
		        	categories: ['North', 'South', 'East', 'West']
		        },
		    
		        yAxis: {
		        	allowDecimals: false,
		        	min: 0,
		        	title: {
		        		text: 'Average Income'
		        	}
		        },
		    
		        tooltip: {
		        	formatter: function() {
		        		return '<b>'+ this.x +'</b><br/>' + this.series.name +': '+ this.y +'<br/>' + 'Total: '+ this.point.stackTotal;
		        	}
		        },
		    
		        plotOptions: {
		        	column: {
		        		stacking: 'normal'
		        	}
		        },
		    
		        series: [{
		        	name: 'Male',
		            data: [750, 315, 590, 615],
		            stack: 'male'
		        }, {
		        	name: 'Female',
		        	data: [680, 150, 400, 485],
		        	stack: 'female'
		        }]
			});
			
		},
		
		initMap : function(answers) {
			
			var map = L.map('map').setView([23.75078240526587, 90.42640686035156], 12);
			
			L.tileLayer('http://{s}.tile.cloudmade.com/17ad8466b1c24b86b173b2a1d5492115/997/256/{z}/{x}/{y}.png', {
				attribution: 'GeoBricks.org',
				maxZoom: 17
			}).addTo(map);

			var markers = new L.MarkerClusterGroup({
				spiderfyOnMaxZoom: false, 
				showCoverageOnHover: true, 
				zoomToBoundsOnClick: true
			});

			markers.on('clusterclick', function (a) {
				a.layer.zoomToBounds();
			});
			
			for (var i = 0 ; i < answers.length ; i++) {
				var lat = answers[i].meta.location[0];
				var lon = answers[i].meta.location[1];
				var m = new L.Marker(new L.LatLng(lat, lon));
				var s = '';
				for (var j = 0 ; j < answers[i].data.length ; j++) {
					s += '<b>Income:</b> ';
					switch(answers[i].data[j]['answer']) {
						case 0: s += 'Low'; break;
						case 1: s += 'Medium'; break;
						case 2: s += 'High'; break;
					}
				}
				m.bindPopup(s);
				markers.addLayer(m);
			}
			
			map.addLayer(markers);
			
		}
		
	}
	
}