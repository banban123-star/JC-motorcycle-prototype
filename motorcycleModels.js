/**
 * Motorcycle models catalog categorized by brand for the Philippine market.
 * Used for model suggestions, combobox autocompletion, and reference lookup.
 */
const MOTORCYCLE_MODELS = {
  Yamaha: [
    "Sniper 150 V2",
    "Sniper 155"
  ],
  Honda: [
    "Click 125",
    "Click 160",
    "Beat",
    "PCX 160",
    "ADV 160",
    "AirBlade 160",
    "Forza 350",
    "TMX 125",
    "TMX Supremo",
    "XRM 125",
    "Wave 110",
    "Wave 125",
    "Winner X",
    "CBR150R",
    "CB150X",
    "CRF150L",
    "CRF300L",
    "RS125",
    "Genio"
  ],
  Suzuki: [
    "Raider R150",
    "Raider R150 Fi",
    "Raider J Crossover",
    "Skydrive Sport",
    "Skydrive Crossover",
    "Burgman Street 125",
    "Burgman Street EX",
    "Avenis 125",
    "Smash 115",
    "Smash Fi",
    "Gixxer 150",
    "Gixxer 250",
    "GSX-R150",
    "GSX-S150",
    "V-Strom 250SX"
  ],
  Kawasaki: [
    "Barako II 175",
    "CT100",
    "CT125",
    "CT150",
    "Rouser NS125",
    "Rouser NS160",
    "Rouser NS200",
    "Rouser 200NS",
    "Dominar 400",
    "W175",
    "Ninja 400",
    "Z400",
    "KLX 140",
    "KLX 150",
    "KLX 230"
  ],
  Rusi: [
    "Classic 250",
    "Flash 150",
    "Raptor 150",
    "Sigma 250",
    "Passion 125",
    "Royal 110",
    "SSX 200",
    "Titan 250",
    "Macho 125",
    "Korak 110"
  ],
  Motoposh: [
    "Typhoon 150",
    "Evo 125",
    "Pinoy 125",
    "Dax 100",
    "Veloce 150"
  ]
};

if (typeof window !== "undefined") {
  window.MOTORCYCLE_MODELS = MOTORCYCLE_MODELS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = MOTORCYCLE_MODELS;
}
