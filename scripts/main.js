function initMap(container) {
  const map = new L.Map(container);

  const tileLayer = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 8,
    maxZoom: 18,
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>',
  });

  map.setView(new L.LatLng(46.2, 15), 9);
  map.addLayer(tileLayer);

  const markerIcon = L.icon({
    iconUrl: "images/marker.svg",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -48],
  });

  const uniqueLocations = locations.reduce((acc, curr) => {
    const key = curr.geo_latlng.toString();
    acc[key] = acc[key] || [];
    acc[key].push(curr);
    return acc;
  }, {});

  Object.entries(uniqueLocations).forEach(([key, locs]) => {
    const marker = L.marker(locs[0].geo_latlng, {
      icon: markerIcon,
    }).addTo(map);

    const popupContent = `
      <div class="markercontainer">
        <p>
          <b>${locs[0].ime}</b><br>
          ${locs[0].naslov}, ${locs[0].posta}
        </p>
        <p>
          <b>Oddaj vlogo <a href="https://e-uprava.gov.si/si/podrocja/vloge/vloga.html?id=8765" target="_blank" rel="noopener noreferrer">z e-identiteto</a> ali <a href="https://e-uprava.gov.si/si/podrocja/vloge/vloga.html?id=8766" target="_blank" rel="noopener noreferrer">brez</a>.</b>
        </p>
      </div>
    `;

    marker.bindPopup(popupContent, { minWidth: 50, maxWidth: 300 });
  });
}

const locations = [
  {
    ve: 1,
    ovk: "OVK Jesenice",
    okraj: "JESENICE",
    ime: "UE Jesenice",
    naslov: "C. Železarjev 6a",
    posta: "4270 Jesenice",
    geo_latlng: [46.4320606, 14.0623146],
  },
  {
    ve: 1,
    ovk: "OVK Radovljica 1-2",
    okraj: "RADOVLJICA",
    ime: "Občina Radovljica",
    naslov: "Gorenjska cesta 19",
    posta: "4240 Radovljica",
    geo_latlng: [46.3438093, 14.1715796],
  },
  {
    ve: 1,
    ovk: "OVK Kranj 1-3",
    okraj: "KRANJ",
    ime: "Mestna občine Kranj",
    naslov: "Slovenski trg 1",
    posta: "4000 Kranj",
    geo_latlng: [46.243268, 14.3557455],
  },
  {
    ve: 1,
    ovk: "OVK Tržič",
    okraj: "TRŽIČ",
    ime: "Društvo upokojencev Tržič",
    naslov: "Trg svobode 18",
    posta: "4290 Tržič",
    geo_latlng: [46.3635438, 14.3089991],
  },
  {
    ve: 1,
    ovk: "OVK Škofja Loka 1-2",
    okraj: "ŠKOFJA LOKA",
    ime: "Upravna enota Škofja Loka",
    naslov: "Poljanska cesta 2",
    posta: "4220 Škofja Loka",
    geo_latlng: [46.164115778357086, 14.307486832959421],
  },
  {
    ve: 1,
    ovk: "OVK Kamnik",
    okraj: "KAMNIK",
    ime: "Občina Kamnik",
    naslov: "Glavni trg 24",
    posta: "1241 Kamnik",
    geo_latlng: [46.2263678, 14.6122718],
  },
  {
    ve: 1,
    ovk: "OVK Idrija",
    okraj: "IDRIJA",
    ime: "Upravna enota Idrija (sejna soba)",
    naslov: "Študentovska ulica 2",
    posta: "5280 Idrija",
    geo_latlng: [46.0012824, 14.021122],
  },
  {
    ve: 2,
    ovk: "OVK Tolmin",
    okraj: "TOLMIN",
    ime: "Upravna enota Tolmin",
    naslov: "Tumov drevored 4",
    posta: "5220 Tolmin",
    geo_latlng: [46.1830875, 13.7313531],
  },
  {
    ve: 2,
    ovk: "OVK Piran",
    okraj: "PIRAN",
    ime: "Upravna enota Piran",
    naslov: "Obala 114a",
    posta: "6320 Portorož",
    geo_latlng: [45.5025042, 13.6031774],
  },
  {
    ve: 2,
    ovk: "OVK Izola",
    okraj: "IZOLA",
    ime: "Upravna enota Izola",
    naslov: "Cesta v Pregavor 3 a",
    posta: "6310 Izola",
    geo_latlng: [45.5299253, 13.6669793],
  },
  {
    ve: 2,
    ovk: "OVK Koper 1-2",
    okraj: "KOPER",
    ime: "Upravna enota Koper",
    naslov: "Piranska cesta 2",
    posta: "6000 Koper",
    geo_latlng: [45.544337937992076, 13.726027895471685],
  },
  {
    ve: 2,
    ovk: "OVK Sežana",
    okraj: "SEŽANA",
    ime: "Stara stavba Občine Sežana",
    naslov: "Partizanska cesta 4",
    posta: "6210 Sežana",
    geo_latlng: [45.71000719986846, 13.874054640256531],
  },
  {
    ve: 2,
    ovk: "OVK Ilirska Bistrica",
    okraj: "ILIRSKA BISTRICA",
    ime: "Dom na Vidmu",
    naslov: "Gregorčičeva cesta 2",
    posta: "6250 Ilirska Bistrica",
    geo_latlng: [45.5638075, 14.2446335],
  },
  {
    ve: 2,
    ovk: "OVK Postojna",
    okraj: "POSTOJNA",
    ime: "Upravna enota Postojna",
    naslov: "Gregorčičev drevored 2a",
    posta: "6320 Postojna",
    geo_latlng: [45.7750164, 14.2139278],
  },
  {
    ve: 2,
    ovk: "OVK Nova Gorica 1-2",
    okraj: "NOVA GORICA",
    ime: "Upravna enota Nova Gorica",
    naslov: "Trg Edvarda Kardelja 1",
    posta: "5000 Nova Gorica",
    geo_latlng: [45.9572629, 13.6488414],
  },
  {
    ve: 2,
    ovk: "OVK Ajdovščina",
    okraj: "AJDOVŠČINA",
    ime: "Upravna enota Ajdovščina",
    naslov: "Vipavska cesta 11b",
    posta: "5270 Ajdovščina",
    geo_latlng: [45.8854392, 13.9115639],
  },
  {
    ve: 3,
    ovk: "OVK Logatec",
    okraj: "LOGATEC",
    ime: "Upravna enota Cerknica",
    naslov: "Cesta 4. maja",
    posta: "1380 Cerknica",
    geo_latlng: [45.78878487161928, 14.370547139852102],
  },
  {
    ve: 3,
    ovk: "OVK Vrhnika",
    okraj: "VRHNIKA",
    ime: "Upravna enota Vrhnika",
    naslov: "Stara Vrhnika 1d",
    posta: "1360 Vrhnika",
    geo_latlng: [45.9660045, 14.2985383],
  },
  {
    ve: 3,
    ovk: "",
    okraj: "LJUBLJANA",
    ime: "Dvorana Stožice",
    naslov: "Vojkova cesta 100",
    posta: "1000 Ljubljana",
    geo_latlng: [46.081388, 14.521453],
  },
  {
    ve: 4,
    ovk: "OVK Kočevje",
    okraj: "KOČEVJE",
    ime: "Gimnazija Kočevje",
    naslov: "Ljubljanska cesta 12",
    posta: "1330 Kočevje",
    geo_latlng: [45.64143032253717, 14.85804518169814],
  },
  {
    ve: 4,
    ovk: "OVK Ribnica-Dobrepolje",
    okraj: "RIBNICA",
    ime: "Upravna enota Ribnica",
    naslov: "Gorenjska cesta 9",
    posta: "1310 Ribnica",
    geo_latlng: [45.7419938, 14.7274],
  },
  {
    ve: 4,
    ovk: "OVK Grosuplje",
    okraj: "GROSUPLJE",
    ime: "Upravna enota Grosuplje",
    naslov: "Taborska cesta 1",
    posta: "1290 Grosuplje",
    geo_latlng: [45.9571274, 14.6533203],
  },
  {
    ve: 4,
    ovk: "OVK Ivančna Gorica",
    okraj: "IVANČNA GORICA",
    ime: "Zdravstveni dom Ivančna Gorica (predavalnica)",
    naslov: "Cesta 2. grupe odredov 16a",
    posta: "1295 Ivančna Gorica",
    geo_latlng: [45.937671, 14.805772],
  },
  {
    ve: 4,
    ovk: "OVK Domžale 1-2",
    okraj: "DOMŽALE",
    ime: "Domžalski dom",
    naslov: "Ljubljanska cesta 58",
    posta: "1230 Domžale",
    geo_latlng: [46.1380262, 14.5910958],
  },
  {
    ve: 5,
    ovk: "OVK Šentjur",
    okraj: "ŠENTJUR",
    ime: "Občina Šentjur",
    naslov: "Ulica A.M. Slomška 2, 3230 Šentjur",
    posta: "3320 Šentjur",
    geo_latlng: [46.219679828916064, 15.396657597542593],
  },
  {
    ve: 5,
    ovk: "OVK Celje 1-2",
    okraj: "CELJE",
    ime: "Upravna enota Celje",
    naslov: "Ljubljanska cesta 1",
    posta: "3000 Celje",
    geo_latlng: [46.2294595, 15.2609484],
  },
  {
    ve: 5,
    ovk: "OVK Žalec 1-2",
    okraj: "ŽALEC",
    ime: "Upravna enota Žalec",
    naslov: "Ulica Savinjske čete 5",
    posta: "3310 Žalec",
    geo_latlng: [46.250406, 15.1641877],
  },
  {
    ve: 5,
    ovk: "OVK Mozirje",
    okraj: "MOZIRJE",
    ime: "Avla upravnega centra Mozirje",
    naslov: "Šmihelska cesta 2",
    posta: "3330 Mozirje",
    geo_latlng: [46.3406173, 14.9656081],
  },
  {
    ve: 5,
    ovk: "OVK Velenje 1-2",
    okraj: "VELENJE",
    ime: "Upravna enota Velenje",
    naslov: "Rudarska cesta 6a",
    posta: "3320 Velenje",
    geo_latlng: [46.3592008, 15.1136985],
  },
  {
    ve: 5,
    ovk: "OVK Slovenj Gradec",
    okraj: "SLOVENJ GRADEC",
    ime: "Upravna enota Slovenj Gradec",
    naslov: "Meškova ulica 21",
    posta: "2380 Slovenj Gradec",
    geo_latlng: [46.5104498, 15.0813811],
  },
  {
    ve: 5,
    ovk: "OVK Ravne na Koroškem",
    okraj: "RAVNE NA KOROŠKEM",
    ime: "Upravna enota Ravne na Koroškem",
    naslov: "Čečovje 12a",
    posta: "2390 Ravne na Koroškem",
    geo_latlng: [46.54172995050012, 14.963482779296463],
  },
  {
    ve: 5,
    ovk: "OVK Radlje",
    okraj: "RADLJE OB DRAVI",
    ime: "Občina Radlje ob Dravi",
    naslov: "Mariborska cesta 7",
    posta: "2360 Radlje ob Dravi",
    geo_latlng: [46.6146927, 15.2246171],
  },
  {
    ve: 6,
    ovk: "OVK Črnomelj",
    okraj: "ČRNOMELJ",
    ime: "Upravna enota Črnomelj",
    naslov: "Zadružna cesta 16",
    posta: "8340 Črnomelj",
    geo_latlng: [45.5793494, 15.1959635],
  },
  {
    ve: 6,
    ovk: "OVK Novo mesto 1-2",
    okraj: "NOVO MESTO",
    ime: "Upravna enota Novo mesto",
    naslov: "Defranceschijeva ulica 1",
    posta: "8000 Novo mesto",
    geo_latlng: [45.8039406, 15.1647527],
  },
  {
    ve: 6,
    ovk: "OVK Trebnje",
    okraj: "TREBNJE",
    ime: "Občina Trebnje (sedež Glasila občanov",
    naslov: "Goliev trg 4",
    posta: "8210 Trebnje",
    geo_latlng: [45.90832707128343, 15.007682168693433],
  },
  {
    ve: 6,
    ovk: "OVK Brežice",
    okraj: "BREŽICE",
    ime: "Upravna enota Brežice",
    naslov: "Cesta prvih borcev 24a",
    posta: "8250 Brežice",
    geo_latlng: [45.9043717, 15.592799],
  },
  {
    ve: 6,
    ovk: "OVK Krško",
    okraj: "KRŠKO",
    ime: "Mestna občina Krško enota Krško",
    naslov: "Cesta krških žrtev 14",
    posta: "8270 Krško",
    geo_latlng: [45.9665566, 15.4849063],
  },
  {
    ve: 6,
    ovk: "OVK Sevnica",
    okraj: "SEVNICA",
    ime: "Upravna enota Sevnica",
    naslov: "Glavni trg 19a",
    posta: "8290 Sevnica",
    geo_latlng: [46.0057241, 15.3155368],
  },
  {
    ve: 6,
    ovk: "OVK Laško",
    okraj: "LAŠKO",
    ime: "Kulturni center",
    naslov: "Trg svobode 6",
    posta: "3270 Laško",
    geo_latlng: [46.15517056359112, 15.23307095486448],
  },
  {
    ve: 6,
    ovk: "OVK Litija",
    okraj: "LITIJA",
    ime: "Občina Litija",
    naslov: "Jerebova ulica 14",
    posta: "1270 Litija",
    geo_latlng: [46.0564434, 14.8309441],
  },
  {
    ve: 6,
    ovk: "OVK Hrastnik - Trbovlje",
    okraj: "TRBOVLJE",
    ime: "Upravna enota Trbovlje",
    naslov: "Mestni trg 4",
    posta: "1420 Trbovlje",
    geo_latlng: [46.1562802, 15.0540445],
  },
  {
    ve: 6,
    ovk: "OVK Zagorje",
    okraj: "ZAGORJE OB SAVI",
    ime: "Upravna enota Zagorje ob Savi",
    naslov: "Cesta 9. avgusta 5",
    posta: "1410 Zagorje ob Savi",
    geo_latlng: [46.13472956962561, 14.99639949753907],
  },
  {
    ve: 7,
    ovk: "OVK Šmarje pri Jelšah",
    okraj: "ŠMARJE PRI JELŠAH",
    ime: "Kulturni dom",
    naslov: "Aškerčev trg 20",
    posta: "3240 Šmarje pri Jelšah",
    geo_latlng: [46.2282002, 15.518307],
  },
  {
    ve: 7,
    ovk: "OVK Slovenska Bistrica",
    okraj: "SLOVENSKA BISTRICA",
    ime: "UE Slovenska Bistrica",
    naslov: "Kolodvorska 10",
    posta: "2310 Slovenska Bistrica",
    geo_latlng: [46.3919326, 15.5755427],
  },
  {
    ve: 7,
    ovk: "OVK Slovenske Konjice",
    okraj: "SLOVENSKE KONJICE",
    ime: "Občina Slovenske Konjice",
    naslov: "Stari trg 29",
    posta: "3210 Slovenske Konjice",
    geo_latlng: [46.337139, 15.4220251],
  },
  {
    ve: 7,
    ovk: "OVK Ruše",
    okraj: "RUŠE",
    ime: "Knjižnica Janka Glazerja",
    naslov: "Falska cesta 18",
    posta: "2342 Ruše",
    geo_latlng: [46.53903173003614, 15.511188568719046],
  },
  {
    ve: 7,
    ovk: "OVK Maribor 1-7",
    okraj: "MARIBOR",
    ime: "Razstavni salon",
    naslov: "Grajska ulica 7",
    posta: "2000 Maribor",
    geo_latlng: [46.5610717, 15.6481454],
  },
  {
    ve: 8,
    ovk: "OVK Lendava",
    okraj: "LENDAVA",
    ime: "Dvojezična srednja šola Lendava",
    naslov: "Kolodvorska ul. 2e",
    posta: "9220 Lendava",
    geo_latlng: [46.56497722887461, 16.447667868720018],
  },
  {
    ve: 8,
    ovk: "OVK Ormož",
    okraj: "ORMOŽ",
    ime: "Upravna enota Ormož",
    naslov: "Ptujska cesta 6",
    posta: "2270 Ormož",
    geo_latlng: [46.4073676, 16.1472849],
  },
  {
    ve: 8,
    ovk: "OVK Ljutomer",
    okraj: "LJUTOMER",
    ime: "Upravna enota Ljutomer",
    naslov: "Vrazova ulica 1",
    posta: "9240 Ljutomer",
    geo_latlng: [46.517847359052105, 16.195076468718124],
  },
  {
    ve: 8,
    ovk: "OVK Murska Sobota 1,2",
    okraj: "MURSKA SOBOTA",
    ime: "Upravna enota Murska Sobota",
    naslov: "Kardoševa ulica 2",
    posta: "9000 Murska Sobota",
    geo_latlng: [46.6627224, 16.1639805],
  },
  {
    ve: 8,
    ovk: "OVK Gornja Radgona",
    okraj: "GORNJA RADGONA",
    ime: "Upravna enota Gornja Radgona",
    naslov: "Partizanska cesta 13",
    posta: "9250 Gornja Radgona",
    geo_latlng: [46.6775582, 15.9903462],
  },
  {
    ve: 8,
    ovk: "OVK Lenart",
    okraj: "LENART",
    ime: "Upravna enota Lenart",
    naslov: "Trg osvoboditve 7",
    posta: "2230 Lenart v Slov. goricah",
    geo_latlng: [46.5759634, 15.83071],
  },
  {
    ve: 8,
    ovk: "OVK Pesnica",
    okraj: "PESNICA PRI MARIBORU",
    ime: "Večnamenski KTPC Pesnica",
    naslov: "Pesnica pri Mariboru 41",
    posta: "2211 Pesnica pri Mariboru",
    geo_latlng: [46.6090269, 15.6779261],
  },
  {
    ve: 8,
    ovk: "OVK Ptuj 1-3",
    okraj: "PTUJ",
    ime: "Upravna enota Ptuj",
    naslov: "Slomškova ulica 10",
    posta: "2250 Ptuj",
    geo_latlng: [46.4214918, 15.8719051],
  },
];

function timeLeft() {
  // deadline za oddat namero
  const deadline = new Date(2025, 10, 19, 24, 0, 0, 0);
  const now = new Date();
  // calculate difference in DAYS
  const t2 = deadline.getTime();
  const t1 = now.getTime();
  const difference = Math.floor((t2 - t1) / (24 * 3600 * 1000));
  if (difference > 1) {
    return "še " + difference + " dni";
  } else if (difference == 1) {
    return "še 1 dan";
  } else if (difference == 0) {
    return "čas še danes do polnoči";
  } else {
    return "še 0 dni";
  }
}

$(document).ready(function () {
  $(".thetime").text(timeLeft());

  initMap("themap");

  $(".zavesa .close-button").on("click", function () {
    $(".zavesa").animate({ top: -1000 }, 600);
  });

  $(".zavesa .share input").val(window.location.href);
  $(".zavesa .share input").on("focus", function () {
    $(this).select();
  });

  $(".zavesa .share .copy-button").on("click", function () {
    var copyText = $(".zavesa .share input");
    copyText.select();
    document.execCommand("copy");
    var oldHtml = $(this).html();
    $(this).html("Kopirano!");
    var button = $(this);
    setTimeout(function () {
      button.html(oldHtml);
    }, 2000);
  });
});
