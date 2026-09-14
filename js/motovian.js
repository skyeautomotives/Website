// ===================== OIL FINDER =====================
// Two layers, both honest about what we actually know:
//  1. 2-Wheeler data comes from Skye Automotives' own research master
//     (Skye_Automotives_2W_Engine_Oil_Master_Database.xlsx: 128 current
//     models across 16 manufacturers, sourced from owner's manuals). Vintage
//     2-stroke/premix models from that file are excluded here since Motovian
//     doesn't make 2T oil. 4-Wheeler/Commercial data is a smaller hand-researched
//     set. Every entry says whether Motovian's current lineup actually matches
//     that grade, or not, rather than pushing a product that isn't the right spec.
//  2. For every vehicle NOT yet in that dataset, we don't guess: we collect
//     what the visitor tells us and hand off to WhatsApp so a real person
//     helps them. Coverage is meant to grow over time, not stay fixed.
//
// UI is sequential: each question replaces the last (Vehicle Type -> Company
// -> Model), ending on one rich result screen with no filters left in view.
// The result is enriched with real, sourced context (what the viscosity
// numbers mean, what the API/JASO certification means, and general Indian
// market price ranges for that grade) so it reads as a real answer, not a
// bare number.
(function () {
  const finderBox = document.getElementById("finder-box");
  if (!finderBox) return;

  // ---- researched vehicle data (grade = manufacturer-published starting point) ----
  const VEHICLE_DATA = {
    "2-Wheeler": {
      "Aprilia": [
        { model: "RS 457", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "SR 160 (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "BMW Motorrad": [
        { model: "G 310 R", grade: "5W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "G 310 GS", grade: "5W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "G 310 RR", grade: "5W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Bajaj Auto": [
        { model: "Platina 100", grade: "10W-30", note: "API SJ, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Platina 110", grade: "10W-30", note: "API SJ, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "CT 110X", grade: "10W-30", note: "API SJ, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Pulsar 125", grade: "20W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Pulsar N125", grade: "10W-40", note: "API SJ, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Pulsar 150", grade: "20W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar N160", grade: "20W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar NS160", grade: "20W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar 220F", grade: "20W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Pulsar N250", grade: "20W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar NS200", grade: "20W-50 / 10W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar RS200", grade: "20W-50 / 10W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Pulsar NS400Z", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Dominar 250", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Dominar 400", grade: "10W-50", note: "API SN, JASO MA2.", match: null },
        { model: "Avenger 160 Street", grade: "20W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Avenger 220 Cruise", grade: "20W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Freedom 125", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Harley-Davidson": [
        { model: "X440", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Hero MotoCorp": [
        { model: "HF Deluxe", grade: "10W-30", note: "API SJ, JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Splendor+", grade: "10W-30 / 5W-30", note: "API SL / SN, JASO MA2.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Splendor+ XTEC 2.0", grade: "10W-30 / 5W-30", note: "API SL / SN, JASO MA2.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Super Splendor", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Passion+", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Glamour", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Glamour X", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Xtreme 125R", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Xtreme 160R", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Xtreme 160R 4V", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Xpulse 200 4V", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Xpulse 210", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Mavrick 440", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Pleasure+ XTEC (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Destini 125 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
      ],
      "Honda": [
        { model: "Shine 100", grade: "5W-30 / 10W-30", note: "JASO MA.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Shine 100 DX", grade: "5W-30 / 10W-30", note: "JASO MA.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Shine 125", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "SP125", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "SP160", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Unicorn", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Livo", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Hornet 2.0", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "NX200", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "CB200X", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "CB350", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "H'ness CB350", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "CB350RS", grade: "10W-30", note: "JASO MA. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Activa 110 (Scooter)", grade: "10W-30", note: "JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Activa 125 (Scooter)", grade: "10W-30", note: "JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Dio (Scooter)", grade: "10W-30", note: "JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Dio 125 (Scooter)", grade: "10W-30", note: "JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
      ],
      "Jawa": [
        { model: "42", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "42 Bobber", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Perak", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "KTM": [
        { model: "125 Duke", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "160 Duke", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "200 Duke", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "250 Duke", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "390 Duke", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "250 Adventure", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "390 Adventure", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "RC 200", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "RC 390", grade: "10W-50", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Kawasaki": [
        { model: "Ninja 300", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Ninja 500", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Ninja 650", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Royal Enfield": [
        { model: "Bullet 350", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Classic 350", grade: "15W-50", note: "API SL, JASO MA2.", match: null },
        { model: "Goan Classic 350", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Hunter 350", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Meteor 350", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Guerrilla 450", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Himalayan 450", grade: "10W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Himalayan 440", grade: "15W-50", note: "API SL, JASO MA2.", match: null },
        { model: "Scram 440", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Interceptor 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Continental GT 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Super Meteor 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Shotgun 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Classic 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Bear 650", grade: "15W-50", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Suzuki Motorcycle India": [
        { model: "Access 125 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Avenis 125 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Burgman Street (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Gixxer", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Gixxer SF", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Gixxer 250", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Gixxer SF 250", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "V-Strom SX", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "TVS Motor": [
        { model: "Sport", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Radeon", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Star City+", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Raider", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Apache RTR 160", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Apache RTR 160 4V", grade: "10W-30", note: "API SL, JASO MA2.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Apache RTR 200 4V", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Apache RTR 310", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Apache RR 310", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Ronin", grade: "10W-30", note: "API SL, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Jupiter 110 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Jupiter 125 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "NTORQ 125 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "NTORQ 150 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Zest 110 (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "Scooty Pep+ (Scooter)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
        { model: "XL100 (Moped)", grade: "10W-30", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: "Motovian Motorcycle Oil 4T 10W-30" },
      ],
      "Triumph": [
        { model: "Speed 400", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Scrambler 400 X", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Vespa": [
        { model: "VXL 125 (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "SXL 125 (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Yamaha": [
        { model: "FZ-FI", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "FZS-FI", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "FZ-X", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "MT-15", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "R15 V4", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "R15M", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "R3", grade: "10W-40", note: "API SL, JASO MA. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Aerox 155 (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Fascino 125 Fi Hybrid (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "RayZR 125 Fi Hybrid (Scooter)", grade: "10W-40", note: "API SL, JASO MB. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
      "Yezdi": [
        { model: "Roadster", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Scrambler", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
        { model: "Adventure", grade: "10W-40", note: "API SN, JASO MA2. Confirm exact model-year grade with your owner's manual.", match: null },
      ],
    },
    "4-Wheeler": {
      "Maruti Suzuki": [
        { model: "Swift (2024-present)", grade: "0W-16", note: "Much thinner than Motovian HDX 15W-40.", match: null },
        { model: "Swift (2018-2023)", grade: "0W-20", note: "5W-30 is a listed alternative; still thinner than HDX 15W-40.", match: null },
        { model: "Swift (pre-2018)", grade: "5W-30", note: "Thinner than Motovian HDX 15W-40.", match: null },
        { model: "WagonR (current)", grade: "0W-20", note: "Thinner than Motovian HDX 15W-40.", match: null },
        { model: "WagonR (K10B, older)", grade: "5W-30", note: "Thinner than Motovian HDX 15W-40.", match: null }
      ],
      "Hyundai": [
        { model: "i20 (BS6 petrol)", grade: "0W-30", note: "API SP.", match: null },
        { model: "i20 (BS4 petrol)", grade: "5W-30", note: "ACEA A3/B4.", match: null },
        { model: "Creta (diesel)", grade: "15W-40", note: "API CH-4.", match: "Motovian Motor Oil HDX 15W-40" }
      ],
      "Tata Motors": [
        { model: "Nexon", grade: "5W-30", note: "0W-20 is a listed alternative.", match: null },
        { model: "Ace (commercial)", grade: "15W-40", note: "CH-4 / CI-4 spec.", match: "Motovian Motor Oil HDX 15W-40" }
      ],
      "Mahindra": [
        { model: "Scorpio (diesel, older)", grade: "15W-40", note: "", match: "Motovian Motor Oil HDX 15W-40" },
        { model: "Scorpio-N (diesel)", grade: "5W-40", note: "Thinner than Motovian HDX 15W-40.", match: null },
        { model: "Bolero Pickup (commercial)", grade: "15W-40", note: "20W-40 is a listed alternative.", match: "Motovian Motor Oil HDX 15W-40" }
      ],
      "Toyota": [
        { model: "Innova Crysta (diesel)", grade: "5W-30", note: "0W-40 is a listed alternative on the 2.8L.", match: null }
      ],
      "Honda": [
        { model: "City 1.5L (petrol)", grade: "5W-30", note: "Newer models move to 0W-20.", match: null }
      ],
      "Kia": [
        { model: "Seltos 1.4L (petrol)", grade: "5W-30", note: "", match: null },
        { model: "Seltos T-GDI (petrol)", grade: "0W-20", note: "", match: null },
        { model: "Seltos 1.5L (diesel)", grade: "0W-20", note: "", match: null }
      ],
      "Renault": [
        { model: "Kwid (current)", grade: "5W-30", note: "RN0700/RN0710 spec; older manuals list 15W-40.", match: null },
        { model: "Triber", grade: "5W-30", note: "Shares the Kwid's CMF-A platform spec.", match: null }
      ]
    },
    "Heavy / Commercial": {
      "Tata Motors": [
        { model: "Ace", grade: "15W-40", note: "CH-4 / CI-4 spec, common for BS-III/IV diesel commercial vehicles.", match: "Motovian Motor Oil HDX 15W-40" }
      ],
      "Ashok Leyland": [
        { model: "Dost", grade: "15W-40", note: "Ashok Leyland's own co-branded oil is also 15W-40.", match: "Motovian Motor Oil HDX 15W-40" }
      ]
    }
  };

  // ---- company lists (companies without researched models still show up, but
  // fall back to the fuel + free-text connector rather than a fabricated grade) ----
  const COMPANIES = {
    "2-Wheeler": ["Aprilia", "BMW Motorrad", "Bajaj Auto", "Harley-Davidson", "Hero MotoCorp", "Honda", "Jawa", "KTM", "Kawasaki", "Royal Enfield", "Suzuki Motorcycle India", "TVS Motor", "Triumph", "Vespa", "Yamaha", "Yezdi", "Other"],
    "4-Wheeler": ["Maruti Suzuki", "Hyundai", "Tata Motors", "Mahindra", "Honda", "Toyota", "Kia", "Renault", "Nissan", "Volkswagen", "Skoda", "Other"],
    "Heavy / Commercial": ["Tata Motors", "Ashok Leyland", "Mahindra", "Eicher", "Force Motors", "BharatBenz", "Other"]
  };


  // ---- result enrichment: real, sourced context, not fabricated Motovian
  // pricing (which isn't public). Viscosity meaning is general SAE fact;
  // API/JASO meanings and price ranges are sourced from public research. ----
  const API_MEANINGS = {
    "SJ": "a gasoline engine standard from the early 2000s",
    "SL": "a gasoline engine standard (2004) with improved high-temperature deposit control",
    "SN": "a newer gasoline engine standard (2010) with better emissions and deposit protection",
    "SP": "the latest gasoline engine standard, tuned for modern turbocharged engines",
    "CH-4": "a diesel engine standard for older emission-controlled diesel engines",
    "CI-4": "a diesel engine standard for emission-controlled diesel engines"
  };
  const JASO_MEANINGS = {
    "MA": "for wet-clutch motorcycles under normal riding",
    "MA2": "for wet-clutch motorcycles, with a higher friction rating for performance or heavy-load riding",
    "MB": "for scooters and bikes without a wet clutch"
  };
  // Only these three grades have a genuine primary-source price (an OEM's own
  // official e-commerce store: Hero MotoCorp, Suzuki Motorcycle India): see
  // research/oil-price-research.md. Every other grade we checked (15W-40,
  // 15W-50, 20W-50, 10W-50, 5W-30, 5W-40, 0W-20, 0W-16, 0W-30) turned up no
  // reliable price at all: pure lubricant brands don't publish consumer MRP
  // on their own India sites, and reseller listings for the same product
  // varied by 2 to 6x. Rather than show a number we can't stand behind, we
  // simply omit the price line for those grades.
  const PRICE_FACTS = {
    "10W-30": "₹565 to ₹600 per litre, based on official OEM store pricing (Hero MotoCorp, Suzuki Motorcycle India).",
    "20W-40": "₹437 to ₹545 per litre, based on official OEM store pricing (Suzuki Motorcycle India, Hero MotoCorp).",
    "10W-40": "₹628 to ₹887 per litre, based on official OEM store pricing (Suzuki Motorcycle India), semi-synthetic to full-synthetic."
  };

  function viscosityFact(gradeStr) {
    const primary = gradeStr.split("/")[0].trim();
    const m = primary.match(/^(\d+)W-(\d+)$/i);
    if (!m) return null;
    return "Multigrade oil: flows like a " + m[1] + "-weight oil on a cold start, and like a " + m[2] + "-weight oil once the engine is up to temperature.";
  }

  function categoryFact(note) {
    const parts = [];
    const apiMatch = (note || "").match(/\bAPI\s+([A-Z]{1,3}-?\d?(?:\s*\/\s*[A-Z]{1,3}-?\d?)*)/);
    if (apiMatch) {
      const codes = apiMatch[1].split("/").map((s) => s.trim());
      const known = codes.filter((c) => API_MEANINGS[c]);
      if (known.length) {
        parts.push("API " + codes.join(" / ") + ": " + known.map((c) => API_MEANINGS[c]).join("; or "));
      }
    }
    const jasoMatch = (note || "").match(/\bJASO\s+(MA2?|MB)(?:\s*\/\s*(MA2?|MB))?/);
    if (jasoMatch) {
      const codes = [jasoMatch[1], jasoMatch[2]].filter(Boolean);
      parts.push("JASO " + codes.join(" / ") + ": " + codes.map((c) => JASO_MEANINGS[c]).join("; or "));
    }
    return parts.length ? parts.join(". ") + "." : null;
  }

  function researchedFacts(entry) {
    const facts = [];
    const visc = viscosityFact(entry.grade);
    if (visc) facts.push({ label: "Description", value: visc });
    const cat = categoryFact(entry.note);
    if (cat) facts.push({ label: "Category", value: cat });
    const primary = entry.grade.split("/")[0].trim();
    if (PRICE_FACTS[primary]) facts.push({ label: "Typical Price", value: PRICE_FACTS[primary] });
    return facts;
  }

  const steps = {
    segment: document.getElementById("finder-step-segment"),
    company: document.getElementById("finder-step-company"),
    model: document.getElementById("finder-step-model"),
    enquiry: document.getElementById("finder-step-enquiry"),
    result: document.getElementById("finder-step-result")
  };
  const progressRail = document.getElementById("finder-progress");
  const progressSteps = progressRail.querySelectorAll(".finder-progress-step");
  const companyTiles = document.getElementById("finder-company-tiles");
  const modelTiles = document.getElementById("finder-model-tiles");
  const resetBtn = document.getElementById("finder-reset");
  const resultVehicle = document.getElementById("finder-result-vehicle");
  const resultGrade = document.getElementById("finder-result-grade");
  const resultNote = document.getElementById("finder-result-note");
  const resultMatch = document.getElementById("finder-result-match");
  const resultFacts = document.getElementById("finder-result-facts");
  const resultEnquireBtn = document.getElementById("finder-result-enquire");
  const waBtn = document.getElementById("finder-wa-btn");

  const enquiryForm = document.getElementById("finder-enquiry");
  const enquiryDone = document.getElementById("enq-done");
  const enquiryFoot = document.getElementById("enq-foot");
  const enquiryBack = document.getElementById("enq-back");
  const enquiryAgain = document.getElementById("enq-again");
  const enquirySubmit = document.getElementById("enq-submit");
  const enquiryError = document.getElementById("enq-error");
  const enquiryFuel = document.getElementById("enq-fuel");
  const enqName = document.getElementById("enq-name");
  const enqWa = document.getElementById("enq-wa");
  const enqBrand = document.getElementById("enq-brand");
  const enqModel = document.getElementById("enq-model");

  // FormSubmit's AJAX endpoint relays to the same inbox as the dealer form on
  // index.html, but keeps the visitor inside the finder instead of bouncing
  // them to a third-party thank-you page.
  const ENQUIRY_ENDPOINT = "https://formsubmit.co/ajax/skyeautomotives@gmail.com";
  const WA_TEAM = "919744060485";

  let answers = { segment: "", company: "", model: "" };
  let researchedEntry = null;
  let enquiryReturnTo = "company";

  const STEP_ORDER = ["segment", "company", "model"];

  // The bottom fade is a "there's more below" cue, so drop it once the list
  // is fully scrolled or short enough not to scroll at all.
  function syncTileFade(box) {
    const atEnd = box.scrollTop + box.clientHeight >= box.scrollHeight - 2;
    box.classList.toggle("is-ended", atEnd);
  }

  [companyTiles, modelTiles].forEach((box) => {
    box.addEventListener("scroll", () => syncTileFade(box), { passive: true });
  });

  function showStep(key) {
    Object.values(steps).forEach((el) => {
      el.hidden = true;
    });
    steps[key].hidden = false;
    // A long tile list must open at the top: a hidden container ignores
    // scrollTop writes, and the browser can restore a stale offset on reload.
    steps[key].querySelectorAll(".finder-tiles").forEach((box) => {
      box.scrollTop = 0;
      syncTileFade(box);
    });

    // The rail counts the three questions, so it has no place on the answer
    // or on the enquiry form that sits outside that path.
    const at = STEP_ORDER.indexOf(key);
    progressRail.hidden = at === -1;
    progressSteps.forEach((el, i) => {
      el.classList.toggle("is-current", i === at);
      el.classList.toggle("is-done", at > -1 && i < at);
    });
  }

  // ---- tiles: one tappable target per choice, instead of a dropdown that
  // hides every option behind a click and leaves the card looking empty. ----
  function makeTile(label, meta, wide) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "finder-tile" + (wide ? " finder-tile-wide" : "");
    const name = document.createElement("span");
    name.className = "finder-tile-name";
    name.textContent = label;
    btn.appendChild(name);
    if (meta) {
      const sub = document.createElement("span");
      sub.className = "finder-tile-meta";
      sub.textContent = meta;
      btn.appendChild(sub);
    }
    return btn;
  }

  function getResearchedModels(segment, company) {
    return (VEHICLE_DATA[segment] && VEHICLE_DATA[segment][company]) || [];
  }

  function populateCompanies(segment) {
    companyTiles.innerHTML = "";
    (COMPANIES[segment] || []).forEach((name) => {
      const isOther = name === "Other";
      const tile = makeTile(isOther ? "My brand isn't listed" : name, null, isOther);
      tile.addEventListener("click", () => {
        answers.company = isOther ? "" : name;
        answers.model = "";
        // No verified models for this brand (or no brand at all): go to the
        // enquiry form rather than an empty model step.
        if (isOther || !getResearchedModels(segment, name).length) {
          openEnquiry("company");
          return;
        }
        fillModelStep();
        showStep("model");
      });
      companyTiles.appendChild(tile);
    });
  }

  function fillModelStep() {
    const models = getResearchedModels(answers.segment, answers.company);
    modelTiles.innerHTML = "";
    models.forEach((entry) => {
      // The grade rides on the tile, so the answer is half-visible before
      // the visitor even commits to a model.
      const tile = makeTile(entry.model, entry.grade, false);
      tile.addEventListener("click", () => {
        answers.model = entry.model;
        showResearchedResult(entry);
      });
      modelTiles.appendChild(tile);
    });
    const other = makeTile("My model isn't listed", null, true);
    other.addEventListener("click", () => {
      answers.model = "";
      openEnquiry("model");
    });
    modelTiles.appendChild(other);
  }

  function renderFacts(facts) {
    resultFacts.innerHTML = "";
    facts.forEach((f) => {
      const row = document.createElement("div");
      row.className = "finder-fact";
      const label = document.createElement("p");
      label.className = "finder-fact-label";
      label.textContent = f.label;
      const value = document.createElement("p");
      value.className = "finder-fact-value";
      value.textContent = f.value;
      row.appendChild(label);
      row.appendChild(value);
      resultFacts.appendChild(row);
    });
  }

  function showResearchedResult(entry) {
    researchedEntry = entry;
    resultVehicle.textContent = entry.model;
    resultGrade.textContent = entry.grade;
    resultNote.textContent = entry.note || "";
    resultNote.hidden = !entry.note;
    resultMatch.textContent = entry.match ? "Matches " + entry.match + "." : "";
    renderFacts(researchedFacts(entry));
    updateWaLink();
    showStep("result");
  }

  function updateWaLink() {
    let message = "Hi Motovian, I have a " + answers.segment + " - " + answers.company;
    if (answers.model) message += " (" + answers.model + ")";
    message += ".";
    if (researchedEntry) {
      message += " Your finder showed " + researchedEntry.grade + ".";
    }
    message += " I'd like help finding the right oil.";
    waBtn.href = "https://wa.me/" + WA_TEAM + "?text=" + encodeURIComponent(message);
  }

  // ---- enquiry form ----
  function setEnquiryState(state) {
    const sending = state === "sending";
    const done = state === "done";
    enquiryForm.hidden = done;
    enquiryDone.hidden = !done;
    enquiryFoot.hidden = done;
    enquirySubmit.disabled = sending;
    enquirySubmit.textContent = sending ? "Sending…" : "Send To Our Team";
    if (state !== "error") enquiryError.hidden = true;
  }

  function openEnquiry(returnTo) {
    enquiryReturnTo = returnTo;
    setEnquiryState("idle");
    // Carry forward whatever the visitor has already told us, so the form
    // never asks a question they just answered.
    enqBrand.value = answers.company;
    enqModel.value = answers.model;
    document.getElementById("enq-segment").value = answers.segment;
    enquiryFuel.hidden = answers.segment === "2-Wheeler";
    if (enquiryFuel.hidden) {
      enquiryFuel.querySelectorAll("input").forEach((r) => { r.checked = false; });
    }
    showStep("enquiry");
    const firstEmpty = [enqName, enqWa, enqBrand, enqModel].find((el) => !el.value.trim());
    if (firstEmpty) firstEmpty.focus({ preventScroll: true });
  }

  // Accepts "97440 60485", "+91 97440 60485", "919744060485" and returns the
  // bare 10-digit number.
  function whatsAppDigits(raw) {
    const digits = raw.replace(/\D/g, "");
    return digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  }

  function enquiryWaFallback(data) {
    const lines = [
      "Hi Motovian, I need help finding the right oil.",
      "Name: " + data.Name,
      "Vehicle: " + [answers.segment, data.Brand, data.Model].filter(Boolean).join(", ")
    ];
    if (data.Fuel) lines.push("Fuel: " + data.Fuel);
    return "https://wa.me/" + WA_TEAM + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  enqWa.addEventListener("input", () => enqWa.setCustomValidity(""));

  enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const wa = whatsAppDigits(enqWa.value);
    enqWa.setCustomValidity(/^[6-9]\d{9}$/.test(wa) ? "" : "Enter a 10-digit WhatsApp number, e.g. 97440 60485");
    if (!enquiryForm.reportValidity()) return;

    const data = Object.fromEntries(new FormData(enquiryForm).entries());
    if (data._honey) return;
    delete data._honey;
    data["WhatsApp Number"] = "+91 " + wa;
    data._subject = "Oil Finder enquiry: " + [data.Brand, data.Model].filter(Boolean).join(" ") +
      (answers.segment ? " (" + answers.segment + ")" : "");

    setEnquiryState("sending");
    fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json().then((body) => ({ ok: res.ok, body })))
      .then(({ ok, body }) => {
        if (!ok || String(body.success) !== "true") throw new Error(body.message || "Send failed");
        document.getElementById("enq-done-title").textContent = "Thanks, " + data.Name.trim().split(/\s+/)[0];
        document.getElementById("enq-done-sub").textContent =
          "Our team will send the right grade for your " + [data.Brand, data.Model].filter(Boolean).join(" ") +
          " to +91 " + wa + " on WhatsApp.";
        setEnquiryState("done");
      })
      .catch(() => {
        setEnquiryState("error");
        enquiryError.textContent = "Couldn't send just now. ";
        const link = document.createElement("a");
        link.href = enquiryWaFallback(data);
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Message us on WhatsApp instead";
        enquiryError.append(link, ".");
        enquiryError.hidden = false;
      });
  });

  enquiryBack.addEventListener("click", () => showStep(enquiryReturnTo));

  function resetFinder() {
    answers = { segment: "", company: "", model: "" };
    researchedEntry = null;
    enquiryForm.reset();
    setEnquiryState("idle");
    finderBox.querySelectorAll("[data-segment]").forEach((b) => b.classList.remove("active"));
    showStep("segment");
  }

  function selectSegment(segment) {
    answers.segment = segment;
    answers.company = "";
    answers.model = "";
    finderBox.querySelectorAll("[data-segment]").forEach((b) => {
      b.classList.toggle("active", b.dataset.segment === segment);
    });
    populateCompanies(segment);
    showStep("company");
  }

  finderBox.querySelectorAll("[data-segment]").forEach((btn) => {
    btn.addEventListener("click", () => selectSegment(btn.dataset.segment));
  });

  finderBox.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => showStep(btn.dataset.back));
  });

  resetBtn.addEventListener("click", resetFinder);
  enquiryAgain.addEventListener("click", resetFinder);
  resultEnquireBtn.addEventListener("click", () => openEnquiry("result"));

  // ---- deep link from the Motovian hero: the visitor already answered
  // "what do you drive?" there, so skip straight past the first question
  // instead of asking it again. Unknown slugs just fall through to step 1. ----
  const SEGMENT_SLUGS = {
    "2w": "2-Wheeler",
    "4w": "4-Wheeler",
    "hcv": "Heavy / Commercial"
  };
  const deepLinked = SEGMENT_SLUGS[new URLSearchParams(window.location.search).get("v")];
  if (deepLinked) selectSegment(deepLinked);
})();
