const fs = require('fs');
const path = require('path');

const databaseFile = path.join(__dirname, 'competitive_database.js');

const dbCode = `// Comprehensive Competitive Pokémon Database
// Formats: Singles (3v3 Trios) & Doubles (4v4 Quads)
// Games: BDSP (Gen 8 Battle Tower), Scarlet & Violet (Gen 9 VGC / Ranked), Legends: Z-A (Mega Meta)

const competitiveDatabase = {
  games: {
    bdsp: {
      id: "bdsp",
      name: "💎 Brilliant Diamond & Shining Pearl",
      shortName: "BDSP (Gen 8)",
      badge: "BDSP Master Class",
      desc: "Battle Tower Master Class (Lv. 50 flat). Item Clause ενεργό (όχι διπλά items). Gen 8 mechanics χωρίς Dynamax / Terastallization."
    },
    sv_vgc: {
      id: "sv_vgc",
      name: "⚡ Pokémon Scarlet & Violet",
      shortName: "Scarlet & Violet (VGC)",
      badge: "VGC & Ranked Gen 9",
      desc: "Επίσημο VGC Regulation & Battle Stadium Singles/Doubles. Terastallization, Paradox Pokémon & Ruin Legends."
    },
    legends_za: {
      id: "legends_za",
      name: "🏙️ Pokémon Legends: Z-A / Champions",
      shortName: "Legends: Z-A (Mega Meta)",
      badge: "Mega Evolution Meta",
      desc: "Lumiose City Mega Evolution competitive format. Mega Stones, Adaptability, Aerilate, Parental Bond & high speed-tiers."
    }
  },

  formats: {
    singles: {
      id: "singles",
      name: "⚔️ Singles (Τριάδες — 3 Pokémon)",
      slots: 3,
      slotLabels: [
        "Active Team 1/3 (Lead Wallbreaker)",
        "Active Team 2/3 (Setup / Cleaner)",
        "Active Team 3/3 (Defensive Anchor / Stall)"
      ],
      desc: "3v3 μάχη όπου 1 Pokémon βρίσκεται ταυτόχρονα στο πεδίο."
    },
    doubles: {
      id: "doubles",
      name: "👥 Doubles (Τετράδες — 4 Pokémon)",
      slots: 4,
      slotLabels: [
        "Active Team 1/4 (Lead Attacker)",
        "Active Team 2/4 (Lead Support / Speed Control)",
        "Active Team 3/4 (Backline Pivot / Synergy)",
        "Active Team 4/4 (Closer / Late-Game Sweeper)"
      ],
      desc: "Επίσημο 4v4 format με 2 Pokémon ταυτόχρονα στο πεδίο. Έμφαση σε Protect, Fake Out, Tailwind, Redirection και Weather synergies."
    }
  },

  presetTeams: {
    "bdsp_singles": [
      {
        id: "bdsp_s_fantasy",
        title: "Master Tower Alpha Core",
        tag: "Top Tier Balance",
        game: "bdsp",
        format: "singles",
        members: ["garchomp", "scizor", "suicune"],
        desc: "Το απόλυτο Fantasy Core (Dragon / Steel / Water). Ο Garchomp πιέζει ως Lead, ο Scizor καθαρίζει με Technician Bullet Punch (+1 priority) και ο Suicune αντέχει οποιαδήποτε physical/special απειλή με Calm Mind + Rest."
      },
      {
        id: "bdsp_s_shellsmash",
        title: "Shell Smash Sweep",
        tag: "Hyper Offense",
        game: "bdsp",
        format: "singles",
        members: ["cloyster", "togekiss", "tyranitar"],
        desc: "Lead Cloyster με Focus Sash και Shell Smash (+2 Atk, +2 SpAtk, +2 Speed). Skill Link εξασφαλίζει 5 χτυπήματα σε Icicle Spear & Rock Blast. Ο Togekiss προσφέρει Serene Grace Flinch και ο Tyranitar Sandstorm chip."
      },
      {
        id: "bdsp_s_bellydrum",
        title: "Huge Power Drum Core",
        tag: "High Risk / High Reward",
        game: "bdsp",
        format: "singles",
        members: ["garchomp", "scizor", "azumarill"],
        desc: "Azumarill με Huge Power και Belly Drum στα 198 HP (ζυγός αριθμός) για άμεση ενεργοποίηση Sitrus Berry στο 50%. Μετά εξαπολύει +6 Aqua Jet (+1 priority) που σαρώνει ολόκληρες ομάδες."
      },
      {
        id: "bdsp_s_dragonmatrix",
        title: "Latios Dragon Matrix",
        tag: "Special Sweeper Core",
        game: "bdsp",
        format: "singles",
        members: ["latios", "heatran", "scizor"],
        desc: "Latios με Life Orb για άμεσο Draco Meteor Nuking, με Heatran να απορροφά Ice & Fairy επιθέσεις με Flash Fire, και Scizor να καθαρίζει τα υπολείμματα με Technician Bullet Punch."
      },
      {
        id: "bdsp_s_immortalstall",
        title: "Immortal Bulky Stall",
        tag: "Defensive Synergy",
        game: "bdsp",
        format: "singles",
        members: ["suicune", "blissey", "gliscor"],
        desc: "Suicune (Pressure/RestTalk) εξαντλεί τα PP του αντιπάλου, η Blissey απορροφά κάθε Special κίνηση με Natural Cure, και ο Gliscor με Poison Heal είναι άτρωτος σε status και physical Ground επιθέσεις."
      }
    ],

    "bdsp_doubles": [
      {
        id: "bdsp_d_rain",
        title: "Swift Swim Rain Syndicate",
        tag: "Weather Offense (Doubles)",
        game: "bdsp",
        format: "doubles",
        members: ["pelipper", "kingdra", "raikou", "scizor"],
        desc: "Lead Pelipper (Drizzle) + Kingdra (Swift Swim). Το Kingdra διπλασιάζει την ταχύτητά του στη βροχή και χτυπάει με 100% Muddy Water. Raikou εξαπολύει 100% Thunder και Scizor δεν ανησυχεί για φωτιά (-50% Fire damage)."
      },
      {
        id: "bdsp_d_trickroom",
        title: "Calamity Trick Room",
        tag: "Trick Room Core",
        game: "bdsp",
        format: "doubles",
        members: ["cresselia", "torkoal", "snorlax", "tyranitar"],
        desc: "Lead Cresselia με Mental Herb για εγγυημένο Trick Room (Priority -7). Στη συνέχεια μπαίνει ο Torkoal με Drought και εξαπολύει Eruption πλήρους ισχύος πριν προλάβει να κινηθεί κανείς."
      },
      {
        id: "bdsp_d_tailwind",
        title: "Tailwind Hyper Threat",
        tag: "Speed Control Doubles",
        game: "bdsp",
        format: "doubles",
        members: ["zapdos", "garchomp", "heatran", "togekiss"],
        desc: "Zapdos ανοίγει με Tailwind (διπλασιασμός Speed για 4 γύρους) και Heat Wave. Ο Garchomp κάνει Earthquake χωρίς να χτυπά τον Zapdos (Flying/Levitate immunity)."
      },
      {
        id: "bdsp_d_pivot",
        title: "Dual Intimidate & Momentum",
        tag: "Balance Doubles",
        game: "bdsp",
        format: "doubles",
        members: ["arcanine", "gyarados", "metagross", "rotom_wash"],
        desc: "Διπλό Intimidate από Arcanine & Gyarados ρίχνει το Attack των αντιπάλων κατά 2 στάδια. Snarl, Will-O-Wisp και Metagross Clear Body για ασφαλή κυριαρχία στο Tower."
      }
    ],

    "sv_vgc_doubles": [
      {
        id: "sv_d_goodstuffs",
        title: "World Champion Balance",
        tag: "VGC Tier 0 Goodstuffs",
        game: "sv_vgc",
        format: "doubles",
        members: ["flutter_mane", "urshifu_rapid", "incineroar", "rillaboom"],
        desc: "Το πιο κυρίαρχο core στο σύγχρονο VGC. Incineroar (Fake Out + Intimidate + Parting Shot) και Rillaboom (Grassy Glide priority + Fake Out) προσφέρουν συνεχή πίεση. Flutter Mane nukes με Fairy/Ghost και Urshifu σπάει Protect με Unseen Fist."
      },
      {
        id: "sv_d_sun",
        title: "Drought Sunlight Annihilation",
        tag: "Weather / Ruin Offense",
        game: "sv_vgc",
        format: "doubles",
        members: ["torkoal", "flutter_mane", "chi_yu", "ogerpon_hearthflame"],
        desc: "Torkoal ενεργοποιεί Ήλιο, ενεργοποιώντας το Protosynthesis του Flutter Mane (+50% Speed/SpAtk). Chi-Yu ρίχνει το SpDef όλων των αντιπάλων κατά 25% (Beads of Ruin) για εξωφρενικά Heat Wave KO."
      },
      {
        id: "sv_d_rain_archaludon",
        title: "Archaludon Rain Stamina",
        tag: "Rain Bridge Doubles",
        game: "sv_vgc",
        format: "doubles",
        members: ["pelipper", "archaludon", "urshifu_rapid", "amoonguss"],
        desc: "Pelipper φέρνει βροχή, επιτρέποντας στο Archaludon να εκτελεί το Electro Shot σε 1 γύρο (+1 SpAtk boost). Το Stamina αυξάνει το Defense σε κάθε χτύπημα και ο Amoonguss προστατεύει με Redirection (Rage Powder)."
      },
      {
        id: "sv_d_psyspam",
        title: "Expanding Force Psyspam",
        tag: "Terrain / Trick Room",
        game: "sv_vgc",
        format: "doubles",
        members: ["indeedee_f", "armarouge", "ursaluna_bloodmoon", "torkoal"],
        desc: "Indeedee-F φέρνει Psychic Terrain (ακυρώνει όλα τα priority moves των αντιπάλων) και Follow Me (+2 priority). Ο Armarouge χτυπάει και τους δύο αντιπάλους με Expanding Force πλήρους ισχύος."
      }
    ],

    "sv_vgc_singles": [
      {
        id: "sv_s_dragonite",
        title: "Multiscale Extreme Balance",
        tag: "Ranked Singles Core",
        game: "sv_vgc",
        format: "singles",
        members: ["dragonite", "flutter_mane", "urshifu_single"],
        desc: "Dragonite με Multiscale και Tera Normal Extreme Speed (Priority +2) καθαρίζει σχεδόν τα πάντα. Flutter Mane για Ghost/Fairy immunities και Urshifu-Single Strike με Wicked Blow για εγγυημένα Critical Hits."
      },
      {
        id: "sv_s_swordofruin",
        title: "Sword of Ruin Hyper Offense",
        tag: "Fast Physical Offense",
        game: "sv_vgc",
        format: "singles",
        members: ["chien_pao", "gholdengo", "ting_lu"],
        desc: "Chien-Pao μειώνει την άμυνα των αντιπάλων κατά 25% (Sword of Ruin) και χτυπάει πρώτος με Ice Spinner / Sucker Punch (+1 priority). Gholdengo άτρωτος σε status (Good as Gold) και Ting-Lu θέτει Hazards."
      },
      {
        id: "sv_s_stallhazard",
        title: "Toxic Poison Heal Fortress",
        tag: "Bulky Attrition",
        game: "sv_vgc",
        format: "singles",
        members: ["gliscor", "dondozo", "ting_lu"],
        desc: "Gliscor με Toxic Orb και Poison Heal αναπληρώνει 1/8 HP κάθε γύρο με Protect + Substitute. Dondozo με Unaware αγνοεί όλα τα stat boosts του αντιπάλου και RestTalk recovery."
      }
    ],

    "legends_za_singles": [
      {
        id: "za_s_megalucario",
        title: "Adaptability Mega Lucario",
        tag: "Mega Champions Singles",
        game: "legends_za",
        format: "singles",
        members: ["mega_lucario", "garchomp", "togekiss"],
        desc: "Mega Lucario με Adaptability (STAB x2.0 αντί για x1.5). Close Combat και Bullet Punch (+1 priority) κάνουν τεράστια ζημιά. Garchomp και Togekiss καλύπτουν Fire, Ground και Psychic αδυναμίες."
      },
      {
        id: "za_s_megagengar",
        title: "Shadow Tag Trap Dominance",
        tag: "Perish Trap & Hex",
        game: "legends_za",
        format: "singles",
        members: ["mega_gengar", "tyranitar", "scizor"],
        desc: "Mega Gengar με Shadow Tag κλειδώνει τον αντίπαλο χωρίς δυνατότητα αλλαγής (switching). Sludge Wave, Shadow Ball και Focus Blast με βάση 130 Speed και 170 SpAtk."
      },
      {
        id: "za_s_kaloscore",
        title: "Kalos Velocity Core",
        tag: "Fast Transition",
        game: "legends_za",
        format: "singles",
        members: ["greninja", "talonflame", "mega_kangaskhan"],
        desc: "Greninja με Protean αλλάζει τύπο σε κάθε κίνηση, Talonflame με Gale Wings για Flying priority, και Mega Kangaskhan με Parental Bond (δύο χτυπήματα σε κάθε επίθεση)."
      }
    ],

    "legends_za_doubles": [
      {
        id: "za_d_megakangaskhan",
        title: "Parental Bond Beatdown",
        tag: "Mega Doubles Alpha",
        game: "legends_za",
        format: "doubles",
        members: ["mega_kangaskhan", "landorus_t", "zapdos", "heatran"],
        desc: "Mega Kangaskhan με Parental Bond σπάει Focus Sash και Subsitutes σε έναν γύρο. Fake Out (+3 priority) ακινητοποιεί τον απειλητικότερο αντίπαλο, ενώ Landorus-T παρέχει Intimidate."
      },
      {
        id: "za_d_megacharizard",
        title: "Mega Charizard Y Drought",
        tag: "Mega Weather Doubles",
        game: "legends_za",
        format: "doubles",
        members: ["mega_charizard_y", "venusaur", "heatran", "cresselia"],
        desc: "Mega Charizard Y ενεργοποιεί άμεσα Drought κατά την εξέλιξη. Heat Wave χτυπάει και τους δύο αντιπάλους με τεράστια ισχύ. Ο Venusaur με Chlorophyll έχει 2x Speed και ρίχνει Sleep Powder."
      },
      {
        id: "za_d_megagardevoir",
        title: "Pixilate Hyper Voice Symphony",
        tag: "Fairy Sound Doubles",
        game: "legends_za",
        format: "doubles",
        members: ["mega_gardevoir", "incineroar", "amoonguss", "urshifu_rapid"],
        desc: "Mega Gardevoir με Pixilate μετατρέπει το Hyper Voice σε Fairy move με +20% boost, χτυπώντας και τους δύο αντιπάλους παρακάμπτοντας Substitutes. Incineroar και Amoonguss προσφέρουν πλήρη υποστήριξη."
      }
    ]
  },

  pokemon: {
    // 1. GARCHOMP
    garchomp: {
      id: "garchomp",
      name: "Garchomp",
      dexNum: "No. 445",
      species: "Mach Pokémon",
      gender: "♂",
      types: ["DRAGON", "GROUND"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Rough Skin",
      abilityDesc: "Προκαλεί ζημιά ίση με το 1/8 της μέγιστης ζωής στον αντίπαλο κάθε φορά που δέχεται επίθεση με physical επαφή.",
      heldItem: "Focus Sash",
      itemDesc: "Αν ο κάτοχος δεχθεί επίθεση που θα τον έβγαζε KO με πλήρη ζωή, επιβιώνει εγγυημένα στο 1 HP.",
      role: "Lead Wallbreaker & Revenge Killer",
      strategy: "Εγγυημένη επιβίωση 1 HP με Focus Sash απέναντι σε Choice Scarf Ice/Dragon leads. Swords Dance στο turn 1 ή άμεσο Earthquake / Outrage για 1-2 άμεσα KO.",
      img: "./assets/garchomp.png",
      icon: "./assets/garchomp_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 169 Speed στο Lv. 50 (ξεπερνά όλα τα base 100 Pokémon).",
      evStats: [
        { name: "HP", ev: 4, stat: 184, boost: "" },
        { name: "Attack", ev: 252, stat: 182, boost: "" },
        { name: "Defense", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 90, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 105, boost: "" },
        { name: "Speed", ev: 252, stat: 169, boost: "boost" }
      ],
      moves: [
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Ισχυρό physical STAB. Χτυπάει όλους τους αντιπάλους σε Doubles (διπλή ζημιά σε Dig).", learn: "TM26 (Wayward Cave)", method: "TM26" },
        { name: "Outrage", type: "DRAGON", pwr: "120", acc: "100%", priority: "0", effect: "Επιτίθεται ανεξέλεγκτα για 2-3 γύρους. Προκαλεί Confusion μετά τη λήξη.", learn: "Egg Move (από Dratini/Charizard)", method: "Egg Move" },
        { name: "Swords Dance", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει το Attack του χρήστη κατά 2 στάδια (+100% ζημιά).", learn: "TM75 (Veilstone Store)", method: "TM75" },
        { name: "Rock Slide", type: "ROCK", pwr: "75", acc: "90%", priority: "0", effect: "Κάλυψη Flying/Ice. 30% πιθανότητα να προκαλέσει Flinch.", learn: "TM80 (Route 207)", method: "TM80" }
      ]
    },

    // 2. SCIZOR
    scizor: {
      id: "scizor",
      name: "Scizor",
      dexNum: "No. 212",
      species: "Pincer Pokémon",
      gender: "♂",
      types: ["BUG", "STEEL"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Technician",
      abilityDesc: "Αυξάνει την ισχύ κινήσεων με Base Power 60 ή λιγότερο κατά 50% (το Bullet Punch από 40 γίνεται 60 BP, 90 με STAB!).",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει τη ζημιά όλων των επιθέσεων κατά 30%, με κόστος το 10% της μέγιστης ζωής του κατόχου σε κάθε επίθεση.",
      role: "Priority Revenge Killer & Sweeper",
      strategy: "Μπαίνει σε Fairy, Ice, Dragon ή Rock κινήσεις. Κάνει Swords Dance και καθαρίζει τα πάντα με +2 Technician boosted Bullet Punch (+1 priority).",
      img: "./assets/scizor.png",
      icon: "./assets/scizor_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 HP / 4 Sp. Def. Μέγιστη physical αντοχή για setup και τεράστιο 200 Attack stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 177, boost: "" },
        { name: "Attack", ev: 252, stat: 200, boost: "boost" },
        { name: "Defense", ev: 0, stat: 120, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 67, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 101, boost: "" },
        { name: "Speed", ev: 0, stat: 85, boost: "" }
      ],
      moves: [
        { name: "Bullet Punch", type: "STEEL", pwr: "40*", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Επιτίθεται πάντα πρώτο! Ενισχύεται από Technician στα 60 BP (90 BP με STAB).", learn: "Move Reminder (Pastoria)", method: "Move Reminder" },
        { name: "X-Scissor", type: "BUG", pwr: "80", acc: "100%", priority: "0", effect: "Κύριο Bug STAB physical χτύπημα (καταστρέφει Dark και Psychic απειλές).", learn: "TM81 (Route 221)", method: "TM81" },
        { name: "Swords Dance", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Εκτοξεύει το Attack του Scizor κατά 2 στάδια (+100%).", learn: "TM75 (Veilstone Store)", method: "TM75" },
        { name: "Roost", type: "FLYING", pwr: "—", acc: "—", priority: "0", effect: "Αναπληρώνει το 50% του μέγιστου HP, αφαιρώντας το κόστος του Life Orb recoil.", learn: "TM51 (Route 210)", method: "TM51" }
      ]
    },

    // 3. SUICUNE
    suicune: {
      id: "suicune",
      name: "Suicune",
      dexNum: "No. 245",
      species: "Aurora Pokémon",
      gender: "—",
      types: ["WATER"],
      nature: "Bold (+Defense, -Attack)",
      ability: "Pressure",
      abilityDesc: "Διπλασιάζει την κατανάλωση PP των αντιπάλων (2 PP ανά κίνηση), εξαντλώντας γρήγορα δυνατές κινήσεις.",
      heldItem: "Leftovers",
      itemDesc: "Αναπληρώνει σταδιακά το 1/16 της μέγιστης ζωής του στο τέλος κάθε γύρου, διασφαλίζοντας τεράστια επιβίωση.",
      role: "Defensive Calm Mind Win-Condition",
      strategy: "Το απόλυτο τείχος. Μετά από 1-2 Calm Mind γίνεται ανίκητο σε Special επιθέσεις. Scald καίει τους Physical attackers και το RestTalk εξαλείφει οποιοδήποτε status.",
      img: "./assets/suicune.png",
      icon: "./assets/suicune_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Atk. Μέγιστο bulk για επιβίωση σε critical hits και ασφαλές Calm Mind setup.",
      evStats: [
        { name: "HP", ev: 252, stat: 207, boost: "" },
        { name: "Attack", ev: 0, stat: 85, boost: "drop" },
        { name: "Defense", ev: 252, stat: 183, boost: "boost" },
        { name: "Sp. Atk", ev: 4, stat: 111, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 135, boost: "" },
        { name: "Speed", ev: 0, stat: 105, boost: "" }
      ],
      moves: [
        { name: "Scald", type: "WATER", pwr: "80", acc: "100%", priority: "0", effect: "30% πιθανότητα να κάψει (Burn) τον αντίπαλο, μειώνοντας το Attack του κατά 50%.", learn: "TM49 (Galactic HQ)", method: "TM49" },
        { name: "Calm Mind", type: "PSYCHIC", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει ταυτόχρονα το Sp. Atk και Sp. Def κατά 1 στάδιο (+50%).", learn: "TM04 (Battle Park)", method: "TM04" },
        { name: "Rest", type: "PSYCHIC", pwr: "—", acc: "—", priority: "0", effect: "Πλήρης αναπλήρωση 100% HP και θεραπεία όλων των status (κοιμάται 2 γύρους).", learn: "TM44 (Veilstone Store)", method: "TM44" },
        { name: "Sleep Talk", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Χρησιμοποιεί τυχαία μία από τις άλλες 3 κινήσεις ενώ ο χρήστης κοιμάται.", learn: "TM82 (Eterna City)", method: "TM82" }
      ]
    },

    // 4. CLOYSTER
    cloyster: {
      id: "cloyster",
      name: "Cloyster",
      dexNum: "No. 091",
      species: "Bivalve Pokémon",
      gender: "♂",
      types: ["WATER", "ICE"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Skill Link",
      abilityDesc: "Όλες οι κινήσεις πολλαπλών χτυπημάτων (Icicle Spear, Rock Blast) χτυπούν εγγυημένα και τις 5 φορές!",
      heldItem: "Focus Sash",
      itemDesc: "Εξασφαλίζει ότι το Cloyster θα επιβιώσει σε 1 HP μετά από Shell Smash απέναντι σε οποιοδήποτε Special attack.",
      role: "Shell Smash Hyper Sweeper",
      strategy: "Turn 1 Shell Smash (+2 Atk, +2 SpAtk, +2 Speed). Χάρη στο Skill Link, το Icicle Spear κάνει 5x25 = 125 STAB BP και σπάει Focus Sashes και Yache Berries.",
      img: "./assets/cloyster.png",
      icon: "./assets/cloyster_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. Στο +2 Speed ξεπερνά όλα τα Pokémon εκτός από Choice Scarf Ninjask.",
      evStats: [
        { name: "HP", ev: 4, stat: 126, boost: "" },
        { name: "Attack", ev: 252, stat: 147, boost: "" },
        { name: "Defense", ev: 0, stat: 200, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 94, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 65, boost: "" },
        { name: "Speed", ev: 252, stat: 134, boost: "boost" }
      ],
      moves: [
        { name: "Shell Smash", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει Atk, SpAtk, Speed κατά +2 στάδια (+100%). Μειώνει Def, SpDef κατά -1.", learn: "Move Reminder (Pastoria)", method: "Move Reminder" },
        { name: "Icicle Spear", type: "ICE", pwr: "25x5", acc: "100%", priority: "0", effect: "💥 Multi-Hit. Χτυπάει εγγυημένα 5 φορές με Skill Link (125 BP συνολικά + STAB).", learn: "Shellder Lv. 16 Level-Up", method: "Level-Up" },
        { name: "Rock Blast", type: "ROCK", pwr: "25x5", acc: "90%", priority: "0", effect: "💥 Multi-Hit. Κάλυψη Rock. Χτυπάει 5 φορές (125 BP) καταστρέφοντας Fire & Water/Ice.", learn: "Egg Move (από Omanyte, Corsola)", method: "Egg Move" },
        { name: "Ice Shard", type: "ICE", pwr: "40", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Τελειώνει αντιπάλους με Focus Sash ή ταχύτερα Dragon/Flying.", learn: "Shellder Lv. 24 Level-Up", method: "Level-Up" }
      ]
    },

    // 5. TOGEKISS
    togekiss: {
      id: "togekiss",
      name: "Togekiss",
      dexNum: "No. 468",
      species: "Jubilee Pokémon",
      gender: "♀",
      types: ["FAIRY", "FLYING"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Serene Grace",
      abilityDesc: "Διπλασιάζει τις πιθανότητες των δευτερευόντων εφέ: το Air Slash αποκτά 60% Flinch rate!",
      heldItem: "Leftovers",
      itemDesc: "Αναπληρώνει σταδιακά το 1/16 της μέγιστης ζωής του στο τέλος κάθε γύρου, συντηρώντας το bulk του.",
      role: "Speed Control Disruptor & ParaFlinch",
      strategy: "Ασυλία σε Dragon και Ground. Ρίχνει Thunder Wave (-75% Speed) και σπαμάρει Air Slash (60% Flinch). Ο αντίπαλος έχει μόνο ~30% πιθανότητα να κινηθεί!",
      img: "./assets/togekiss.png",
      icon: "./assets/togekiss_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Speed / 4 Sp. Atk. Μέγιστη ταχύτητα για Thunder Wave, μέγιστο HP για recovery με Leftovers.",
      evStats: [
        { name: "HP", ev: 252, stat: 192, boost: "" },
        { name: "Attack", ev: 0, stat: 63, boost: "drop" },
        { name: "Defense", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Atk", ev: 4, stat: 141, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 135, boost: "" },
        { name: "Speed", ev: 252, stat: 145, boost: "boost" }
      ],
      moves: [
        { name: "Air Slash", type: "FLYING", pwr: "75", acc: "95%", priority: "0", effect: "🎯 Serene Grace: 60% Flinch chance! Ο αντίπαλος χάνει τη σειρά του.", learn: "Move Reminder (Pastoria)", method: "Move Reminder" },
        { name: "Thunder Wave", type: "ELECTRIC", pwr: "—", acc: "90%", priority: "0", effect: "Παραλύει τον αντίπαλο. Μειώνει την ταχύτητά του κατά 75% και δίνει 25% full paralysis.", learn: "TM73 (Battle Park)", method: "TM73" },
        { name: "Dazzling Gleam", type: "FAIRY", pwr: "80", acc: "100%", priority: "0", effect: "Ισχυρό Fairy STAB Special attack. Χτυπάει και τους δύο αντιπάλους σε Doubles.", learn: "TM99 (Veilstone Store)", method: "TM99" },
        { name: "Roost", type: "FLYING", pwr: "—", acc: "—", priority: "0", effect: "Ανακτά 50% HP. Χάνει προσωρινά τον Flying τύπο για τον τρέχοντα γύρο.", learn: "TM51 (Route 210)", method: "TM51" }
      ]
    },

    // 6. AZUMARILL
    azumarill: {
      id: "azumarill",
      name: "Azumarill",
      dexNum: "No. 184",
      species: "Aqua Rabbit",
      gender: "♀",
      types: ["WATER", "FAIRY"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Huge Power",
      abilityDesc: "Διπλασιάζει το Attack stat του Pokémon στη μάχη (από 112 εκτοξεύεται σε ισοδύναμο 400+ Base Attack μετά το Belly Drum!).",
      heldItem: "Sitrus Berry",
      itemDesc: "Αναπληρώνει άμεσα το 25% του μέγιστου HP όταν η ζωή πέσει στο 50% ή χαμηλότερα (ενεργοποιείται αμέσως μετά το Belly Drum).",
      role: "Belly Drum Priority Sweeper",
      strategy: "Κάνει switch-in σε Dragon/Water/Dark επιθέσεις. Πατάει Belly Drum (θυσιάζει 50% HP για +6 Attack) και το Sitrus Berry το επαναφέρει στο 75% HP. Μετά σαρώνει με Aqua Jet (+1 priority).",
      img: "./assets/azumarill.png",
      icon: "./assets/azumarill_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 244 HP / 252 Attack / 12 Speed. 198 HP στο Lv. 50 (ζυγός αριθμός ώστε το Belly Drum στο 50% να ενεργοποιεί ακριβώς το Sitrus Berry!).",
      evStats: [
        { name: "HP", ev: 244, stat: 198, boost: "" },
        { name: "Attack", ev: 252, stat: 112, boost: "boost" },
        { name: "Defense", ev: 0, stat: 100, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 72, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 100, boost: "" },
        { name: "Speed", ev: 12, stat: 72, boost: "" }
      ],
      moves: [
        { name: "Aqua Jet", type: "WATER", pwr: "40", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Επιτίθεται πρώτο! Μετά από Belly Drum + Huge Power κάνει OHKO σχεδόν τα πάντα.", learn: "Egg Move (από Floatzel/Marill)", method: "Egg Move" },
        { name: "Play Rough", type: "FAIRY", pwr: "90", acc: "90%", priority: "0", effect: "Κύριο Fairy physical STAB. 10% πιθανότητα να μειώσει το Attack του στόχου κατά 1.", learn: "Level-Up Lv. 25", method: "Level-Up" },
        { name: "Belly Drum", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Θυσιάζει το 50% HP για να μεγιστοποιήσει το Attack στο +6 (+300% έξτρα ζημιά!).", learn: "Egg Move (από Poliwhirl/Snorlax)", method: "Egg Move" },
        { name: "Superpower", type: "FIGHTING", pwr: "120", acc: "100%", priority: "0", effect: "Κάλυψη Fighting για Steel/Normal τείχη. Μειώνει Atk/Def κατά 1.", learn: "Move Reminder (Pastoria)", method: "Move Reminder" }
      ]
    },

    // 7. GENGAR
    gengar: {
      id: "gengar",
      name: "Gengar",
      dexNum: "No. 094",
      species: "Shadow Pokémon",
      gender: "♂",
      types: ["GHOST", "POISON"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Cursed Body",
      abilityDesc: "30% πιθανότητα να απενεργοποιήσει (Disable) την κίνηση του αντιπάλου όταν δέχεται χτύπημα.",
      heldItem: "Focus Sash",
      itemDesc: "Εξασφαλίζει επιβίωση 1 HP από ισχυρά Dark/Psychic/Ghost attacks για να εκτελέσει Destiny Bond ή Sludge Bomb.",
      role: "Special Sweeper & Destiny Bond Stopper",
      strategy: "Ταχύτατος special attacker. Χρησιμοποιεί Shadow Ball / Sludge Bomb, και όταν πέσει στο 1 HP πατάει Destiny Bond παίρνοντας μαζί του τον επικίνδυνο αντίπαλο.",
      img: "./assets/gengar.png",
      icon: "./assets/gengar_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 178 Speed στο Lv. 50, ξεπερνάει Latios, Garchomp και Terrakion.",
      evStats: [
        { name: "HP", ev: 4, stat: 136, boost: "" },
        { name: "Attack", ev: 0, stat: 76, boost: "drop" },
        { name: "Defense", ev: 0, stat: 80, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 182, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 95, boost: "" },
        { name: "Speed", ev: 252, stat: 178, boost: "boost" }
      ],
      moves: [
        { name: "Shadow Ball", type: "GHOST", pwr: "80", acc: "100%", priority: "0", effect: "Κύριο Ghost STAB. 20% πιθανότητα να μειώσει το Sp. Def του αντιπάλου κατά 1.", learn: "TM30 (Celestic Town)", method: "TM30" },
        { name: "Sludge Bomb", type: "POISON", pwr: "90", acc: "100%", priority: "0", effect: "Ισχυρό Poison STAB. 30% πιθανότητα να δηλητηριάσει (Poison) τον αντίπαλο.", learn: "TM36 (Galactic HQ)", method: "TM36" },
        { name: "Destiny Bond", type: "GHOST", pwr: "—", acc: "—", priority: "0", effect: "Αν ο χρήστης βγει KO πριν την επόμενη κίνησή του, ο επιτιθέμενος βγαίνει επίσης άμεσα KO!", learn: "Level-Up Lv. 54", method: "Level-Up" },
        { name: "Focus Blast", type: "FIGHTING", pwr: "120", acc: "70%", priority: "0", effect: "Κάλυψη Fighting για Normal, Dark και Steel αντιπάλους (Tyranitar, Heatran, Blissey).", learn: "TM52 (Veilstone Store)", method: "TM52" }
      ]
    },

    // 8. TYRANITAR
    tyranitar: {
      id: "tyranitar",
      name: "Tyranitar",
      dexNum: "No. 248",
      species: "Armor Pokémon",
      gender: "♂",
      types: ["ROCK", "DARK"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Sand Stream",
      abilityDesc: "Καλεί αυτόματα Αμμοθύελλα (Sandstorm) για 5 γύρους. Ενισχύει το Sp. Def όλων των Rock Pokémon κατά 50%!",
      heldItem: "Choice Band",
      itemDesc: "Αυξάνει το Attack κατά 50%, αλλά κλειδώνει τον κάτοχο στην πρώτη κίνηση που επιλέγει μέχρι να γίνει switch.",
      role: "Sand Weather Wallbreaker",
      strategy: "Μπαίνει και επιβάλλει Sandstorm. Με Choice Band, το Stone Edge και το Crunch διαλύουν οποιοδήποτε defensive wall.",
      img: "./assets/tyranitar.png",
      icon: "./assets/tyranitar_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 HP / 4 Sp. Def. Με Sandstorm SpDef boost φτάνει 220+ effective Special Defense στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 207, boost: "" },
        { name: "Attack", ev: 252, stat: 204, boost: "boost" },
        { name: "Defense", ev: 0, stat: 130, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 103, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 121, boost: "" },
        { name: "Speed", ev: 0, stat: 81, boost: "" }
      ],
      moves: [
        { name: "Stone Edge", type: "ROCK", pwr: "100", acc: "80%", priority: "0", effect: "Υψηλό critical hit ratio (12.5%). Τεράστια physical ζημιά Rock STAB.", learn: "TM71 (Battle Park)", method: "TM71" },
        { name: "Crunch", type: "DARK", pwr: "80", acc: "100%", priority: "0", effect: "Dark STAB. 20% πιθανότητα να μειώσει το Defense του αντιπάλου κατά 1 στάδιο.", learn: "Level-Up Lv. 34", method: "Level-Up" },
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Εξουδετερώνει Steel και Poison Pokémon που προσπαθούν να αντισταθούν στο Stone Edge.", learn: "TM26 (Wayward Cave)", method: "TM26" },
        { name: "Fire Punch", type: "FIRE", pwr: "75", acc: "100%", priority: "0", effect: "Κάλυψη Fire. 10% πιθανότητα Burn. Διαλύει 4x Fire-weak Scizor και Ferrothorn.", learn: "Move Tutor", method: "Move Tutor" }
      ]
    },

    // 9. LATIOS
    latios: {
      id: "latios",
      name: "Latios",
      dexNum: "No. 381",
      species: "Eon Pokémon",
      gender: "♂",
      types: ["DRAGON", "PSYCHIC"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Levitate",
      abilityDesc: "Πλήρης ασυλία σε όλες τις επιθέσεις τύπου Ground (Earthquake, Earth Power) και hazards.",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλες τις επιθέσεις κατά 30% με κόστος 10% recoil HP.",
      role: "High-Speed Special Nuker",
      strategy: "Ταχύτατος Dragon/Psychic sweeper (110 Base Speed). Εκτοξεύει STAB Draco Meteor διαλύοντας leads, ενώ το Levitate προσφέρει safe switch σε Ground κινήσεις.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/381.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/381.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 Sp. Def. 178 Speed στο Lv. 50, speed-tie με Gengar και outspeed Garchomp.",
      evStats: [
        { name: "HP", ev: 0, stat: 155, boost: "" },
        { name: "Attack", ev: 0, stat: 99, boost: "drop" },
        { name: "Defense", ev: 4, stat: 101, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 182, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 130, boost: "" },
        { name: "Speed", ev: 252, stat: 178, boost: "boost" }
      ],
      moves: [
        { name: "Draco Meteor", type: "DRAGON", pwr: "130", acc: "90%", priority: "0", effect: "Καταστροφικό Dragon STAB. Μειώνει το Sp. Atk του χρήστη κατά 2 στάδια μετά τη χρήση.", learn: "Move Tutor (Granny Wilma)", method: "Move Tutor" },
        { name: "Psychic", type: "PSYCHIC", pwr: "90", acc: "100%", priority: "0", effect: "Κύριο Psychic STAB. 10% πιθανότητα να μειώσει το Sp. Def του αντιπάλου κατά 1.", learn: "TM29 (Veilstone Store)", method: "TM29" },
        { name: "Thunderbolt", type: "ELECTRIC", pwr: "90", acc: "100%", priority: "0", effect: "Κάλυψη Electric για Water και Flying απειλές. 10% πιθανότητα παράλυσης.", learn: "TM24 (Valley Windworks)", method: "TM24" },
        { name: "Surf", type: "WATER", pwr: "90", acc: "100%", priority: "0", effect: "Κάλυψη Water για Fire, Ground και Rock Pokémon (Heatran, Tyranitar).", learn: "HM03 (Celestic Town)", method: "HM03" }
      ]
    },

    // 10. HEATRAN
    heatran: {
      id: "heatran",
      name: "Heatran",
      dexNum: "No. 485",
      species: "Lava Dome Pokémon",
      gender: "♂",
      types: ["FIRE", "STEEL"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Flash Fire",
      abilityDesc: "Ασυλία σε Fire επιθέσεις. Αν δεχθεί Fire move, απορροφά τη ζημιά και ενισχύει τις Fire κινήσεις του κατά 50%!",
      heldItem: "Air Balloon",
      itemDesc: "Δίνει προσωρινή ασυλία σε Ground επιθέσεις (Earthquake). Σκάει όταν ο κάτοχος δεχθεί οποιαδήποτε άλλη άμεση επίθεση.",
      role: "Steel/Fire Pivot & Special Tank",
      strategy: "Απίστευτο αμυντικό typing με 9 resistances και 2 immunities. Με Air Balloon ακυρώνει την 4x Ground αδυναμία του και διαλύει με Magma Storm / Earth Power.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/485.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/485.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Speed. Τεράστια φυσική αντοχή και 200 SpAtk stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 198, boost: "" },
        { name: "Attack", ev: 0, stat: 99, boost: "drop" },
        { name: "Defense", ev: 0, stat: 126, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 200, boost: "boost" },
        { name: "Sp. Def", ev: 4, stat: 127, boost: "" },
        { name: "Speed", ev: 0, stat: 97, boost: "" }
      ],
      moves: [
        { name: "Heat Wave", type: "FIRE", pwr: "95", acc: "90%", priority: "0", effect: "Ισχυρό Fire STAB. Χτυπάει και τους δύο αντιπάλους σε Doubles (10% Burn).", learn: "Level-Up Lv. 65", method: "Level-Up" },
        { name: "Flash Cannon", type: "STEEL", pwr: "80", acc: "100%", priority: "0", effect: "Steel STAB. 10% πιθανότητα να μειώσει το Sp. Def του αντιπάλου κατά 1.", learn: "TM91 (Iron Island)", method: "TM91" },
        { name: "Earth Power", type: "GROUND", pwr: "90", acc: "100%", priority: "0", effect: "Κάλυψη Ground για αντίπαλα Heatran, Fire, Rock και Electric Pokémon.", learn: "Level-Up Lv. 49", method: "Level-Up" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Ακυρώνει όλες τις επιθέσεις του αντιπάλου για τον γύρο.", learn: "TM17 (Veilstone Store)", method: "TM17" }
      ]
    },

    // 11. BLISSEY
    blissey: {
      id: "blissey",
      name: "Blissey",
      dexNum: "No. 242",
      species: "Happiness Pokémon",
      gender: "♀",
      types: ["NORMAL"],
      nature: "Bold (+Defense, -Attack)",
      ability: "Natural Cure",
      abilityDesc: "Θεραπεύει αυτόματα όλα τα status conditions (Toxic, Burn, Paralysis) μόλις κάνει switch-out!",
      heldItem: "Leftovers",
      itemDesc: "Ανακτά 1/16 HP σε κάθε γύρο, προσφέροντας τεράστια αντοχή σε συνδυασμό με το αστρονομικό 330+ HP.",
      role: "Special Wall & Status Sponge",
      strategy: "Το υπέρτατο Special τείχος. Με Soft-Boiled και Seismic Toss (σταθερή 50 ζημιά στο Lv. 50), απορροφά οποιαδήποτε Special επίθεση χωρίς να χάνει ζωή.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/242.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/242.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def. Μέγιστη επένδυση σε Defense για επιβίωση σε physical επιθέσεις.",
      evStats: [
        { name: "HP", ev: 252, stat: 362, boost: "" },
        { name: "Attack", ev: 0, stat: 18, boost: "drop" },
        { name: "Defense", ev: 252, stat: 68, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 95, boost: "" },
        { name: "Sp. Def", ev: 4, stat: 156, boost: "" },
        { name: "Speed", ev: 0, stat: 75, boost: "" }
      ],
      moves: [
        { name: "Soft-Boiled", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αναπληρώνει άμεσα το 50% του τεράστιου HP της Blissey.", learn: "Level-Up Lv. 44", method: "Level-Up" },
        { name: "Toxic", type: "POISON", pwr: "—", acc: "90%", priority: "0", effect: "Προκαλεί Badly Poisoned status, αυξάνοντας τη ζημιά που δέχεται ο αντίπαλος κάθε γύρο.", learn: "TM06 (Route 212)", method: "TM06" },
        { name: "Seismic Toss", type: "FIGHTING", pwr: "—", acc: "100%", priority: "0", effect: "Προκαλεί σταθερή ζημιά ίση με το Level του χρήστη (50 HP damage στο Lv. 50).", learn: "Egg Move / Move Reminder", method: "Egg Move" },
        { name: "Thunder Wave", type: "ELECTRIC", pwr: "—", acc: "90%", priority: "0", effect: "Παραλύει τον αντίπαλο και μειώνει το Speed του κατά 75%.", learn: "TM73", method: "TM73" }
      ]
    },

    // 12. GLISCOR
    gliscor: {
      id: "gliscor",
      name: "Gliscor",
      dexNum: "No. 472",
      species: "Fang Scorp",
      gender: "♂",
      types: ["GROUND", "FLYING"],
      nature: "Impish (+Defense, -Sp. Atk)",
      ability: "Poison Heal",
      abilityDesc: "Αν δηλητηριαστεί (Poison), αντί να χάνει ζωή, αναπληρώνει το 1/8 (12.5%) του μέγιστου HP του στο τέλος κάθε γύρου!",
      heldItem: "Toxic Orb",
      itemDesc: "Δηλητηριάζει αυτόματα τον κάτοχο στο τέλος του 1ου γύρου, ενεργοποιώντας το Poison Heal και κάνοντάς τον άτρωτο σε Sleep/Freeze/Paralysis.",
      role: "Physical Wall & Toxic Stall Fortress",
      strategy: "Ενεργοποιεί Poison Heal με Toxic Orb. Εναλλάσσει Protect και Substitute, ανακτώντας όλη τη ζωή πίσω, ενώ ο αντίπαλος λιώνει από Toxic chip damage.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/472.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/472.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 244 HP / 252 Defense / 12 Speed. Εξαιρετική physical αντοχή και immunity σε Electric και Ground.",
      evStats: [
        { name: "HP", ev: 244, stat: 181, boost: "" },
        { name: "Attack", ev: 0, stat: 115, boost: "" },
        { name: "Defense", ev: 252, stat: 194, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 58, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 95, boost: "" },
        { name: "Speed", ev: 12, stat: 117, boost: "" }
      ],
      moves: [
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Κύριο Ground STAB attack. Αξιόπιστη physical ζημιά.", learn: "TM26", method: "TM26" },
        { name: "Toxic", type: "POISON", pwr: "—", acc: "90%", priority: "0", effect: "Δηλητηριάζει βαριά τον στόχο εξασφαλίζοντας σταδιακό KO.", learn: "TM06", method: "TM06" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Παίρνει έναν ελεύθερο γύρο αναπλήρωσης 12.5% HP με Poison Heal.", learn: "TM17", method: "TM17" },
        { name: "Substitute", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Δημιουργεί ομοίωμα με 25% HP, το οποίο αναπληρώνει σε 2 γύρους με Poison Heal.", learn: "TM90", method: "TM90" }
      ]
    },

    // 13. PELIPPER
    pelipper: {
      id: "pelipper",
      name: "Pelipper",
      dexNum: "No. 279",
      species: "Water Bird",
      gender: "♂",
      types: ["WATER", "FLYING"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Drizzle",
      abilityDesc: "Καλεί αυτόματα Βροχή (Rain) για 5 γύρους μόλις μπει στη μάχη. Ενισχύει τις Water επιθέσεις κατά 50% και κάνει το Hurricane 100% ακριβές.",
      heldItem: "Focus Sash",
      itemDesc: "Εξασφαλίζει επιβίωση 1 HP από 4x Electric επιθέσεις για να θέσει Tailwind ή Hydro Pump.",
      role: "Drizzle Weather Setter & Tailwind Support",
      strategy: "Lead σε Rain teams. Ενεργοποιεί Drizzle για Swift Swim partners. Χρησιμοποιεί Tailwind (διπλασιασμός Speed) και 100% accurate Hurricane.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/279.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/279.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Speed. Μέγιστη ζημιά με STAB Hydro Pump/Hurricane στη βροχή.",
      evStats: [
        { name: "HP", ev: 252, stat: 167, boost: "" },
        { name: "Attack", ev: 0, stat: 58, boost: "drop" },
        { name: "Defense", ev: 0, stat: 120, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 161, boost: "boost" },
        { name: "Sp. Def", ev: 4, stat: 91, boost: "" },
        { name: "Speed", ev: 0, stat: 85, boost: "" }
      ],
      moves: [
        { name: "Hurricane", type: "FLYING", pwr: "110", acc: "100%*", priority: "0", effect: "Ισχυρό Flying STAB. Στη βροχή έχει 100% ακρίβεια. 30% πιθανότητα Confusion.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Hydro Pump", type: "WATER", pwr: "110", acc: "80%", priority: "0", effect: "Τεράστια Water ζημιά ενισχυμένη κατά 50% από Drizzle στη βροχή.", learn: "Level-Up Lv. 55", method: "Level-Up" },
        { name: "Tailwind", type: "FLYING", pwr: "—", acc: "—", priority: "0", effect: "Διπλασιάζει την ταχύτητα όλων των μελών της ομάδας για 4 γύρους.", learn: "Egg Move", method: "Egg Move" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστατεύει πλήρως από επιθέσεις για 1 γύρο.", learn: "TM17", method: "TM17" }
      ]
    },

    // 14. KINGDRA
    kingdra: {
      id: "kingdra",
      name: "Kingdra",
      dexNum: "No. 230",
      species: "Dragon Pokémon",
      gender: "♀",
      types: ["WATER", "DRAGON"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Swift Swim",
      abilityDesc: "Διπλασιάζει την ταχύτητα (Speed x2.0) όταν βρέχει, φτάνοντας εξωφρενικά 274 Speed στο Lv. 50!",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλη τη ζημιά κατά 30% με 10% recoil HP.",
      role: "Swift Swim Rain Sweeper",
      strategy: "Στη βροχή είναι το ταχύτερο Pokémon στο πεδίο. Muddy Water χτυπάει και τους δύο αντιπάλους μειώνοντας την ακρίβειά τους, και Draco Meteor εξολοθρεύει απειλές.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/230.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/230.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. Στη βροχή φτάνει 274 Speed στο Lv. 50, ξεπερνώντας τα πάντα.",
      evStats: [
        { name: "HP", ev: 4, stat: 151, boost: "" },
        { name: "Attack", ev: 0, stat: 103, boost: "drop" },
        { name: "Defense", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 161, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 115, boost: "" },
        { name: "Speed", ev: 252, stat: 137, boost: "" }
      ],
      moves: [
        { name: "Muddy Water", type: "WATER", pwr: "90", acc: "85%", priority: "0", effect: "Χτυπάει και τους δύο αντιπάλους. 30% πιθανότητα να μειώσει την ακρίβεια κατά 1.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Draco Meteor", type: "DRAGON", pwr: "130", acc: "90%", priority: "0", effect: "Καταστροφικό Dragon STAB nuke. Μειώνει το Sp. Atk κατά 2 στάδια.", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Hydro Pump", type: "WATER", pwr: "110", acc: "80%", priority: "0", effect: "Single-target Water nuking attack με μέγιστη ισχύ υπό βροχή.", learn: "Level-Up Lv. 52", method: "Level-Up" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Αποτρέπει ζημιά για να επιβιώσει σε targeted attacks.", learn: "TM17", method: "TM17" }
      ]
    },

    // 15. RAIKOU
    raikou: {
      id: "raikou",
      name: "Raikou",
      dexNum: "No. 243",
      species: "Thunder Pokémon",
      gender: "—",
      types: ["ELECTRIC"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Inner Focus",
      abilityDesc: "Αποτρέπει το Flinch! Πλήρης ασυλία σε Fake Out στο Doubles, εξασφαλίζοντας άμεση επίθεση στον 1ο γύρο.",
      heldItem: "Choice Specs",
      itemDesc: "Αυξάνει το Sp. Atk κατά 50%, κλειδώνοντας την πρώτη επιλεγμένη κίνηση.",
      role: "Rain Thunder Abuser & Fake Out Immune Pivot",
      strategy: "Στη βροχή το Thunder δεν χάνει ποτέ (100% accuracy). Με Choice Specs και Inner Focus, αγνοεί το Fake Out των αντιπάλων και διαλύει με 110 BP Thunder.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/243.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/243.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 183 Speed στο Lv. 50, ταχύτερο από Garchomp και Latios.",
      evStats: [
        { name: "HP", ev: 4, stat: 166, boost: "" },
        { name: "Attack", ev: 0, stat: 94, boost: "drop" },
        { name: "Defense", ev: 0, stat: 95, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 167, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 120, boost: "" },
        { name: "Speed", ev: 252, stat: 183, boost: "boost" }
      ],
      moves: [
        { name: "Thunder", type: "ELECTRIC", pwr: "110", acc: "100%*", priority: "0", effect: "💥 100% ακρίβεια στη βροχή. 30% πιθανότητα παράλυσης. Τεράστια Specs ζημιά.", learn: "TM25", method: "TM25" },
        { name: "Volt Switch", type: "ELECTRIC", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει switch-out, κρατώντας ασφαλές momentum.", learn: "TM89", method: "TM89" },
        { name: "Scald", type: "WATER", pwr: "80", acc: "100%", priority: "0", effect: "Water κάλυψη για Ground Pokémon. Ενισχύεται κατά 50% στη βροχή (30% Burn).", learn: "TM49", method: "TM49" },
        { name: "Aura Sphere", type: "FIGHTING", pwr: "80", acc: "—", priority: "0", effect: "Δεν χάνει ποτέ. Εξουδετερώνει Tyranitar και Magnezone.", learn: "Level-Up Lv. 78", method: "Level-Up" }
      ]
    },

    // 16. CRESSELIA
    cresselia: {
      id: "cresselia",
      name: "Cresselia",
      dexNum: "No. 488",
      species: "Lunar Pokémon",
      gender: "♀",
      types: ["PSYCHIC"],
      nature: "Sassy (+Sp. Def, -Speed)",
      ability: "Levitate",
      abilityDesc: "Ασυλία σε Ground επιθέσεις (επιτρέπει στον partner να σπαμάρει Earthquake χωρίς κίνδυνο).",
      heldItem: "Mental Herb",
      itemDesc: "Θεραπεύει αυτόματα Taunt, Encore ή Torment, εγγυώμενο ότι το Trick Room θα εκτελεστεί απρόσκοπτα.",
      role: "Trick Room Setter & Support Anchor",
      strategy: "Το πιο ανθεκτικό Trick Room setter στο παιχνίδι. Απορροφά Taunt με Mental Herb, βάζει Trick Room (Priority -7) και ενισχύει τον partner με Helping Hand (+5 priority).",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/488.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/488.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def (0 Speed IV). Μέγιστη αντοχή και ελάχιστη ταχύτητα για να κινείται πρώτη στο Trick Room.",
      evStats: [
        { name: "HP", ev: 252, stat: 227, boost: "" },
        { name: "Attack", ev: 0, stat: 81, boost: "" },
        { name: "Defense", ev: 252, stat: 172, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 95, boost: "" },
        { name: "Sp. Def", ev: 4, stat: 166, boost: "boost" },
        { name: "Speed", ev: 0, stat: 81, boost: "drop" }
      ],
      moves: [
        { name: "Trick Room", type: "PSYCHIC", pwr: "—", acc: "—", priority: "-7", effect: "🔄 Αντιστρέφει τη σειρά ταχύτητας για 5 γύρους: τα πιο αργά Pokémon κινούνται πρώτα!", learn: "TM92", method: "TM92" },
        { name: "Helping Hand", type: "NORMAL", pwr: "—", acc: "—", priority: "+5", effect: "⚡ Priority +5. Ενισχύει την επίθεση του συμπαίκτη κατά 50% για τον τρέχοντα γύρο.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Moonblast", type: "FAIRY", pwr: "95", acc: "100%", priority: "0", effect: "Κάλυψη Fairy για Dark και Fighting. 30% πιθανότητα μείωσης Sp. Atk.", learn: "Level-Up Lv. 72", method: "Level-Up" },
        { name: "Lunar Blessing", type: "PSYCHIC", pwr: "—", acc: "—", priority: "0", effect: "Αναπληρώνει 25% HP και θεραπεύει όλα τα status conditions για χρήστη και σύμμαχο.", learn: "Signature Move", method: "Level-Up" }
      ]
    },

    // 17. TORKOAL
    torkoal: {
      id: "torkoal",
      name: "Torkoal",
      dexNum: "No. 324",
      species: "Coal Pokémon",
      gender: "♂",
      types: ["FIRE"],
      nature: "Quiet (+Sp. Atk, -Speed)",
      ability: "Drought",
      abilityDesc: "Καλεί αυτόματα Ήλιο (Sun) για 5 γύρους μόλις μπει στο πεδίο. Ενισχύει τις Fire κινήσεις κατά 50% και αποδυναμώνει τις Water κατά 50%.",
      heldItem: "Charcoal",
      itemDesc: "Αυξάνει την ισχύ των Fire επιθέσεων κατά 20% χωρίς κανένα drawback.",
      role: "Trick Room Eruption Sweeper",
      strategy: "Στο Trick Room με 20 Base Speed κινείται πρώτος από σχεδόν όλα τα Pokémon. Σε πλήρη ζωή εξαπολύει STAB Eruption 150 Base Power ενισχυμένο από Drought για διπλά OHKO.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/324.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/324.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Defense (0 Speed IV). Μέγιστη ζημιά με Eruption σε Trick Room.",
      evStats: [
        { name: "HP", ev: 252, stat: 177, boost: "" },
        { name: "Attack", ev: 0, stat: 94, boost: "" },
        { name: "Defense", ev: 4, stat: 161, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 150, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 90, boost: "" },
        { name: "Speed", ev: 0, stat: 22, boost: "drop" }
      ],
      moves: [
        { name: "Eruption", type: "FIRE", pwr: "150*", acc: "100%", priority: "0", effect: "💥 Μέγιστη ισχύς (150 BP) σε πλήρη ζωή. Χτυπάει και τους δύο αντιπάλους υπό ήλιο.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Heat Wave", type: "FIRE", pwr: "95", acc: "90%", priority: "0", effect: "Δευτερεύον Fire spread attack αν η ζωή του Torkoal έχει μειωθεί.", learn: "Level-Up Lv. 40", method: "Level-Up" },
        { name: "Solar Beam", type: "GRASS", pwr: "120", acc: "100%", priority: "0", effect: "Υπό ήλιο χτυπάει σε 1 γύρο χωρίς φόρτιση! Εξολοθρεύει Water και Rock.", learn: "TM22", method: "TM22" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστατεύει το HP για να διατηρήσει την ισχύ του Eruption.", learn: "TM17", method: "TM17" }
      ]
    },

    // 18. SNORLAX
    snorlax: {
      id: "snorlax",
      name: "Snorlax",
      dexNum: "No. 143",
      species: "Sleeping Pokémon",
      gender: "♂",
      types: ["NORMAL"],
      nature: "Brave (+Attack, -Speed)",
      ability: "Gluttony",
      abilityDesc: "Καταναλώνει Pinch Berries στο 50% HP αντί για το 25%, ενεργοποιώντας άμεσα το Figy Berry μετά το Belly Drum!",
      heldItem: "Figy Berry",
      itemDesc: "Αναπληρώνει το 33% HP όταν η ζωή πέσει στο 50% με Gluttony.",
      role: "Belly Drum Trick Room Demolisher",
      strategy: "Στο Trick Room εκτελεί Belly Drum στα 244 HP (ζυγός αριθμός) και το Figy Berry το επαναφέρει αμέσως. Μετά σαρώνει με +6 Body Slam και High Horsepower.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/143.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 68 HP / 196 Attack / 244 Defense (0 Speed IV). 244 HP ακριβώς για άμεση ενεργοποίηση Figy Berry.",
      evStats: [
        { name: "HP", ev: 68, stat: 244, boost: "" },
        { name: "Attack", ev: 196, stat: 170, boost: "boost" },
        { name: "Defense", ev: 244, stat: 116, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 76, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 130, boost: "" },
        { name: "Speed", ev: 0, stat: 31, boost: "drop" }
      ],
      moves: [
        { name: "Belly Drum", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Θυσιάζει 50% HP για μέγιστο +6 Attack (+300% έξτρα physical ζημιά!).", learn: "Egg Move", method: "Egg Move" },
        { name: "Body Slam", type: "NORMAL", pwr: "85", acc: "100%", priority: "0", effect: "Normal STAB nuke στο +6 Attack. 30% πιθανότητα παράλυσης.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "High Horsepower", type: "GROUND", pwr: "95", acc: "95%", priority: "0", effect: "Single-target Ground χτύπημα (δεν χτυπάει τον partner). Εξουδετερώνει Steel/Rock.", learn: "TM / Move Tutor", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστατεύει κατά τους γύρους τοποθέτησης Trick Room.", learn: "TM17", method: "TM17" }
      ]
    },

    // 19. ZAPDOS
    zapdos: {
      id: "zapdos",
      name: "Zapdos",
      dexNum: "No. 145",
      species: "Electric Pokémon",
      gender: "—",
      types: ["ELECTRIC", "FLYING"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Static",
      abilityDesc: "30% πιθανότητα να παραλύσει τον αντίπαλο όταν δέχεται physical χτύπημα επαφής.",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλη τη ζημιά κατά 30% με 10% recoil HP.",
      role: "Tailwind Speed Controller & Spread Attacker",
      strategy: "Ανοίγει με Tailwind (διπλασιασμός Speed για 4 γύρους). Χτυπάει με Thunderbolt και Heat Wave, ενώ ο Garchomp εκτελεί Earthquake χωρίς να τον βλάπτει (Flying immunity).",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/145.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 167 Speed στο Lv. 50 (334 υπό Tailwind!).",
      evStats: [
        { name: "HP", ev: 4, stat: 166, boost: "" },
        { name: "Attack", ev: 0, stat: 99, boost: "drop" },
        { name: "Defense", ev: 0, stat: 105, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 177, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 110, boost: "" },
        { name: "Speed", ev: 252, stat: 167, boost: "boost" }
      ],
      moves: [
        { name: "Thunderbolt", type: "ELECTRIC", pwr: "90", acc: "100%", priority: "0", effect: "Κύριο Electric STAB. 10% πιθανότητα παράλυσης.", learn: "TM24", method: "TM24" },
        { name: "Heat Wave", type: "FIRE", pwr: "95", acc: "90%", priority: "0", effect: "Spread Fire επίθεση. Χτυπάει και τους δύο αντιπάλους (10% Burn).", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Tailwind", type: "FLYING", pwr: "—", acc: "—", priority: "0", effect: "🌪️ Διπλασιάζει την ταχύτητα της ομάδας για 4 γύρους.", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Roost", type: "FLYING", pwr: "—", acc: "—", priority: "0", effect: "Αναπληρώνει 50% HP, εξαλείφοντας το Life Orb recoil.", learn: "TM51", method: "TM51" }
      ]
    },

    // 20. ARCANINE
    arcanine: {
      id: "arcanine",
      name: "Arcanine",
      dexNum: "No. 059",
      species: "Legendary Pokémon",
      gender: "♂",
      types: ["FIRE"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Intimidate",
      abilityDesc: "Μειώνει το Attack όλων των αντιπάλων κατά 1 στάδιο (-33% damage) κατά την είσοδο στο πεδίο.",
      heldItem: "Safety Goggles",
      itemDesc: "Ασυλία σε Spore, Sleep Powder, Rage Powder και sandstorm damage.",
      role: "Intimidate Pivot & Snarl Supporter",
      strategy: "Εξουδετερώνει physical απειλές με Intimidate και Will-O-Wisp (50% physical reduction) και special attackers με Snarl (-1 SpAtk σε όλους).",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/59.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Speed / 4 Defense. 161 Speed στο Lv. 50 για γρήγορο Will-O-Wisp / Snarl.",
      evStats: [
        { name: "HP", ev: 252, stat: 197, boost: "" },
        { name: "Attack", ev: 0, stat: 130, boost: "" },
        { name: "Defense", ev: 4, stat: 101, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 108, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 100, boost: "" },
        { name: "Speed", ev: 252, stat: 161, boost: "boost" }
      ],
      moves: [
        { name: "Flare Blitz", type: "FIRE", pwr: "120", acc: "100%", priority: "0", effect: "Ισχυρό Fire physical STAB. 33% recoil damage.", learn: "Level-Up", method: "Level-Up" },
        { name: "Snarl", type: "DARK", pwr: "55", acc: "95%", priority: "0", effect: "Χτυπάει και τους δύο αντιπάλους και μειώνει το Sp. Atk τους κατά 1 στάδιο 100%!", learn: "TM / Move Reminder", method: "TM" },
        { name: "Will-O-Wisp", type: "FIRE", pwr: "—", acc: "85%", priority: "0", effect: "Καίει τον στόχο (Burn), μειώνοντας το Attack του κατά 50% μόνιμα.", learn: "TM61", method: "TM61" },
        { name: "Extreme Speed", type: "NORMAL", pwr: "80", acc: "100%", priority: "+2", effect: "⚡ Priority +2! Επιτίθεται πριν από κανονικά priority moves (+1).", learn: "Level-Up Lv. 1", method: "Level-Up" }
      ]
    },

    // 21. GYARADOS
    gyarados: {
      id: "gyarados",
      name: "Gyarados",
      dexNum: "No. 130",
      species: "Atrocious Pokémon",
      gender: "♂",
      types: ["WATER", "FLYING"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Intimidate",
      abilityDesc: "Μειώνει το Attack όλων των αντιπάλων κατά 1 στάδιο κατά την είσοδο.",
      heldItem: "Wacan Berry",
      itemDesc: "Μειώνει τη ζημιά από 4x Electric επιθέσεις στο μισό, επιτρέποντας ασφαλές Dragon Dance setup.",
      role: "Intimidate Dragon Dance Sweeper",
      strategy: "Συνδυάζεται με Arcanine για διπλό Intimidate κύκλο. Μετά από ένα Dragon Dance (+1 Atk, +1 Speed) καθαρίζει με Waterfall και Bounce.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/130.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 133 Speed στο Lv. 50 (200 Speed μετά από Dragon Dance).",
      evStats: [
        { name: "HP", ev: 4, stat: 171, boost: "" },
        { name: "Attack", ev: 252, stat: 194, boost: "boost" },
        { name: "Defense", ev: 0, stat: 99, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 72, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 120, boost: "" },
        { name: "Speed", ev: 252, stat: 133, boost: "" }
      ],
      moves: [
        { name: "Waterfall", type: "WATER", pwr: "80", acc: "100%", priority: "0", effect: "Physical Water STAB. 20% πιθανότητα Flinch.", learn: "HM07", method: "HM" },
        { name: "Dragon Dance", type: "DRAGON", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει το Attack και το Speed κατά +1 στάδιο (+50%).", learn: "Level-Up Lv. 36", method: "Level-Up" },
        { name: "Ice Fang", type: "ICE", pwr: "65", acc: "95%", priority: "0", effect: "Κάλυψη Ice για Dragons και Grass (10% Freeze / Flinch).", learn: "Level-Up Lv. 1", method: "Move Reminder" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για scouting και προστασία.", learn: "TM17", method: "TM17" }
      ]
    },

    // 22. METAGROSS
    metagross: {
      id: "metagross",
      name: "Metagross",
      dexNum: "No. 376",
      species: "Iron Leg Pokémon",
      gender: "—",
      types: ["STEEL", "PSYCHIC"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Clear Body",
      abilityDesc: "Αποτρέπει ΟΛΕΣ τις μειώσεις στατιστικών από κινήσεις και ικανότητες των αντιπάλων (πλήρης ασυλία σε Intimidate!).",
      heldItem: "Assault Vest",
      itemDesc: "Αυξάνει το Sp. Def κατά 50%, μετατρέποντας τον Metagross σε πανίσχυρο mixed tank.",
      role: "Intimidate-Immune Tank & Physical Bruiser",
      strategy: "Το Clear Body ακυρώνει τα Intimidates των αντιπάλων. Με Meteor Mash και Bullet Punch (+1 priority) εξολοθρεύει Fairies και Ice Pokémon.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/376.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Attack / 4 Sp. Def. Τεράστιο bulk και 205 Attack stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 187, boost: "" },
        { name: "Attack", ev: 252, stat: 205, boost: "boost" },
        { name: "Defense", ev: 0, stat: 150, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 103, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 111, boost: "" },
        { name: "Speed", ev: 0, stat: 90, boost: "" }
      ],
      moves: [
        { name: "Meteor Mash", type: "STEEL", pwr: "90", acc: "90%", priority: "0", effect: "Steel physical STAB. 20% πιθανότητα να αυξήσει το Attack κατά 1.", learn: "Level-Up Lv. 44", method: "Level-Up" },
        { name: "Bullet Punch", type: "STEEL", pwr: "40", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Τελειώνει εξασθενημένους αντιπάλους πριν κινηθούν.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Zen Headbutt", type: "PSYCHIC", pwr: "80", acc: "90%", priority: "0", effect: "Psychic physical STAB. 20% πιθανότητα Flinch.", learn: "Level-Up Lv. 28", method: "Level-Up" },
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Κάλυψη Ground για αντίπαλα Steel και Fire Pokémon.", learn: "TM26", method: "TM26" }
      ]
    },

    // 23. ROTOM-WASH
    rotom_wash: {
      id: "rotom_wash",
      name: "Rotom (Wash)",
      dexNum: "No. 479-W",
      species: "Plasma Pokémon",
      gender: "—",
      types: ["ELECTRIC", "WATER"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Levitate",
      abilityDesc: "Ασυλία σε Ground κινήσεις (αφαιρεί τη μοναδική αδυναμία του Electric typing!). Μόνο το Grass του κάνει 2x super-effective.",
      heldItem: "Sitrus Berry",
      itemDesc: "Αναπληρώνει άμεσα 25% HP όταν πέσει κάτω από το 50%.",
      role: "VoltTurn Pivot & Disrupter",
      strategy: "Απίστευτο typing με μόνο 1 αδυναμία. Volt Switch προσφέρει momentum, Hydro Pump καθαρίζει Ground/Fire και Will-O-Wisp ακρωτηριάζει physical attackers.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/479-wash.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/479.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Sp. Atk / 4 Speed. Ανθεκτικό pivot με ισχυρή πίεση.",
      evStats: [
        { name: "HP", ev: 252, stat: 157, boost: "" },
        { name: "Attack", ev: 0, stat: 76, boost: "drop" },
        { name: "Defense", ev: 0, stat: 127, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 172, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 127, boost: "" },
        { name: "Speed", ev: 4, stat: 107, boost: "" }
      ],
      moves: [
        { name: "Hydro Pump", type: "WATER", pwr: "110", acc: "80%", priority: "0", effect: "Water STAB. Υψηλή ζημιά σε Fire, Rock και Ground απειλές.", learn: "Forme Change", method: "Special" },
        { name: "Volt Switch", type: "ELECTRIC", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει switch-out, κρατώντας ασφαλές momentum.", learn: "TM89", method: "TM89" },
        { name: "Will-O-Wisp", type: "FIRE", pwr: "—", acc: "85%", priority: "0", effect: "Καίει τον αντίπαλο (Burn), μειώνοντας το Attack του κατά 50%.", learn: "TM61", method: "TM61" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για scouting.", learn: "TM17", method: "TM17" }
      ]
    },

    // 24. FLUTTER MANE
    flutter_mane: {
      id: "flutter_mane",
      name: "Flutter Mane",
      dexNum: "No. 987",
      species: "Paradox Pokémon",
      gender: "—",
      types: ["GHOST", "FAIRY"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Protosynthesis",
      abilityDesc: "Αυξάνει το υψηλότερο stat κατά 30% (ή 50% αν είναι Speed) υπό έντονο ήλιο ή με Booster Energy.",
      heldItem: "Booster Energy",
      itemDesc: "Ενεργοποιεί αυτόματα το Protosynthesis στην είσοδο, εκτοξεύοντας την ταχύτητα σε 205+ Speed tier.",
      role: "Fast Special Sweeper & Hex Nuker",
      strategy: "Με 135 Base SpAtk και 135 Base Speed, το Flutter Mane ξεπερνά σχεδόν τα πάντα. Moonblast και Shadow Ball διαλύουν dragons, fighting, ghost και psychic απειλές.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/987.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/987.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 205 Speed στο Lv. 50 με booster Speed boost, απλησίαστο από scarf users.",
      evStats: [
        { name: "HP", ev: 4, stat: 131, boost: "" },
        { name: "Attack", ev: 0, stat: 67, boost: "drop" },
        { name: "Defense", ev: 0, stat: 75, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 187, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 155, boost: "" },
        { name: "Speed", ev: 252, stat: 205, boost: "boost" }
      ],
      moves: [
        { name: "Moonblast", type: "FAIRY", pwr: "95", acc: "100%", priority: "0", effect: "Ισχυρό Fairy STAB. 30% πιθανότητα να μειώσει το Sp. Atk του αντιπάλου κατά 1.", learn: "Level-Up Lv. 84", method: "Level-Up" },
        { name: "Shadow Ball", type: "GHOST", pwr: "80", acc: "100%", priority: "0", effect: "Ghost STAB. 20% πιθανότητα να μειώσει το Sp. Def του αντιπάλου κατά 1.", learn: "TM114", method: "TM" },
        { name: "Dazzling Gleam", type: "FAIRY", pwr: "80", acc: "100%", priority: "0", effect: "Fairy Spread attack. Χτυπάει και τους δύο αντιπάλους ταυτόχρονα.", learn: "TM079", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο στο VGC για scouting και stall.", learn: "TM007", method: "TM" }
      ]
    },

    // 25. URSHIFU (RAPID-STRIKE)
    urshifu_rapid: {
      id: "urshifu_rapid",
      name: "Urshifu (Rapid-Strike)",
      dexNum: "No. 892",
      species: "Wushu Pokémon",
      gender: "♂",
      types: ["FIGHTING", "WATER"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Unseen Fist",
      abilityDesc: "Όλες οι επιθέσεις επαφής (Contact moves) παρακάμπτουν και ΣΠΑΝΕ το Protect, Detect, Spiky Shield και Baneful Bunker!",
      heldItem: "Choice Scarf",
      itemDesc: "Αυξάνει την ταχύτητα κατά 50%, εξασφαλίζοντας ότι το Surging Strikes θα εκτελεστεί πριν προλάβει να αντιδράσει ο αντίπαλος.",
      role: "Protect-Breaker Physical Sweeper",
      strategy: "Ο απόλυτος εφιάλτης του VGC. Το Surging Strikes χτυπάει 3 φορές, πάντα με εγγυημένο Critical Hit, παρακάμπτοντας οποιοδήποτε Protect!",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/892.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. Με Choice Scarf φτάνει 220+ Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 176, boost: "" },
        { name: "Attack", ev: 252, stat: 182, boost: "" },
        { name: "Defense", ev: 0, stat: 120, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 74, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 80, boost: "" },
        { name: "Speed", ev: 252, stat: 163, boost: "boost" }
      ],
      moves: [
        { name: "Surging Strikes", type: "WATER", pwr: "25x3", acc: "100%", priority: "0", effect: "💥 Multi-Hit (3x). Εγγυημένα Critical Hits! Σπάει Protect με Unseen Fist.", learn: "Level-Up Lv. 1", method: "Level-Up" },
        { name: "Close Combat", type: "FIGHTING", pwr: "120", acc: "100%", priority: "0", effect: "Καταστροφικό Fighting STAB. Μειώνει Def και SpDef κατά 1 στάδιο.", learn: "Level-Up Lv. 64", method: "Level-Up" },
        { name: "Aqua Jet", type: "WATER", pwr: "40", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Τελειώνει αδύναμους αντιπάλους πριν επιτεθούν.", learn: "Level-Up Lv. 12", method: "Level-Up" },
        { name: "U-turn", type: "BUG", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει άμεσο switch-out, προσφέροντας ασφαλές momentum.", learn: "TM060", method: "TM" }
      ]
    },

    // 26. INCINEROAR
    incineroar: {
      id: "incineroar",
      name: "Incineroar",
      dexNum: "No. 727",
      species: "Heel Pokémon",
      gender: "♂",
      types: ["FIRE", "DARK"],
      nature: "Careful (+Sp. Def, -Sp. Atk)",
      ability: "Intimidate",
      abilityDesc: "Μειώνει το Attack όλων των αντιπάλων κατά 1 στάδιο (-33% physical ζημιά) κατά την είσοδο στο πεδίο.",
      heldItem: "Sitrus Berry",
      itemDesc: "Αναπληρώνει το 25% HP όταν πέσει κάτω από το 50%, διατηρώντας το στο πεδίο για πολλαπλά Fake Out pivots.",
      role: "The God of VGC Support & Pivot",
      strategy: "Το πιο δημοφιλές Pokémon στην ιστορία του VGC. Fake Out (+3 priority) ακινητοποιεί αντίπαλο στο turn 1, Intimidate μειώνει Atk, Knock Off αφαιρεί items και Parting Shot μειώνει Atk/SpAtk κάνοντας switch.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/727.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 156 Sp. Def / 100 Defense. Mixed defensive bulk που αντέχει Tera Water επιθέσεις.",
      evStats: [
        { name: "HP", ev: 252, stat: 202, boost: "" },
        { name: "Attack", ev: 0, stat: 135, boost: "" },
        { name: "Defense", ev: 100, stat: 123, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 90, boost: "drop" },
        { name: "Sp. Def", ev: 156, stat: 140, boost: "boost" },
        { name: "Speed", ev: 0, stat: 80, boost: "" }
      ],
      moves: [
        { name: "Fake Out", type: "NORMAL", pwr: "40", acc: "100%", priority: "+3", effect: "⚡ Priority +3. Μόνο στον 1ο γύρο. 100% Flinch στον στόχο, ακινητοποιώντας τον εντελώς!", learn: "Egg Move", method: "Egg Move" },
        { name: "Knock Off", type: "DARK", pwr: "65*", acc: "100%", priority: "0", effect: "Αφαιρεί μόνιμα το αντικείμενο του αντιπάλου (+50% ζημιά αν κρατάει item).", learn: "TM061", method: "TM" },
        { name: "Parting Shot", type: "DARK", pwr: "—", acc: "100%", priority: "0", effect: "Μειώνει το Attack και το Sp. Atk του αντιπάλου κατά 1 στάδιο και κάνει switch-out!", learn: "Egg Move", method: "Egg Move" },
        { name: "Flare Blitz", type: "FIRE", pwr: "120", acc: "100%", priority: "0", effect: "Ισχυρό Fire STAB. 33% recoil damage. 10% πιθανότητα Burn.", learn: "Level-Up Lv. 66", method: "Level-Up" }
      ]
    },

    // 27. RILLABOOM
    rillaboom: {
      id: "rillaboom",
      name: "Rillaboom",
      dexNum: "No. 812",
      species: "Drummer Pokémon",
      gender: "♂",
      types: ["GRASS"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Grassy Surge",
      abilityDesc: "Καλεί αυτόματα Grassy Terrain: θεραπεύει 1/16 HP, ενισχύει τις Grass κινήσεις κατά 30% και δίνει +1 priority στο Grassy Glide!",
      heldItem: "Assault Vest",
      itemDesc: "Αυξάνει το Sp. Def κατά 50%, αλλά επιτρέπει μόνο επιθετικές κινήσεις.",
      role: "Terrain Setter & Priority Revenge Killer",
      strategy: "Εξαιρετική συνέργεια με Incineroar. Φέρνει Grassy Terrain, δίνει Fake Out (+3 priority), και χτυπάει με STAB Grassy Glide (+1 priority σε terrain) ή Wood Hammer.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/812.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/812.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Attack / 4 Sp. Def. Με Assault Vest αποκτά τεράστια ειδική αντοχή.",
      evStats: [
        { name: "HP", ev: 252, stat: 207, boost: "" },
        { name: "Attack", ev: 252, stat: 194, boost: "boost" },
        { name: "Defense", ev: 0, stat: 110, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 72, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 91, boost: "" },
        { name: "Speed", ev: 0, stat: 105, boost: "" }
      ],
      moves: [
        { name: "Grassy Glide", type: "GRASS", pwr: "55", acc: "100%", priority: "+1*", effect: "⚡ Priority +1 όταν υπάρχει Grassy Terrain! Ιδανικό για τελειώματα σε Water/Ground.", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Fake Out", type: "NORMAL", pwr: "40", acc: "100%", priority: "+3", effect: "⚡ Priority +3. 100% Flinch στον 1ο γύρο, προσφέροντας tempo και έλεγχο.", learn: "Egg Move", method: "Egg Move" },
        { name: "Wood Hammer", type: "GRASS", pwr: "120", acc: "100%", priority: "0", effect: "Τεράστιο Grass STAB με Grassy Terrain boost. 33% recoil damage.", learn: "Level-Up Lv. 54", method: "Level-Up" },
        { name: "U-turn", type: "BUG", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει switch για να επαναφέρει το Grassy Surge και το Fake Out.", learn: "TM060", method: "TM" }
      ]
    },

    // 28. CHI-YU
    chi_yu: {
      id: "chi_yu",
      name: "Chi-Yu",
      dexNum: "No. 1004",
      species: "Ruin Pokémon",
      gender: "—",
      types: ["DARK", "FIRE"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Beads of Ruin",
      abilityDesc: "Μειώνει το Special Defense ΟΛΩΝ των άλλων Pokémon στο πεδίο κατά 25%, προσφέροντας ουσιαστικά +33% Special damage σε όλη την ομάδα!",
      heldItem: "Choice Scarf",
      itemDesc: "Αυξάνει την ταχύτητα κατά 50%, επιτρέποντας στο Chi-Yu να εκτελεί Heat Wave πριν προλάβει να κινηθεί κανείς.",
      role: "Beads of Ruin Special Nuker",
      strategy: "Υπό ήλιο με Beads of Ruin, το Heat Wave εξαϋλώνει ολόκληρες ομάδες. Το Snarl ρίχνει το SpAtk των αντιπάλων και το Dark Pulse δίνει 20% flinch rate.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1004.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1004.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. Με Choice Scarf φτάνει 228 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 131, boost: "" },
        { name: "Attack", ev: 0, stat: 89, boost: "drop" },
        { name: "Defense", ev: 0, stat: 100, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 205, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 140, boost: "" },
        { name: "Speed", ev: 252, stat: 152, boost: "" }
      ],
      moves: [
        { name: "Heat Wave", type: "FIRE", pwr: "95", acc: "90%", priority: "0", effect: "💥 Καταστροφικό Fire spread attack. Χτυπάει και τους δύο με Beads of Ruin boost.", learn: "TM118", method: "TM" },
        { name: "Dark Pulse", type: "DARK", pwr: "80", acc: "100%", priority: "0", effect: "Dark STAB nuke. 20% πιθανότητα Flinch.", learn: "TM062", method: "TM" },
        { name: "Overheat", type: "FIRE", pwr: "130", acc: "90%", priority: "0", effect: "Μονοστόχιο Fire nuke. Μειώνει το Sp. Atk κατά 2 στάδια.", learn: "TM157", method: "TM" },
        { name: "Snarl", type: "DARK", pwr: "55", acc: "95%", priority: "0", effect: "Χτυπάει όλους τους αντιπάλους και μειώνει το Sp. Atk τους κατά 1 στάδιο 100%!", learn: "TM030", method: "TM" }
      ]
    },

    // 29. OGERPON (HEARTHFLAME)
    ogerpon_hearthflame: {
      id: "ogerpon_hearthflame",
      name: "Ogerpon (Hearthflame)",
      dexNum: "No. 1017-H",
      species: "Mask Pokémon",
      gender: "♀",
      types: ["GRASS", "FIRE"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Mold Breaker",
      abilityDesc: "Αγνοεί ΟΛΕΣ τις αμυντικές ικανότητες του αντιπάλου (Multiscale, Sturdy, Disguise, Levitate, Flash Fire) κατά την επίθεση!",
      heldItem: "Hearthflame Mask",
      itemDesc: "Ενισχύει τις Grass και Fire επιθέσεις κατά 20% και δίνει +1 Attack κατά το Terastallization.",
      role: "Mold Breaker Follow Me Redirector & Wallbreaker",
      strategy: "Με Mold Breaker χτυπάει Heatran με Fire/Grass moves, προστατεύει frail συμμάχους με Follow Me (+2 priority) και τιμωρεί contact attackers με Spiky Shield (+4 priority).",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1017.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1017.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 178 Speed στο Lv. 50 (ξεπερνάει όλα τα base 100 Pokémon).",
      evStats: [
        { name: "HP", ev: 4, stat: 156, boost: "" },
        { name: "Attack", ev: 252, stat: 172, boost: "" },
        { name: "Defense", ev: 0, stat: 104, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 72, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 116, boost: "" },
        { name: "Speed", ev: 252, stat: 178, boost: "boost" }
      ],
      moves: [
        { name: "Ivy Cudgel", type: "FIRE", pwr: "100", acc: "100%", priority: "0", effect: "💥 Αυξημένο critical hit ratio (+1 στάδιο). Fire STAB που καταστρέφει τείχη.", learn: "Signature Move", method: "Level-Up" },
        { name: "Horn Leech", type: "GRASS", pwr: "75", acc: "100%", priority: "0", effect: "Grass STAB. Αναπληρώνει το 50% της ζημιάς που προκαλεί στον στόχο.", learn: "TM111", method: "TM" },
        { name: "Follow Me", type: "NORMAL", pwr: "—", acc: "—", priority: "+2", effect: "⚡ Priority +2. Ανακατευθύνει όλες τις επιθέσεις των αντιπάλων πάνω στην Ogerpon!", learn: "Level-Up Lv. 36", method: "Level-Up" },
        { name: "Spiky Shield", type: "GRASS", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Ακυρώνει επιθέσεις. Αν ο αντίπαλος κάνει contact, χάνει 1/8 HP!", learn: "Level-Up Lv. 1", method: "Level-Up" }
      ]
    },

    // 30. ARCHALUDON
    archaludon: {
      id: "archaludon",
      name: "Archaludon",
      dexNum: "No. 1018",
      species: "Alloy Pokémon",
      gender: "♂",
      types: ["STEEL", "DRAGON"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Stamina",
      abilityDesc: "Αυξάνει το Defense κατά +1 στάδιο κάθε φορά που δέχεται οποιοδήποτε χτύπημα!",
      heldItem: "Assault Vest",
      itemDesc: "Αυξάνει το Sp. Def κατά 50%, κάνοντάς το σχεδόν αδύνατο να βγει KO.",
      role: "Rain Electro Shot Tank",
      strategy: "Στη βροχή το Electro Shot εκτελείται ΑΜΕΣΑ σε 1 γύρο, δίνοντας +1 SpAtk boost! Με Stamina και Assault Vest αποκτά απαράμιλλη αντοχή και στους δύο αμυντικούς τομείς.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1018.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1018.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Sp. Atk / 4 Sp. Def. 197 HP και 194 SpAtk stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 197, boost: "" },
        { name: "Attack", ev: 0, stat: 112, boost: "drop" },
        { name: "Defense", ev: 0, stat: 150, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 194, boost: "boost" },
        { name: "Sp. Def", ev: 4, stat: 86, boost: "" },
        { name: "Speed", ev: 0, stat: 105, boost: "" }
      ],
      moves: [
        { name: "Electro Shot", type: "ELECTRIC", pwr: "130", acc: "100%", priority: "0", effect: "⚡ Υπό βροχή εκτελείται ΑΜΕΣΑ σε 1 γύρο! Δίνει +1 Sp. Atk boost πριν χτυπήσει!", learn: "Signature Move", method: "Level-Up" },
        { name: "Flash Cannon", type: "STEEL", pwr: "80", acc: "100%", priority: "0", effect: "Steel STAB. 10% πιθανότητα να μειώσει το Sp. Def του αντιπάλου.", learn: "TM093", method: "TM" },
        { name: "Draco Meteor", type: "DRAGON", pwr: "130", acc: "90%", priority: "0", effect: "Dragon STAB nuke για εξόντωση Dragons και Water resists.", learn: "TM169", method: "TM" },
        { name: "Body Press", type: "FIGHTING", pwr: "80*", acc: "100%", priority: "0", effect: "Υπολογίζει τη ζημιά με βάση το Defense! Με Stamina boosts κάνει εξωφρενική ζημιά.", learn: "TM089", method: "TM" }
      ]
    },

    // 31. AMOONGUSS
    amoonguss: {
      id: "amoonguss",
      name: "Amoonguss",
      dexNum: "No. 591",
      species: "Mushroom Pokémon",
      gender: "♂",
      types: ["GRASS", "POISON"],
      nature: "Relaxed (+Defense, -Speed)",
      ability: "Regenerator",
      abilityDesc: "Αναπληρώνει το 1/3 (33%) της μέγιστης ζωής του κάθε φορά που κάνει switch-out!",
      heldItem: "Rocky Helmet",
      itemDesc: "Προκαλεί ζημιά ίση με το 1/6 HP στον αντίπαλο κάθε φορά που δέχεται physical contact (καταστρέφει Urshifu Surging Strikes!).",
      role: "Rage Powder Redirection & 100% Spore Sleeper",
      strategy: "Ο βασιλιάς του redirection. Spore κοιμίζει με 100% ακρίβεια, Rage Powder (+2 priority) τραβάει τις επιθέσεις μακριά από συμμάχους και Pollen Puff θεραπεύει τον partner.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/591.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/591.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def (0 Speed IV). Μέγιστη physical αντοχή για απορρόφηση contact hits.",
      evStats: [
        { name: "HP", ev: 252, stat: 221, boost: "" },
        { name: "Attack", ev: 0, stat: 94, boost: "" },
        { name: "Defense", ev: 252, stat: 134, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 105, boost: "" },
        { name: "Sp. Def", ev: 4, stat: 101, boost: "" },
        { name: "Speed", ev: 0, stat: 31, boost: "drop" }
      ],
      moves: [
        { name: "Spore", type: "GRASS", pwr: "—", acc: "100%", priority: "0", effect: "😴 Κοιμίζει τον αντίπαλο με 100% εγγυημένη ευστοχία!", learn: "Level-Up Lv. 54", method: "Level-Up" },
        { name: "Rage Powder", type: "BUG", pwr: "—", acc: "—", priority: "+2", effect: "⚡ Priority +2. Τραβάει όλες τις μονοστόχιες επιθέσεις των αντιπάλων πάνω στον Amoonguss.", learn: "Level-Up Lv. 42", method: "Level-Up" },
        { name: "Pollen Puff", type: "BUG", pwr: "90", acc: "100%", priority: "0", effect: "Χτυπάει τον αντίπαλο ή ΑΝΑΠΛΗΡΩΝΕΙ το 50% HP του συμπαίκτη αν στοχεύσει σύμμαχο!", learn: "TM131", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για scouting και προστασία.", learn: "TM007", method: "TM" }
      ]
    },

    // 32. DRAGONITE
    dragonite: {
      id: "dragonite",
      name: "Dragonite",
      dexNum: "No. 149",
      species: "Dragon Pokémon",
      gender: "♂",
      types: ["DRAGON", "FLYING"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Multiscale",
      abilityDesc: "Μειώνει όλη τη ζημιά που δέχεται κατά 50% όταν η ζωή του είναι στο 100% (πλήρης υγεία).",
      heldItem: "Choice Band",
      itemDesc: "Αυξάνει το Attack κατά 50%, μετατρέποντας το Extreme Speed σε ασταμάτητο όπλο.",
      role: "Tera Normal Extreme Speed Cleaner",
      strategy: "Το απόλυτο όπλο στο Ranked Singles. Με Tera Normal + Choice Band, το Extreme Speed (+2 priority) αποκτά STAB x2.0 και 50% boost, κάνοντας OHKO πριν κινηθεί ο αντίπαλος.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 HP / 4 Speed. Μέγιστη ζημιά και bulk συνδυασμένο με Multiscale.",
      evStats: [
        { name: "HP", ev: 252, stat: 198, boost: "" },
        { name: "Attack", ev: 252, stat: 204, boost: "boost" },
        { name: "Defense", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 108, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 121, boost: "" },
        { name: "Speed", ev: 0, stat: 100, boost: "" }
      ],
      moves: [
        { name: "Extreme Speed", type: "NORMAL", pwr: "80", acc: "100%", priority: "+2", effect: "⚡ Priority +2! Ξεπερνά όλα τα κανονικά priority moves (+1). Τεράστια ζημιά με Tera Normal.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Outrage", type: "DRAGON", pwr: "120", acc: "100%", priority: "0", effect: "Dragon STAB nuke για αντίπαλα Pokémon με αντοχή σε Normal επιθέσεις.", learn: "Level-Up Lv. 67", method: "Level-Up" },
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Εξουδετερώνει Steel και Rock Pokémon (Gholdengo, Tyranitar).", learn: "TM149", method: "TM" },
        { name: "Fire Punch", type: "FIRE", pwr: "75", acc: "100%", priority: "0", effect: "Κάλυψη Fire για Corviknight, Scizor και Ferrothorn.", learn: "TM067", method: "TM" }
      ]
    },

    // 33. URSHIFU (SINGLE-STRIKE)
    urshifu_single: {
      id: "urshifu_single",
      name: "Urshifu (Single-Strike)",
      dexNum: "No. 892-S",
      species: "Wushu Pokémon",
      gender: "♂",
      types: ["FIGHTING", "DARK"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Unseen Fist",
      abilityDesc: "Όλες οι επιθέσεις επαφής παρακάμπτουν και ΣΠΑΝΕ το Protect!",
      heldItem: "Focus Sash",
      itemDesc: "Εξασφαλίζει επιβίωση 1 HP από 4x Fairy επιθέσεις.",
      role: "Wicked Blow Shield Piercer",
      strategy: "Το Wicked Blow είναι εγγυημένο Critical Hit, παρακάμπτοντας Protect και οποιοδήποτε Defense boost. Sucker Punch (+1 priority) εξολοθρεύει ταχύτερους αντιπάλους.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/892.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/892.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 163 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 176, boost: "" },
        { name: "Attack", ev: 252, stat: 182, boost: "" },
        { name: "Defense", ev: 0, stat: 120, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 74, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 80, boost: "" },
        { name: "Speed", ev: 252, stat: 163, boost: "boost" }
      ],
      moves: [
        { name: "Wicked Blow", type: "DARK", pwr: "80", acc: "100%", priority: "0", effect: "💥 Εγγυημένο Critical Hit! Σπάει Protect και αγνοεί stat drops.", learn: "Signature Move", method: "Level-Up" },
        { name: "Close Combat", type: "FIGHTING", pwr: "120", acc: "100%", priority: "0", effect: "Fighting STAB nuke. Μειώνει Def και SpDef κατά 1.", learn: "Level-Up Lv. 64", method: "Level-Up" },
        { name: "Sucker Punch", type: "DARK", pwr: "70", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Επιτίθεται πρώτο αν ο αντίπαλος ετοιμάζει επίθεση.", learn: "Level-Up Lv. 1", method: "Move Reminder" },
        { name: "Iron Head", type: "STEEL", pwr: "80", acc: "100%", priority: "0", effect: "Κάλυψη Steel για 4x αδυναμία σε Fairies (30% Flinch).", learn: "TM099", method: "TM" }
      ]
    },

    // 34. CHIEN-PAO
    chien_pao: {
      id: "chien_pao",
      name: "Chien-Pao",
      dexNum: "No. 1002",
      species: "Ruin Pokémon",
      gender: "—",
      types: ["DARK", "ICE"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Sword of Ruin",
      abilityDesc: "Μειώνει το Defense ΟΛΩΝ των άλλων Pokémon στο πεδίο κατά 25%, αυξάνοντας ουσιαστικά τη physical ζημιά όλης της ομάδας κατά 33%!",
      heldItem: "Focus Sash",
      itemDesc: "Εγγυάται επιβίωση σε 1 HP από 4x Fighting επιθέσεις.",
      role: "Physical Ruin Sweeper & Priority Assasin",
      strategy: "Με 135 Base Speed ξεπερνάει σχεδόν τα πάντα. Με Sword of Ruin, το Icicle Crash και το Sucker Punch (+1 priority) κάνουν τεράστια ζημιά.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1002.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1002.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 205 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 156, boost: "" },
        { name: "Attack", ev: 252, stat: 172, boost: "" },
        { name: "Defense", ev: 0, stat: 100, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 99, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 85, boost: "" },
        { name: "Speed", ev: 252, stat: 205, boost: "boost" }
      ],
      moves: [
        { name: "Icicle Crash", type: "ICE", pwr: "85", acc: "90%", priority: "0", effect: "Ice physical STAB. 30% πιθανότητα Flinch.", learn: "Level-Up Lv. 55", method: "Level-Up" },
        { name: "Sucker Punch", type: "DARK", pwr: "70", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Επιτίθεται πρώτο απέναντι σε επιτιθέμενους.", learn: "Level-Up Lv. 45", method: "Level-Up" },
        { name: "Sacred Sword", type: "FIGHTING", pwr: "90", acc: "100%", priority: "0", effect: "Αγνοεί όλα τα αμυντικά stat boosts του αντιπάλου (Iron Defense).", learn: "Level-Up Lv. 65", method: "Level-Up" },
        { name: "Ice Spinner", type: "ICE", pwr: "80", acc: "100%", priority: "0", effect: "100% ακρίβεια Ice STAB. Καταστρέφει Terrains στο πεδίο.", learn: "TM124", method: "TM" }
      ]
    },

    // 35. GHOLDENGO
    gholdengo: {
      id: "gholdengo",
      name: "Gholdengo",
      dexNum: "No. 1000",
      species: "Coin Entity",
      gender: "—",
      types: ["STEEL", "GHOST"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Good as Gold",
      abilityDesc: "ΠΛΗΡΗΣ ΑΣΥΛΙΑ σε ΟΛΕΣ τις status κινήσεις (Spore, Taunt, Will-O-Wisp, Thunder Wave, Yawn, Parting Shot κ.λπ.)!",
      heldItem: "Choice Specs",
      itemDesc: "Αυξάνει το Sp. Atk κατά 50%, μετατρέποντας το Make It Rain σε εξοντωτικό spread attack.",
      role: "Status-Immune Spread Wallbreaker",
      strategy: "Άτρωτος σε status χάρη στο Good as Gold. Make It Rain χτυπάει και τους δύο αντιπάλους με τεράστια δύναμη, μοιράζοντας νομίσματα και KO.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1000.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 149 Speed στο Lv. 50 και 203 SpAtk stat.",
      evStats: [
        { name: "HP", ev: 4, stat: 163, boost: "" },
        { name: "Attack", ev: 0, stat: 63, boost: "drop" },
        { name: "Defense", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 185, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 111, boost: "" },
        { name: "Speed", ev: 252, stat: 149, boost: "boost" }
      ],
      moves: [
        { name: "Make It Rain", type: "STEEL", pwr: "120", acc: "100%", priority: "0", effect: "💥 Steel spread nuke. Χτυπάει και τους δύο (μειώνει SpAtk κατά 1).", learn: "Evolution Move", method: "Evolution" },
        { name: "Shadow Ball", type: "GHOST", pwr: "80", acc: "100%", priority: "0", effect: "Ghost STAB. 20% πιθανότητα να μειώσει το Sp. Def.", learn: "TM114", method: "TM" },
        { name: "Nasty Plot", type: "DARK", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει το Sp. Atk κατά 2 στάδια (+100%).", learn: "TM140", method: "TM" },
        { name: "Recover", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αναπληρώνει 50% HP, συντηρώντας το Gholdengo στο πεδίο.", learn: "Level-Up Lv. 40", method: "Level-Up" }
      ]
    },

    // 36. TING-LU
    ting_lu: {
      id: "ting_lu",
      name: "Ting-Lu",
      dexNum: "No. 1003",
      species: "Ruin Pokémon",
      gender: "—",
      types: ["DARK", "GROUND"],
      nature: "Impish (+Defense, -Sp. Atk)",
      ability: "Vessel of Ruin",
      abilityDesc: "Μειώνει το Sp. Atk ΟΛΩΝ των άλλων Pokémon στο πεδίο κατά 25%, κάνοντας την ομάδα ανίκητη σε special επιθέσεις!",
      heldItem: "Leftovers",
      itemDesc: "Ανακτά 1/16 HP σε κάθε γύρο, ενισχύοντας το τεράστιο 230+ HP.",
      role: "Vessel of Ruin Hazard Tank",
      strategy: "Αδιαπέραστο physical και special τείχος. Θέτει Stealth Rock και Spikes, ενώ με Ruination κόβει τη ζωή του αντιπάλου στο 50% άμεσα.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1003.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1003.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def. Απίστευτο 262 HP στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 262, boost: "" },
        { name: "Attack", ev: 0, stat: 130, boost: "" },
        { name: "Defense", ev: 252, stat: 194, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 67, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 101, boost: "" },
        { name: "Speed", ev: 0, stat: 65, boost: "" }
      ],
      moves: [
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Ground physical STAB. Αξιόπιστη ζημιά.", learn: "TM149", method: "TM" },
        { name: "Ruination", type: "DARK", pwr: "—", acc: "90%", priority: "0", effect: "Κόβει την τρέχουσα ζωή του στόχου στο 50% άμεσα!", learn: "Level-Up Lv. 65", method: "Level-Up" },
        { name: "Stealth Rock", type: "ROCK", pwr: "—", acc: "—", priority: "0", effect: "Θέτει πέτρες που κάνουν ζημιά σε κάθε switch-in του αντιπάλου.", learn: "TM116", method: "TM" },
        { name: "Whirlwind", type: "NORMAL", pwr: "—", acc: "—", priority: "-6", effect: "🔄 Priority -6. Αναγκάζει τον αντίπαλο σε switch, ενεργοποιώντας τα hazards!", learn: "Level-Up Lv. 40", method: "Level-Up" }
      ]
    },

    // 37. DONDOZO
    dondozo: {
      id: "dondozo",
      name: "Dondozo",
      dexNum: "No. 977",
      species: "Big Catfish",
      gender: "♂",
      types: ["WATER"],
      nature: "Impish (+Defense, -Sp. Atk)",
      ability: "Unaware",
      abilityDesc: "ΑΓΝΟΕΙ ΟΛΑ τα stat boosts του αντιπάλου (Swords Dance, Calm Mind, Dragon Dance) όταν δέχεται επίθεση!",
      heldItem: "Leftovers",
      itemDesc: "Αναπληρώνει 1/16 HP κάθε γύρο, προσφέροντας ατελείωτη αντοχή.",
      role: "Unaware Anti-Setup Wall",
      strategy: "Ακυρώνει κάθε setup sweeper με Unaware. Χρησιμοποιεί Wave Crash και Body Press με βάση το τεράστιο Defense του, και αναρρώνει με RestTalk.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/977.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/977.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def. 257 HP στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 257, boost: "" },
        { name: "Attack", ev: 0, stat: 120, boost: "" },
        { name: "Defense", ev: 252, stat: 183, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 76, boost: "drop" },
        { name: "Sp. Def", ev: 4, stat: 86, boost: "" },
        { name: "Speed", ev: 0, stat: 55, boost: "" }
      ],
      moves: [
        { name: "Wave Crash", type: "WATER", pwr: "120", acc: "100%", priority: "0", effect: "Ισχυρό Water physical STAB. 33% recoil damage.", learn: "Level-Up Lv. 55", method: "Level-Up" },
        { name: "Body Press", type: "FIGHTING", pwr: "80*", acc: "100%", priority: "0", effect: "Ζημιά με βάση το Defense (183 stat στο Lv. 50).", learn: "TM089", method: "TM" },
        { name: "Rest", type: "PSYCHIC", pwr: "—", acc: "—", priority: "0", effect: "Πλήρης αναπλήρωση 100% HP και ίαση status.", learn: "TM085", method: "TM" },
        { name: "Sleep Talk", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Εκτελεί τυχαία κίνηση ενώ κοιμάται.", learn: "TM070", method: "TM" }
      ]
    },

    // 38. INDEEDEE-F
    indeedee_f: {
      id: "indeedee_f",
      name: "Indeedee (Female)",
      dexNum: "No. 876-F",
      species: "Emotion Pokémon",
      gender: "♀",
      types: ["PSYCHIC", "NORMAL"],
      nature: "Relaxed (+Defense, -Speed)",
      ability: "Psychic Surge",
      abilityDesc: "Καλεί αυτόματα Psychic Terrain: ενισχύει τις Psychic επιθέσεις κατά 30% και ΑΚΥΡΩΝΕΙ ΟΛΑ τα priority moves των αντιπάλων (Fake Out, Grassy Glide, Sucker Punch)!",
      heldItem: "Psychic Seed",
      itemDesc: "Αυξάνει αυτόματα το Sp. Def κατά +1 στάδιο μόλις μπει σε Psychic Terrain.",
      role: "Psychic Terrain Setter & Follow Me Anchor",
      strategy: "Απόλυτη προστασία από priority moves. Follow Me (+2 priority) ανακατευθύνει επιθέσεις και επιτρέπει στον partner να στήσει Trick Room ή να σαρώσει με Expanding Force.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/876.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/876.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 HP / 252 Defense / 4 Sp. Def (0 Speed IV).",
      evStats: [
        { name: "HP", ev: 252, stat: 177, boost: "" },
        { name: "Attack", ev: 0, stat: 67, boost: "" },
        { name: "Defense", ev: 252, stat: 117, boost: "boost" },
        { name: "Sp. Atk", ev: 0, stat: 115, boost: "" },
        { name: "Sp. Def", ev: 4, stat: 126, boost: "" },
        { name: "Speed", ev: 0, stat: 81, boost: "drop" }
      ],
      moves: [
        { name: "Follow Me", type: "NORMAL", pwr: "—", acc: "—", priority: "+2", effect: "⚡ Priority +2. Ανακατευθύνει όλες τις επιθέσεις πάνω στην Indeedee.", learn: "Level-Up Lv. 1", method: "Level-Up" },
        { name: "Helping Hand", type: "NORMAL", pwr: "—", acc: "—", priority: "+5", effect: "⚡ Priority +5. +50% boost στην επίθεση του συμμάχου.", learn: "Level-Up Lv. 25", method: "Level-Up" },
        { name: "Dazzling Gleam", type: "FAIRY", pwr: "80", acc: "100%", priority: "0", effect: "Fairy spread κάλυψη για Dark τύπους.", learn: "TM079", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για επιβίωση.", learn: "TM007", method: "TM" }
      ]
    },

    // 39. ARMAROUGE
    armarouge: {
      id: "armarouge",
      name: "Armarouge",
      dexNum: "No. 935",
      species: "Fire Warrior",
      gender: "♂",
      types: ["FIRE", "PSYCHIC"],
      nature: "Quiet (+Sp. Atk, -Speed)",
      ability: "Flash Fire",
      abilityDesc: "Ασυλία σε Fire επιθέσεις. Αν δεχθεί Fire move, αυξάνει τις Fire κινήσεις του κατά 50%!",
      heldItem: "Twisted Spoon",
      itemDesc: "Αυξάνει τις Psychic επιθέσεις κατά 20% (ενισχύοντας το Expanding Force).",
      role: "Psychic Terrain Expanding Force Sweeper",
      strategy: "Σε Psychic Terrain, το Expanding Force αυξάνει την ισχύ του σε 156 BP και χτυπάει ΚΑΙ ΤΟΥΣ ΔΥΟ αντιπάλους ταυτόχρονα, διαλύοντας ομάδες σε 1-2 γύρους.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/935.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/935.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Def (0 Speed IV). 194 SpAtk stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 192, boost: "" },
        { name: "Attack", ev: 0, stat: 72, boost: "" },
        { name: "Defense", ev: 4, stat: 121, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 194, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 100, boost: "" },
        { name: "Speed", ev: 0, stat: 72, boost: "drop" }
      ],
      moves: [
        { name: "Expanding Force", type: "PSYCHIC", pwr: "80*", acc: "100%", priority: "0", effect: "💥 Σε Psychic Terrain γίνεται 156 BP και χτυπάει ΚΑΙ ΤΟΥΣ ΔΥΟ αντιπάλους!", learn: "TM161", method: "TM" },
        { name: "Armor Cannon", type: "FIRE", pwr: "120", acc: "100%", priority: "0", effect: "Fire STAB nuke. Μειώνει Def/SpDef κατά 1.", learn: "Signature Move", method: "Level-Up" },
        { name: "Trick Room", type: "PSYCHIC", pwr: "—", acc: "—", priority: "-7", effect: "🔄 Αντιστρέφει τη σειρά ταχύτητας για 5 γύρους.", learn: "TM161", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστασία.", learn: "TM007", method: "TM" }
      ]
    },

    // 40. URSALUNA (BLOODMOON)
    ursaluna_bloodmoon: {
      id: "ursaluna_bloodmoon",
      name: "Ursaluna (Bloodmoon)",
      dexNum: "No. 1013",
      species: "Peat Pokémon",
      gender: "♂",
      types: ["GROUND", "NORMAL"],
      nature: "Quiet (+Sp. Atk, -Speed)",
      ability: "Mind's Eye",
      abilityDesc: "ΑΓΝΟΕΙ ΤΗΝ ΑΣΥΛΙΑ ΤΩΝ GHOST! Οι Normal επιθέσεις (Blood Moon, Hyper Voice) χτυπάνε Ghosts κανονικά, και η ακρίβεια δεν μειώνεται ποτέ!",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλη τη ζημιά κατά 30% με 10% recoil HP.",
      role: "Trick Room Special Nuclear Destroyer",
      strategy: "Στο Trick Room με Mind's Eye, το Blood Moon (140 BP) και το Hyper Voice χτυπούν ακόμα και Ghost Pokémon με πλήρη ισχύ, κάνοντας διπλά OHKO.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1013.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1013.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Def (0 Speed IV). 205 SpAtk stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 220, boost: "" },
        { name: "Attack", ev: 0, stat: 81, boost: "" },
        { name: "Defense", ev: 4, stat: 141, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 205, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 85, boost: "" },
        { name: "Speed", ev: 0, stat: 51, boost: "drop" }
      ],
      moves: [
        { name: "Blood Moon", type: "NORMAL", pwr: "140", acc: "100%", priority: "0", effect: "💥 Τεράστιο Normal STAB nuke. Χτυπάει ακόμα και Ghosts χάρη στο Mind's Eye!", learn: "Signature Move", method: "Level-Up" },
        { name: "Earth Power", type: "GROUND", pwr: "90", acc: "100%", priority: "0", effect: "Ground special STAB. 10% πιθανότητα -1 SpDef.", learn: "TM133", method: "TM" },
        { name: "Hyper Voice", type: "NORMAL", pwr: "90", acc: "100%", priority: "0", effect: "Normal spread attack. Χτυπάει και τους δύο αντιπάλους.", learn: "TM117", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστασία.", learn: "TM007", method: "TM" }
      ]
    },

    // 41. MEGA LUCARIO
    mega_lucario: {
      id: "mega_lucario",
      name: "Mega Lucario",
      dexNum: "No. 448-M",
      species: "Aura Pokémon",
      gender: "♂",
      types: ["FIGHTING", "STEEL"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Adaptability",
      abilityDesc: "Αυξάνει το STAB boost από 1.5x σε 2.0x! Το Close Combat αποκτά ισχύ 240 BP και το Bullet Punch 80 BP!",
      heldItem: "Lucarionite",
      itemDesc: "Mega Stone που επιτρέπει στον Lucario να πραγματοποιήσει Mega Evolution στη μάχη.",
      role: "Adaptability Wallbreaker & Priority Cleaner",
      strategy: "Mega εξελίσσεται και επιτίθεται με 112 Base Speed και 145 Base Attack. Adaptability Bullet Punch (+1 priority) λειτουργεί σαν 80 BP priority move, ενώ το Close Combat κάνει OHKO ακόμα και physical tanks.",
      img: "./assets/lucario.png",
      icon: "./assets/lucario_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 180 Speed στο Lv. 50 (ξεπερνά όλα τα base 110 Pokémon).",
      evStats: [
        { name: "HP", ev: 4, stat: 146, boost: "" },
        { name: "Attack", ev: 252, stat: 197, boost: "" },
        { name: "Defense", ev: 0, stat: 108, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 144, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 90, boost: "" },
        { name: "Speed", ev: 252, stat: 180, boost: "boost" }
      ],
      moves: [
        { name: "Close Combat", type: "FIGHTING", pwr: "120*", acc: "100%", priority: "0", effect: "💥 Adaptability STAB: 240 BP! Καταστρέφει τα πάντα (μειώνει Def/SpDef κατά 1).", learn: "Level-Up", method: "Level-Up" },
        { name: "Bullet Punch", type: "STEEL", pwr: "40*", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Με Adaptability έχει ισχύ 80 BP! Εξουδετερώνει Fairy και Ice.", learn: "Egg Move", method: "Egg Move" },
        { name: "Meteor Mash", type: "STEEL", pwr: "90*", acc: "90%", priority: "0", effect: "Steel STAB (180 BP με Adaptability). 20% πιθανότητα +1 Attack boost.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Swords Dance", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει το Attack κατά 2 στάδια (+100%).", learn: "TM75", method: "TM" }
      ]
    },

    // 42. MEGA GENGAR
    mega_gengar: {
      id: "mega_gengar",
      name: "Mega Gengar",
      dexNum: "No. 094-M",
      species: "Shadow Pokémon",
      gender: "♂",
      types: ["GHOST", "POISON"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Shadow Tag",
      abilityDesc: "Αποτρέπει ΟΛΟΥΣ τους αντιπάλους από το να κάνουν switch-out ή φυγή (εκτός αν είναι τύπου Ghost).",
      heldItem: "Gengarite",
      itemDesc: "Mega Stone που ξεκλειδώνει το Mega Evolution του Gengar.",
      role: "Trapper, Perish Trap Killer & Special Sweeper",
      strategy: "Με 130 Base Speed και 170 Base SpAtk, παγιδεύει οποιοδήποτε Pokémon του αντιπάλου με Shadow Tag και το εξολοθρεύει με Sludge Wave ή Perish Song.",
      img: "./assets/gengar.png",
      icon: "./assets/gengar_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 200 Speed στο Lv. 50, ταχύτερο από το 99% του meta.",
      evStats: [
        { name: "HP", ev: 4, stat: 136, boost: "" },
        { name: "Attack", ev: 0, stat: 76, boost: "drop" },
        { name: "Defense", ev: 0, stat: 100, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 222, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 115, boost: "" },
        { name: "Speed", ev: 252, stat: 200, boost: "boost" }
      ],
      moves: [
        { name: "Shadow Ball", type: "GHOST", pwr: "80", acc: "100%", priority: "0", effect: "Ghost STAB nuke με 222 SpAtk stat. 20% πιθανότητα -1 SpDef.", learn: "TM30", method: "TM" },
        { name: "Sludge Wave", type: "POISON", pwr: "95", acc: "100%", priority: "0", effect: "Poison STAB. 10% πιθανότητα Poison. Χτυπάει όλους στο πεδίο.", learn: "TM34", method: "TM" },
        { name: "Focus Blast", type: "FIGHTING", pwr: "120", acc: "70%", priority: "0", effect: "Κάλυψη Fighting για Dark, Steel και Normal τείχη.", learn: "TM52", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για Perish Song countdown και scouting.", learn: "TM17", method: "TM" }
      ]
    },

    // 43. MEGA KANGASKHAN
    mega_kangaskhan: {
      id: "mega_kangaskhan",
      name: "Mega Kangaskhan",
      dexNum: "No. 115-M",
      species: "Parent Pokémon",
      gender: "♀",
      types: ["NORMAL"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Parental Bond",
      abilityDesc: "Κάθε επίθεση χτυπάει 2 φορές! Το μωρό εκτελεί δεύτερο χτύπημα με 25% της βασικής ζημιάς (σπάει Focus Sash, Substitute και διπλασιάζει τα secondary effects!).",
      heldItem: "Kangaskhanite",
      itemDesc: "Mega Stone που επιτρέπει στη μητέρα και το μικρό να πολεμήσουν μαζί.",
      role: "Parental Bond Tyrant & Fake Out Controller",
      strategy: "Ο βασιλιάς του Mega Doubles. Fake Out (+3 priority) με 2 χτυπήματα σπάει Focus Sash στον turn 1. Power-Up Punch δίνει +2 Attack boost σε ένα turn (2 χτυπήματα) και Sucker Punch προσφέρει priority finisher.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 167 Speed στο Lv. 50 και μέγιστη physical πίεση.",
      evStats: [
        { name: "HP", ev: 4, stat: 181, boost: "" },
        { name: "Attack", ev: 252, stat: 177, boost: "" },
        { name: "Defense", ev: 0, stat: 120, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 54, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 120, boost: "" },
        { name: "Speed", ev: 252, stat: 167, boost: "boost" }
      ],
      moves: [
        { name: "Fake Out", type: "NORMAL", pwr: "40", acc: "100%", priority: "+3", effect: "⚡ Priority +3. Χτυπάει 2 φορές με Parental Bond (σπάει Sash) και προκαλεί 100% Flinch!", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Double-Edge", type: "NORMAL", pwr: "120", acc: "100%", priority: "0", effect: "💥 Τεράστιο Normal STAB. Με Parental Bond χτυπάει 2 φορές κάνοντας τεράστια ζημιά.", learn: "Level-Up", method: "Level-Up" },
        { name: "Sucker Punch", type: "DARK", pwr: "70", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Επιτίθεται πρώτο αν ο αντίπαλος ετοιμάζει επιθετική κίνηση.", learn: "Level-Up Lv. 49", method: "Level-Up" },
        { name: "Power-Up Punch", type: "FIGHTING", pwr: "40", acc: "100%", priority: "0", effect: "Χτυπάει 2 φορές με Parental Bond, δίνοντας ΑΜΕΣΑ +2 Attack boost (+100%)!", learn: "TM98", method: "TM" }
      ]
    },

    // 44. MEGA CHARIZARD Y
    mega_charizard_y: {
      id: "mega_charizard_y",
      name: "Mega Charizard Y",
      dexNum: "No. 006-MY",
      species: "Flame Pokémon",
      gender: "♂",
      types: ["FIRE", "FLYING"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Drought",
      abilityDesc: "Καλεί άμεσα Ήλιο (Sun) κατά το Mega Evolution, ενισχύοντας όλες τις Fire κινήσεις κατά 50% και κάνοντας το Solar Beam 1-turn move!",
      heldItem: "Charizardite Y",
      itemDesc: "Mega Stone που μετατρέπει τον Charizard στον υπέρτατο Sun Sweeper.",
      role: "Mega Sun Nuke & Spread Attacker",
      strategy: "Mega εξελίσσεται και ενεργοποιεί Drought. Με 159 Base SpAtk, το Heat Wave υπό ήλιο εξαφανίζει αντιπάλους, ενώ το Solar Beam καλύπτει Water και Ground αδυναμίες σε 1 γύρο.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 167 Speed στο Lv. 50, speed-tie με Mega Kangaskhan.",
      evStats: [
        { name: "HP", ev: 4, stat: 154, boost: "" },
        { name: "Attack", ev: 0, stat: 111, boost: "drop" },
        { name: "Defense", ev: 0, stat: 98, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 211, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 135, boost: "" },
        { name: "Speed", ev: 252, stat: 167, boost: "boost" }
      ],
      moves: [
        { name: "Heat Wave", type: "FIRE", pwr: "95", acc: "90%", priority: "0", effect: "💥 Εξοντωτικό Fire STAB υπό Drought. Χτυπάει και τους δύο αντιπάλους ταυτόχρονα.", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Solar Beam", type: "GRASS", pwr: "120", acc: "100%", priority: "0", effect: "Υπό ήλιο εκτελείται ΑΜΕΣΑ σε 1 γύρο χωρίς φόρτιση! Διαλύει Water/Rock/Ground.", learn: "TM22", method: "TM" },
        { name: "Air Slash", type: "FLYING", pwr: "75", acc: "95%", priority: "0", effect: "Flying STAB. 30% πιθανότητα Flinch. Εξουδετερώνει Fighting και Grass.", learn: "Level-Up", method: "Level-Up" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Απαραίτητο για αποφυγή 4x Rock Slide ζημιάς.", learn: "TM17", method: "TM" }
      ]
    },

    // 45. MEGA GARDEVOIR
    mega_gardevoir: {
      id: "mega_gardevoir",
      name: "Mega Gardevoir",
      dexNum: "No. 282-M",
      species: "Embrace Pokémon",
      gender: "♀",
      types: ["PSYCHIC", "FAIRY"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Pixilate",
      abilityDesc: "Μετατρέπει όλες τις Normal κινήσεις σε Fairy types και αυξάνει την ισχύ τους κατά 20%! Το Hyper Voice γίνεται Fairy Sound move που χτυπάει και τους δύο αντιπάλους ακόμα και μέσα από Substitutes!",
      heldItem: "Gardevoirite",
      itemDesc: "Mega Stone που επιτρέπει στη Gardevoir να κάνει Mega Evolution.",
      role: "Pixilate Sound Spread Nuker",
      strategy: "Mega εξελίσσεται και επιτίθεται με Pixilate Hyper Voice. Με 175 Base SpAtk, το Fairy Hyper Voice παρακάμπτει Substitutes και κάνει τεράστια ζημιά και στους δύο αντιπάλους.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 167 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 144, boost: "" },
        { name: "Attack", ev: 0, stat: 94, boost: "drop" },
        { name: "Defense", ev: 0, stat: 85, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 227, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 155, boost: "" },
        { name: "Speed", ev: 252, stat: 167, boost: "boost" }
      ],
      moves: [
        { name: "Hyper Voice", type: "FAIRY", pwr: "90*", acc: "100%", priority: "0", effect: "💥 Pixilate Fairy sound spread nuke (+20% boost). Παρακάμπτει Substitutes!", learn: "Move Tutor", method: "Move Tutor" },
        { name: "Psyshock", type: "PSYCHIC", pwr: "80", acc: "100%", priority: "0", effect: "Χτυπάει το physical Defense του αντιπάλου (εξολοθρεύει Blissey και Chansey).", learn: "TM03", method: "TM" },
        { name: "Focus Blast", type: "FIGHTING", pwr: "120", acc: "70%", priority: "0", effect: "Κάλυψη Fighting για Steel τείχη (Heatran, Ferrothorn).", learn: "TM52", method: "TM" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστασία.", learn: "TM17", method: "TM" }
      ]
    },

    // 46. VENUSAUR
    venusaur: {
      id: "venusaur",
      name: "Venusaur",
      dexNum: "No. 003",
      species: "Seed Pokémon",
      gender: "♂",
      types: ["GRASS", "POISON"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Chlorophyll",
      abilityDesc: "Διπλασιάζει την ταχύτητα (Speed x2.0) υπό έντονο ήλιο, ξεπερνώντας κάθε άλλο Pokémon στο πεδίο!",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλη τη ζημιά κατά 30% με 10% recoil HP.",
      role: "Sun Chlorophyll Speed Demon & Sleep Controller",
      strategy: "Σε συνδυασμό με Mega Charizard Y, αποκτά άμεσα διπλάσια ταχύτητα. Κοιμίζει απειλές με Sleep Powder και εκτελεί Solar Beam σε 1 γύρο.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. Υπό ήλιο φτάνει 264 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 156, boost: "" },
        { name: "Attack", ev: 0, stat: 91, boost: "drop" },
        { name: "Defense", ev: 0, stat: 103, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 167, boost: "boost" },
        { name: "Sp. Def", ev: 0, stat: 120, boost: "" },
        { name: "Speed", ev: 252, stat: 132, boost: "" }
      ],
      moves: [
        { name: "Sludge Bomb", type: "POISON", pwr: "90", acc: "100%", priority: "0", effect: "Poison STAB. 30% πιθανότητα Poison. Εξολοθρεύει Fairies.", learn: "TM36", method: "TM" },
        { name: "Solar Beam", type: "GRASS", pwr: "120", acc: "100%", priority: "0", effect: "Υπό ήλιο εκτελείται σε 1 γύρο χωρίς φόρτιση!", learn: "TM22", method: "TM" },
        { name: "Sleep Powder", type: "GRASS", pwr: "—", acc: "75%", priority: "0", effect: "Κοιμίζει τον αντίπαλο. Κινείται πρώτο από όλα υπό ήλιο.", learn: "Level-Up Lv. 13", method: "Level-Up" },
        { name: "Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστασία.", learn: "TM17", method: "TM" }
      ]
    },

    // 47. LANDORUS-T
    landorus_t: {
      id: "landorus_t",
      name: "Landorus (Therian)",
      dexNum: "No. 645-T",
      species: "Abundance Pokémon",
      gender: "♂",
      types: ["GROUND", "FLYING"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Intimidate",
      abilityDesc: "Μειώνει το Attack όλων των αντιπάλων κατά 1 στάδιο κατά την είσοδο στο πεδίο.",
      heldItem: "Choice Scarf",
      itemDesc: "Αυξάνει το Speed κατά 50%, εξασφαλίζοντας ότι θα εκτελέσει Rock Slide ή Earthquake πρώτο.",
      role: "Intimidate Scarf Pivot & Rock Slide Spammer",
      strategy: "Το πιο διαχρονικό doubles Pokémon. Intimidate μειώνει physical ζημιά, Rock Slide χτυπάει και τους δύο με 30% Flinch και U-turn κρατάει το momentum.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/645.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/645.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. Με Scarf φτάνει 219 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 165, boost: "" },
        { name: "Attack", ev: 252, stat: 216, boost: "boost" },
        { name: "Defense", ev: 0, stat: 110, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 112, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 100, boost: "" },
        { name: "Speed", ev: 252, stat: 143, boost: "" }
      ],
      moves: [
        { name: "Earthquake", type: "GROUND", pwr: "100", acc: "100%", priority: "0", effect: "Ground spread physical STAB. Τεράστια ζημιά.", learn: "TM26", method: "TM" },
        { name: "Rock Slide", type: "ROCK", pwr: "75", acc: "90%", priority: "0", effect: "Spread attack. 30% Flinch rate! Σαρώνει υπό Scarf.", learn: "TM80", method: "TM" },
        { name: "U-turn", type: "BUG", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει switch για επαναφορά Intimidate.", learn: "TM89", method: "TM" },
        { name: "Superpower", type: "FIGHTING", pwr: "120", acc: "100%", priority: "0", effect: "Κάλυψη Fighting για αντίπαλα Steel και Normal Pokémon.", learn: "Move Tutor", method: "Move Tutor" }
      ]
    },

    // 48. GRENINJA
    greninja: {
      id: "greninja",
      name: "Greninja",
      dexNum: "No. 658",
      species: "Ninja Pokémon",
      gender: "♂",
      types: ["WATER", "DARK"],
      nature: "Timid (+Speed, -Attack)",
      ability: "Protean",
      abilityDesc: "Αλλάζει τον τύπο του Greninja στον τύπο της κίνησης που εκτελεί, δίνοντας STAB (1.5x) σε ΟΛΕΣ τις επιθέσεις του!",
      heldItem: "Life Orb",
      itemDesc: "Αυξάνει όλη τη ζημιά κατά 30% με 10% recoil HP.",
      role: "Protean Versatile Fast Nuker",
      strategy: "Με 122 Base Speed και Protean, αλλάζει τύπο για να αποκτά πάντα STAB και να αποφεύγει super-effective επιθέσεις, χτυπώντας με Ice Beam, Dark Pulse και Hydro Pump.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 Speed / 4 HP. 191 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 148, boost: "" },
        { name: "Attack", ev: 0, stat: 103, boost: "drop" },
        { name: "Defense", ev: 0, stat: 87, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 155, boost: "" },
        { name: "Sp. Def", ev: 0, stat: 91, boost: "" },
        { name: "Speed", ev: 252, stat: 191, boost: "boost" }
      ],
      moves: [
        { name: "Hydro Pump", type: "WATER", pwr: "110", acc: "80%", priority: "0", effect: "Water STAB. Υψηλή ειδική ζημιά.", learn: "Level-Up Lv. 68", method: "Level-Up" },
        { name: "Dark Pulse", type: "DARK", pwr: "80", acc: "100%", priority: "0", effect: "Dark STAB. 20% πιθανότητα Flinch.", learn: "TM97", method: "TM" },
        { name: "Ice Beam", type: "ICE", pwr: "90", acc: "100%", priority: "0", effect: "Protean Ice STAB! 10% πιθανότητα Freeze. Εξολοθρεύει Dragons.", learn: "TM13", method: "TM" },
        { name: "Water Shuriken", type: "WATER", pwr: "15x3", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Χτυπάει 2-5 φορές, τερματίζοντας Focus Sashes.", learn: "Level-Up Lv. 36", method: "Level-Up" }
      ]
    },

    // 49. TALONFLAME
    talonflame: {
      id: "talonflame",
      name: "Talonflame",
      dexNum: "No. 663",
      species: "Scorching Pokémon",
      gender: "♂",
      types: ["FIRE", "FLYING"],
      nature: "Adamant (+Attack, -Sp. Atk)",
      ability: "Gale Wings",
      abilityDesc: "Δίνει +1 Priority σε ΟΛΕΣ τις κινήσεις τύπου Flying (Brave Bird, Tailwind, Roost) όταν η ζωή του είναι στο 100%!",
      heldItem: "Sharp Beak",
      itemDesc: "Αυξάνει την ισχύ των Flying επιθέσεων κατά 20% χωρίς recoil cost.",
      role: "Gale Wings Priority Brave Bird Cleaner",
      strategy: "Σε πλήρη ζωή, το Brave Bird έχει +1 priority! Σαρώνει ταχύτατα Pokémon πριν προλάβουν να κινηθούν και θέτει Tailwind (+1 priority) για την ομάδα.",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/663.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/663.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 178 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 154, boost: "" },
        { name: "Attack", ev: 252, stat: 146, boost: "boost" },
        { name: "Defense", ev: 0, stat: 91, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 84, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 89, boost: "" },
        { name: "Speed", ev: 252, stat: 178, boost: "" }
      ],
      moves: [
        { name: "Brave Bird", type: "FLYING", pwr: "120", acc: "100%", priority: "+1*", effect: "⚡ Priority +1 σε 100% HP με Gale Wings! Τεράστια Flying physical ζημιά (33% recoil).", learn: "Level-Up Lv. 64", method: "Level-Up" },
        { name: "Flare Blitz", type: "FIRE", pwr: "120", acc: "100%", priority: "0", effect: "Fire STAB nuke. 33% recoil. 10% Burn.", learn: "Level-Up Lv. 77", method: "Level-Up" },
        { name: "Tailwind", type: "FLYING", pwr: "—", acc: "—", priority: "+1*", effect: "⚡ Priority +1 με Gale Wings! Διπλασιάζει το Speed της ομάδας.", learn: "Move Reminder", method: "Move Reminder" },
        { name: "Roost", type: "FLYING", pwr: "—", acc: "—", priority: "+1*", effect: "⚡ Priority +1 με Gale Wings! Ανακτά 50% HP για επαναφορά της ικανότητας.", learn: "TM51", method: "TM" }
      ]
    },

    // 50. MAGNEZONE (From local assets)
    magnezone: {
      id: "magnezone",
      name: "Magnezone",
      dexNum: "No. 462",
      species: "Magnet Area",
      gender: "—",
      types: ["ELECTRIC", "STEEL"],
      nature: "Modest (+Sp. Atk, -Attack)",
      ability: "Magnet Pull",
      abilityDesc: "Παγιδεύει όλα τα Steel Pokémon των αντιπάλων (Scizor, Skarmory, Ferrothorn) αποτρέποντάς τα από το να αλλάξουν!",
      heldItem: "Choice Specs",
      itemDesc: "Αυξάνει το Sp. Atk κατά 50%, εκτοξεύοντας το Thunderbolt σε καταστροφικά επίπεδα.",
      role: "Steel Trapper & Special Wallbreaker",
      strategy: "Παγιδεύει αντίπαλα Steel types με Magnet Pull και τα εξολοθρεύει με Thunderbolt ή Hidden Power Fire. Με 130 Base SpAtk κάνει τεράστιο neutral damage.",
      img: "./assets/magnezone.png",
      icon: "./assets/magnezone_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Sp. Atk / 252 HP / 4 Sp. Def. 197 SpAtk stat στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 252, stat: 177, boost: "" },
        { name: "Attack", ev: 0, stat: 81, boost: "drop" },
        { name: "Defense", ev: 0, stat: 135, boost: "" },
        { name: "Sp. Atk", ev: 252, stat: 197, boost: "boost" },
        { name: "Sp. Def", ev: 4, stat: 111, boost: "" },
        { name: "Speed", ev: 0, stat: 80, boost: "" }
      ],
      moves: [
        { name: "Thunderbolt", type: "ELECTRIC", pwr: "90", acc: "100%", priority: "0", effect: "Electric STAB. 10% πιθανότητα παράλυσης.", learn: "TM24", method: "TM24" },
        { name: "Flash Cannon", type: "STEEL", pwr: "80", acc: "100%", priority: "0", effect: "Steel STAB. 10% πιθανότητα -1 SpDef.", learn: "TM91", method: "TM91" },
        { name: "Volt Switch", type: "ELECTRIC", pwr: "70", acc: "100%", priority: "0", effect: "Επιτίθεται και κάνει switch-out για momentum.", learn: "TM89", method: "TM89" },
        { name: "Thunder Wave", type: "ELECTRIC", pwr: "—", acc: "90%", priority: "0", effect: "Παραλύει τον αντίπαλο μειώνοντας το Speed κατά 75%.", learn: "TM73", method: "TM73" }
      ]
    },

    // 51. LUCARIO (BDSP Regular)
    lucario: {
      id: "lucario",
      name: "Lucario",
      dexNum: "No. 448",
      species: "Aura Pokémon",
      gender: "♂",
      types: ["FIGHTING", "STEEL"],
      nature: "Jolly (+Speed, -Sp. Atk)",
      ability: "Inner Focus",
      abilityDesc: "Αποτρέπει το Flinch (ασυλία σε Fake Out) και προστατεύει από Intimidate στο Gen 8+!",
      heldItem: "Focus Sash",
      itemDesc: "Εξασφαλίζει επιβίωση 1 HP για ασφαλές Swords Dance turn.",
      role: "Swords Dance Priority Sweeper",
      strategy: "Κάνει Swords Dance στο turn 1 υπό την προστασία του Focus Sash. Στη συνέχεια σαρώνει με Extreme Speed (+2 priority) και Close Combat.",
      img: "./assets/lucario.png",
      icon: "./assets/lucario_icon.png",
      buildAnalysis: "<strong>EV Optimization:</strong> 252 Attack / 252 Speed / 4 HP. 156 Speed στο Lv. 50.",
      evStats: [
        { name: "HP", ev: 4, stat: 146, boost: "" },
        { name: "Attack", ev: 252, stat: 162, boost: "" },
        { name: "Defense", ev: 0, stat: 90, boost: "" },
        { name: "Sp. Atk", ev: 0, stat: 121, boost: "drop" },
        { name: "Sp. Def", ev: 0, stat: 90, boost: "" },
        { name: "Speed", ev: 252, stat: 156, boost: "boost" }
      ],
      moves: [
        { name: "Close Combat", type: "FIGHTING", pwr: "120", acc: "100%", priority: "0", effect: "Fighting physical STAB. Μειώνει Def και SpDef κατά 1.", learn: "Level-Up Lv. 60", method: "Level-Up" },
        { name: "Extreme Speed", type: "NORMAL", pwr: "80", acc: "100%", priority: "+2", effect: "⚡ Priority +2! Επιτίθεται πριν από άλλα priority moves.", learn: "Level-Up Lv. 65", method: "Level-Up" },
        { name: "Bullet Punch", type: "STEEL", pwr: "40", acc: "100%", priority: "+1", effect: "⚡ Priority +1. Steel attack για Fairies και Ghosts.", learn: "Egg Move", method: "Egg Move" },
        { name: "Swords Dance", type: "NORMAL", pwr: "—", acc: "—", priority: "0", effect: "Αυξάνει το Attack κατά 2 στάδια (+100%).", learn: "TM75", method: "TM75" }
      ]
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = competitiveDatabase;
}
`;

fs.writeFileSync(databaseFile, dbCode, 'utf8');
console.log('✅ competitive_database.js written successfully! Total size:', Buffer.byteLength(dbCode), 'bytes');
