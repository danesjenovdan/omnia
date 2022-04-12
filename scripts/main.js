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
            "sedežVoliščaOmnia": "Avla UE Jesenice, C. Železarjev 6a, 4270 Jesenice",
            dostopnoInvalidom: "i",
            ime: "Avla UE Jesenice",
            naslov: "C. Železarjev 6a",
            "pošta": "4270 Jesenice",
            skupaj: "C. Železarjev 6a 4270 Jesenice",
            geo_longitude: 46.4320606,
            geo_latitude: 14.0623146
        },
        {
            ve: 1,
            ovk: "OVK Radovljica 1",
            okraj: "RADOVLJICA",
            "sedežVoliščaOmnia": "Občina Bled, Cesta svobode 13, 4260 Bled",
            dostopnoInvalidom: "?", 
            ime: "Avla UE Jesenice",
            naslov: " Cesta svobode 13, 4260 Bled",
            "pošta": "4260 Bled",
            skupaj: " Cesta svobode 13, 4260 Bled",
            geo_longitude: 46.368740,
            geo_latitude: 14.109610
        },
        {
            ve: 1,
            ovk: "OVK Radovljica 1",
            okraj: "RADOVLJICA",
            "sedežVoliščaOmnia": "Dom Joža Ažmana, Triglavska 16, 4264 Bohinjska Bistrica",
            dostopnoInvalidom: "?",
            ime: "Dom Joža Ažmana",
            naslov: "Triglavska 16",
            "pošta": "4264 Bohinjska Bistrica",
            skupaj: "Triglavska 16 4264 Bohinjska Bistrica",
            geo_longitude: 46.272550,
            geo_latitude: 13.956130
        },
        {
            ve: 1,
            ovk: "OVK Radovljica 2",
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
            ovk: "OVK Kranj 1,3",
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
            ovk: "OVK Kranj 2",
            okraj: "KRANJ",
            "sedežVoliščaOmnia": "Šmartinski dom Stražišče, Škofjeloška cesta 18, 4000 Kranj",
            dostopnoInvalidom: "?",
            ime: "Šmartinski dom Stražišče",
            naslov: "Škofjeloška cesta 18",
            "pošta": "4000 Kranj",
            skupaj: "Škofjeloška cesta 18 4000 Kranj",
            geo_longitude: 46.231620,
            geo_latitude: 14.346410
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
            ovk: "OVK Škofja Loka 1",
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
            ovk: "OVK Škofja Loka 2",
            okraj: "ŠKOFJA LOKA",
            "sedežVoliščaOmnia": "Občina Železniki, Česnjica 48, 4228 Železniki",
            dostopnoInvalidom: "i",
            ime: "Občina Železniki",
            naslov: "Česnjica 48",
            "pošta": "4228 Železniki",
            skupaj: "Česnjica 48 4228 Železniki",
            geo_longitude: 46.226180,
            geo_latitude: 14.175060
        },
        {
            ve: 1,
            ovk: "OVK Škofja Loka 2",
            okraj: "ŠKOFJA LOKA",
            "sedežVoliščaOmnia": "Občina Gorenja vas - Poljane, Poljanska cesta 87, 4224 Gorenja vas",
            dostopnoInvalidom: "i",
            ime: "Občina Gorenja vas - Poljane",
            naslov: "Poljanska cesta 87",
            "pošta": "4224 Gorenja vas",
            skupaj: "Poljanska cesta 87 4224 Gorenja vas",
            geo_longitude: 46.105610,
            geo_latitude: 14.138520
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
            "sedežVoliščaOmnia": "Upravna enota Idrija, Študentovska ulica 2, 5280 Idrija",
            dostopnoInvalidom: "i",
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
            "sedežVoliščaOmnia": "UE Izola, Cesta v Pregavor 3 a, 6310 Izola",
            dostopnoInvalidom: "",
            ime: "UE Izola",
            naslov: "Cesta v Pregavor 3 a",
            "pošta": "6310 Izola",
            skupaj: "Cesta v Pregavor 3 a 6310 Izola",
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
            "sedežVoliščaOmnia": "Upravni center Logatec, Tržaška cesta 50A, 1370 Logatec",
            dostopnoInvalidom: "",
            ime: "Upravni center Logatec",
            naslov: "Tržaška cesta 50A",
            "pošta": "1370 Logatec",
            skupaj: "Tržaška cesta 50A 1370 Logatec",
            geo_longitude: 45.9176349,
            geo_latitude: 14.2225675
        },
        {
            ve: 3,
            ovk: "OVK Logatec",
            okraj: "LOGATEC",
            "sedežVoliščaOmnia": "UE Cerknica, Cesta 4. maja 24, 1380 Cerknica",
            dostopnoInvalidom: "",
            ime: "UE Cerknica",
            naslov: "Cesta 4. maja 24",
            "pošta": "1380 Cerknica",
            skupaj: "Cesta 4. maja 24 1380 Cerknica",
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
            "sedežVoliščaOmnia": "Gospodarsko razstavišče (Marmorna dvorana), Dunajska cesta 18, 1000 Ljubljana",
            dostopnoInvalidom: "i",
            ime: "Gospodarsko razstavišče (Marmorna dvorana)",
            naslov: "Dunajska cesta 18",
            "pošta": "1000 Ljubljana",
            skupaj: "Dunajska cesta 18 1000 Ljubljana",
            geo_longitude: 46.0609361,
            geo_latitude: 14.5084937
        },
        {
            ve: 4,
            ovk: "OVK Kočevje",
            okraj: "KOČEVJE",
            "sedežVoliščaOmnia": "Občina Kočevje, Ljubljanska cesta 26, 1330 Kočevje",
            dostopnoInvalidom: "i",
            ime: "Občina Kočevje",
            naslov: "Ljubljanska cesta 26",
            "pošta": "1330 Kočevje",
            skupaj: "Ljubljanska cesta 26 1330 Kočevje",
            geo_longitude: 45.64297451050395,
            geo_latitude: 14.85569491816665
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
            "sedežVoliščaOmnia": "Družbeni dom Grosuplje, Taborska cesta 1, 1290 Grosuplje",
            dostopnoInvalidom: "i",
            ime: "Družbeni dom Grosuplje",
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
            "sedežVoliščaOmnia": "Občina Šentjur, Mestni trg 10, 3230 Šentjur",
            dostopnoInvalidom: "i",
            ime: "Občina Šentjur",
            naslov: "Mestni trg 10, 3230 Šentjur",
            "pošta": "3320 Šentjur",
            skupaj: "Mestni trg 10 3320 Šentjur",
            geo_longitude: 46.21718044504577,
            geo_latitude: 15.393822397941685
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
            "sedežVoliščaOmnia": "Upravni center Mozirje, Šmihelska cesta 2, 3330 Mozirje",
            dostopnoInvalidom: "",
            ime: "Upravni center Mozirje",
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
            "sedežVoliščaOmnia": "UE Velenje, Rudarska cesta 6a, 3320 Velenje",
            dostopnoInvalidom: "i",
            ime: "UE Velenje",
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
            "sedežVoliščaOmnia": "UE Slovenj Gradec, Meškova ulica 21, 2380 Slovenj Gradec",
            dostopnoInvalidom: "i",
            ime: "UE Slovenj Gradec",
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
            "sedežVoliščaOmnia": "Občina Ravne na Koroškem, Gačnikova pot 5, 2390 Ravne na Koroškem",
            dostopnoInvalidom: "i",
            ime: "Občina Ravne na Koroškem",
            naslov: "Gačnikova pot 5",
            "pošta": "2390 Ravne na Koroškem",
            skupaj: "Gačnikova pot 5 2390 Ravne na Koroškem",
            geo_longitude: 46.543949061233235,
            geo_latitude: 14.962725701644002
        },
        {
            ve: 5,
            ovk: "OVK Radlje",
            okraj: "RADLJE OB DRAVI",
            "sedežVoliščaOmnia": "UE Radlje ob Dravi, Mariborska cesta 7, 2360 Radlje ob Dravi",
            dostopnoInvalidom: "i",
            ime: "UE Radlje ob Dravi",
            naslov: "Mariborska cesta 7",
            "pošta": "2360 Radlje ob Dravi",
            skupaj: "Mariborska 7 2360 Radlje ob Dravi",
            geo_longitude: 46.6146927,
            geo_latitude: 15.2246171
        },
        {
            ve: 5,
            ovk: "OVK Radlje",
            okraj: "RADLJE",
            "sedežVoliščaOmnia": "Upravna enota Dravograd, Meža 10, 2370 Dravograd",
            dostopnoInvalidom: "",
            ime: "Upravna enota Dravograd",
            naslov: "Meža 10",
            "pošta": "2370 Dravograd",
            skupaj: "Meža 10 2370 Dravograd",
            geo_longitude: 46.58694694961713,
            geo_latitude: 15.025326415139657
        },
        {
            ve: 6,
            ovk: "OVK Črnomelj",
            okraj: "ČRNOMELJ",
            "sedežVoliščaOmnia": "Upravna enota Črnomelj, Zadružna cesta 16, 8340 Črnomelj",
            dostopnoInvalidom: "",
            ime: "Upravna enota Črnomelj",
            naslov: "Zadružna cesta 16",
            "pošta": "8340 Črnomelj",
            skupaj: "Zadružna cesta 16 8340 Črnomelj",
            geo_longitude: 45.5793494,
            geo_latitude: 15.1959635
        },
        {
            ve: 6,
            ovk: "OVK Metlika in Semič",
            okraj: "ČRNOMELJ",
            "sedežVoliščaOmnia": "Upravna enota Metlika, Naselje Borisa Kidriča 14, 8330 Metlika",
            dostopnoInvalidom: "",
            ime: "Upravna enota Metlika",
            naslov: "Naselje Borisa Kidriča 14",
            "pošta": "8330 Metlika",
            skupaj: "Naselje Borisa Kidriča 14 8330 Metlika",
            geo_longitude: 45.64574898000891,
            geo_latitude: 15.317331259288274
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
            "sedežVoliščaOmnia": "Občina Trebnje, Goliev trg 5, 8210 Trebnje",
            dostopnoInvalidom: "i",
            ime: "Občina Trebnje",
            naslov: "Goliev trg 5",
            "pošta": "8210 Trebnje",
            skupaj: "Goliev trg 5 8210 Trebnje",
            geo_longitude: 45.90816427559304,
            geo_latitude: 15.007765640262358
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
            "sedežVoliščaOmnia": "Občina Krško, Cesta krških žrtev 14, 8270 Krško",
            dostopnoInvalidom: "i",
            ime: "Občina Krško",
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
            "sedežVoliščaOmnia": "Občina Sevnica, Glavni trg 19a, 8290 Sevnica",
            dostopnoInvalidom: "i",
            ime: "Občina Sevnica",
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
            "sedežVoliščaOmnia": "Kulturni dom, Gledališka pot 2, 1433 Radeče",
            dostopnoInvalidom: "i",
            ime: "Kulturni dom",
            naslov: "Gledališka pot 2",
            "pošta": "1433 Radeče",
            skupaj: "Gledališka pot 2 1433 Radeče",
            geo_longitude: 46.06586447827272,
            geo_latitude: 15.182242070989107
        },
        {
            ve: 6,
            ovk: "OVK Laško",
            okraj: "LAŠKO",
            "sedežVoliščaOmnia": "Občina Laško (energetsko svetovalna pisarna), Mestna ulica 2, 3270 Laško",
            dostopnoInvalidom: "i",
            ime: "Občina Laško (energetsko svetovalna pisarna)",
            naslov: "Mestna ulica 2, 3270 Laško",
            "pošta": "3270 Laško",
            skupaj: "Mestna ulica 2 3270 Laško",
            geo_longitude: 46.154165306281065,
            geo_latitude: 15.235332311434231
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
            "sedežVoliščaOmnia": "Upravna zgradba Hrastnik, Pot Vitka Pavliča 5, 1430 Hrastnik",
            dostopnoInvalidom: "",
            ime: "Upravna zgradba Hrastnik",
            naslov: "Pot Vitka Pavliča 5",
            "pošta": "1430 Hrastnik",
            skupaj: "Pot Vitka Pavliča 5 1430 Hrastnik",
            geo_longitude: 46.14604004373651,
            geo_latitude: 15.081620684445138
        },
        {
            ve: 6,
            ovk: "OVK Hrastnik - Trbovlje",
            okraj: "TRBOVLJE",
            "sedežVoliščaOmnia": "Upravna zgradba Trbovlje, Mestni trg 4, 1420 Trbovlje",
            dostopnoInvalidom: "",
            ime: "Upravna zgradba Trbovlje",
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
            "sedežVoliščaOmnia": "Weinbergerjeva hiša, Cesta 9. avgusta 4, 1410 Zagorje ob Savi",
            dostopnoInvalidom: "i",
            ime: "Weinbergerjeva hiša",
            naslov: "Cesta 9. avgusta 4",
            "pošta": "1410 Zagorje ob Savi",
            skupaj: "Cesta 9. avgusta 4 1410 Zagorje ob Savi",
            geo_longitude: 46.13455207394002,
            geo_latitude: 14.995311584444794
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
            "sedežVoliščaOmnia": "Občina Selnica ob Dravi, Slovenski trg 4, 2352 Selnica ob Dravi",
            dostopnoInvalidom: "i",
            ime: "Občina Selnica ob Dravi",
            naslov: "Slovenski trg 4",
            "pošta": "2352 Selnica ob Dravi",
            skupaj: "Slovenski trg 4 2352 Selnica ob Dravi",
            geo_longitude: 46.55165572205529,
            geo_latitude: 15.492862869116236
        },
        {
            ve: 7,
            ovk: "OVK Ruše",
            okraj: "RUŠE",
            "sedežVoliščaOmnia": "Upravna enota Ruše, Kolodvorska ulica 9, 2342 Ruše",
            dostopnoInvalidom: "i",
            ime: "Upravna enota Ruše",
            naslov: "Kolodvorska ulica 9",
            "pošta": "2342 Ruše",
            skupaj: "Kolodvorska ulica 9 2342 Ruše",
            geo_longitude: 46.53874453891079,
            geo_latitude: 15.510173353775068
        },
        {
            ve: 7,
            ovk: "OVK Maribor 1",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Kulturni dom Kamnica, Vrbanska 97, 2351 Kamnica",
            dostopnoInvalidom: "i",
            ime: "Kulturni dom Kamnica",
            naslov: "Vrbanska 97",
            "pošta": "2351 Kamnica",
            skupaj: "Vrbanska 97 2351 Kamnica",
            geo_longitude: 46.573405835239825,
            geo_latitude: 15.61543441329288
        },
        {
            ve: 7,
            ovk: "OVK Maribor 2",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Kulturni dom Hoče, Pohorska cesta 15, 2311 Hoče",
            dostopnoInvalidom: "i",
            ime: "Kulturni dom Hoče",
            naslov: "Pohorska cesta 15",
            "pošta": "2311 Hoče",
            skupaj: "Pohorska cesta 15 2311 Hoče",
            geo_longitude: 46.49869222765912,
            geo_latitude: 15.646701453773794
        },
        {
            ve: 7,
            ovk: "OVK Maribor 3",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Mestna četrt Brezje, Na trati 2, 2000 Maribor",
            dostopnoInvalidom: "i",
            ime: "Mestna četrt Brezje",
            naslov: "Na trati 2",
            "pošta": "2000 Maribor",
            skupaj: "Na trati 2 2000 Maribor",
            geo_longitude: 46.53605118806959,
            geo_latitude: 15.687809422523719
        },
        {
            ve: 7,
            ovk: "OVK Maribor 4",
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
            ve: 7,
            ovk: "OVK Maribor 5",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Mestni mladinski svet, Trg revolucije 9, 2000 Maribor",
            dostopnoInvalidom: "i",
            ime: "Mestni mladinski svet",
            naslov: "Trg revolucije 9",
            "pošta": "2000 Maribor",
            skupaj: "Trg revolucije 9 2000 Maribor",
            geo_longitude: 46.55462939087224,
            geo_latitude: 15.645598870962644
        },
        {
            ve: 7,
            ovk: "OVK Maribor 6",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Javni zavod Gasilska brigada Maribor, Cesta proletarskih brigad 21, 2000 Maribor",
            dostopnoInvalidom: "i",
            ime: "Javni zavod Gasilska brigada Maribor",
            naslov: "Cesta proletarskih brigad 21",
            "pošta": "2000 Maribor",
            skupaj: "Cesta proletarskih brigad 21 2000 Maribor",
            geo_longitude: 46.54000427635992,
            geo_latitude: 15.643748897951067
        },
        {
            ve: 7,
            ovk: "OVK Maribor 7",
            okraj: "MARIBOR",
            "sedežVoliščaOmnia": "Mestna četrt Tabor, Metelkova 63, 2000 Maribor",
            dostopnoInvalidom: "i",
            ime: "Mestna četrt Tabor",
            naslov: "Metelkova 63",
            "pošta": "2000 Maribor",
            skupaj: "Metelkova 63 2000 Maribor",
            geo_longitude: 46.542192908132144,
            geo_latitude: 15.643816147666335
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
            "sedežVoliščaOmnia": "Avla UE Lenart, Trg osvoboditve 7, 2230 Lenart v Slov. goricah",
            dostopnoInvalidom: "i",
            ime: "Avla UE Lenart",
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
    }), $("body").on("click", ".tw", function () {
        var a = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Imaš manj kot " + hoursUntilMidnight() + " ur, da sporočiš, kje boš glasoval/-a. Povsod si lahko PROTI škodljivemu zakonu! " + document.location.href);
        return window.open(a, "_blank"), !1
    }), $("body").on("click", ".email", function () {
        var a = "mailto:?subject=Imaš manj kot " + hoursUntilMidnight() + " ur, da sporočiš, kje boš glasoval/-a.&body=Zemljevid OMNIA volišč za volilce/-ke, ki bodo glasovali/-e v Sloveniji, toda izven volilnega okraja stalnega prebivališča. Povsod si lahko PROTI škodljivemu zakonu!" + document.location.href;
        return window.open(a, "_blank"), !1
    })
});