var map;
var ajaxRequest;
var plotlist;
var plotlayers = [];

var locations = [{
  "ve": "1",
  "ovk": "1",
  "okraj": "JESENICE",
  "sedežVoliščaOmnia": "Avla UE Jesenice, C. Železarjev 6.a, 4270 Jesenice",
  "dostopnoInvalidom": "i",
  "ime": "Avla UE Jesenice",
  "naslov": " C. Železarjev 6.a",
  "pošta": " 4270 Jesenice",
  "skupaj": "C. Železarjev 6.a 4270 Jesenice",
  "geo_longitude": 46.4318754,
  "geo_latitude": 14.0628587
}, {
  "ve": "1",
  "ovk": "2,3",
  "okraj": "RADOVLJICA",
  "sedežVoliščaOmnia": "Avla Občine Radovljica, Gorenjska cesta 19, 4240 Radovljica",
  "dostopnoInvalidom": "i",
  "ime": "Avla Občine Radovljica",
  "naslov": " Gorenjska cesta 19",
  "pošta": " 4240 Radovljica",
  "skupaj": "Gorenjska cesta 19 4240 Radovljica",
  "geo_longitude": 46.3438093,
  "geo_latitude": 14.1715796
}, {
  "ve": "1",
  "ovk": "4,5,6",
  "okraj": "KRANJ",
  "sedežVoliščaOmnia": "Mestna občina Kranj, Slovenski trg 1, 4000 Kranj",
  "dostopnoInvalidom": "i",
  "ime": "Mestna občina Kranj",
  "naslov": " Slovenski trg 1",
  "pošta": " 4000 Kranj",
  "skupaj": "Slovenski trg 1 4000 Kranj",
  "geo_longitude": 46.243268,
  "geo_latitude": 14.3557455
}, {
  "ve": "1",
  "ovk": "7",
  "okraj": "TRŽIČ",
  "sedežVoliščaOmnia": "Društvo upokojencev Tržič, Trg svobode 18, 4290 Tržič",
  "dostopnoInvalidom": "i",
  "ime": "Društvo upokojencev Tržič",
  "naslov": " Trg svobode 18",
  "pošta": " 4290 Tržič",
  "skupaj": "Trg svobode 18 4290 Tržič",
  "geo_longitude": 46.3635438,
  "geo_latitude": 14.3089991
}, {
  "ve": "1",
  "ovk": "8,9",
  "okraj": "ŠKOFJA LOKA",
  "sedežVoliščaOmnia": "UE Škofja Loka, Poljanska cesta 2, 4220 Škofja Loka",
  "dostopnoInvalidom": "i",
  "ime": "UE Škofja Loka",
  "naslov": " Poljanska cesta 2",
  "pošta": " 4220 Škofja Loka",
  "skupaj": "Poljanska cesta 2 4220 Škofja Loka",
  "geo_longitude": 46.1639449,
  "geo_latitude": 14.3066842
}, {
  "ve": "1",
  "ovk": "10",
  "okraj": "KAMNIK",
  "sedežVoliščaOmnia": "Občina Kamnik, Glavni trg 24, 1241 Kamnik",
  "dostopnoInvalidom": "i",
  "ime": "Občina Kamnik",
  "naslov": " Glavni trg 24",
  "pošta": " 1241 Kamnik",
  "skupaj": "Glavni trg 24 1241 Kamnik",
  "geo_longitude": 46.2263574,
  "geo_latitude": 14.6119117
}, {
  "ve": "1",
  "ovk": "11",
  "okraj": "IDRIJA",
  "sedežVoliščaOmnia": "UE Idrija, Študentovska ulica 2, 5280 Idrija",
  "dostopnoInvalidom": "i",
  "ime": "UE Idrija",
  "naslov": " Študentovska ulica 2",
  "pošta": " 5280 Idrija",
  "skupaj": "Študentovska ulica 2 5280 Idrija",
  "geo_longitude": 46.00126330000001,
  "geo_latitude": 14.0209525
}, {
  "ve": "2",
  "ovk": "1",
  "okraj": "TOLMIN",
  "sedežVoliščaOmnia": "UE Tolmin, Tumov drevored 4, 5220 Tolmin",
  "dostopnoInvalidom": "i",
  "ime": "UE Tolmin",
  "naslov": " Tumov drevored 4",
  "pošta": " 5220 Tolmin",
  "skupaj": "Tumov drevored 4 5220 Tolmin",
  "geo_longitude": 46.1830875,
  "geo_latitude": 13.7313531
}, {
  "ve": "2",
  "ovk": "2",
  "okraj": "PIRAN ",
  "sedežVoliščaOmnia": "UE Piran, Lucija, Obala 114a, 6320 Portorož",
  "dostopnoInvalidom": "i",
  "ime": "UE Piran",
  "naslov": "Lucija, Obala 114a",
  "pošta": "6320 Portorož",
  "skupaj": "Lucija, Obala 114a 6320 Portorož",
  "geo_longitude": 45.502888,
  "geo_latitude": 13.6036542
}, {
  "ve": "2",
  "ovk": "3",
  "okraj": "IZOLA",
  "sedežVoliščaOmnia": "UE Izola, Cesta v Pregavor 3.a, 6310 Izola",
  "ime": "UE Izola",
  "naslov": " Cesta v Pregavor 3.a",
  "pošta": " 6310 Izola",
  "skupaj": "Cesta v Pregavor 3.a 6310 Izola",
  "geo_longitude": 45.5299167,
  "geo_latitude": 13.6668823
}, {
  "ve": "2",
  "ovk": "4,5",
  "okraj": "KOPER",
  "sedežVoliščaOmnia": "UE Koper, Trg Brolo št. 4, 6000 Koper",
  "dostopnoInvalidom": "i",
  "ime": "UE Koper",
  "naslov": " Trg Brolo št. 4",
  "pošta": " 6000 Koper",
  "skupaj": "Trg Brolo št. 4 6000 Koper",
  "geo_longitude": 45.54786199999999,
  "geo_latitude": 13.7314358
}, {
  "ve": "2",
  "ovk": "6",
  "okraj": "SEŽANA",
  "sedežVoliščaOmnia": "Občina Sežana, Partizanska cesta 4, 6320 Portorož",
  "dostopnoInvalidom": "i",
  "ime": "Občina Sežana",
  "naslov": " Partizanska cesta 4",
  "pošta": " 6320 Portorož",
  "skupaj": "Partizanska cesta 4 6320 Portorož",
  "geo_longitude": 45.52850670000001,
  "geo_latitude": 13.5672765
}, {
  "ve": "2",
  "ovk": "7",
  "okraj": "ILIRSKA BISTRICA",
  "sedežVoliščaOmnia": "Matični urad Ilirska Bistrica, Bazoviška cesta 14, 6250 Ilirska Bistrica",
  "dostopnoInvalidom": "i",
  "ime": "Matični urad Ilirska Bistrica",
  "naslov": " Bazoviška cesta 14",
  "pošta": " 6250 Ilirska Bistrica",
  "skupaj": "Bazoviška cesta 14 6250 Ilirska Bistrica",
  "geo_longitude": 45.5638075,
  "geo_latitude": 14.2446335
}, {
  "ve": "2",
  "ovk": "8",
  "okraj": "POSTOJNA",
  "sedežVoliščaOmnia": "Stara OŠ Postojna, Ljubljansa cesta 2, 6320 Postojna",
  "ime": "Stara OŠ Postojna",
  "naslov": " Ljubljansa cesta 2",
  "pošta": " 6320 Postojna",
  "skupaj": "Ljubljansa cesta 2 6320 Postojna",
  "geo_longitude": 45.7750053,
  "geo_latitude": 14.2137748
}, {
  "ve": "2",
  "ovk": "9,10",
  "okraj": "NOVA GORICA",
  "sedežVoliščaOmnia": "UE Nova Gorica, Trg Edvarda Kardelja 1, 5000 Nova Gorica",
  "ime": "UE Nova Gorica",
  "naslov": " Trg Edvarda Kardelja 1",
  "pošta": " 5000 Nova Gorica",
  "skupaj": "Trg Edvarda Kardelja 1 5000 Nova Gorica",
  "geo_longitude": 45.9572629,
  "geo_latitude": 13.6488414
}, {
  "ve": "2",
  "ovk": "11",
  "okraj": "AJDOVŠČINA",
  "sedežVoliščaOmnia": "UE Ajdovščina, Vipavska cesta 11b, 5270 Ajdovščina",
  "dostopnoInvalidom": "i",
  "ime": "UE Ajdovščina",
  "naslov": " Vipavska cesta 11b",
  "pošta": " 5270 Ajdovščina",
  "skupaj": "Vipavska cesta 11b 5270 Ajdovščina",
  "geo_longitude": 45.8853638,
  "geo_latitude": 13.9113376
}, {
  "ve": "3",
  "ovk": "1",
  "okraj": "LOGATEC",
  "sedežVoliščaOmnia": "UE Cerknica, Cesta 4. maja 24, 1370 Cerknica",
  "ime": "UE Cerknica",
  "naslov": " Cesta 4. maja 24",
  "pošta": " 1370 Cerknica",
  "skupaj": "Cesta 4. maja 24 1370 Cerknica",
  "geo_longitude": 45.793266,
  "geo_latitude": 14.3666196
}, {
  "ve": "3",
  "ovk": "2",
  "okraj": "VRHNIKA",
  "sedežVoliščaOmnia": "UE Vrhnika, Tržaška cesta 1, 1360 Vrhnika",
  "dostopnoInvalidom": "i",
  "ime": "UE Vrhnika",
  "naslov": " Tržaška cesta 1",
  "pošta": " 1360 Vrhnika",
  "skupaj": "Tržaška cesta 1 1360 Vrhnika",
  "geo_longitude": 45.9659637,
  "geo_latitude": 14.2984365
}, {
  "ve": "3",
  "ovk": "3,4,5,6",
  "okraj": "LJUBLJANA VIČ RUDNIK",
  "sedežVoliščaOmnia": "Dvorana ŠD Moste, Proletarska 3, 1000 Ljubljana",
  "dostopnoInvalidom": "i",
  "ime": "Dvorana ŠD Moste",
  "naslov": " Proletarska 3",
  "pošta": " 1000 Ljubljana",
  "skupaj": "Proletarska 3 1000 Ljubljana",
  "geo_longitude": 46.05628,
  "geo_latitude": 14.5332483
}, {
  "ve": "3",
  "ovk": "7",
  "okraj": "LJUBLJANA CENTER",
  "sedežVoliščaOmnia": "Dvorana ŠD Moste, Proletarska 3, 1000 Ljubljana",
  "dostopnoInvalidom": "i",
  "ime": "Dvorana ŠD Moste",
  "naslov": " Proletarska 3",
  "pošta": " 1000 Ljubljana",
  "skupaj": "Proletarska 3 1000 Ljubljana",
  "geo_longitude": 46.05628,
  "geo_latitude": 14.5332483
}, {
  "ve": "3",
  "ovk": "8,9,10,11",
  "okraj": "LJUBLJANA ŠIŠKA",
  "sedežVoliščaOmnia": "Dvorana ŠD Moste, Proletarska 3, 1000 Ljubljana",
  "dostopnoInvalidom": "i",
  "ime": "Dvorana ŠD Moste",
  "naslov": " Proletarska 3",
  "pošta": " 1000 Ljubljana",
  "skupaj": "Proletarska 3 1000 Ljubljana",
  "geo_longitude": 46.05628,
  "geo_latitude": 14.5332483
}, {
  "ve": "4",
  "ovk": "1",
  "okraj": "KOČEVJE",
  "sedežVoliščaOmnia": "Avla Gimnazije, Ljubljanska cesta 12, 1330 Kočevje",
  "dostopnoInvalidom": "i",
  "ime": "Avla Gimnazije",
  "naslov": " Ljubljanska cesta 12",
  "pošta": " 1330 Kočevje",
  "skupaj": "Ljubljanska cesta 12 1330 Kočevje",
  "geo_longitude": 45.6410731,
  "geo_latitude": 14.8578838
}, {
  "ve": "4",
  "ovk": "2",
  "okraj": "RIBNICA",
  "sedežVoliščaOmnia": "Športni center Ribnica, Majnikova 2, 1310 Ribnica",
  "dostopnoInvalidom": "i",
  "ime": "Športni center Ribnica",
  "naslov": " Majnikova 2",
  "pošta": " 1310 Ribnica",
  "skupaj": "Majnikova 2 1310 Ribnica",
  "geo_longitude": 45.7420594,
  "geo_latitude": 14.7274101
}, {
  "ve": "4",
  "ovk": "3",
  "okraj": "GROSUPLJE",
  "sedežVoliščaOmnia": "UE Grosuplje, Taborska cesta 1, 1290 Grosuplje",
  "dostopnoInvalidom": "i",
  "ime": "UE Grosuplje",
  "naslov": " Taborska cesta 1",
  "pošta": " 1290 Grosuplje",
  "skupaj": "Taborska cesta 1 1290 Grosuplje",
  "geo_longitude": 45.9571274,
  "geo_latitude": 14.6533203
}, {
  "ve": "4",
  "ovk": "4",
  "okraj": "LITIJA",
  "sedežVoliščaOmnia": "UE Litija, Jerebova ulica 14, 1270 Litija",
  "ime": "UE Litija",
  "naslov": " Jerebova ulica 14",
  "pošta": " 1270 Litija",
  "skupaj": "Jerebova ulica 14 1270 Litija",
  "geo_longitude": 46.0573191,
  "geo_latitude": 14.8309725
}, {
  "ve": "4",
  "ovk": "5,6,7",
  "okraj": "LJUBLJANA MOSTE POLJE",
  "sedežVoliščaOmnia": "Dvorana ŠD Moste, Proletarska 3, 1000 Ljubljana",
  "dostopnoInvalidom": "i",
  "ime": "Dvorana ŠD Moste",
  "naslov": " Proletarska 3",
  "pošta": " 1000 Ljubljana",
  "skupaj": "Proletarska 3 1000 Ljubljana",
  "geo_longitude": 46.05628,
  "geo_latitude": 14.5332483
}, {
  "ve": "4",
  "ovk": "8,9",
  "okraj": "LJUBLJANA BEŽIGRAD",
  "sedežVoliščaOmnia": "Dvorana ŠD Moste, Proletarska 3, 1000 Ljubljana",
  "dostopnoInvalidom": "i",
  "ime": "Dvorana ŠD Moste",
  "naslov": " Proletarska 3",
  "pošta": " 1000 Ljubljana",
  "skupaj": "Proletarska 3 1000 Ljubljana",
  "geo_longitude": 46.05628,
  "geo_latitude": 14.5332483
}, {
  "ve": "4",
  "ovk": "10,11",
  "okraj": "DOMŽALE",
  "sedežVoliščaOmnia": "Domžalski dom, Ljubljanska cesta 58, 1230 Domžale",
  "dostopnoInvalidom": "i",
  "ime": "Domžalski dom",
  "naslov": " Ljubljanska cesta 58",
  "pošta": " 1230 Domžale",
  "skupaj": "Ljubljanska cesta 58 1230 Domžale",
  "geo_longitude": 46.1380727,
  "geo_latitude": 14.5910758
}, {
  "ve": "5",
  "ovk": "1",
  "okraj": "ŠENTJUR",
  "sedežVoliščaOmnia": "Gasilski dom Šentjur, A.M. Slomška 2, 3320 Šentjur",
  "dostopnoInvalidom": "i",
  "ime": "Gasilski dom Šentjur",
  "naslov": " A.M. Slomška 2",
  "pošta": " 3320 Šentjur",
  "skupaj": "A.M. Slomška 2 3320 Šentjur",
  "geo_longitude": 46.2194846,
  "geo_latitude": 15.3966789
}, {
  "ve": "5",
  "ovk": "2,3",
  "okraj": "CELJE",
  "sedežVoliščaOmnia": "UE Celje, Ljubljanska cesta 1, 3000 Celje",
  "dostopnoInvalidom": "i",
  "ime": "UE Celje",
  "naslov": " Ljubljanska cesta 1",
  "pošta": " 3000 Celje",
  "skupaj": "Ljubljanska cesta 1 3000 Celje",
  "geo_longitude": 46.2294595,
  "geo_latitude": 15.2609484
}, {
  "ve": "5",
  "ovk": "4,5",
  "okraj": "ŽALEC",
  "sedežVoliščaOmnia": "UE Žalec, Ulica Savinjske čete 5, 3310 Žalec",
  "dostopnoInvalidom": "i",
  "ime": "UE Žalec",
  "naslov": " Ulica Savinjske čete 5",
  "pošta": " 3310 Žalec",
  "skupaj": "Ulica Savinjske čete 5 3310 Žalec",
  "geo_longitude": 46.250406,
  "geo_latitude": 15.1641877
}, {
  "ve": "5",
  "ovk": "6",
  "okraj": "MOZIRJE",
  "sedežVoliščaOmnia": "Avla Upravnega centra Mozirje, Šmihelska cesta 2, 3330 Mozirje",
  "ime": "Avla Upravnega centra Mozirje",
  "naslov": " Šmihelska cesta 2",
  "pošta": " 3330 Mozirje",
  "skupaj": "Šmihelska cesta 2 3330 Mozirje",
  "geo_longitude": 46.3406125,
  "geo_latitude": 14.9657342
}, {
  "ve": "5",
  "ovk": "7,8",
  "okraj": "VELENJE",
  "sedežVoliščaOmnia": "UE Velenje, Rudarska 6a, 3320 Velenje",
  "dostopnoInvalidom": "i",
  "ime": "UE Velenje",
  "naslov": " Rudarska 6a",
  "pošta": " 3320 Velenje",
  "skupaj": "Rudarska 6a 3320 Velenje",
  "geo_longitude": 46.3592008,
  "geo_latitude": 15.1136985
}, {
  "ve": "5",
  "ovk": "9",
  "okraj": "SLOVENJ GRADEC",
  "sedežVoliščaOmnia": "UE Slovenj Gradec, Meškova 21, 2380 Slovenj Gradec",
  "dostopnoInvalidom": "i",
  "ime": "UE Slovenj Gradec",
  "naslov": " Meškova 21",
  "pošta": " 2380 Slovenj Gradec",
  "skupaj": "Meškova 21 2380 Slovenj Gradec",
  "geo_longitude": 46.5104498,
  "geo_latitude": 15.0813811
}, {
  "ve": "5",
  "ovk": "10",
  "okraj": "RAVNE NA KOROŠKEM",
  "sedežVoliščaOmnia": "UE Ravne na Koroškem, Čečovje 12a, 2390 Ravne na Koroškem",
  "dostopnoInvalidom": "i",
  "ime": "UE Ravne na Koroškem",
  "naslov": " Čečovje 12a",
  "pošta": " 2390 Ravne na Koroškem",
  "skupaj": "Čečovje 12a 2390 Ravne na Koroškem",
  "geo_longitude": 46.54157860000001,
  "geo_latitude": 14.9635027
}, {
  "ve": "5",
  "ovk": "11",
  "okraj": "RADLJE OB DRAVI",
  "sedežVoliščaOmnia": "Občina Radlje ob Dravi, Mariborska 7, 2360 Radlje ob Dravi",
  "dostopnoInvalidom": "i",
  "ime": "Občina Radlje ob Dravi",
  "naslov": " Mariborska 7",
  "pošta": " 2360 Radlje ob Dravi",
  "skupaj": "Mariborska 7 2360 Radlje ob Dravi",
  "geo_longitude": 46.6146927,
  "geo_latitude": 15.2246171
}, {
  "ve": "6",
  "ovk": "1",
  "okraj": "ČRNOMELJ",
  "sedežVoliščaOmnia": "UE Črnomelj, Zadružna cesta št. 16, 8340 Črnomelj",
  "ime": "UE Črnomelj",
  "naslov": " Zadružna cesta št. 16",
  "pošta": " 8340 Črnomelj",
  "skupaj": "Zadružna cesta št. 16 8340 Črnomelj",
  "geo_longitude": 45.5793404,
  "geo_latitude": 15.1959043
}, {
  "ve": "6",
  "ovk": "2,3",
  "okraj": "NOVO MESTO",
  "sedežVoliščaOmnia": "UE Novo mesto, Defranceschijeva ulica 1, 8000 Novo mesto",
  "dostopnoInvalidom": "i",
  "ime": "UE Novo mesto",
  "naslov": " Defranceschijeva ulica 1",
  "pošta": " 8000 Novo mesto",
  "skupaj": "Defranceschijeva ulica 1 8000 Novo mesto",
  "geo_longitude": 45.8039406,
  "geo_latitude": 15.1647527
}, {
  "ve": "6",
  "ovk": "4",
  "okraj": "TREBNJE",
  "sedežVoliščaOmnia": "Občina Trebnje, Goliev trg, 8210 Trebnje",
  "dostopnoInvalidom": "i",
  "ime": "Občina Trebnje",
  "naslov": " Goliev trg",
  "pošta": " 8210 Trebnje",
  "skupaj": "Goliev trg 8210 Trebnje",
  "geo_longitude": 45.908199,
  "geo_latitude": 15.0073682
}, {
  "ve": "6",
  "ovk": "5",
  "okraj": "BREŽICE",
  "sedežVoliščaOmnia": "UE Brežice, Cesta prvih borcev 24a, 8250 Brežice",
  "dostopnoInvalidom": "i",
  "ime": "UE Brežice",
  "naslov": " Cesta prvih borcev 24a",
  "pošta": " 8250 Brežice",
  "skupaj": "Cesta prvih borcev 24a 8250 Brežice",
  "geo_longitude": 45.9043717,
  "geo_latitude": 15.592799
}, {
  "ve": "6",
  "ovk": "6",
  "okraj": "KRŠKO",
  "sedežVoliščaOmnia": "UE Krško, Cesta krških žrtev 14, 8270 Krško",
  "dostopnoInvalidom": "i",
  "ime": "UE Krško",
  "naslov": " Cesta krških žrtev 14",
  "pošta": " 8270 Krško",
  "skupaj": "Cesta krških žrtev 14 8270 Krško",
  "geo_longitude": 45.9664451,
  "geo_latitude": 15.4850134
}, {
  "ve": "6",
  "ovk": "7",
  "okraj": "SEVNICA",
  "sedežVoliščaOmnia": "UE Sevnica, Glavni trg 19/a, 8290 Sevnica",
  "dostopnoInvalidom": "i",
  "ime": "UE Sevnica",
  "naslov": " Glavni trg 19/a",
  "pošta": " 8290 Sevnica",
  "skupaj": "Glavni trg 19/a 8290 Sevnica",
  "geo_longitude": 46.00569369999999,
  "geo_latitude": 15.3155628
}, {
  "ve": "6",
  "ovk": "8",
  "okraj": "LAŠKO",
  "sedežVoliščaOmnia": "Kulturni center Laško, Trg Svobode 6, 3270 Laško",
  "dostopnoInvalidom": "i",
  "ime": "Kulturni center Laško",
  "naslov": " Trg Svobode 6",
  "pošta": " 3270 Laško",
  "skupaj": "Trg Svobode 6 3270 Laško",
  "geo_longitude": 46.1547931,
  "geo_latitude": 15.2332703
}, {
  "ve": "6",
  "ovk": "9",
  "okraj": "HRASTNIK",
  "sedežVoliščaOmnia": "Galerija delavskega doma Hrastnik, 1430 Hrastnik",
  "dostopnoInvalidom": "i",
  "ime": "Galerija delavskega doma Hrastnik",
  "naslov": " 1430 Hrastnik",
  "pošta": " 1430 Hrastnik",
  "skupaj": "1430 Hrastnik 1430 Hrastnik",
  "geo_longitude": 46.1376045,
  "geo_latitude": 15.0956652
}, {
  "ve": 6,
  "ovk": 10,
  "okraj": "TRBOVLJE",
  "sedežVoliščaOmnia": "UE Trbovlje, Mestni trg 4, 1422 Trbovlje",
  "ime": "UE Trbovlje",
  "naslov": " Mestni trg 4",
  "pošta": " 1422 Trbovlje",
  "skupaj": "Mestni trg 4 1422 Trbovlje",
  "geo_longitude": 46.1562659,
  "geo_latitude": 15.0540651
}, {
  "ve": "6",
  "ovk": "11",
  "okraj": "ZAGORJE OB SAVI",
  "sedežVoliščaOmnia": "UE Zagorje ob Savi, Cesta 9.avgusta 5, 1410 Zagorje ob Savi",
  "dostopnoInvalidom": "i",
  "ime": "UE Zagorje ob Savi",
  "naslov": " Cesta 9.avgusta 5",
  "pošta": " 1410 Zagorje ob Savi",
  "skupaj": "Cesta 9.avgusta 5 1410 Zagorje ob Savi",
  "geo_longitude": 46.1345676,
  "geo_latitude": 14.9964666
}, {
  "ve": 7,
  "ovk": "1",
  "okraj": "ŠMARJE PRI JELŠAH",
  "sedežVoliščaOmnia": "Kulturni dom Šmarje pri Jelšah, Aškerčev trg 20, 3240 Šmarje pri Jelšah",
  "dostopnoInvalidom": "i",
  "ime": "Kulturni dom Šmarje pri Jelšah",
  "naslov": " Aškerčev trg 20",
  "pošta": " 3240 Šmarje pri Jelšah",
  "skupaj": "Aškerčev trg 20 3240 Šmarje pri Jelšah",
  "geo_longitude": 46.2282002,
  "geo_latitude": 15.518307
}, {
  "ve": 7,
  "ovk": "2",
  "okraj": "SLOVENSKA BISTRICA",
  "sedežVoliščaOmnia": "UE Slovenska Bistrica, Kolodvorska 10, 2310 Slovenska Bistrica",
  "dostopnoInvalidom": "i",
  "ime": "UE Slovenska Bistrica",
  "naslov": " Kolodvorska 10",
  "pošta": " 2310 Slovenska Bistrica",
  "skupaj": "Kolodvorska 10 2310 Slovenska Bistrica",
  "geo_longitude": 46.3918802,
  "geo_latitude": 15.5755279
}, {
  "ve": 7,
  "ovk": "3",
  "okraj": "SLOVENSKE KONJICE",
  "sedežVoliščaOmnia": "Občina Slovenske Konjice, Stari trg 29, 3210 Slovenske Konjice",
  "ime": "Občina Slovenske Konjice",
  "naslov": " Stari trg 29",
  "pošta": " 3210 Slovenske Konjice",
  "skupaj": "Stari trg 29 3210 Slovenske Konjice",
  "geo_longitude": 46.337139,
  "geo_latitude": 15.4220251
}, {
  "ve": 7,
  "ovk": "4",
  "okraj": "RUŠE",
  "sedežVoliščaOmnia": "Kulturni dom Ruše, Falska cesta 24, 2342 Ruše",
  "dostopnoInvalidom": "i",
  "ime": "Kulturni dom Ruše",
  "naslov": " Falska cesta 24",
  "pošta": " 2342 Ruše",
  "skupaj": "Falska cesta 24 2342 Ruše",
  "geo_longitude": 46.5386287,
  "geo_latitude": 15.5103294
}, {
  "ve": 7,
  "ovk": "5,6,7,8,9,10,11",
  "okraj": "MARIBOR",
  "sedežVoliščaOmnia": "Razstavni salon, Grajska ulica 7, 2000 Maribor",
  "dostopnoInvalidom": "i",
  "ime": "Razstavni salon",
  "naslov": " Grajska ulica 7",
  "pošta": " 2000 Maribor",
  "skupaj": "Grajska ulica 7 2000 Maribor",
  "geo_longitude": 46.5610717,
  "geo_latitude": 15.6481454
}, {
  "ve": 8,
  "ovk": "1",
  "okraj": "LENDAVA",
  "sedežVoliščaOmnia": "Dvojezična Osnovna šola II, Lendava, Ulica Sv. Štefana 21, 9220 Lendava",
  "dostopnoInvalidom": "i",
  "ime": "Dvojezična Osnovna šola II, Lendava",
  "naslov": "Ulica Sv. Štefana 21",
  "pošta": "9220 Lendava",
  "skupaj": "Ulica Sv. Štefana 21 9220 Lendava",
  "geo_longitude": 46.5665732,
  "geo_latitude": 16.4518389
}, {
  "ve": 8,
  "ovk": "2",
  "okraj": "ORMOŽ",
  "sedežVoliščaOmnia": "UE Ormož, Ptujska cesta 6, 2270 Ormož",
  "dostopnoInvalidom": "i",
  "ime": "UE Ormož",
  "naslov": " Ptujska cesta 6",
  "pošta": " 2270 Ormož",
  "skupaj": "Ptujska cesta 6 2270 Ormož",
  "geo_longitude": 46.4073092,
  "geo_latitude": 16.1472562
}, {
  "ve": "8",
  "ovk": "3",
  "okraj": "LJUTOMER",
  "sedežVoliščaOmnia": "UE Ljutomer, Vrazova ulica 1, 9240 Ljutomer",
  "dostopnoInvalidom": "i",
  "ime": "UE Ljutomer",
  "naslov": " Vrazova ulica 1",
  "pošta": " 9240 Ljutomer",
  "skupaj": "Vrazova ulica 1 9240 Ljutomer",
  "geo_longitude": 46.51760489999999,
  "geo_latitude": 16.1950971
}, {
  "ve": 8,
  "ovk": "4,5",
  "okraj": "MURSKA SOBOTA",
  "sedežVoliščaOmnia": "UE Murska Sobota, Kardoševa 2, 9000 Murska Sobota",
  "dostopnoInvalidom": "i",
  "ime": "UE Murska Sobota",
  "naslov": " Kardoševa 2",
  "pošta": " 9000 Murska Sobota",
  "skupaj": "Kardoševa 2 9000 Murska Sobota",
  "geo_longitude": 46.6627224,
  "geo_latitude": 16.1639805
}, {
  "ve": 8,
  "ovk": "6",
  "okraj": "GORNJA RADGONA",
  "sedežVoliščaOmnia": "UE Gornja Radgona, Partizanska cesta 13, 9250 Gornja Radgona",
  "ime": "UE Gornja Radgona",
  "naslov": " Partizanska cesta 13",
  "pošta": " 9250 Gornja Radgona",
  "skupaj": "Partizanska cesta 13 9250 Gornja Radgona",
  "geo_longitude": 46.6775138,
  "geo_latitude": 15.9903322
}, {
  "ve": "8",
  "ovk": "7",
  "okraj": "LENART",
  "sedežVoliščaOmnia": "UE Lenart, Trg osvoboditve 7, 2230 Lenart",
  "dostopnoInvalidom": "i",
  "ime": "UE Lenart",
  "naslov": " Trg osvoboditve 7",
  "pošta": " 2230 Lenart",
  "skupaj": "Trg osvoboditve 7 2230 Lenart",
  "geo_longitude": 46.5759634,
  "geo_latitude": 15.83071
}, {
  "ve": 8,
  "ovk": "8",
  "okraj": "PESNICA PRI MARIBORU",
  "sedežVoliščaOmnia": "UE Pesnica, Pesnica pri Mariboru 43/a, 2211 Pesnica pri Mariboru",
  "dostopnoInvalidom": "i",
  "ime": "UE Pesnica",
  "naslov": " Pesnica pri Mariboru 43/a",
  "pošta": " 2211 Pesnica pri Mariboru",
  "skupaj": "Pesnica pri Mariboru 43/a 2211 Pesnica pri Mariboru",
  "geo_longitude": 46.6090269,
  "geo_latitude": 15.6779261
}, {
  "ve": "8",
  "ovk": "9,10,11",
  "okraj": "PTUJ",
  "sedežVoliščaOmnia": "UE Ptuj, Slomškova ulica 10, 2250 Ptuj",
  "dostopnoInvalidom": "i",
  "ime": "UE Ptuj",
  "naslov": " Slomškova ulica 10",
  "pošta": " 2250 Ptuj",
  "skupaj": "Slomškova ulica 10 2250 Ptuj",
  "geo_longitude": 46.4214918,
  "geo_latitude": 15.8719051
}]

function initmap() {
  // set up the map
  map = new L.Map('themap');

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a>';
  var osm = new L.TileLayer(osmUrl, {
    minZoom: 8,
    maxZoom: 18,
    attribution: osmAttrib
  });

  // start the map in Slovenia
  map.setView(new L.LatLng(46.2, 15), 9);
  map.addLayer(osm);

  // create icon
  var rainbowIcon = L.icon({
    iconUrl: 'images/marker.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [32, 48], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [16, 47], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -48] // point from which the popup should open relative to the iconAnchor
});


  // add markers
  $.each(locations, function(i, e) {
     var marker = L.marker([e['geo_longitude'], e['geo_latitude']], {
         'icon': rainbowIcon
     }).addTo(map);

     if (e['dostopnoInvalidom'] === 'i') {
        marker.bindPopup('<div class="markercontainer"><div><b>' + e['ime'] + '</b></div><div>' + e['naslov'] + ', ' + e['pošta'] + '</div>' + '<div><br>Volilni okraj: <strong>' + e['okraj'] + '</strong></div><div><br><b>Volišče je dostopno invalidom. :)</b></div><div class="button namera">Izpolni namero!</div></div>');
     } else {
         marker.bindPopup('<div class="markercontainer"><div><b>' + e['ime'] + '</b></div><div>' + e['naslov'] + ', ' + e['pošta'] + '</div>' + '<div><br>Volilni okraj: <strong>' + e['okraj'] + '</strong></div><div><br><b>Volišče ni dostopno invalidom. :(</b></div><div class="button namera">Izpolni namero!</div></div>');
     }


  });

}
