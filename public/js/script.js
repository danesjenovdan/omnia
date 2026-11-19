async function initMap() {
  const map = new L.Map("themap", {
    center: new L.LatLng(46.2, 15),
    zoom: 9,
    layers: [
      new L.TileLayer(
        "https://mapproxy.danesjenovdan.si/mapproxy/tms/1.0.0/osm/EPSG3857/{z}/{x}/{y}.png",
        {
          tms: true,
          zoomOffset: -1,
          minZoom: 1,
          maxZoom: 18,
          attribution:
            'Map data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>.',
          referrerPolicy: "strict-origin-when-cross-origin",
        },
      ),
    ],
  });

  const markerIcon = new L.Icon({
    iconUrl: "img/marker.svg?v=${COMMIT_SHA}",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -48],
  });

  const res = await fetch("locations.json?v=${COMMIT_SHA}");
  const resJson = await res.json();

  const uniqueLocations = resJson.locations.reduce((acc, loc) => {
    const key = loc.geo_latlng.map((coord) => coord.toFixed(5)).toString();
    acc[key] = acc[key] || [];
    acc[key].push(loc);
    return acc;
  }, {});

  Object.entries(uniqueLocations).forEach(([key, locs]) => {
    const marker = new L.Marker(locs[0].geo_latlng, {
      icon: markerIcon,
    });

    const ovks = locs.map((l) => `<li><strong>${l.ovk}</strong></li>`).join("");
    const popupContent = `
      <div class="markercontainer">
        <p>
          <b>${locs[0].ime}</b><br>
          ${locs[0].naslov}, ${locs[0].posta}
        </p>
        <p>
          Na volišču lahko glasujejo volivci iz naslednjih volilnih okrajev:
        </p>
        <ul>
          ${ovks}
        </ul>
      </div>
    `;

    marker.bindPopup(popupContent, { minWidth: 250, maxWidth: 250 });

    map.addLayer(marker);
  });
}

$(() => {
  const $zavesa = $(".zavesa");
  const $zavesaClose = $(".zavesa .close-button");
  const $shareInput = $(".zavesa .share input");
  const $shareCopy = $(".zavesa .share .copy-button");

  $zavesaClose.on("click", () => {
    $zavesa.animate({ top: "-100%" }, { duration: 600 }).animate(
      { opacity: 0 },
      {
        duration: 1000,
        queue: false,
        complete: () => {
          $zavesa.hide();
        },
      },
    );
  });

  $shareInput.val(window.location.href).on("focus", () => {
    $shareInput.select();
  });

  $shareCopy.on("click", () => {
    const copyText = $shareInput.val();
    navigator.clipboard.writeText(copyText);
    const oldHtml = $shareCopy.html();
    $shareCopy.html("Kopirano! <span>✅</span>");
    setTimeout(() => {
      $shareCopy.html(oldHtml);
    }, 2000);
  });

  initMap();
});
