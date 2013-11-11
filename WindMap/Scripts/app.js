﻿$(function () {
    $(function () {
        
        setHeight();
        initMap();

        $(window).resize(function () {
            setHeight();
        });

        $('.navbar li>a').click(function (e) {
            $('html, body').animate({
                scrollTop: $($(this).attr("href")).offset().top + "px"
            }, { duration: 700 });
            return false;
        });


        $('#myDropdown').ddslick({
            data: ddData,
            width: '100%',
            selectText: "Выберите ветрогенератор",
            truncateDescription: true,
            onSelected: function (data) {
                var val = +data['selectedData']['value'];
                $('.diameter').html(windTower[val]['diameter'] + ' м');
                $('.height').html(windTower[val]['height'] + ' м');
                $('.speed').html(windTower[val]['speed'] + ' м/с');
                $('.power').html(windTower[val]['power'] + ' МВт/год');
                $('.info').html(windTower[val]['info']);
            }
        });
    });
    function setHeight() {
        $('body').innerHeight($(window).height());
        $('#map').css({ 'min-height': $('body').height()*0.8 });
        $('#wrapper').css({ 'min-height': $('body').height()+5 });
        $('.container').css({ 'min-height': $('body').height() });
    }

    function initMap() {
        var map = new L.map("map").setView([60.0525, 28.4163], 8);
        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var legend = L.control({ position: 'bottomright' });

        var grades = ['0.0&ndash;4.0', '4.0&ndash;8.0', '8.0&ndash;12.0', '>12.0'],
            colors = ['#F1EEF6', '#BDC9E1', '#74A9CF', '#0570B0'],
            cities = ['Санкт-Петербург', 'Озерки', 'Выборг', 'Котка', 'Кунда'];
        var spb_point    = [59.9396, 30.3147],
            ozerki_point = [60.2098, 29.0181],
            vyborg_point = [60.7102, 28.7461],
            kotka_point  = [60.4681, 26.9459],
            kunda_point  = [59.4998, 26.5349];

        // spb
        var arr1 = [[5.24542488296, 4.96169669457, 3.82678394098, 4.90849765924, 6.16754149525, 5.83770747624, 2.67413817563, 2.7947226557, 6.78819690736, 6.19236771173, 7.37693289828, 8.23166406582, 10.8348701944, 4.20981699532, 2.88693431692, 3.24159455242],
                    [6.01149099163, 5.33408994184, 3.9828344446, 4.93687047808, 6.27748616825, 6.22783373528, 2.91176053341, 3.14228968648, 8.67498936019, 8.28486310115, 9.8311817279, 9.85246134203, 12.849340332, 4.75954036033, 3.23450134771, 3.54660235494],
                    [6.01858419634, 5.33408994184, 3.9828344446, 4.93687047808, 6.27748616825, 6.22783373528, 2.91176053341, 3.14583628884, 8.67853596255, 8.29195630586, 9.84536813732, 9.85600794439, 12.859980139, 4.76308696269, 3.23450134771, 3.55724216201],
                    [6.05050361753, 5.3447297489, 3.9828344446, 4.93687047808, 6.29167257767, 6.22783373528, 2.91530713576, 3.14938289119, 8.67853596255, 8.29195630586, 9.84536813732, 9.87019435381, 12.859980139, 4.76308696269, 3.23450134771, 3.55724216201]];
        // ozerki
        var arr2 = [[1.49892933619, 3.16916488223, 6.63811563169, 9.93576017131, 10.3640256959, 3.98286937901, 2.86937901499, 2.65524625268, 4.41113490364, 6.29550321199, 3.55460385439, 3.29764453961, 5.35331905782, 2.18415417559, 2.3982869379, 1.58458244111],
                    [1.88436830835, 3.85438972163, 6.98072805139, 10.7066381156, 12.034261242, 4.23982869379, 2.95503211991, 2.91220556745, 5.35331905782, 11.0920770878, 7.23768736617, 6.59528907923, 9.12205567452, 3.68308351178, 2.48394004283, 1.79871520343],
                    [1.88436830835, 3.85438972163, 6.98072805139, 10.7066381156, 12.0770877944, 4.23982869379, 2.95503211991, 2.91220556745, 5.4817987152, 12.2055674518, 9.67880085653, 7.96573875803, 10.1498929336, 4.02569593148, 2.48394004283, 1.79871520343],
                    [1.88436830835, 3.85438972163, 6.98072805139, 10.7066381156, 12.0770877944, 4.23982869379, 2.95503211991, 2.91220556745, 5.4817987152, 12.2912205567, 9.93576017131, 8.00856531049, 10.3640256959, 4.02569593148, 2.48394004283, 1.79871520343]];
        // vyborg
        var arr3 = [[5.84758551308, 3.48759221999, 4.0115694165, 4.74932930919, 6.79493628437, 2.46059691482, 2.21327967807, 3.27380952381, 4.22954393025, 3.52531857814, 3.2444668008, 3.11871227364, 4.12894030852, 3.01391683434, 4.12055667337, 4.31757209926],
                    [7.2266934943, 4.00318578135, 4.48105298457, 5.50804828974, 8.24949698189, 2.90912139504, 3.42890677398, 5.17270288397, 7.45724346076, 8.34171696848, 8.89084507042, 6.36317907445, 6.65241448692, 4.05348759222, 5.25653923541, 5.39906103286],
                    [7.24346076459, 4.00737759893, 4.48524480215, 5.5290073776, 8.25788061704, 2.91331321261, 3.46663313213, 5.31103286385, 8.27045606975, 9.80885311871, 11.1460429242, 7.21830985915, 6.94584171697, 4.10798122066, 5.29426559356, 5.42840375587],
                    [7.26861167002, 4.00737759893, 4.48524480215, 5.5290073776, 8.25788061704, 2.91331321261, 3.46663313213, 5.31103286385, 8.33333333333, 9.95137491616, 11.3849765258, 7.28957075788, 6.9709926224, 4.10798122066, 5.29426559356, 5.42840375587]];
        // kotka
        var arr4 = [[2.94037385728, 2.06713057716, 1.9989084459, 1.42584254332, 1.73966434711, 1.40537590394, 1.39855369082, 1.1051985264, 1.8147086915, 1.79424205212, 2.29908582344, 2.22404147906, 2.94719607041, 1.89657524901, 1.88975303588, 2.01937508528],
                    [6.18774730523, 4.17519443307, 4.98021558193, 3.70446172738, 5.38954836949, 3.69763951426, 3.31559557921, 3.19961795606, 5.83299222268, 5.49870377951, 7.59312320917, 8.58916632556, 7.77732296357, 4.5777050075, 4.14790558057, 4.07286123619],
                    [6.84950197844, 4.3389275481, 5.58057033702, 4.43443853186, 6.86314640469, 4.27070541684, 3.73857279301, 3.51343975986, 7.34752353664, 7.46350115978, 10.3424750989, 11.4067403466, 8.45272206304, 4.77554918816, 4.34574976122, 4.27752762996],
                    [6.86996861782, 4.35939418747, 5.60785918952, 4.56406058125, 7.19061263474, 4.38668303998, 3.7863282849, 3.52708418611, 7.46350115978, 7.72274525856, 10.888252149, 11.7205621504, 8.50047755492, 4.77554918816, 4.35939418747, 4.27752762996]];
        // kunda
        var arr5 = [[2.1954071869, 1.91367212418, 1.0844142037, 1.1056772273, 3.01403359558, 2.55687858814, 2.90771847757, 3.63066128003, 7.48990006379, 7.76631937061, 6.01211992345, 4.28981501169, 2.90771847757, 2.32830108441, 2.72698277695, 2.33893259622],
                    [4.3961301297, 3.74229215394, 2.78545609186, 2.83329789496, 5.04996810546, 3.14692749309, 4.18349989368, 6.39485434829, 15.5751647884, 14.905379545, 9.68530725069, 6.24069742717, 4.77886455454, 4.06123750797, 4.22602594089, 3.93365936636],
                    [4.97023176696, 4.14097384648, 3.31703168191, 3.17882202849, 5.26259834148, 3.15755900489, 4.19413140549, 6.44801190729, 16.0907931108, 15.4156921114, 9.85009568361, 6.28853923028, 4.81075908994, 4.15692111418, 4.3057622794, 4.16755262598],
                    [5.04465234956, 4.23665745269, 3.37018924091, 3.18945354029, 5.26259834148, 3.15755900489, 4.19413140549, 6.44801190729, 16.0907931108, 15.4156921114, 9.85009568361, 6.28853923028, 4.81075908994, 4.16223687008, 4.3057622794, 4.17286838188]];

         legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info_legend legend');                
            div.innerHTML += '<p>Скорость ветра:</p>';
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    grades[i] + ' м/с<br>';
            }
            return div;
        }

        legend.addTo(map);

        var spb     = new L.layerGroup();
        var ozerki  = new L.layerGroup();
        var vyborg  = new L.layerGroup();
        var kotka   = new L.layerGroup();
        var kunda   = new L.layerGroup(); 

        windRouse(arr1, spb_point, spb, cities[0]);
        windRouse(arr2, ozerki_point, ozerki, cities[1]);
        windRouse(arr3, vyborg_point, vyborg, cities[2]);
        windRouse(arr4, kotka_point, kotka, cities[3]);
        windRouse(arr5, kunda_point, kunda, cities[4]);

        function windRouse(arr, center, rouse, sity) {
            var z = 2500;   // zoom
            var dir = 0;    // start angle      
            var radius;     // radius semicircle
            var myIcon = L.icon({
                iconUrl: 'Content/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -25],
                shadowUrl: 'Content/images/marker-shadow.png',
                shadowSize: [41, 41]
            });
            var marker = L.marker(center, { icon: myIcon }).addTo(map);
            marker.bindPopup("<b>" + sity + "</b>").openPopup();

            rouse.clearLayers();
            for (var j = 3; j >= 0; j--) {
                var windlayer = new L.FeatureGroup();

                for (var i = 0; i < 16; i++) {
                    var temp = radius;
                    switch (j) {
                        case 0: radius = z * arr[0][i]; break;
                        case 1: radius = z * arr[1][i]; break;
                        case 2: radius = z * arr[2][i]; break;
                        case 3: radius = z * arr[3][i]; break;
                    }

                    var circle = L.circle(center, radius, {
                        weight: 1,
                        color: colors[j],
                        opacity: 0.4,
                        fillColor: colors[j],
                        fillOpacity: 0.8
                    }).setDirection(dir + i * 22.5, 22.5);

                    circle.on({
                        'mouseover': function () {
                            this.setStyle({ fillOpacity: 1 })
                        },
                        'mouseout': function () {
                            this.setStyle({ fillOpacity: 0.8 })
                        }
                    });

                    windlayer.bindPopup('Ветер ' + grades[j] + ' м/с').addLayer(circle);

                    windlayer.on({
                        'mouseover': function () {
                            this.setStyle({ opacity: 1 })
                        },
                        'mouseout': function () {
                            this.setStyle({ opacity: 0.4 })
                        }
                    });
                }

                rouse.addLayer(windlayer);
            }
            rouse.addTo(map);
        }
    }

    var ddData = [    
    {
        text: "Vestas V80-2.0 MW",
        value: 0,
        selected: true,
        truncateDescription: true,
        description: "Диаметр ротора: 80 м <br/>" +
                     "Площадь, охватываемая лопастями ветрогенератора: 5,027 м²"
    },
    {
        text: "Vestas V90-3.0 MW",
        value: 1,
        selected: false,        
        description: "Rotor diameter: 90 м <br/>"+
                     "Площадь, охватываемая лопастями ветрогенератора: 6,362 м²"
    },
    {
        text: "Vestas V100-2.6 MW",
        value: 2,
        selected: false,
        truncateDescription: true,
        description: "Диаметр ротора: 100 м <br/>" +
                     "Площадь, охватываемая лопастями ветрогенератора: 7,854 м²"
    },
    {
        text: "Vestas V164-8.0 MW",
        value: 3,
        selected: false,
        truncateDescription: true,
        description: "Диаметр ротора: 164 м <br/>" +
                     "Площадь, охватываемая лопастями ветрогенератора: 21,124 м²"
    }
    ];

    var windTower = [    
    {
        diameter: '80',
        height: '80',
        speed: '4.5',
        power: '3410.67',
        info:   "Мощность: 2,000 кВт <br/>" +
                "Минимальная скорость ветра: 3.5 м/с <br/>" +
                "Номинальная скорость ветра: 14.5 м/с <br/>" +
                "Максимальная скорость ветра: 25 м/с <br/>" +
                "Категория ветра: IEC IA <br/>" +
                "Диапазон рабочих температур: стандартная турбина -20°C до 40°C,  низкотемпературная турбина -30°C до 40°C"
    },
    {
        diameter: '90',
        height: '80',
        speed: '4.5',
        power: '4316.62',
        info:   "Мощность: 3,000 кВт <br/>" +
                "Минимальная скорость ветра: 3.5  м/с <br/>" +
                "Номинальная скорость ветра: 15 м/с <br/>" +
                "Максимальная скорость ветра: 25 м/с <br/>" +
                "Категория ветра: IEC IA и IEC IIA <br/>" +
                "Диапазон рабочих температур: стандартная турбина -20°C до 40°C, низкотемпературная турбина -30°C до 40°C"
    },
    {
        diameter: '100',
        height: '80',
        speed: '4.5',
        power: '5329.16',
        info:   "Мощность: 2,600 кВт <br/>" +
                "Минимальная скорость ветра: 3.5 м/с <br/>" +
                "Номинальная скорость ветра: 14 м/с <br/>" +
                "Максимальная скорость ветра: 23 м/с <br/>" +
                "Категория ветра: IEC IIB <br/>" +
                "Диапазон рабочих температур: стандартная турбина -20°C до 40°C, низкотемпературная турбина -30°C до 40°C"
    },
    {
        diameter: '164',
        height: '80',
        speed: '4.5',
        power: '14333.32',
        info:   "Мощность: 8,000 кВт <br/>" +
                "Минимальная скорость ветра: 4 м/с <br/>" +
                "Частота вращения ротора: 4.8 - 12.1 об/мин <br/>" +
                "Номинальная частота вращения ротора: 10.5 об/мин <br/>" +
                "Диапазон рабочих температур: -10°C до +25°C <br/>" +
                "Предельный рабочий диапазон температур: -15°C до +35°C"
    }
    ];

    function log(msg) {
        console.log(msg);
    }
});