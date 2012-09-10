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
			
			$(".model-manager-button").bind('click', function() {
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
		
		initMap : function() {
			
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
			
			var m = new L.Marker(new L.LatLng(23.709707989997362, 90.40518522262573));
			m.bindPopup('Low Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.708593044879823, 90.40597915649414));
			m.bindPopup('Low Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.70920700262114, 90.4068374633789));
			m.bindPopup('Medium Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.71067066622209, 90.40499210357666));
			m.bindPopup('Low Income');
			markers.addLayer(m);
			
			m = new L.Marker(new L.LatLng(23.789252135848834, 90.4144549369812));
			m.bindPopup('High Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.79235435433391, 90.41381120681763));
			m.bindPopup('High Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.792275818070696, 90.42087078094482));
			m.bindPopup('High Income');
			markers.addLayer(m);
			
			m = new L.Marker(new L.LatLng(23.794278477956254, 90.36892175674438));
			m.bindPopup('Medium Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.794239210412012, 90.366690158844));
			m.bindPopup('Medium Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.793983971085208, 90.3644585609436));
			m.bindPopup('High Income');
			markers.addLayer(m);
			
			m = new L.Marker(new L.LatLng(23.792275818070696, 90.36666870117188));
			m.bindPopup('Medium Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.792432890549655, 90.37091732025146));
			m.bindPopup('Medium Income');
			markers.addLayer(m);
			
			m = new L.Marker(new L.LatLng(23.720532776686408, 90.36881446838379));
			m.bindPopup('Low Income');
			markers.addLayer(m);

			m = new L.Marker(new L.LatLng(23.71884330472101, 90.37546634674072));
			m.bindPopup('Medium Income');
			markers.addLayer(m);
			
			map.addLayer(markers);
			
		}
		
	}
	
}