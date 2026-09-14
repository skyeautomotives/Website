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

  const FALLBACK_PRODUCT = {
    "2-Wheeler": "Motovian Motorcycle Oil 4T (10W-30 or 20W-40)",
    "4-Wheeler": "Motovian Motor Oil HDX (15W-40)",
    "Heavy / Commercial": "Motovian Motor Oil HDX (15W-40)"
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
  const PRICE_FACTS = {
    "10W-30": "General Indian market range for 10W-30 4T motorcycle oil: roughly ₹250 to ₹550 per litre, depending on brand.",
    "20W-40": "General Indian market range for 20W-40 motorcycle oil: roughly ₹150 to ₹400 per litre, depending on brand.",
    "15W-40": "General Indian market range for 15W-40 diesel/car engine oil: roughly ₹200 to ₹400 per litre, depending on brand."
  };
  const FALLBACK_FACTS = {
    "2-Wheeler": [
      "Motovian 4T oil comes in two grades, 10W-30 and 20W-40, both rated for motorcycles and scooters.",
      PRICE_FACTS["10W-30"]
    ],
    "4-Wheeler": [
      "Motovian Motor Oil HDX is a 15W-40 synthetic-technology oil, exceeding API CI-4 Plus, suitable for petrol, diesel, LPG and CNG engines.",
      PRICE_FACTS["15W-40"]
    ],
    "Heavy / Commercial": [
      "Motovian Motor Oil HDX is a 15W-40 synthetic-technology oil, exceeding API CI-4 Plus, commonly used in diesel commercial vehicles.",
      PRICE_FACTS["15W-40"]
    ]
  };

  function viscosityFact(gradeStr) {
    const primary = gradeStr.split("/")[0].trim();
    const m = primary.match(/^(\d+)W-(\d+)$/i);
    if (!m) return null;
    return "Multigrade oil: flows like a " + m[1] + "-weight oil on a cold start, and like a " + m[2] + "-weight oil once the engine is up to temperature.";
  }

  function certFacts(note) {
    const facts = [];
    const apiMatch = (note || "").match(/\bAPI\s+([A-Z]{1,3}-?\d?(?:\s*\/\s*[A-Z]{1,3}-?\d?)*)/);
    if (apiMatch) {
      const codes = apiMatch[1].split("/").map((s) => s.trim());
      const known = codes.filter((c) => API_MEANINGS[c]);
      if (known.length) {
        facts.push("API " + codes.join(" / ") + ": " + known.map((c) => API_MEANINGS[c]).join("; or "));
      }
    }
    const jasoMatch = (note || "").match(/\bJASO\s+(MA2?|MB)(?:\s*\/\s*(MA2?|MB))?/);
    if (jasoMatch) {
      const codes = [jasoMatch[1], jasoMatch[2]].filter(Boolean);
      facts.push("JASO " + codes.join(" / ") + ": " + codes.map((c) => JASO_MEANINGS[c]).join("; or "));
    }
    return facts;
  }

  function researchedFacts(entry) {
    const facts = [];
    const visc = viscosityFact(entry.grade);
    if (visc) facts.push(visc);
    facts.push(...certFacts(entry.note));
    const primary = entry.grade.split("/")[0].trim();
    if (PRICE_FACTS[primary]) facts.push(PRICE_FACTS[primary]);
    return facts;
  }

  const steps = {
    segment: document.getElementById("finder-step-segment"),
    company: document.getElementById("finder-step-company"),
    model: document.getElementById("finder-step-model"),
    result: document.getElementById("finder-step-result")
  };
  const companySelect = document.getElementById("finder-company");
  const modelLabel = document.getElementById("finder-model-label");
  const modelKnownBox = document.getElementById("finder-model-known");
  const modelSelect = document.getElementById("finder-model-select");
  const modelUnknownBox = document.getElementById("finder-model-unknown");
  const fuelRow = document.getElementById("finder-fuel-row");
  const modelTextInput = document.getElementById("finder-model-text");
  const unknownContinueBtn = document.getElementById("finder-unknown-continue");
  const resetBtn = document.getElementById("finder-reset");
  const resultVehicle = document.getElementById("finder-result-vehicle");
  const resultGrade = document.getElementById("finder-result-grade");
  const resultNote = document.getElementById("finder-result-note");
  const resultMatch = document.getElementById("finder-result-match");
  const resultFacts = document.getElementById("finder-result-facts");
  const waBtn = document.getElementById("finder-wa-btn");

  let answers = { segment: "", company: "", fuel: "", model: "" };
  let researchedEntry = null;

  function showStep(key) {
    Object.values(steps).forEach((el) => {
      el.hidden = true;
    });
    steps[key].hidden = false;
  }

  function populateCompanies(segment) {
    companySelect.innerHTML = '<option value="">Select company</option>';
    (COMPANIES[segment] || []).forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      companySelect.appendChild(opt);
    });
    companySelect.value = "";
  }

  function getResearchedModels(segment, company) {
    return (VEHICLE_DATA[segment] && VEHICLE_DATA[segment][company]) || [];
  }

  function fillModelStep() {
    const models = getResearchedModels(answers.segment, answers.company);
    fuelRow.hidden = answers.segment === "2-Wheeler";
    if (models.length) {
      modelLabel.textContent = "Model";
      modelKnownBox.hidden = false;
      modelUnknownBox.hidden = true;
      modelSelect.innerHTML = '<option value="">Select model</option>';
      models.forEach((entry, i) => {
        const opt = document.createElement("option");
        opt.value = String(i);
        opt.textContent = entry.model + " (" + entry.grade + ")";
        modelSelect.appendChild(opt);
      });
      const otherOpt = document.createElement("option");
      otherOpt.value = "other";
      otherOpt.textContent = "My model isn't listed";
      modelSelect.appendChild(otherOpt);
      modelSelect.value = "";
    } else {
      switchToUnknownModel();
    }
  }

  function switchToUnknownModel() {
    modelLabel.textContent = "Tell us a bit more";
    modelKnownBox.hidden = true;
    modelUnknownBox.hidden = false;
    modelTextInput.value = "";
    fuelRow.hidden = answers.segment === "2-Wheeler";
  }

  function renderFacts(facts) {
    resultFacts.innerHTML = "";
    facts.forEach((f) => {
      const p = document.createElement("p");
      p.className = "finder-fact";
      p.textContent = f;
      resultFacts.appendChild(p);
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

  function showFallbackResult() {
    researchedEntry = null;
    const product = FALLBACK_PRODUCT[answers.segment] || "";
    resultVehicle.textContent = "Starting point";
    resultGrade.textContent = product;
    resultNote.textContent = "We don't have a verified spec for this exact vehicle yet. Our team will confirm the right grade for you.";
    resultNote.hidden = false;
    resultMatch.textContent = "";
    renderFacts(FALLBACK_FACTS[answers.segment] || []);
    updateWaLink();
    showStep("result");
  }

  function updateWaLink() {
    let message = "Hi Motovian, I have a " + answers.segment + " - " + answers.company;
    if (answers.model) message += " (" + answers.model + ")";
    if (answers.fuel) message += ", fuel: " + answers.fuel;
    message += ".";
    if (researchedEntry) {
      message += " Your finder showed " + researchedEntry.grade + ".";
    }
    message += " I'd like help finding the right oil.";
    waBtn.href = "https://wa.me/919744060485?text=" + encodeURIComponent(message);
  }

  function resetFinder() {
    answers = { segment: "", company: "", fuel: "", model: "" };
    researchedEntry = null;
    finderBox.querySelectorAll("[data-segment]").forEach((b) => b.classList.remove("active"));
    fuelRow.querySelectorAll("[data-fuel]").forEach((b) => b.classList.remove("active"));
    showStep("segment");
  }

  finderBox.querySelectorAll("[data-segment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      answers.segment = btn.dataset.segment;
      answers.company = "";
      answers.fuel = "";
      answers.model = "";
      finderBox.querySelectorAll("[data-segment]").forEach((b) => b.classList.toggle("active", b === btn));
      populateCompanies(answers.segment);
      showStep("company");
    });
  });

  companySelect.addEventListener("change", () => {
    if (!companySelect.value) return;
    answers.company = companySelect.value;
    fillModelStep();
    showStep("model");
  });

  modelSelect.addEventListener("change", () => {
    if (!modelSelect.value) return;
    if (modelSelect.value === "other") {
      switchToUnknownModel();
      return;
    }
    const models = getResearchedModels(answers.segment, answers.company);
    const entry = models[Number(modelSelect.value)];
    answers.model = entry.model;
    showResearchedResult(entry);
  });

  unknownContinueBtn.addEventListener("click", () => {
    answers.model = modelTextInput.value.trim();
    showFallbackResult();
  });

  fuelRow.querySelectorAll("[data-fuel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      answers.fuel = btn.dataset.fuel;
      fuelRow.querySelectorAll("[data-fuel]").forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  finderBox.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => showStep(btn.dataset.back));
  });

  resetBtn.addEventListener("click", resetFinder);
})();
