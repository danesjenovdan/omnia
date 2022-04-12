function initmap(container) {
    map = new L.Map(container);
    var a = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        b = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>',
        c = new L.TileLayer(a, {
            minZoom: 8,
            maxZoom: 18,
            attribution: b
        });
    map.setView(new L.LatLng(46.2, 15), 9), map.addLayer(c);
    var d = L.icon({
        iconUrl: "images/marker.svg",
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -48]
    });
    $.each(locations, function (a, b) {
        var c = L.marker([b.geo_longitude, b.geo_latitude], {
            icon: d
        }).addTo(map);
        // TODO removed dostopno invalidom
        c.bindPopup("this should be 'i'" === b.dostopnoInvalidom ? '<div class="markercontainer"><div><b>' + b.ime + "</b></div><div>" + b.naslov + ", " + b["pošta"] + "</div><div><br>Volilni okraj: <strong>" + b.okraj + '</strong></div><div><br><b>Volišče je dostopno invalidom. :)</b></div><div class="button namera">Izpolni namero!</div></div>' : '<div class="markercontainer"><div><b>' + b.ime + "</b></div><div>" + b.naslov + ", " + b["pošta"] + "</div><div><br>Volilni okraj: <strong>" + b.okraj + '</strong></div><div><br><b>Ne vemo, ali je volišče dostopno invalidom. :(</b></div><div class="button namera">Izpolni namero!</div></div>')
    })
}

function hoursUntilMidnight() {
    var a = new Date;
    return a.setHours(24), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), Math.ceil((a.getTime() - (new Date).getTime()) / 1e3 / 60 / 60)
}
var map, ajaxRequest, plotlist, plotlayers = [],
    locations = [{
            ve: 1,
            ovk: "OVK Jesenice",
            okraj: "JESENICE",
            "sedežVoliščaOmnia": "Avla UE Jesenice, C. Železarjev 6.a, 4270 Jesenice",
            dostopnoInvalidom: "i",
            ime: "Avla UE Jesenice",
            naslov: "C. Železarjev 6.a",
            "pošta": "4270 Jesenice",
            skupaj: "C. Železarjev 6.a 4270 Jesenice",
            geo_longitude: 46.4320606,
            geo_latitude: 14.0623146
        },
        {
            ve: 1,
            ovk: "OVK Radovljica 1,2",
            okraj: "RADOVLJICA",
            "sedežVoliščaOmnia": "Avla Občine Radovljica, Gorenjska cesta 19, 4240 Radovljica",
            dostopnoInvalidom: "i",
            ime: "Avla Občine Radovljica",
            naslov: "Gorenjska cesta 19",
            "pošta": "4240 Radovljica",
            skupaj: "Gorenjska cesta 19 4240 Radovljica",
            geo_longitude: 46.3438093,
            geo_latitude: 14.1715796
        },
        {
            ve: 1,
            ovk: "OVK Kranj 1,2,3",
            okraj: "KRANJ",
            "sedežVoliščaOmnia": "Avla Mestne občine Kranj, Slovenski trg 1, 4000 Kranj",
            dostopnoInvalidom: "i",
            ime: "Avla Mestne občine Kranj",
            naslov: "Slovenski trg 1",
            "pošta": "4000 Kranj",
            skupaj: "Slovenski trg 1 4000 Kranj",
            geo_longitude: 46.243268,
            geo_latitude: 14.3557455
        },
        {
            ve: 1,
            ovk: "OVK Tržič",
            okraj: "TRŽIČ",
            "sedežVoliščaOmnia": "Društvo upokojencev Tržič, Trg svobode 18, 4290 Tržič",
            dostopnoInvalidom: "i",
            ime: "Društvo upokojencev Tržič",
            naslov: "Trg svobode 18",
            "pošta": "4290 Tržič",
            skupaj: "Trg svobode 18 4290 Tržič",
            geo_longitude: 46.3635438,
            geo_latitude: 14.3089991
        },
        {
            ve: 1,
            ovk: "OVK Škofja Loka 1,2",
            okraj: "ŠKOFJA LOKA",
            "sedežVoliščaOmnia": "Občina Škofja Loka, Mestni trg 15, 4220 Škofja Loka",
            dostopnoInvalidom: "i",
            ime: "Občina Škofja Loka",
            naslov: "Mestni trg 15",
            "pošta": "4220 Škofja Loka",
            skupaj: "Mestni trg 15 4220 Škofja Loka",
            geo_longitude: 46.1639449,
            geo_latitude: 14.3066842
        },
        {
            ve: 1,
            ovk: "OVK Kamnik",
            okraj: "KAMNIK",
            "sedežVoliščaOmnia": "Občina Kamnik, Glavni trg 24, 1241 Kamnik",
            dostopnoInvalidom: "i",
            ime: "Občina Kamnik",
            naslov: "Glavni trg 24",
            "pošta": "1241 Kamnik",
            skupaj: "Glavni trg 24 1241 Kamnik",
            geo_longitude: 46.2263678,
            geo_latitude: 14.6122718
        },
        {
            ve: 1,
            ovk: "OVK Idrija",
            okraj: "IDRIJA",
            "sedežVoliščaOmnia": "UE Idrija, Študentovska ulica 2, 5280 Idrija",
            dostopnoInvalidom: "i",
            ime: "UE Idrija",
            naslov: "Študentovska ulica 2",
            "pošta": "5280 Idrija",
            skupaj: "Študentovska ulica 2 5280 Idrija",
            geo_longitude: 46.0012824,
            geo_latitude: 14.021122
        },
        {
            ve: 2,
            ovk: "OVK Tolmin",
            okraj: "TOLMIN",
            "sedežVoliščaOmnia": "UE Tolmin, Tumov drevored 4, 5220 Tolmin",
            dostopnoInvalidom: "i",
            ime: "UE Tolmin",
            naslov: "Tumov drevored 4",
            "pošta": "5220 Tolmin",
            skupaj: "Tumov drevored 4 5220 Tolmin",
            geo_longitude: 46.1830875,
            geo_latitude: 13.7313531
        },
        {
            ve: 2,
            ovk: "OVK Piran",
            okraj: "PIRAN",
            "sedežVoliščaOmnia": "UE Piran, Obala 114a, 6320 Portorož",
            dostopnoInvalidom: "i",
            ime: "UE Piran",
            naslov: "Obala 114a",
            "pošta": "6320 Portorož",
            skupaj: "Obala 114a 6320 Portorož",
            geo_longitude: 45.5025042,
            geo_latitude: 13.6031774
        },
        {
            ve: 2,
            ovk: "OVK Izola",
            okraj: "IZOLA",
            "sedežVoliščaOmnia": "UE Izola, Cesta v Pregavor 3.a, 6310 Izola",
            dostopnoInvalidom: "",
            ime: "UE Izola",
            naslov: "Cesta v Pregavor 3.a",
            "pošta": "6310 Izola",
            skupaj: "Cesta v Pregavor 3.a 6310 Izola",
            geo_longitude: 45.5299253,
            geo_latitude: 13.6669793
        },
        {
            ve: 2,
            ovk: "OVK Koper 1",
            okraj: "KOPER",
            "sedežVoliščaOmnia": "UE Koper, Piranska cesta 2, 6000 Koper",
            dostopnoInvalidom: "i",
            ime: "UE Koper",
            naslov: "Piranska cesta 2",
            "pošta": "6000 Koper",
            skupaj: "Piranska cesta 2 6000 Koper",
            geo_longitude: 45.547862,
            geo_latitude: 13.7314358
        },
        {
            ve: 2,
            ovk: "OVK Koper 2",
            okraj: "KOPER",
            "sedežVoliščaOmnia": "UE Koper, Piranska cesta 2, 6000 Koper",
            dostopnoInvalidom: "i",
            ime: "UE Koper",
            naslov: "Piranska cesta 2",
            "pošta": "6000 Koper",
            skupaj: "Piranska cesta 2 6000 Koper",
            geo_longitude: 45.5444314,
            geo_latitude: 13.7259752
        },
        {
            ve: 2,
            ovk: "OVK Sežana",
            okraj: "SEŽANA",
            "sedežVoliščaOmnia": "Stara stavba Občine Sežana (Medobčinsko društvo invalidov Sežana), Partizanska cesta 4, 6210 Sežana",
            dostopnoInvalidom: "i",
            ime: "Stara stavba Občine Sežana",
            naslov: "Partizanska cesta 4",
            "pošta": "6210 Sežana",
            skupaj: "Partizanska cesta 4 6210 Sežana",
            geo_longitude: 45.5142898,
            geo_latitude: 13.5908455
        },
        {
            ve: 2,
            ovk: "OVK Ilirska Bistrica",
            okraj: "ILIRSKA BISTRICA",
            "sedežVoliščaOmnia": "Dom na Vidmu, Gregorčičeva cesta 2, 6250 Ilirska Bistrica",
            dostopnoInvalidom: "i",
            ime: "Dom na Vidmu",
            naslov: "Gregorčičeva cesta 2",
            "pošta": "6250 Ilirska Bistrica",
            skupaj: "Gregorčičeva cesta 2 6250 Ilirska Bistrica",
            geo_longitude: 45.5638075,
            geo_latitude: 14.2446335
        },
        {
            ve: 2,
            ovk: "OVK Postojna",
            okraj: "POSTOJNA",
            "sedežVoliščaOmnia": "Avla Kulturnega doma Postojna, Gregorčičev drevored 2a, 6320 Postojna",
            dostopnoInvalidom: "",
            ime: "Avla Kulturnega doma Postojna",
            naslov: "Gregorčičev drevored 2a",
            "pošta": "6320 Postojna",
            skupaj: "Gregorčičev drevored 2a 6320 Postojna",
            geo_longitude: 45.7750164,
            geo_latitude: 14.2139278
        },
        {
            ve: 2,
            ovk: "OVK Nova Gorica 1,2",
            okraj: "NOVA GORICA",
            "sedežVoliščaOmnia": "UE Nova Gorica, Trg Edvarda Kardelja 1, 5000 Nova Gorica",
            dostopnoInvalidom: "",
            ime: "UE Nova Gorica",
            naslov: "Trg Edvarda Kardelja 1",
            "pošta": "5000 Nova Gorica",
            skupaj: "Trg Edvarda Kardelja 1 5000 Nova Gorica",
            geo_longitude: 45.9572629,
            geo_latitude: 13.6488414
        },
        {
            ve: 2,
            ovk: "OVK Ajdovščina",
            okraj: "AJDOVŠČINA",
            "sedežVoliščaOmnia": "UE Ajdovščina, Vipavska cesta 11b, 5270 Ajdovščina",
            dostopnoInvalidom: "i",
            ime: "UE Ajdovščina",
            naslov: "Vipavska cesta 11b",
            "pošta": "5270 Ajdovščina",
            skupaj: "Vipavska cesta 11b 5270 Ajdovščina",
            geo_longitude: 45.8854392,
            geo_latitude: 13.9115639
        },
        {
            ve: 3,
            ovk: "OVK Logatec",
            okraj: "LOGATEC",
            "sedežVoliščaOmnia": "UE Cerknica, Cesta 4. maja 24, 1370 Cerknica",
            dostopnoInvalidom: "",
            ime: "UE Cerknica",
            naslov: "Cesta 4. maja 24",
            "pošta": "1370 Cerknica",
            skupaj: "Cesta 4. maja 24 1370 Cerknica",
            geo_longitude: 45.793266,
            geo_latitude: 14.3666196
        },
        {
            ve: 3,
            ovk: "OVK Vrhnika",
            okraj: "VRHNIKA",
            "sedežVoliščaOmnia": "UE Vrhnika, Stara Vrhnika 1d, 1360 Vrhnika",
            dostopnoInvalidom: "i",
            ime: "UE Vrhnika",
            naslov: "Stara Vrhnika 1d",
            "pošta": "1360 Vrhnika",
            skupaj: "Stara Vrhnika 1d 1360 Vrhnika",
            geo_longitude: 45.9660045,
            geo_latitude: 14.2985383
        },
        {
            ve: 3,
            ovk: "",
            okraj: "LJUBLJANA",
            "sedežVoliščaOmnia": "UE Ljubljana, Linhartova cesta 13, 1000 Ljubljana",
            dostopnoInvalidom: "i",
            ime: "UE Ljubljana",
            naslov: "Linhartova cesta 13",
            "pošta": "1000 Ljubljana",
            skupaj: "Linhartova cesta 13 1000 Ljubljana",
            geo_longitude: 46.05628,
            geo_latitude: 14.5332483
        },
        {
            ve: 4,
            ovk: "OVK Kočevje",
            okraj: "KOČEVJE",
            "sedežVoliščaOmnia": "Avla Gimnazije Kočevje, Ljubljanska cesta 12, 1330 Kočevje",
            dostopnoInvalidom: "i",
            ime: "Avla Gimnazije Kočevje",
            naslov: "Ljubljanska cesta 12",
            "pošta": "1330 Kočevje",
            skupaj: "Ljubljanska cesta 12 1330 Kočevje",
            geo_longitude: 45.6412429,
            geo_latitude: 14.8581203
        },
        {
            ve: 4,
            ovk: "OVK Ribnica-Dobrepolje",
            okraj: "RIBNICA",
            "sedežVoliščaOmnia": "UE Ribnica, Gorenjska cesta 9, 1310 Ribnica",
            dostopnoInvalidom: "i",
            ime: "UE Ribnica",
            naslov: "Gorenjska cesta 9",
            "pošta": "1310 Ribnica",
            skupaj: "Gorenjska cesta 9 1310 Ribnica",
            geo_longitude: 45.7419938,
            geo_latitude: 14.7274
        },
        {
            ve: 4,
            ovk: "OVK Grosuplje",
            okraj: "GROSUPLJE",
            "sedežVoliščaOmnia": "UE Grosuplje, Taborska cesta 1, 1290 Grosuplje",
            dostopnoInvalidom: "i",
            ime: "UE Grosuplje",
            naslov: "Taborska cesta 1",
            "pošta": "1290 Grosuplje",
            skupaj: "Taborska cesta 1 1290 Grosuplje",
            geo_longitude: 45.9571274,
            geo_latitude: 14.6533203
        },
        {
            ve: 4,
            ovk: "OVK Ivančna Gorica",
            okraj: "IVANČNA GORICA",
            "sedežVoliščaOmnia": "Kulturni dom Ivančna Gorica, Sokolska ulica 4, 1295 Ivančna Gorica",
            dostopnoInvalidom: "",
            ime: "Kulturni dom Ivančna Gorica",
            naslov: "Sokolska ulica 4",
            "pošta": "1295 Ivančna Gorica",
            skupaj: "Sokolska ulica 4 1295 Ivančna Gorica",
            geo_longitude: 45.9387023,
            geo_latitude: 14.8044599
        },
        {
            ve: 4,
            ovk: "OVK Domžale 1,2",
            okraj: "DOMŽALE",
            "sedežVoliščaOmnia": "Domžalski dom, Ljubljanska cesta 58, 1230 Domžale",
            dostopnoInvalidom: "i",
            ime: "Domžalski dom",
            naslov: "Ljubljanska cesta 58",
            "pošta": "1230 Domžale",
            skupaj: "Ljubljanska cesta 58 1230 Domžale",
            geo_longitude: 46.1380262,
            geo_latitude: 14.5910958
        },
        {
            ve: 5,
            ovk: "OVK Šentjur",
            okraj: "ŠENTJUR",
            "sedežVoliščaOmnia": "Gasilski dom Šentjur, A.M. Slomška 2, 3320 Šentjur",
            dostopnoInvalidom: "i",
            ime: "Gasilski dom Šentjur",
            naslov: "A.M. Slomška 2",
            "pošta": "3320 Šentjur",
            skupaj: "A.M. Slomška 2 3320 Šentjur",
            geo_longitude: 46.2195017,
            geo_latitude: 15.3966576
        },
        {
            ve: 5,
            ovk: "OVK Celje 1,2",
            okraj: "CELJE",
            "sedežVoliščaOmnia": "UE Celje, Ljubljanska cesta 1, 3000 Celje",
            dostopnoInvalidom: "i",
            ime: "UE Celje",
            naslov: "Ljubljanska cesta 1",
            "pošta": "3000 Celje",
            skupaj: "Ljubljanska cesta 1 3000 Celje",
            geo_longitude: 46.2294595,
            geo_latitude: 15.2609484
        },
        {
            ve: 5,
            ovk: "OVK Žalec 1,2",
            okraj: "ŽALEC",
            "sedežVoliščaOmnia": "UE Žalec, Ulica Savinjske čete 5, 3310 Žalec",
            dostopnoInvalidom: "i",
            ime: "UE Žalec",
            naslov: "Ulica Savinjske čete 5",
            "pošta": "3310 Žalec",
            skupaj: "Ulica Savinjske čete 5 3310 Žalec",
            geo_longitude: 46.250406,
            geo_latitude: 15.1641877
        },
        {
            ve: 5,
            ovk: "OVK Mozirje",
            okraj: "MOZIRJE",
            "sedežVoliščaOmnia": "Avla Upravnega centra Mozirje, Šmihelska cesta 2, 3330 Mozirje",
            dostopnoInvalidom: "",
            ime: "Avla Upravnega centra Mozirje",
            naslov: "Šmihelska cesta 2",
            "pošta": "3330 Mozirje",
            skupaj: "Šmihelska cesta 2 3330 Mozirje",
            geo_longitude: 46.3406173,
            geo_latitude: 14.9656081
        },
        {
            ve: 5,
            ovk: "OVK Velenje 1,2",
            okraj: "VELENJE",
            "sedežVoliščaOmnia": "UE Velenje, Rudarska 6a, 3320 Velenje",
            dostopnoInvalidom: "i",
            ime: "UE Velenje",
            naslov: "Rudarska 6a",
            "pošta": "3320 Velenje",
            skupaj: "Rudarska 6a 3320 Velenje",
            geo_longitude: 46.3592008,
            geo_latitude: 15.1136985
        },
        {
            ve: 5,
            ovk: "OVK Slovenj Gradec",
            okraj: "SLOVENJ GRADEC",
            "sedežVoliščaOmnia": "UE Slovenj Gradec, Meškova 21, 2380 Slovenj Gradec",
            dostopnoInvalidom: "i",
            ime: "UE Slovenj Gradec",
            naslov: "Meškova 21",
            "pošta": "2380 Slovenj Gradec",
            skupaj: "Meškova 21 2380 Slovenj Gradec",
            geo_longitude: 46.5104498,
            geo_latitude: 15.0813811
        },
        {
            ve: 5,
            ovk: "OVK Ravne na Koroškem",
            okraj: "RAVNE NA KOROŠKEM",
            "sedežVoliščaOmnia": "UE Ravne na Koroškem, Čečovje 12a, 2390 Ravne na Koroškem",
            dostopnoInvalidom: "i",
            ime: "UE Ravne na Koroškem",
            naslov: "Čečovje 12a",
            "pošta": "2390 Ravne na Koroškem",
            skupaj: "Čečovje 12a 2390 Ravne na Koroškem",
            geo_longitude: 46.5415786,
            geo_latitude: 14.9635027
        },
        {
            ve: 5,
            ovk: "OVK Radlje",
            okraj: "RADLJE OB DRAVI",
            "sedežVoliščaOmnia": "UE Radlje ob Dravi, Mariborska 7, 2360 Radlje ob Dravi",
            dostopnoInvalidom: "i",
            ime: "UE Radlje ob Dravi",
            naslov: "Mariborska 7",
            "pošta": "2360 Radlje ob Dravi",
            skupaj: "Mariborska 7 2360 Radlje ob Dravi",
            geo_longitude: 46.6146927,
            geo_latitude: 15.2246171
        },
        {
            ve: 6,
            ovk: "OVK Črnomelj - Metlika",
            okraj: "ČRNOMELJ",
            "sedežVoliščaOmnia": "UE Črnomelj, Zadružna cesta št. 16, 8340 Črnomelj",
            dostopnoInvalidom: "",
            ime: "UE Črnomelj",
            naslov: "Zadružna cesta št. 16",
            "pošta": "8340 Črnomelj",
            skupaj: "Zadružna cesta št. 16 8340 Črnomelj",
            geo_longitude: 45.5793494,
            geo_latitude: 15.1959635
        },
        {
            ve: 6,
            ovk: "OVK Novo mesto 1,2",
            okraj: "NOVO MESTO",
            "sedežVoliščaOmnia": "UE Novo mesto, Defranceschijeva ulica 1, 8000 Novo mesto",
            dostopnoInvalidom: "i",
            ime: "UE Novo mesto",
            naslov: "Defranceschijeva ulica 1",
            "pošta": "8000 Novo mesto",
            skupaj: "Defranceschijeva ulica 1 8000 Novo mesto",
            geo_longitude: 45.8039406,
            geo_latitude: 15.1647527
        },
        {
            ve: 6,
            ovk: "OVK Trebnje",
            okraj: "TREBNJE",
            "sedežVoliščaOmnia": "Občina Trebnje (sedež Glasila občanov), Goliev trg 4, 8210 Trebnje",
            dostopnoInvalidom: "i",
            ime: "Občina Trebnje",
            naslov: "Goliev trg 4",
            "pošta": "8210 Trebnje",
            skupaj: "Goliev trg 4 8210 Trebnje",
            geo_longitude: 45.9083516,
            geo_latitude: 15.0072809
        },
        {
            ve: 6,
            ovk: "OVK Brežice",
            okraj: "BREŽICE",
            "sedežVoliščaOmnia": "UE Brežice, Cesta prvih borcev 24a, 8250 Brežice",
            dostopnoInvalidom: "i",
            ime: "UE Brežice",
            naslov: "Cesta prvih borcev 24a",
            "pošta": "8250 Brežice",
            skupaj: "Cesta prvih borcev 24a 8250 Brežice",
            geo_longitude: 45.9043717,
            geo_latitude: 15.592799
        },
        {
            ve: 6,
            ovk: "OVK Krško",
            okraj: "KRŠKO",
            "sedežVoliščaOmnia": "UE Krško, Cesta krških žrtev 14, 8270 Krško",
            dostopnoInvalidom: "i",
            ime: "UE Krško",
            naslov: "Cesta krških žrtev 14",
            "pošta": "8270 Krško",
            skupaj: "Cesta krških žrtev 14 8270 Krško",
            geo_longitude: 45.9665566,
            geo_latitude: 15.4849063
        },
        {
            ve: 6,
            ovk: "OVK Sevnica",
            okraj: "SEVNICA",
            "sedežVoliščaOmnia": "UE Sevnica, Glavni trg 19/a, 8290 Sevnica",
            dostopnoInvalidom: "i",
            ime: "UE Sevnica",
            naslov: "Glavni trg 19/a",
            "pošta": "8290 Sevnica",
            skupaj: "Glavni trg 19/a 8290 Sevnica",
            geo_longitude: 46.0057241,
            geo_latitude: 15.3155368
        },
        {
            ve: 6,
            ovk: "OVK Laško",
            okraj: "LAŠKO",
            "sedežVoliščaOmnia": "Kulturni center Laško, Trg Svobode 6, 3270 Laško",
            dostopnoInvalidom: "i",
            ime: "Kulturni center Laško",
            naslov: "Trg Svobode 6",
            "pošta": "3270 Laško",
            skupaj: "Trg Svobode 6 3270 Laško",
            geo_longitude: 46.1548743,
            geo_latitude: 15.2332682
        },
        {
            ve: 6,
            ovk: "OVK Litija",
            okraj: "LITIJA",
            "sedežVoliščaOmnia": "Občina Litija, Jerebova ulica 14, 1270 Litija",
            dostopnoInvalidom: "",
            ime: "Občina Litija",
            naslov: "Jerebova ulica 14",
            "pošta": "1270 Litija",
            skupaj: "Jerebova ulica 14 1270 Litija",
            geo_longitude: 46.0564434,
            geo_latitude: 14.8309441
        },
        {
            ve: 6,
            ovk: "OVK Hrastnik - Trbovlje",
            okraj: "TRBOVLJE",
            "sedežVoliščaOmnia": "UE Trbovlje, Mestni trg 4, 1422 Trbovlje",
            dostopnoInvalidom: "",
            ime: "UE Trbovlje",
            naslov: "Mestni trg 4",
            "pošta": "1422 Trbovlje",
            skupaj: "Mestni trg 4 1422 Trbovlje",
            geo_longitude: 46.1562802,
            geo_latitude: 15.0540445
        },
        {
            ve: 6,
            ovk: "OVK Zagorje",
            okraj: "ZAGORJE OB SAVI",
            "sedežVoliščaOmnia": "UE Zagorje ob Savi, Cesta 9. avgusta 5, 1410 Zagorje ob Savi",
            dostopnoInvalidom: "i",
            ime: "UE Zagorje ob Savi",
            naslov: "Cesta 9. avgusta 5",
            "pošta": "1410 Zagorje ob Savi",
            skupaj: "Cesta 9. avgusta 5 1410 Zagorje ob Savi",
            geo_longitude: 46.1345586,
            geo_latitude: 14.9963995
        },
        {
            ve: 7,
            ovk: "OVK Šmarje pri Jelšah",
            okraj: "ŠMARJE PRI JELŠAH",
            "sedežVoliščaOmnia": "Kulturni dom Šmarje pri Jelšah, Aškerčev trg 20, 3240 Šmarje pri Jelšah",
            dostopnoInvalidom: "i",
            ime: "Kulturni dom Šmarje pri Jelšah",
            naslov: "Aškerčev trg 20",
            "pošta": "3240 Šmarje pri Jelšah",
            skupaj: "Aškerčev trg 20 3240 Šmarje pri Jelšah",
            geo_longitude: 46.2282002,
            geo_latitude: 15.518307
        },
        {
            ve: 7,
            ovk: "OVK Slovenska Bistrica",
            okraj: "SLOVENSKA BISTRICA",
            "sedežVoliščaOmnia": "UE Slovenska Bistrica (sprejemna pisarna za osebe s posebnimi potrebami), Kolodvorska 10, 2310 Slovenska Bistrica",
            dostopnoInvalidom: "i",
            ime: "UE Slovenska Bistrica",
            naslov: "Kolodvorska 10",
            "pošta": "2310 Slovenska Bistrica",
            skupaj: "Kolodvorska 10 2310 Slovenska Bistrica",
            geo_longitude: 46.3919326,
            geo_latitude: 15.5755427
        },
        {
            ve: 7,
            ovk: "OVK Slovenske Konjice",
            okraj: "SLOVENSKE KONJICE",
            "sedežVoliščaOmnia": "Občina Slovenske Konjice, Stari trg 29, 3210 Slovenske Konjice",
            dostopnoInvalidom: "",
            ime: "Občina Slovenske Konjice",
            naslov: "Stari trg 29",
            "pošta": "3210 Slovenske Konjice",
            skupaj: "Stari trg 29 3210 Slovenske Konjice",
            geo_longitude: 46.337139,
            geo_latitude: 15.4220251
        },
        {
            ve: 7,
            ovk: "OVK Ruše",
            okraj: "RUŠE",
            "sedežVoliščaOmnia": "Knjižnica Janka Glazerja Ruše, Falska cesta 18, 2342 Ruše",
            dostopnoInvalidom: "i",
            ime: "Knjižnica Janka Glazerja Ruše",
            naslov: "Falska cesta 18",
            "pošta": "2342 Ruše",
            skupaj: "Falska cesta 18 2342 Ruše",
            geo_longitude: 46.5386287,
            geo_latitude: 15.5103294
        },
        {
            ve: 7,
            ovk: "OVK Maribor 1-7",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Razstavni salon, Grajska ulica 7, 2000 Maribor",
            dostopnoInvalidom: "i",
            ime: "Razstavni salon",
            naslov: "Grajska ulica 7",
            "pošta": "2000 Maribor",
            skupaj: "Grajska ulica 7 2000 Maribor",
            geo_longitude: 46.5610717,
            geo_latitude: 15.6481454
        },
        {
            ve: 8,
            ovk: "OVK Lendava",
            okraj: "LENDAVA",
            "sedežVoliščaOmnia": "Dvojezična osnovna šola II Lendava (DOŠ II), Lendava, Ulica heroja Mohorja 1, 9220 Lendava",
            dostopnoInvalidom: "i",
            ime: "Dvojezična osnovna šola II Lendava (DOŠ II)",
            naslov: "Ulica heroja Mohorja 1",
            "pošta": "9220 Lendava",
            skupaj: "Ulica heroja Mohorja 1 9220 Lendava",
            geo_longitude: 46.5665732,
            geo_latitude: 16.4518389
        },
        {
            ve: 8,
            ovk: "OVK Ormož",
            okraj: "ORMOŽ",
            "sedežVoliščaOmnia": "UE Ormož, Ptujska cesta 6, 2270 Ormož",
            dostopnoInvalidom: "i",
            ime: "UE Ormož",
            naslov: "Ptujska cesta 6",
            "pošta": "2270 Ormož",
            skupaj: "Ptujska cesta 6 2270 Ormož",
            geo_longitude: 46.4073676,
            geo_latitude: 16.1472849
        },
        {
            ve: 8,
            ovk: "OVK Ljutomer",
            okraj: "LJUTOMER",
            "sedežVoliščaOmnia": "Dom kulture, Prešernova ulica 20, 9240 Ljutomer",
            dostopnoInvalidom: "i",
            ime: "Dom kulture",
            naslov: "Prešernova ulica 20",
            "pošta": "9240 Ljutomer",
            skupaj: "Prešernova ulica 20 9240 Ljutomer",
            geo_longitude: 46.5176702,
            geo_latitude: 16.1950872
        },
        {
            ve: 8,
            ovk: "OVK Murska Sobota 1,2",
            okraj: "MURSKA SOBOTA",
            "sedežVoliščaOmnia": "Avla Mestne občine Murska Sobota, Kardoševa ulica 2, 9000 Murska Sobota",
            dostopnoInvalidom: "i",
            ime: "Avla Mestne občine Murska Sobota",
            naslov: "Kardoševa ulica 2",
            "pošta": "9000 Murska Sobota",
            skupaj: "Kardoševa ulica 2 9000 Murska Sobota",
            geo_longitude: 46.6627224,
            geo_latitude: 16.1639805
        },
        {
            ve: 8,
            ovk: "OVK Gornja Radgona",
            okraj: "GORNJA RADGONA",
            "sedežVoliščaOmnia": "UE Gornja Radgona, Partizanska cesta 13, 9250 Gornja Radgona",
            dostopnoInvalidom: "",
            ime: "UE Gornja Radgona",
            naslov: "Partizanska cesta 13",
            "pošta": "9250 Gornja Radgona",
            skupaj: "Partizanska cesta 13 9250 Gornja Radgona",
            geo_longitude: 46.6775582,
            geo_latitude: 15.9903462
        },
        {
            ve: 8,
            ovk: "OVK Lenart",
            okraj: "LENART",
            "sedežVoliščaOmnia": "Avla UE Lenart, Trg osvoboditve 7, 2230 Lenart",
            dostopnoInvalidom: "i",
            ime: "Avla UE Lenart",
            naslov: "Trg osvoboditve 7",
            "pošta": "2230 Lenart",
            skupaj: "Trg osvoboditve 7 2230 Lenart",
            geo_longitude: 46.5759634,
            geo_latitude: 15.83071
        },
        {
            ve: 8,
            ovk: "OVK Pesnica",
            okraj: "PESNICA PRI MARIBORU",
            "sedežVoliščaOmnia": "KTPC Pesnica, Pesnica pri Mariboru 41, 2211 Pesnica pri Mariboru",
            dostopnoInvalidom: "i",
            ime: "KTPC Pesnica",
            naslov: "Pesnica pri Mariboru 41",
            "pošta": "2211 Pesnica pri Mariboru",
            skupaj: "Pesnica pri Mariboru 41 2211 Pesnica pri Mariboru",
            geo_longitude: 46.6090269,
            geo_latitude: 15.6779261
        },
        {
            ve: 8,
            ovk: "OVK Ptuj 1,2,3",
            okraj: "PTUJ",
            "sedežVoliščaOmnia": "UE Ptuj, Slomškova ulica 10, 2250 Ptuj",
            dostopnoInvalidom: "i",
            ime: "UE Ptuj",
            naslov: "Slomškova ulica 10",
            "pošta": "2250 Ptuj",
            skupaj: "Slomškova ulica 10 2250 Ptuj",
            geo_longitude: 46.4214918,
            geo_latitude: 15.8719051
        }
    ];
$(document).ready(function () {
    $(".thetime").text(hoursUntilMidnight()), initmap("themap"), $(".zavesa .button").on("click", function () {
        $(".zavesa").animate({
            top: -1e3
        }, 600), $(".header .circle").removeClass("hidden")
    }), $("#themap").on("click", ".namera", function () {
        window.open("https://e-uprava.gov.si/podrocja/vloge/vloga.html?id=5206 ", "_blank");
        // $(".stepone").addClass("hidden"), $(".steptwo").removeClass("hidden"), $(".header .circle").addClass("hidden"), $(".zavesa").animate({
        //     top: 75
        // }, 600)
    }), $("body").on("click", ".fb", function () {
        var a = "https://www.facebook.com/dialog/share?app_id=301375193309601&display=popup&href=" + encodeURIComponent(document.location.href) + "&redirect_uri=" + encodeURIComponent(document.location.href) + "&ref=responsive";
        return window.open(a, "_blank"), !1
    }), $("body").on("click", ".tw", function () {
        var a = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Imaš manj kot " + hoursUntilMidnight() + " ur, da sporočiš, kje boš glasoval/-a. Povsod si lahko PROTI škodljivemu zakonu! " + document.location.href);
        return window.open(a, "_blank"), !1
    }), $("body").on("click", ".email", function () {
        var a = "mailto:?subject=Imaš manj kot " + hoursUntilMidnight() + " ur, da sporočiš, kje boš glasoval/-a.&body=Zemljevid OMNIA volišč za volilce/-ke, ki bodo glasovali/-e v Sloveniji, toda izven volilnega okraja stalnega prebivališča. Povsod si lahko PROTI škodljivemu zakonu!" + document.location.href;
        return window.open(a, "_blank"), !1
    })
});