# ⚡ Pokémon Champions — Competitive Battle Terminal

Ένα σύγχρονο, διαδραστικό web terminal για ανταγωνιστικό (competitive) παιχνίδι Pokémon, προσαρμοσμένο για singles (3v3 Trios) και doubles (4v4 Quads) σε πολλαπλά competitive formats και παιχνίδια:
- **💎 Brilliant Diamond & Shining Pearl (BDSP Gen 8):** Battle Tower Master Class meta cores (Fantasy Core, Rain Sweepers, Trick Room).
- **⚡ Scarlet & Violet (VGC Gen 9):** Επίσημο Regulation meta (Balance Cores, Sun Hyper Offense, Ruin Hazards).
- **🏙️ Legends: Z-A / Champions (Mega Meta):** Kalos Mega Evolution singles & doubles (Mega Lucario, Mega Gengar, Mega Kangaskhan, Mega Charizard Y).

---

## 🌟 Κύρια Χαρακτηριστικά (Key Features)

1. **🎯 Tactical Battle Playbook («Πώς παίζεται στη μάχη»):**
   - **🛡️ Ασφαλές Switch-in:** Πότε και απέναντι σε ποιες επιθέσεις/τύπους μπαίνει άφοβα στο γήπεδο.
   - **🏆 Το Πλάνο Νίκης:** Αναλυτικά, αριθμημένα βήματα τακτικής εκτέλεσης (setup moves, recover, sweep conditions).
   - **⚠️ Προσοχή:** Προειδοποιήσεις για counters, priority moves και κρίσιμα χτυπήματα.

2. **🔄 Move Alternatives System:**
   - Δυνατότητα άμεσης αλλαγής οποιασδήποτε κίνησης από την κάρτα μέσω του κουμπιού `🔄`.
   - Pop-up modal με αξιόπιστες εναλλακτικές επιλογές, αναλυτικά stats (PWR, ACC, Priority), εφέ και στρατηγική ανάλυση (*«Γιατί να το επιλέξετε»*).
   - Πλήρης ευελιξία επιστροφής στην αρχική κίνηση.

3. **📊 Competitive EV Optimization & Spreads:**
   - Οπτικοποίηση κατανομής EVs στο Lv. 50 flat format.
   - Gradient Pokémon Electric Blue μπάρες και σαφής διάκριση των maxed stats (252 EVs).
   - Φυσικές τάσεις Natures (+Boost, -Drop) και ακριβή HP breakpoints (π.χ. Sitrus Berry / Belly Drum).

4. **⚙️ Preferences Modal & Προσαρμογή Ομάδων:**
   - Επιλογή παιχνιδιού (BDSP, SV VGC, Legends Z-A).
   - Επιλογή φορμάτ (3v3 Trios ή 4v4 Quads).
   - Προτεινόμενες έτοιμες ομάδες (Preset Cores) με ένα κλικ.
   - Αναζήτηση και άμεση παραγωγή καρτών για οποιοδήποτε Pokémon.

---

## 🚀 Χρήση & Εκκίνηση (Quick Start)

Το project είναι πλήρως αυτόνομο (Zero Build Dependencies / Pure HTML, CSS, JavaScript):
1. Κλωνοποιήστε το αποθετήριο:
   ```bash
   git clone https://github.com/Solakas/PokemonChampion.git
   ```
2. Ανοίξτε το `index.html` (ή `pokemon_champions_summary.html`) σε οποιονδήποτε σύγχρονο browser.

---

## 📁 Δομή Αρχείων (Project Structure)

```text
├── index.html                           # Κεντρικό entry point της εφαρμογής
├── pokemon_champions_summary.html       # Κεντρικό template & διαδραστικό UI
├── competitive_database.js              # Πλήρης βάση δεδομένων competitive sets, guides & moves
├── battle_tower_master_class_strategy_guide.md  # Οδηγός στρατηγικής Battle Tower Master Class
├── assets/                              # 3D sprites, pixel icons, badges & assets
│   ├── garchomp.png
│   ├── scizor.png
│   ├── suicune.png
│   ├── cloyster.png
│   ├── togekiss.png
│   ├── azumarill.png
│   ├── tyranitar.png
│   ├── gengar.png
│   └── ...
└── README.md
```

---

## 🛠️ Τεχνολογίες
- **Vanilla Modern JavaScript (ES6+)**
- **Modern CSS3 (Flexbox & Grid, CSS Variables, Glassmorphism & Custom Scrollbars)**
- **GitHub Pages Ready**
