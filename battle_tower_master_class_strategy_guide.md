# Pokémon BDSP Battle Tower: Master Class Strategy Guide

A comprehensive competitive manual for dominating the Master Class in *Pokémon Brilliant Diamond & Shining Pearl*, covering the primary **Dragon / Steel / Water** core, modular replacements, exact damage calculations, and in-depth analyses of previous team candidates.

---

## 1. Primary Recommendation: The Dragon / Steel / Water Core

The **Garchomp / Scizor / Suicune** tri-core (frequently called the *Fantasy Core*) resolves the issues associated with frail "glass cannon" lineups. Every single defensive liability in this trio is met with an immunity or a $4\times / 2\times$ resistance from a teammate.

### Defensive Synergy Matrix

| Active Pokémon | Threatening Moves / Types | Counter-Switch Target | Synergy Reason |
| :--- | :--- | :--- | :--- |
| **Garchomp** | Ice ($4\times$), Fairy ($2\times$), Dragon ($2\times$) | **Scizor** / **Suicune** | Scizor resists Ice ($4\times$) & Fairy ($2\times$). Suicune tanks Ice with massive natural bulk. |
| **Scizor** | Fire ($4\times$) | **Suicune** / **Garchomp** | Suicune resists Fire ($2\times$). Garchomp resists Fire ($2\times$) and threatens an immediate Ground STAB response. |
| **Suicune** | Electric ($2\times$), Grass ($2\times$) | **Garchomp** / **Scizor** | Garchomp possesses a complete Electric immunity. Scizor resists Grass ($4\times$). |

---

## 2. Primary Core Builds

### Garchomp — The Focus Sash Lead & Sweeper
* **Role:** Lead Wallbreaker & Revenge Killer
* **Held Item:** `Focus Sash`
  * *Why:* In Master Class, opposing leads frequently carry `Choice Scarf` with moves like *Draco Meteor* or *Ice Beam*. Focus Sash guarantees survival at $1\text{ HP}$, allowing Garchomp to secure a return KO or set up.
* **Ability:** `Rough Skin` (breaks opposing Focus Sashes on contact attacks).
* **Nature:** `Jolly` ($+\text{Speed}, -\text{Sp. Atk}$)
* **EV Spread:**
  * $\text{HP: } 4$
  * $\text{Attack: } 252$
  * $\text{Speed: } 252$

#### Moveset
1. **Earthquake** (Ground STAB, $100\text{ BP}$) — Primary coverage against Electric, Fire, Poison, Rock, and Steel types.
2. **Outrage** (Dragon STAB, $120\text{ BP}$) — High-power endgame sweep move; use after opposing Steel and Fairy types are removed.
3. **Swords Dance** ($+2\text{ Attack}$) — Set up on predicted switches or using the Focus Sash buffer.
4. **Fire Fang** (Fire Physical Coverage, $65\text{ BP}$) — Vital tech against Skarmory, Bronzong, and Ferrothorn that wall this set entirely.

> **How to teach Fire Fang:**  
> Visit the **Move Reminder** in Pastoria City (house by the water). Exchange **1 Heart Scale** to relearn *Fire Fang* over *Rock Slide*.

---

### Scizor — Priority Cleaner & Anti-Status Sweeper
* **Role:** Bulky Setup, Status Absorber & Priority Cleaner
* **Held Item:** `Lum Berry`
  * *Why:* Automatically cures Freeze, Burn, Paralysis, or Sleep once per battle. Turns enemy status attempts into a free turn of *Swords Dance*.
* **Ability:** `Technician` (Mandatory: boosts moves with $\le 60\text{ BP}$ by $50\%$).
* **Nature:** `Adamant` ($+\text{Attack}, -\text{Sp. Atk}$)
* **EV Spread:**
  * $\text{HP: } 252$
  * $\text{Attack: } 252$
  * $\text{Sp. Defense: } 4$  
    *(Bulky spread — Speed investment is unnecessary due to priority Bullet Punch).*

#### Moveset
1. **Bullet Punch** (Steel STAB, Priority $+1$) — Effectively $90\text{ BP}$ after STAB and Technician. Bypasses faster threats and Choice Scarf users.
2. **Swords Dance** ($+2\text{ Attack}$) — Doubles Attack in a single turn.
3. **Roost** ($50\%\text{ HP Recovery}$) — Sustains Scizor through prolonged engagements against neutral hits.
4. **Bug Bite** (Bug STAB, $60\text{ BP}$) — Reaches $135\text{ BP}$ via Technician and STAB; consumes and steals opposing held Berries (Sitrus, Lum, Yache).

---

### Suicune — The Impenetrable Bulwark (Anti-Hax & Setup Tank)
* **Role:** Defensive Anchor, Setup Sweeper, Status Cleaner
* **Held Item:** `Chesto Berry`
  * *Why:* Instantly wakes Suicune up on the same turn it uses *Rest*, providing a full HP reset with zero sleep downtime.
* **Ability:** `Pressure` (Doubles opponent PP consumption on low-PP moves).
* **Nature:** `Bold` ($+\text{Defense}, -\text{Attack}$)
* **EV Spread:**
  * $\text{HP: } 252$
  * $\text{Defense: } 252$
  * $\text{Sp. Attack: } 4$ (or $\text{Sp. Defense}$)

#### Moveset
1. **Scald** (Water STAB, $80\text{ BP}$) — Reliable STAB with a $30\%$ Burn chance, cutting physical attackers' Attack by $50\%$.
2. **Calm Mind** ($+1\text{ Sp. Atk}, +1\text{ Sp. Def}$) — Scales both special bulk and offensive output.
3. **Rest** ($100\%\text{ HP Recovery \& Status Cure}$) — Cleanses any Burn, Toxic, Freeze, or Paralysis while fully restoring HP.
4. **Ice Beam** (Ice Special Coverage, $90\text{ BP}$) — Hits Grass and Dragon types that resist Scald.

> **Obtaining Suicune:**  
> Catch the three Regis in Ramanas Park (Route 221) to unlock the **Johto Slate**, summon Suicune in the Johto Room at Lv. 70, and capture it.

---

## 3. Alternative Team Blueprints (With Cloyster & Togekiss)

If you have not caught Suicune yet or wish to leverage your existing roster, here are the two strongest alternative structures:

### Alternative Team 1: The "Shell Smash Blitz" (Cloyster / Garchomp / Scizor)

```
[Cloyster @ Focus Sash] ── Lead & Multi-Hit Breaker
[Garchomp @ Yache Berry / Life Orb] ── Fast Secondary Cleaner
[Scizor @ Lum Berry] ── Bulky Priority Anchor
```

* **Playstyle:** Hyper-Offensive sweep.
* **Execution:**
  1. Lead with **Cloyster**. Cast **Shell Smash** immediately on Turn 1.
  2. The Focus Sash guarantees survival at $1\text{ HP}$, while Cloyster's Speed doubles and Attack reaches formidable levels.
  3. Fire off **Icicle Spear** and **Rock Blast**. Because *Skill Link* guarantees 5 consecutive strikes, it immediately breaks enemy Focus Sashes, Dragonite *Multiscale*, and Sturdy abilities in a single turn.
  4. If Cloyster falls to a priority move or weather damage, **Scizor** enters to clean up with priority *Bullet Punch*, while **Garchomp** handles Fire/Steel/Electric types.

### Alternative Team 2: The "ParaFlinch Balance" (Togekiss / Garchomp / Scizor)

```
[Togekiss @ Leftovers] ── Lead Control & Speed Neutralizer
[Scizor @ Lum Berry] ── Bulky Swords Dance Sweeper
[Garchomp @ Focus Sash] ── Revenge Killer & Cleaner
```

* **Playstyle:** Control & Momentum Balance.
* **Execution:**
  1. Lead with **Togekiss**. Against fast or Scarfed leads, immediately deploy **Thunder Wave** to slash their Speed by $75\%$.
  2. Follow up with **Air Slash** (Serene Grace grants a $60\%$ flinch rate). Between full paralysis and flinching, the opponent has only a $\approx 30\%$ chance to act.
  3. Use Togekiss's Dragon and Ground immunities to safely switch in on predicted Earthquakes or Dragon attacks targeting Garchomp and Scizor.

---

## 4. Master Class Damage Calculations

The following calculations assume competitive Level 50 conditions (31 IVs across all stats, standard Battle Tower Master Class distributions):

### Scizor (+Attack Adamant, Technician)

$$\text{Formula: } \text{Damage} = \left(\left(\frac{2 \times 50}{5} + 2\right) \times \text{BP} \times \frac{\text{Atk}}{\text{Def} \times 50} + 2\right) \times \text{STAB} \times \text{TypeMod} \times \text{Random}$$

#### Unboosted Bullet Punch ($90\text{ BP}$)
* **vs. 4 HP / 0 Def Weavile:**
  * **$124.6\% - 147.9\%\text{ HP}$ $\rightarrow$ Guaranteed OHKO ($100\%$ chance)**.
  * *Result:* Weavile is removed before it can use Ice Shard or an Ice attack.
* **vs. 4 HP / 0 Def Tyranitar:**
  * **$58.5\% - 70.0\%\text{ HP}$ $\rightarrow$ Guaranteed 2HKO**.
* **vs. 0 HP / 0 Def Gengar:**
  * **$67.4\% - 79.2\%\text{ HP}$ $\rightarrow$ Guaranteed 2HKO** (OHKO if chipped or uninvested).

#### +2 Attack (After 1 Swords Dance) Bullet Punch
* **vs. 4 HP / 0 Def Latios:**
  * **$88.4\% - 104.4\%\text{ HP}$ $\rightarrow$ $31.3\%$ chance to OHKO** (Guaranteed OHKO with minor prior chip).
* **vs. 4 HP / 0 Def Tyranitar:**
  * **$115.9\% - 138.6\%\text{ HP}$ $\rightarrow$ Guaranteed OHKO ($100\%$ chance)**.
* **vs. 252 HP / 252+ Def Bold Clefable:**
  * **$118.8\% - 140.5\%\text{ HP}$ $\rightarrow$ Guaranteed OHKO ($100\%$ chance)**.

---

### Garchomp (+Speed Jolly, 252 Atk)

#### Earthquake ($100\text{ BP}$ STAB)
* **vs. 252 HP / 0 Def Heatran:**
  * **$208.0\% - 246.4\%\text{ HP}$ $\rightarrow$ Guaranteed OHKO ($4\times\text{ Super Effective}$)**.
* **vs. 252 HP / 0 Def Metagross:**
  * **$81.2\% - 96.2\%\text{ HP}$ $\rightarrow$ Guaranteed 2HKO** (OHKO after a Swords Dance or prior chip).
* **vs. 252 HP / 4 Def Tyranitar:**
  * **$89.8\% - 106.2\%\text{ HP}$ $\rightarrow$ $37.5\%$ chance to OHKO** ($100\%$ OHKO after Stealth Rock/chip).
* **vs. 4 HP / 0 Def Magnezone:**
  * **$224.6\% - 265.7\%\text{ HP}$ $\rightarrow$ Guaranteed OHKO** (breaks Sturdy via Rough Skin contact or second hit).

#### Fire Fang ($65\text{ BP}$)
* **vs. 252 HP / 252+ Def Bold Bronzong (Levitate):**
  * Unboosted: **$25.2\% - 31.0\%\text{ HP}$**
  * After $+2$ Swords Dance: **$50.5\% - 60.3\%\text{ HP}$ $\rightarrow$ Guaranteed 2HKO** (prevents Garchomp from being entirely stalled out).
* **vs. 252 HP / 252+ Def Impish Skarmory:**
  * After $+2$ Swords Dance: **$44.1\% - 52.3\%\text{ HP}$ $\rightarrow$ $14.1\%$ chance to 2HKO** (allows Garchomp to trade favorably).

---

## 5. Previous Team Pokémon: Builds & Strategic Analysis

### Azumarill (The Belly Drum Sweeper)
* **Viability Tier:** High Risk / High Reward (B-Tier in Master Class)
* **Held Item:** `Sitrus Berry` (Mandatory)
* **Ability:** `Huge Power` (Doubles Attack stat)
* **Nature:** `Adamant` ($+\text{Attack}, -\text{Sp. Atk}$)
* **EV Spread:**
  * $\text{HP: } 244$ (Ensures $198\text{ HP}$ **at Lv. 50 — Even Number!**)
  * $\text{Attack: } 252$
  * $\text{Speed: } 12$
* **Moveset:**
  1. **Belly Drum** (Maximizes Attack to $+6$ stages at the cost of $50\%\text{ HP}$)
  2. **Aqua Jet** (Water STAB, $+1\text{ Priority}$)
  3. **Play Rough** (Fairy STAB, $90\text{ BP}$)
  4. **Superpower** / **Ice Punch** (Coverage for Steel/Grass)
* **Why it failed previously:**
  1. **Odd HP ($199\text{ HP}$):** Belly Drum deducted $\lfloor 199 / 2 \rfloor = 99\text{ HP}$, leaving $100\text{ HP}$ ($>50\%$). The Sitrus Berry never triggered, leaving it vulnerable to being knocked out.
  2. **Priority Speed Ties:** At Base 50 Speed, opposing priority moves (e.g., Scizor's *Bullet Punch*, Weavile's *Ice Shard*) strike before *Aqua Jet*. A super-effective Bullet Punch easily removes a damaged Azumarill.

---

### Gengar (The Fragile Special Attacker)
* **Viability Tier:** Glass Cannon (B+ Tier in Master Class)
* **Held Item:** `Focus Sash` or `Life Orb`
* **Ability:** `Cursed Body`
* **Nature:** `Timid` ($+\text{Speed}, -\text{Attack}$)
* **EV Spread:** $\text{HP: } 4 \ /\ \text{Sp. Atk: } 252 \ /\ \text{Speed: } 252$
* **Moveset:**
  1. **Shadow Ball** (Ghost STAB)
  2. **Sludge Bomb** (Poison STAB)
  3. **Focus Blast** / **Thunderbolt**
  4. **Destiny Bond** / **Nasty Plot**
* **Why it struggled in Master Class:**
  * Master Class opponents run optimized IVs/EVs and frequently hold `Choice Scarf` (e.g., Latios, Tyranitar, Salamence, Starmie), cleanly outspeeding even a maximum-speed Timid Gengar.
  * Because Gengar possesses virtually no natural bulk, any neutral strike will KO it if its Focus Sash is broken or occupied by Garchomp.

---

### Togekiss (The "ParaFlinch" Disruptor)
* **Viability Tier:** High Control / Defensive Pivot (A+ Tier in Master Class)
* **Held Item:** `Leftovers` or `Lum Berry`
* **Ability:** `Serene Grace` (Doubles secondary effect chances)
* **Nature:** `Timid` ($+\text{Speed}, -\text{Attack}$) or `Modest`
* **EV Spread:** $\text{HP: } 252 \ /\ \text{Sp. Atk: } 4 \ /\ \text{Speed: } 252$
* **Moveset:**
  1. **Air Slash** (Flying STAB — boosted to a $60\%$ **Flinch rate** via Serene Grace)
  2. **Thunder Wave** (Reduces target Speed by $75\%$ and induces a $25\%$ full paralysis chance)
  3. **Dazzling Gleam** (Fairy STAB)
  4. **Roost** / **Flamethrower**
* **Role in Team:** An excellent alternative to Suicune. With *Thunder Wave* + *Air Slash*, the opposing Pokémon has only a $\approx 30\%$ chance to execute an action each turn, effectively shutting down faster Choice Scarf users.

---

### Cloyster (The Shell Smash Lead)
* **Viability Tier:** Dedicated Lead Sweeper (A Tier in Master Class)
* **Held Item:** `Focus Sash` (Mandatory)
* **Ability:** `Skill Link` (Multi-hit moves always hit 5 times)
* **Nature:** `Jolly` ($+\text{Speed}, -\text{Sp. Atk}$) or `Adamant`
* **EV Spread:** $\text{HP: } 4 \ /\ \text{Attack: } 252 \ /\ \text{Speed: } 252$
* **Moveset:**
  1. **Shell Smash** ($+2\text{ Attack}, +2\text{ Sp. Atk}, +2\text{ Speed}, -1\text{ Defenses}$)
  2. **Icicle Spear** (Ice Physical STAB, $5 \times 25 = 125\text{ BP}$)
  3. **Rock Blast** (Rock Coverage, $5 \times 25 = 125\text{ BP}$)
  4. **Ice Shard** (Priority STAB) / **Razor Shell**
* **Role in Team:** An alternate lead to Garchomp. Focus Sash absorbs any turn-1 attack, allowing Cloyster to execute *Shell Smash* and sweep the opponent's team with 5-hit attacks that break opposing Focus Sashes and Sturdy abilities.

---

### Magnezone (The Steel / Trapper Wall)
* **Viability Tier:** Specialized Pivot (B Tier in Master Class)
* **Held Item:** `Shuca Berry` (Halves Ground-type damage) or `Choice Specs`
* **Ability:** `Sturdy` or `Magnet Pull`
* **Nature:** `Modest` ($+\text{Sp. Atk}, -\text{Attack}$)
* **EV Spread:** $\text{HP: } 252 \ /\ \text{Sp. Atk: } 252 \ /\ \text{Speed: } 4$
* **Moveset:**
  1. **Thunderbolt** (Electric STAB)
  2. **Flash Cannon** (Steel STAB)
  3. **Volt Switch** (Pivoting)
  4. **Tri Attack** / **Thunder Wave**
* **Limitation:** A $4\times$ weakness to Ground leaves it heavily dependent on Shuca Berry. Outside of its specific resistances, its low speed exposes it to repeated neutral special hits.

---

### Lucario (The Mixed / Priority Sweeper)
* **Viability Tier:** Glass Sweeper (B- Tier in Master Class)
* **Held Item:** `Focus Sash` or `Life Orb`
* **Ability:** `Inner Focus` (Immunity to flinching)
* **Nature:** `Jolly` ($+\text{Speed}, -\text{Sp. Atk}$)
* **EV Spread:** $\text{HP: } 4 \ /\ \text{Attack: } 252 \ /\ \text{Speed: } 252$
* **Moveset:**
  1. **Close Combat** (Fighting STAB)
  2. **Meteor Mash** / **Bullet Punch** (Steel STAB)
  3. **Extreme Speed** ($+2\text{ Priority}$)
  4. **Swords Dance**
* **Limitation:** Lacks the defensive bulk and sustain (*Roost*) that make Scizor superior in extended Tower runs. Vulnerable to common Ground, Fire, and Fighting attacks.

---

### Tyranitar (The Sand Stream Juggernaut)
* **Viability Tier:** Bulky Weather Sweeper (B+ Tier in Master Class)
* **Held Item:** `Chople Berry` (Halves Fighting damage) or `Lum Berry`
* **Ability:** `Sand Stream` (Summons permanent Sandstorm, boosting Rock-types' Sp. Def by $50\%$)
* **Nature:** `Adamant` ($+\text{Attack}, -\text{Sp. Atk}$)
* **EV Spread:** $\text{HP: } 252 \ /\ \text{Attack: } 252 \ /\ \text{Speed: } 4$
* **Moveset:**
  1. **Stone Edge** / **Rock Slide** (Rock STAB)
  2. **Crunch** (Dark STAB)
  3. **Earthquake**
  4. **Dragon Dance** / **Fire Punch**
* **Limitation:** A $4\times$ weakness to Fighting and six additional weaknesses (Ground, Water, Grass, Steel, Bug, Fairy) make it prone to unexpected coverage moves from the Master Class AI.

---

## 6. Technical Mechanics Reference

### Even vs. Odd HP Calculations (The Belly Drum Rule)
For items with a $\le 50\%\text{ HP}$ threshold (such as `Sitrus Berry`) paired with half-damage moves like `Belly Drum`:
* **Odd Max HP (e.g., 199):** Belly Drum removes $\lfloor 199 / 2 \rfloor = 99\text{ HP}$, leaving $100\text{ HP}$. Since $100 > 99.5$, HP is strictly above $50\%$ $\rightarrow$ **Sitrus Berry fails to activate**.
* **Even Max HP (e.g., 198):** Belly Drum removes exactly $99\text{ HP}$, leaving $99\text{ HP}$ ($50.0\%$). **Sitrus Berry triggers immediately**, restoring $25\%$ max HP and leaving the user at $148\text{ HP}$ ($75\%$).
* **Correction Method:** Feed the Pokémon **1 Pomeg Berry** to decrease its HP EV by 10 points until Lv. 50 max HP equals an even number ($198$).

### Priority Bracket Interactions
When two Pokémon select moves in the same priority tier, turn order is decided **solely by the raw Speed stat**:

$$\text{Priority +1 Moves: } \text{Aqua Jet}, \ \text{Bullet Punch}, \ \text{Ice Shard}, \ \text{Mach Punch}, \ \text{Quick Attack}$$

* **Azumarill (Base 50 Speed)** using *Aqua Jet* will strike **after**:
  * Weavile (Base 125) with *Ice Shard*
  * Lucario (Base 90) with *Bullet Punch*
  * Mamoswine (Base 80) with *Ice Shard*
  * Scizor (Base 65) with *Bullet Punch*

### Perish Song Operational Rules
* **Activation:** Applies a 3-turn countdown to all active combatants without the `Soundproof` ability.
* **Count Sequence:** Turn 1 (count $= 3$), Turn 2 (count $= 2$), Turn 3 (count $= 1$), Turn 4 start (switch allowed) $\rightarrow$ Turn 4 end (count $= 0$, remaining Pokémon faint).
* **Switching Out:** Switching out during any turn resets and removes the counter for the exiting Pokémon completely.
* **Tie-Breaker Clause:** When both players are down to their final Pokémon and Perish Song reaches zero, the Pokémon with the **lower Speed stat faints second**, awarding that trainer the match victory.