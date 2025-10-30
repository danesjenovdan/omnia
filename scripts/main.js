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

        var markup = '<div class="markercontainer"><div><b>' + b.ime + "</b></div><div>" + b.naslov + ", " + b["pošta"] + "</div><div><br>Volilni okraj: <strong>" + b.okraj + '</strong></div>';
        if ("i" === b.dostopnoInvalidom) {
            markup += '<div><br><b>Volišče je dostopno invalidom. :)</b></div>'
        } else {
            markup += '<div><br><b>Ne vemo, ali je volišče dostopno invalidom. :(</b></div>'
        }

        markup += '<div><br><b>Oddaj vlogo <a href="https://e-uprava.gov.si/si/podrocja/vloge/vloga.html?id=8765" target="_blank" rel="noopener noreferrer">z e-identiteto</a> ali <a href="https://e-uprava.gov.si/si/podrocja/vloge/vloga.html?id=8766" target="_blank" rel="noopener noreferrer">brez</a>.</b></div>'

        markup += '</div>'

        c.bindPopup(markup)
    })
}

function timeLeft() {
    // deadline za oddat namero
    const deadline = new Date(2025, 10, 19, 24, 0, 0, 0)
    const now = new Date
    // calculate difference in DAYS
    const t2 = deadline.getTime();
    const t1 = now.getTime();
    const difference = Math.floor((t2-t1)/(24*3600*1000));
    if (difference > 1) {
        return "še " + difference + " dni"
    } else if (difference == 1) {
        return "še 1 dan"
    } else if (difference == 0) {
        return "čas še danes do polnoči"
    } else {
        return "še 0 dni"
    }
}
var map, ajaxRequest, plotlist, plotlayers = [],
    locations = [{
            ve: 1,
            ovk: "OVK Jesenice",
            okraj: "JESENICE",
            "sedežVoliščaOmnia": "Upravna enota Jesenice, C. Železarjev 6a, 4270 Jesenice",
            dostopnoInvalidom: "?",
            ime: "UE Jesenice",
            naslov: "C. Železarjev 6a",
            "pošta": "4270 Jesenice",
            skupaj: "C. Železarjev 6a 4270 Jesenice",
            geo_longitude: 46.4320606,
            geo_latitude: 14.0623146
        },
        {
            ve: 1,
            ovk: "OVK Radovljica 1-2",
            okraj: "RADOVLJICA",
            "sedežVoliščaOmnia": "Občina Radovljica, Gorenjska cesta 19, 4240 Radovljica",
            dostopnoInvalidom: "?",
            ime: "Občina Radovljica",
            naslov: "Gorenjska cesta 19",
            "pošta": "4240 Radovljica",
            skupaj: "Gorenjska cesta 19 4240 Radovljica",
            geo_longitude: 46.3438093,
            geo_latitude: 14.1715796
        },
        {
            ve: 1,
            ovk: "OVK Kranj 1-3",
            okraj: "KRANJ",
            "sedežVoliščaOmnia": "Mestna občina Kranj, Slovenski trg 1, 4000 Kranj",
            dostopnoInvalidom: "?",
            ime: "Mestna občine Kranj",
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
            dostopnoInvalidom: "?",
            ime: "Društvo upokojencev Tržič",
            naslov: "Trg svobode 18",
            "pošta": "4290 Tržič",
            skupaj: "Trg svobode 18 4290 Tržič",
            geo_longitude: 46.3635438,
            geo_latitude: 14.3089991
        },
        {
            ve: 1,
            ovk: "OVK Škofja Loka 1-2",
            okraj: "ŠKOFJA LOKA",
            "sedežVoliščaOmnia": "Upravna enota Škofja Loka, Poljanska cesta 2, 4220 Škofja Loka",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Škofja Loka",
            naslov: "Poljanska cesta 2",
            "pošta": "4220 Škofja Loka",
            skupaj: "Mestni trg 17 4220 Škofja Loka",
            geo_longitude: 46.164115778357086,
            geo_latitude: 14.307486832959421
        },
        {
            ve: 1,
            ovk: "OVK Kamnik",
            okraj: "KAMNIK",
            "sedežVoliščaOmnia": "Občina Kamnik, Glavni trg 24, 1241 Kamnik",
            dostopnoInvalidom: "?",
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
            "sedežVoliščaOmnia": "Upravna enota Idrija, Študentovska ulica 2, 5280 Idrija",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Idrija (sejna soba)",
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
            "sedežVoliščaOmnia": "Upravna enota Tolmin, Tumov drevored 4, 5220 Tolmin",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Tolmin",
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
            "sedežVoliščaOmnia": "Upravna enota Piran, Obala 114a, 6320 Portorož",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Piran",
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
            "sedežVoliščaOmnia": "Upravna enota Izola, Cesta v Pregavor 3 a, 6310 Izola",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Izola",
            naslov: "Cesta v Pregavor 3 a",
            "pošta": "6310 Izola",
            skupaj: "Cesta v Pregavor 3 a 6310 Izola",
            geo_longitude: 45.5299253,
            geo_latitude: 13.6669793
        },
        {
            ve: 2,
            ovk: "OVK Koper 1-2",
            okraj: "KOPER",
            "sedežVoliščaOmnia": "Upravna enota Koper, Piranska cesta 2, 6000 Koper",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Koper",
            naslov: "Piranska cesta 2",
            "pošta": "6000 Koper",
            skupaj: "Piranska cesta 2 6000 Koper",
            geo_longitude: 45.544337937992076,
            geo_latitude: 13.726027895471685
        },
        {
            ve: 2,
            ovk: "OVK Sežana",
            okraj: "SEŽANA",
            "sedežVoliščaOmnia": "Stara stavba Občine Sežana, Partizanska cesta 4, 6210 Sežana",
            dostopnoInvalidom: "?",
            ime: "Stara stavba Občine Sežana",
            naslov: "Partizanska cesta 4",
            "pošta": "6210 Sežana",
            skupaj: "Partizanska cesta 4 6210 Sežana",
            geo_longitude: 45.71000719986846,
            geo_latitude: 13.874054640256531
        },
        {
            ve: 2,
            ovk: "OVK Ilirska Bistrica",
            okraj: "ILIRSKA BISTRICA",
            "sedežVoliščaOmnia": "Dom na Vidmu, Gregorčičeva cesta 2, 6250 Ilirska Bistrica",
            dostopnoInvalidom: "?",
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
            "sedežVoliščaOmnia": "Upravna enota Postojna, Gregorčičev drevored 2a, 6320 Postojna",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Postojna",
            naslov: "Gregorčičev drevored 2a",
            "pošta": "6320 Postojna",
            skupaj: "Gregorčičev drevored 2a 6320 Postojna",
            geo_longitude: 45.7750164,
            geo_latitude: 14.2139278
        },
        {
            ve: 2,
            ovk: "OVK Nova Gorica 1-2",
            okraj: "NOVA GORICA",
            "sedežVoliščaOmnia": "Upravna enota Nova Gorica, Trg Edvarda Kardelja 1, 5000 Nova Gorica",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Nova Gorica",
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
            "sedežVoliščaOmnia": "Upravna enota Ajdovščina, Vipavska cesta 11b, 5270 Ajdovščina",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ajdovščina",
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
            "sedežVoliščaOmnia": "Upravna enota Cerknica, Cesta 4. maja, 1380 Cerknica",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Cerknica",
            naslov: "Cesta 4. maja",
            "pošta": "1380 Cerknica",
            skupaj: "Cesta 4. maja, 1380 Cerknica",
            geo_longitude: 45.78878487161928,
            geo_latitude: 14.370547139852102
        },
        {
            ve: 3,
            ovk: "OVK Vrhnika",
            okraj: "VRHNIKA",
            "sedežVoliščaOmnia": "Upravna enota Vrhnika, Stara Vrhnika 1d, 1360 Vrhnika",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Vrhnika",
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
            "sedežVoliščaOmnia": "Dvorana Stožice, Vojkova cesta 100, Ljubljana",
            dostopnoInvalidom: "?",
            ime: "Dvorana Stožice",
            naslov: "Vojkova cesta 100",
            "pošta": "1000 Ljubljana",
            skupaj: "Vojkova cesta 100 1000 Ljubljana",
            geo_longitude: 46.081388,
            geo_latitude: 14.521453
        },
        {
            ve: 4,
            ovk: "OVK Kočevje",
            okraj: "KOČEVJE",
            "sedežVoliščaOmnia": "Gimnazija kočevje, Ljubljanska cesta 12, 1330 Kočevje",
            dostopnoInvalidom: "?",
            ime: "Gimnazija Kočevje",
            naslov: "Ljubljanska cesta 12",
            "pošta": "1330 Kočevje",
            skupaj: "Ljubljanska cesta 12 1330 Kočevje",
            geo_longitude: 45.64143032253717,
            geo_latitude:  14.85804518169814
        },
        {
            ve: 4,
            ovk: "OVK Ribnica-Dobrepolje",
            okraj: "RIBNICA",
            "sedežVoliščaOmnia": "Upravna enota Ribnica, Gorenjska cesta 9, 1310 Ribnica",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ribnica",
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
            "sedežVoliščaOmnia": "Upravna enota Grosuplje, Taborska cesta 1, 1290 Grosuplje",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Grosuplje",
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
            "sedežVoliščaOmnia": "Zdravstveni dom Ivančna Gorica (predavalnica), Cesta 2. grupe odredov 16a, 1295 Ivančna Gorica",
            dostopnoInvalidom: "?",
            ime: "Zdravstveni dom Ivančna Gorica (predavalnica)",
            naslov: "Cesta 2. grupe odredov 16a",
            "pošta": "1295 Ivančna Gorica",
            skupaj: "Cesta 2. grupe odredov 16a 1295 Ivančna Gorica",
            geo_longitude: 45.937671,
            geo_latitude: 14.805772
        },
        {
            ve: 4,
            ovk: "OVK Domžale 1-2",
            okraj: "DOMŽALE",
            "sedežVoliščaOmnia": "Domžalski dom, Ljubljanska cesta 58, 1230 Domžale",
            dostopnoInvalidom: "?",
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
            "sedežVoliščaOmnia": "Gasilski dom Šentjur, Ulica A.M. Slomška 2, 3230 Šentjur",
            dostopnoInvalidom: "?",
            ime: "Občina Šentjur",
            naslov: "Ulica A.M. Slomška 2, 3230 Šentjur",
            "pošta": "3320 Šentjur",
            skupaj: "Ulica A.M. Slomška 2 3320 Šentjur",
            geo_longitude: 46.219679828916064,
            geo_latitude: 15.396657597542593
        },
        {
            ve: 5,
            ovk: "OVK Celje 1-2",
            okraj: "CELJE",
            "sedežVoliščaOmnia": "Upravna enota Celje, Ljubljanska cesta 1, 3000 Celje",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Celje",
            naslov: "Ljubljanska cesta 1",
            "pošta": "3000 Celje",
            skupaj: "Ljubljanska cesta 1 3000 Celje",
            geo_longitude: 46.2294595,
            geo_latitude: 15.2609484
        },
        {
            ve: 5,
            ovk: "OVK Žalec 1-2",
            okraj: "ŽALEC",
            "sedežVoliščaOmnia": "Upravna enota Žalec, Ulica Savinjske čete 5, 3310 Žalec",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Žalec",
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
            "sedežVoliščaOmnia": "Avla upravnega centra Mozirje, Šmihelska cesta 2, 3330 Mozirje",
            dostopnoInvalidom: "?",
            ime: "Avla upravnega centra Mozirje",
            naslov: "Šmihelska cesta 2",
            "pošta": "3330 Mozirje",
            skupaj: "Šmihelska cesta 2 3330 Mozirje",
            geo_longitude: 46.3406173,
            geo_latitude: 14.9656081
        },
        {
            ve: 5,
            ovk: "OVK Velenje 1-2",
            okraj: "VELENJE",
            "sedežVoliščaOmnia": "Upravna enota Velenje, Rudarska cesta 6a, 3320 Velenje",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Velenje",
            naslov: "Rudarska cesta 6a",
            "pošta": "3320 Velenje",
            skupaj: "Rudarska cesta 6a 3320 Velenje",
            geo_longitude: 46.3592008,
            geo_latitude: 15.1136985
        },
        {
            ve: 5,
            ovk: "OVK Slovenj Gradec",
            okraj: "SLOVENJ GRADEC",
            "sedežVoliščaOmnia": "Upravna enota Slovenj Gradec, Meškova ulica 21, 2380 Slovenj Gradec",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Slovenj Gradec",
            naslov: "Meškova ulica 21",
            "pošta": "2380 Slovenj Gradec",
            skupaj: "Meškova ulica 21 2380 Slovenj Gradec",
            geo_longitude: 46.5104498,
            geo_latitude: 15.0813811
        },
        {
            ve: 5,
            ovk: "OVK Ravne na Koroškem",
            okraj: "RAVNE NA KOROŠKEM",
            "sedežVoliščaOmnia": "Upravna enota Ravne na Koroškem, Čečovje 12a, 2390 Ravne na Koroškem",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ravne na Koroškem",
            naslov: "Čečovje 12a",
            "pošta": "2390 Ravne na Koroškem",
            skupaj: "Čečovje 12a 2390 Ravne na Koroškem",
            geo_longitude: 46.54172995050012,
            geo_latitude: 14.963482779296463
        },
        {
            ve: 5,
            ovk: "OVK Radlje",
            okraj: "RADLJE OB DRAVI",
            "sedežVoliščaOmnia": "Občina Radlje ob Dravi, Mariborska cesta 7, 2360 Radlje ob Dravi",
            dostopnoInvalidom: "?",
            ime: "Občina Radlje ob Dravi",
            naslov: "Mariborska cesta 7",
            "pošta": "2360 Radlje ob Dravi",
            skupaj: "Mariborska 7 2360 Radlje ob Dravi",
            geo_longitude: 46.6146927,
            geo_latitude: 15.2246171
        },
        {
            ve: 6,
            ovk: "OVK Črnomelj",
            okraj: "ČRNOMELJ",
            "sedežVoliščaOmnia": "Upravna enota Črnomelj, Zadružna cesta 16, 8340 Črnomelj",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Črnomelj",
            naslov: "Zadružna cesta 16",
            "pošta": "8340 Črnomelj",
            skupaj: "Zadružna cesta 16 8340 Črnomelj",
            geo_longitude: 45.5793494,
            geo_latitude: 15.1959635
        },
        {
            ve: 6,
            ovk: "OVK Novo mesto 1-2",
            okraj: "NOVO MESTO",
            "sedežVoliščaOmnia": "Upravna enota Novo mesto, Defranceschijeva ulica 1, 8000 Novo mesto",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Novo mesto",
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
            dostopnoInvalidom: "?",
            ime: "Občina Trebnje (sedež Glasila občanov",
            naslov: "Goliev trg 4",
            "pošta": "8210 Trebnje",
            skupaj: "Goliev trg 4 8210 Trebnje",
            geo_longitude: 45.90832707128343,
            geo_latitude: 15.007682168693433
        },
        {
            ve: 6,
            ovk: "OVK Brežice",
            okraj: "BREŽICE",
            "sedežVoliščaOmnia": "Upravna enota Brežice, Cesta prvih borcev 24a, 8250 Brežice",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Brežice",
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
            "sedežVoliščaOmnia": "Mestna občina Krško, Cesta krških žrtev 14, 8270 Krško",
            dostopnoInvalidom: "?",
            ime: "Mestna občina Krško enota Krško",
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
            "sedežVoliščaOmnia": "OUpravna enota Sevnica, Glavni trg 19a, 8290 Sevnica",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Sevnica",
            naslov: "Glavni trg 19a",
            "pošta": "8290 Sevnica",
            skupaj: "Glavni trg 19a 8290 Sevnica",
            geo_longitude: 46.0057241,
            geo_latitude: 15.3155368
        },
        {
            ve: 6,
            ovk: "OVK Laško",
            okraj: "LAŠKO",
            "sedežVoliščaOmnia": "Kulturni center, Trg svobode 6, 3270 Laško ",
            dostopnoInvalidom: "?",
            ime: "Kulturni center",
            naslov: "Trg svobode 6",
            "pošta": "3270 Laško",
            skupaj: "Trg svobode 6 3270 Laško",
            geo_longitude: 46.15517056359112,
            geo_latitude:  15.23307095486448
        },
        {
            ve: 6,
            ovk: "OVK Litija",
            okraj: "LITIJA",
            "sedežVoliščaOmnia": "Občina Litija, Jerebova ulica 14, 1270 Litija",
            dostopnoInvalidom: "i",
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
            "sedežVoliščaOmnia": "Upravna enota Trbovlje, Mestni trg 4, 1420 Trbovlje",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Trbovlje",
            naslov: "Mestni trg 4",
            "pošta": "1420 Trbovlje",
            skupaj: "Mestni trg 4 1420 Trbovlje",
            geo_longitude: 46.1562802,
            geo_latitude: 15.0540445
        },
        {
            ve: 6,
            ovk: "OVK Zagorje",
            okraj: "ZAGORJE OB SAVI",
            "sedežVoliščaOmnia": "Upravna enota Zagorje ob Savi, Cesta 9. avgusta 5, 1410 Zagorje ob Savi",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Zagorje ob Savi",
            naslov: "Cesta 9. avgusta 5",
            "pošta": "1410 Zagorje ob Savi",
            skupaj: "Cesta 9. avgusta 5 1410 Zagorje ob Savi",
            geo_longitude: 46.13472956962561,
            geo_latitude: 14.99639949753907
        },
        {
            ve: 7,
            ovk: "OVK Šmarje pri Jelšah",
            okraj: "ŠMARJE PRI JELŠAH",
            "sedežVoliščaOmnia": "Kulturni dom, Aškerčev trg 20, 3240 Šmarje pri Jelšah",
            dostopnoInvalidom: "?",
            ime: "Kulturni dom",
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
            "sedežVoliščaOmnia": "Občina Slovenska Bistrica, Kolodvorska 10, 2310 Slovenska Bistrica",
            dostopnoInvalidom: "?",
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
            dostopnoInvalidom: "?",
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
            "sedežVoliščaOmnia": "Knjižnica Janka Glazerja, Falska cesta 18, 2342 Ruše",
            dostopnoInvalidom: "?",
            ime: "Knjižnica Janka Glazerja",
            naslov: "Falska cesta 18",
            "pošta": "2342 Ruše",
            skupaj: "Falska cesta 18 2342 Ruše",
            geo_longitude: 46.53903173003614,
            geo_latitude: 15.511188568719046
        },
        {
            ve: 7,
            ovk: "OVK Maribor 1-7",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Razstavni salon, Grajska ulica 7, 2000 Maribor",
            dostopnoInvalidom: "?",
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
            "sedežVoliščaOmnia": "Dvojezična srednja šola Lendava, Kolodvorska ul. 2e, 9220 Lendava",
            dostopnoInvalidom: "?",
            ime: "Dvojezična srednja šola Lendava",
            naslov: "Kolodvorska ul. 2e",
            "pošta": "9220 Lendava",
            skupaj: "Kolodvorska ul. 2e 9220 Lendava",
            geo_longitude: 46.56497722887461,
            geo_latitude: 16.447667868720018
        },
        {
            ve: 8,
            ovk: "OVK Ormož",
            okraj: "ORMOŽ",
            "sedežVoliščaOmnia": "Upravna enota Ormož, Ptujska cesta 6, 2270 Ormož",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ormož",
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
            "sedežVoliščaOmnia": "Upravna enota Ljutomer, Vrazova ulica 1, 9240 Ljutomer",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ljutomer",
            naslov: "Vrazova ulica 1",
            "pošta": "9240 Ljutomer",
            skupaj: "Vrazova ulica 1 9240 Ljutomer",
            geo_longitude: 46.517847359052105,
            geo_latitude: 16.195076468718124
        },
        {
            ve: 8,
            ovk: "OVK Murska Sobota 1,2",
            okraj: "MURSKA SOBOTA",
            "sedežVoliščaOmnia": "Upravna enota Murska Sobota, Kardoševa ulica 2, 9000 Murska Sobota",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Murska Sobota",
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
            "sedežVoliščaOmnia": "Upravna enota Gornja Radgona, Partizanska cesta 13, 9250 Gornja Radgona",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Gornja Radgona",
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
            "sedežVoliščaOmnia": "Upravna enota Lenart, Trg osvoboditve 7, 2230 Lenart v Slov. goricah",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Lenart",
            naslov: "Trg osvoboditve 7",
            "pošta": "2230 Lenart v Slov. goricah",
            skupaj: "Trg osvoboditve 7 2230 Lenart v Slov. goricah",
            geo_longitude: 46.5759634,
            geo_latitude: 15.83071
        },
        {
            ve: 8,
            ovk: "OVK Pesnica",
            okraj: "PESNICA PRI MARIBORU",
            "sedežVoliščaOmnia": "Večnamenski KTPC Pesnica, Pesnica pri Mariboru 41, 2211 Pesnica pri Mariboru",
            dostopnoInvalidom: "?",
            ime: "Večnamenski KTPC Pesnica",
            naslov: "Pesnica pri Mariboru 41",
            "pošta": "2211 Pesnica pri Mariboru",
            skupaj: "Pesnica pri Mariboru 41 2211 Pesnica pri Mariboru",
            geo_longitude: 46.6090269,
            geo_latitude: 15.6779261
        },
        {
            ve: 8,
            ovk: "OVK Ptuj 1-3",
            okraj: "PTUJ",
            "sedežVoliščaOmnia": "Upravna enota Ptuj, Slomškova ulica 10, 2250 Ptuj",
            dostopnoInvalidom: "?",
            ime: "Upravna enota Ptuj",
            naslov: "Slomškova ulica 10",
            "pošta": "2250 Ptuj",
            skupaj: "Slomškova ulica 10 2250 Ptuj",
            geo_longitude: 46.4214918,
            geo_latitude: 15.8719051
        }
    ];

$(document).ready(function () {
    $(".thetime").text(timeLeft()), initmap("themap"), $(".zavesa .button").on("click", function () {
        $(".zavesa").animate({
            top: -1e3
        }, 600), $(".header .circle").removeClass("hidden")
    }), $("#themap").on("click", ".namera", function () {
        // window.open("https://e-uprava.gov.si/podrocja/vloge/vloga.html?id=5626 ", "_blank");
        // $(".stepone").addClass("hidden"), $(".steptwo").removeClass("hidden"), $(".header .circle").addClass("hidden"), $(".zavesa").animate({
        //     top: 75
        // }, 600)
    }), $("body").on("click", ".tw", function () {
        var a = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Boš na dan referenduma o ZPPKŽ na izletu po Sloveniji, pa želiš vseeno glasovati? 👀\n\nBrez skrbi, to lahko storiš na voliščih OMNIA!\n\nNajbližjega poišči na zemljevidu na spodnji povezavi, še prej pa svojo namero sporoči volilni komisiji! ✊\n\n" + document.location.href);
        return window.open(a, "_blank"), !1
    }), $("body").on("click", ".email", function () {
        var a = "mailto:?subject=Tukaj lahko glasuješ, če boš na dan referenduma o ZPPKŽ na izletu po Sloveniji.&body=Živjo!%0D%0A%0D%0AVeš, da lahko na volitvah svoj glas oddaš tudi, če na dan referenduma o ZPPKŽ na izletu izven kraja stalnega prebivališča?%0D%0A%0D%0ATo lahko storiš na enem od volišč OMNIA, najbližjega pa lahko najdeš s pomočjo zemljevida na tej povezavi: " + document.location.href + "%0D%0A%0D%0AA ne pozabi, da moraš svojo namero za glasovanje na volišču OMNIA sporočiti volilni komisiji v svojem okraju najkasneje do 19. novembra.%0D%0A%0D%0APovezavo deli tudi z vsemi prijateljicami in prijatelji!%0D%0A%0D%0ALepo bodi.";
        return window.open(a, "_blank"), !1
    })
});
