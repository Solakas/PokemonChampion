const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'pokemon_champions_summary.html');

const htmlContent = `<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Legends Z-A — Summary & Competitive Terminal</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --za-card-bg: #1c2640;
      --za-card-inner: #243254;
      --za-accent-cyan: #0284c7;
      --za-accent-sky: #38bdf8;
      --za-lime-active: #84cc16;
      --za-border-line: rgba(255, 255, 255, 0.16);
      --za-text-main: #f8fafc;
      --za-text-sub: #cbd5e1;
      --za-stat-bar-bg: #131c31;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      user-select: none;
    }

    body {
      background: radial-gradient(circle at 50% 20%, #47689b 0%, #293d66 45%, #18233c 85%, #0e1526 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--za-text-main);
      overflow-x: hidden;
    }

    .screen-frame {
      width: 100%;
      max-width: 1080px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* TOP BAR (Legends Z-A Header) */
    .top-legend-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 6px;
    }

    .summary-title-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.14);
      padding: 6px 18px 6px 8px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .summary-badge-icon {
      width: 28px;
      height: 28px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f172a;
      font-size: 14px;
      font-weight: 800;
    }

    .summary-text-label {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #ffffff;
    }

    /* Top Preferences Button */
    .btn-top-pref {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      padding: 7px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      backdrop-filter: blur(8px);
    }
    .btn-top-pref:hover {
      background: rgba(56, 189, 248, 0.3);
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
      transform: translateY(-1px);
    }

    /* Team Switch Strip in Top Bar */
    .team-switch-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .active-team-trio {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(15, 23, 42, 0.6);
      padding: 5px 8px;
      border-radius: 18px;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .mini-team-slot {
      width: 64px;
      height: 52px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.08);
      border: 1.5px solid transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .mini-team-slot:hover {
      background: rgba(255, 255, 255, 0.16);
      transform: translateY(-1px);
    }

    .mini-team-slot.active {
      background: linear-gradient(180deg, rgba(2, 132, 199, 0.5) 0%, rgba(56, 189, 248, 0.25) 100%);
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.6), inset 0 0 8px rgba(56, 189, 248, 0.3);
    }

    .mini-team-slot.active::after {
      content: "";
      position: absolute;
      bottom: -11px;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 8px solid #ffffff;
    }

    .mini-poke-icon {
      width: 40px;
      height: 40px;
      object-fit: contain;
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.4));
    }

    .mini-slot-num {
      font-size: 11px;
      font-weight: 800;
      color: #e2e8f0;
      margin-top: -3px;
    }
    .mini-team-slot.active .mini-slot-num {
      color: #ffffff;
      font-weight: 900;
    }

    /* MAIN LEGENDS Z-A CARD */
    .za-main-card {
      background: var(--za-card-bg);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.15);
      display: flex;
      flex-direction: column;
    }

    /* White Header Bar */
    .za-card-white-header {
      background: #ffffff;
      color: #0f172a;
      padding: 14px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid rgba(0, 0, 0, 0.06);
    }

    .header-left-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .pokeball-icon-sm {
      font-size: 22px;
    }

    .pokemon-title-name {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .header-right-meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .level-badge {
      font-size: 17px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .gender-symbol {
      color: #0284c7;
      font-weight: 900;
      font-size: 18px;
    }

    .types-strip {
      display: flex;
      gap: 6px;
    }

    .za-type-pill {
      font-size: 12px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 8px;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Pokemon Types */
    .type-DRAGON { background: #6366f1; }
    .type-GROUND { background: #d97706; }
    .type-BUG { background: #65a30d; }
    .type-STEEL { background: #64748b; }
    .type-WATER { background: #0284c7; }
    .type-ICE { background: #06b6d4; }
    .type-FAIRY { background: #ec4899; }
    .type-FLYING { background: #8b5cf6; }
    .type-GHOST { background: #7c3aed; }
    .type-POISON { background: #a855f7; }
    .type-ROCK { background: #b45309; }
    .type-FIRE { background: #ea580c; }
    .type-ELECTRIC { background: #eab308; color: #000; }
    .type-PSYCHIC { background: #f43f5e; }
    .type-NORMAL { background: #78716c; }
    .type-FIGHTING { background: #dc2626; }
    .type-GRASS { background: #16a34a; }
    .type-DARK { background: #475569; }

    /* Card Body Layout */
    .za-card-body {
      display: grid;
      grid-template-columns: 360px 1fr;
      min-height: 540px;
    }

    /* Left Stage: 3D Holographic Base */
    .za-center-stage {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 60%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.3) 70%);
      border-right: 1.5px solid var(--za-border-line);
      overflow: hidden;
      padding: 20px;
    }

    .za-hologram-circle {
      position: absolute;
      width: 250px;
      height: 80px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.4) 0%, rgba(2, 132, 199, 0.1) 60%, transparent 80%);
      bottom: 50px;
      border: 1.5px solid rgba(56, 189, 248, 0.5);
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
      transform: rotateX(60deg);
    }

    .za-pokemon-3d {
      width: 280px;
      height: 280px;
      object-fit: contain;
      z-index: 10;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6));
      transition: transform 0.3s ease;
    }
    .za-pokemon-3d:hover {
      transform: scale(1.04) translateY(-4px);
    }

    /* Right Content Panel */
    .za-content-panel {
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .za-role-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--za-border-line);
    }

    .role-badge {
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      padding: 5px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dex-subtitle {
      font-size: 14px;
      color: #cbd5e1;
      font-weight: 600;
    }

    .strategy-card-box {
      background: rgba(36, 50, 84, 0.6);
      border-left: 3px solid #38bdf8;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13.5px;
      color: #e2e8f0;
      line-height: 1.5;
    }

    /* EV Stat Table */
    .za-stats-section {
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 14px;
      padding: 14px 18px;
    }

    .section-headline {
      font-size: 13px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
    }

    .stats-rows-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat-line {
      display: grid;
      grid-template-columns: 110px 1fr 140px;
      align-items: center;
      gap: 12px;
    }

    .stat-label {
      font-size: 13.5px;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .boost-up { color: #f87171; font-size: 12px; font-weight: 900; }
    .boost-down { color: #60a5fa; font-size: 12px; font-weight: 900; }

    .stat-track {
      background: var(--za-stat-bar-bg);
      height: 9px;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stat-fill {
      height: 100%;
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      border-radius: 5px;
    }

    .stat-fill.active-ev {
      background: linear-gradient(90deg, #0284c7, #38bdf8);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.8);
    }

    .stat-ev-display {
      text-align: right;
      line-height: 1.2;
    }

    .ev-num {
      font-size: 15px;
      font-weight: 800;
      color: #38bdf8;
    }
    .ev-num.max {
      color: #facc15;
    }

    .stat-50-val {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 600;
    }

    /* 4 Move Cards (Legends Z-A Style) */
    .za-moves-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .za-move-card {
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .za-move-card:hover {
      border-color: #38bdf8;
      background: rgba(40, 56, 92, 0.9);
      transform: translateY(-2px);
    }

    .move-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .move-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .type-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .move-card-name {
      font-size: 15px;
      font-weight: 800;
      color: #ffffff;
    }

    .move-card-right-stats {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .priority-badge {
      font-size: 11px;
      font-weight: 800;
      color: #fef08a;
      background: rgba(234, 179, 8, 0.2);
      border: 1px solid rgba(234, 179, 8, 0.4);
      padding: 2px 7px;
      border-radius: 6px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .move-card-stats {
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      background: rgba(0, 0, 0, 0.35);
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .move-stat-val {
      color: #f8fafc;
      font-weight: 800;
    }

    .move-card-effect {
      font-size: 12px;
      line-height: 1.45;
      color: #cbd5e1;
      background: rgba(0, 0, 0, 0.25);
      padding: 6px 10px;
      border-radius: 8px;
      border-left: 2.5px solid #38bdf8;
      margin: 3px 0 2px 0;
    }

    .move-card-sub {
      font-size: 12.5px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 6px;
      margin-top: 2px;
    }

    .method-badge {
      color: #fde047;
      font-weight: 800;
    }

    /* Lower Meta: Held Item + Ability + Nature */
    .za-lower-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 14px;
      padding: 12px 20px;
      font-size: 14px;
    }

    .meta-hover-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: help;
    }

    .meta-title-lbl {
      color: #94a3b8;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 13px;
    }

    .item-badge-val {
      color: #38bdf8;
      font-weight: 800;
      background: rgba(56, 189, 248, 0.15);
      padding: 5px 14px;
      border-radius: 8px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .meta-hover-wrap:hover .item-badge-val {
      background: rgba(56, 189, 248, 0.25);
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
    }

    .ability-name-val {
      color: #86efac;
      font-weight: 800;
      background: rgba(34, 197, 94, 0.15);
      padding: 5px 14px;
      border-radius: 8px;
      border: 1px solid rgba(134, 239, 172, 0.4);
      transition: all 0.2s ease;
    }

    .meta-hover-wrap:hover .ability-name-val {
      background: rgba(34, 197, 94, 0.25);
      border-color: #86efac;
      box-shadow: 0 0 12px rgba(134, 239, 172, 0.4);
    }

    .za-tooltip {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: #0f172a;
      border: 1.5px solid #38bdf8;
      color: #f1f5f9;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.45;
      font-weight: 600;
      width: 250px;
      text-align: center;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.7);
      pointer-events: none;
      opacity: 0;
      transition: all 0.2s ease;
      z-index: 100;
    }

    .za-tooltip::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #38bdf8;
    }

    .meta-hover-wrap:hover .za-tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .nature-alignment-val {
      color: #fde047;
      font-weight: 800;
    }

    /* ACTION BAR */
    .za-action-bar {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
    }

    .active-team-indicator-tag {
      font-size: 15px;
      font-weight: 800;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .actions-group {
      display: flex;
      gap: 12px;
    }

    .btn-action-main {
      background: rgba(255, 255, 255, 0.12);
      border: 1.5px solid rgba(255, 255, 255, 0.25);
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .btn-action-main:hover {
      background: rgba(56, 189, 248, 0.3);
      border-color: #38bdf8;
      transform: translateY(-2px);
    }

    .btn-action-main.primary-accent {
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      border-color: #818cf8;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
    }

    .btn-action-main.agent-accent {
      background: linear-gradient(135deg, #059669, #0284c7);
      border-color: #38bdf8;
      box-shadow: 0 4px 16px rgba(2, 132, 199, 0.4);
    }

    /* MODAL POPUPS */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }
    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-content {
      background: #1e293b;
      border: 2px solid rgba(56, 189, 248, 0.5);
      border-radius: 24px;
      padding: 28px;
      max-width: 760px;
      width: 92%;
      color: #f1f5f9;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85);
      max-height: 85vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .modal-header-title {
      font-size: 22px;
      font-weight: 800;
      color: #facc15;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .modal-body-text {
      font-size: 14.5px;
      line-height: 1.65;
      color: #cbd5e1;
      margin-bottom: 20px;
      flex: 1;
    }

    .modal-btn-close {
      background: #334155;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      padding: 10px 24px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 14px;
      cursor: pointer;
      align-self: flex-end;
    }
    .modal-btn-close:hover {
      background: #475569;
    }

    /* Team recommendation items in modal */
    .team-rec-item {
      background: rgba(255, 255, 255, 0.06);
      border: 1.5px solid rgba(255, 255, 255, 0.14);
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .team-rec-item:hover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }
    .team-rec-item.selected {
      border: 2px solid #38bdf8 !important;
      background: rgba(56, 189, 248, 0.18) !important;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.35) !important;
    }

    /* Preferences Grid Cards */
    .pref-section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #94a3b8;
      margin-bottom: 8px;
    }

    .pref-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
      margin-bottom: 18px;
    }

    .pref-card {
      background: rgba(255, 255, 255, 0.06);
      border: 1.5px solid rgba(255, 255, 255, 0.16);
      border-radius: 14px;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .pref-card:hover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.1);
    }
    .pref-card.selected {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.22);
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.35);
    }
  </style>
</head>
<body>

  <div class="screen-frame">

    <!-- TOP BAR (Legends Z-A Header) -->
    <div class="top-legend-bar">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div class="summary-title-pill">
          <div class="summary-badge-icon">📋</div>
          <span class="summary-text-label">Summary</span>
        </div>
        <button class="btn-top-pref" onclick="openModal('preferences')">
          ⚙️ Preferences
        </button>
      </div>

      <!-- Top Team Strip: ONLY Active Team Members (3 for Singles, 4 for Doubles) -->
      <div class="team-switch-wrapper">
        <div class="active-team-trio" id="activeTeamTrio">
          <!-- Active Pokemon mini tabs rendered via JS -->
        </div>
      </div>
    </div>

    <!-- MAIN POKÉMON CARD (Legends Z-A Blueprint) -->
    <div class="za-main-card">

      <!-- White Header Bar -->
      <div class="za-card-white-header">
        <div class="header-left-info">
          <span class="pokeball-icon-sm">🔴</span>
          <span class="pokemon-title-name" id="pokeMainName">Garchomp</span>
        </div>
        <div class="header-right-meta">
          <span class="level-badge">
            Lv. 50 <span class="gender-symbol" id="pokeGender">♂</span>
          </span>
          <div class="types-strip" id="typePills"></div>
        </div>
      </div>

      <!-- Card Interior -->
      <div class="za-card-body">

        <!-- Center Stage: 3D Render & Holographic Ring -->
        <div class="za-center-stage">
          <div class="za-hologram-circle"></div>
          <img id="poke3dImg" class="za-pokemon-3d" src="" alt="Pokemon">
        </div>

        <!-- Right Content Panel -->
        <div class="za-content-panel">

          <!-- Role & Banner -->
          <div class="za-role-banner">
            <div>
              <span class="role-badge" id="roleTag">Lead Wallbreaker</span>
              <span class="dex-subtitle" id="dexSubtitle" style="margin-left: 10px;">No. 445 Mach Pokémon</span>
            </div>
            <div style="font-size: 14px; color: #38bdf8; font-weight: 800;" id="teamSlotLabel">
              Active Team 1/3 (Lead)
            </div>
          </div>

          <!-- Strategy Description -->
          <div class="strategy-card-box" id="strategyDesc">
            Εγγυημένη επιβίωση 1 HP με Focus Sash απέναντι σε Choice Scarf Ice/Dragon leads.
          </div>

          <!-- EV Spread Table -->
          <div class="za-stats-section">
            <div class="section-headline">
              <span>EV Spread (Lv. 50 Optimization)</span>
              <span style="color: #38bdf8;" id="totalEvHeader">508 / 508 EVs</span>
            </div>
            <div class="stats-rows-container" id="statRowsContainer">
              <!-- EV Rows -->
            </div>
          </div>

          <!-- Moves Grid (4 Attacks with PWR, ACC, Priority & Effect) -->
          <div>
            <div class="section-headline">
              <span id="movesHeaderTitle">Known Moves (Battle Ready)</span>
              <span style="color: #cbd5e1;">Competitive Sets</span>
            </div>
            <div class="za-moves-grid" id="movesGrid">
              <!-- 4 Move Cards -->
            </div>
          </div>

          <!-- Lower Meta: Held Item (with hover tooltip) + Ability (with tooltip) + Nature -->
          <div class="za-lower-meta">
            <!-- Held Item with Hover Description -->
            <div class="meta-hover-wrap">
              <span class="meta-title-lbl">🎒 Held Item</span>
              <span class="item-badge-val" id="lowerHeldItemText">Focus Sash</span>
              <div class="za-tooltip" id="itemTooltipText">
                Αν ο κάτοχος δεχθεί επίθεση που θα τον έβγαζε KO με πλήρη ζωή, επιβιώνει εγγυημένα στο 1 HP.
              </div>
            </div>

            <!-- Ability with Hover Description -->
            <div class="meta-hover-wrap">
              <span class="meta-title-lbl">⚡ Ability</span>
              <span class="ability-name-val" id="abilityText">Rough Skin</span>
              <div class="za-tooltip" id="abilityTooltipText">
                Προκαλεί ζημιά ίση με το 1/8 της ζωής στον αντίπαλο αν κάνει physical επαφή.
              </div>
            </div>

            <!-- Nature -->
            <div>
              <span style="color: #cbd5e1; font-weight: 600;">Nature:</span>
              <span class="nature-alignment-val" id="natureAlignmentText">Jolly (+Speed, -Sp. Atk)</span>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- ACTION BAR -->
    <div class="za-action-bar">
      <div class="active-team-indicator-tag" id="currentTeamNameBadge">
        🛡️ Ενεργή Ομάδα: Master Tower Alpha Core
      </div>

      <div class="actions-group">
        <button class="btn-action-main primary-accent" id="btnTeamRecs" onclick="openModal('teams')">
          🛡️ Προτάσεις Τριάδων
        </button>
        <button class="btn-action-main" id="btnSwapPoke" onclick="openModal('swap')">
          🔄 Αλλαγή Pokémon
        </button>
        <button class="btn-action-main" onclick="openModal('preferences')">
          ⚙️ Προτιμήσεις
        </button>
        <button class="btn-action-main agent-accent" onclick="openModal('agent')">
          🤖 AI Agent: Ζήτα Κάρτα
        </button>
      </div>
    </div>

  </div>

  <!-- Interactive Action Modal -->
  <div class="modal-overlay" id="actionModal" onclick="closeModalOnBg(event)">
    <div class="modal-content">
      <div class="modal-header-title" id="modalTitle">Title</div>
      <div class="modal-body-text" id="modalBody">Body content...</div>
      <button class="modal-btn-close" onclick="closeModal()">Κλείσιμο</button>
    </div>
  </div>

  <!-- Load Comprehensive Competitive Database -->
  <script src="./competitive_database.js"></script>

  <script>
    // State Management
    let userPreferences = {
      game: "bdsp",     // "bdsp", "sv_vgc", "legends_za"
      format: "singles" // "singles" (3v3), "doubles" (4v4)
    };
    let tempPreferences = { ...userPreferences };

    // Saved preferences in localStorage
    try {
      const saved = localStorage.getItem("pokemon_summary_prefs");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.game && parsed.format) {
          userPreferences = parsed;
          tempPreferences = { ...userPreferences };
        }
      }
    } catch(e) {}

    // Active Team State
    let activeTeamIds = ["garchomp", "scizor", "suicune"];
    let activeSlot = 0; // 0..2 for Singles, 0..3 for Doubles
    let currentTeamTitle = "Master Tower Alpha Core";
    let selectedPresetTeamId = "bdsp_s_fantasy";
    let customPokemon = {};

    function getPokemon(id) {
      if (customPokemon[id]) return customPokemon[id];
      if (competitiveDatabase.pokemon[id]) return competitiveDatabase.pokemon[id];
      return null;
    }

    // Set initial active team based on current preferences
    function initActiveTeam() {
      const teamKey = \`\${userPreferences.game}_\${userPreferences.format}\`;
      const teams = competitiveDatabase.presetTeams[teamKey] || [];
      if (teams.length > 0) {
        selectedPresetTeamId = teams[0].id;
        currentTeamTitle = teams[0].title;
        activeTeamIds = [...teams[0].members];
      } else {
        activeTeamIds = userPreferences.format === "singles" ? ["garchomp", "scizor", "suicune"] : ["pelipper", "kingdra", "raikou", "scizor"];
      }
      activeSlot = 0;
    }

    initActiveTeam();

    // Render active slots in the top bar (3 or 4)
    function renderTopTabs() {
      const formatCfg = competitiveDatabase.formats[userPreferences.format];
      const maxSlots = formatCfg.slots;
      
      // Ensure activeTeamIds has exactly maxSlots
      while (activeTeamIds.length < maxSlots) {
        const allKeys = Object.keys(competitiveDatabase.pokemon);
        const nextPoke = allKeys.find(k => !activeTeamIds.includes(k)) || "garchomp";
        activeTeamIds.push(nextPoke);
      }
      if (activeTeamIds.length > maxSlots) {
        activeTeamIds = activeTeamIds.slice(0, maxSlots);
      }
      if (activeSlot >= maxSlots) activeSlot = 0;

      const tabsContainer = document.getElementById("activeTeamTrio");
      tabsContainer.innerHTML = activeTeamIds.map((pId, idx) => {
        const p = getPokemon(pId);
        const isActive = idx === activeSlot;
        const iconSrc = p && p.icon ? p.icon : "./assets/garchomp_icon.png";
        return \`
          <div class="mini-team-slot \${isActive ? 'active' : ''}" onclick="selectSlot(\${idx})">
            <img class="mini-poke-icon" src="\${iconSrc}" alt="\${p ? p.name : pId}">
            <span class="mini-slot-num">\${idx + 1}</span>
          </div>
        \`;
      }).join("");

      document.getElementById("currentTeamNameBadge").innerHTML = \`🛡️ Ενεργή Ομάδα: <strong>\${currentTeamTitle}</strong>\`;

      // Update button labels according to format
      const isSingles = userPreferences.format === "singles";
      document.getElementById("btnTeamRecs").innerHTML = isSingles ? "🛡️ Προτάσεις Τριάδων" : "👥 Προτάσεις Τετράδων";
      document.getElementById("btnSwapPoke").innerHTML = isSingles ? "🔄 Αλλαγή Pokémon Τριάδας" : "🔄 Αλλαγή Pokémon Τετράδας";
    }

    function selectSlot(slotIdx) {
      activeSlot = slotIdx;
      renderTopTabs();
      renderActiveCard();
    }

    function renderActiveCard() {
      const activeId = activeTeamIds[activeSlot];
      const p = getPokemon(activeId);
      if (!p) return;

      const formatCfg = competitiveDatabase.formats[userPreferences.format];
      const gameCfg = competitiveDatabase.games[userPreferences.game];

      // Header Bar
      document.getElementById("pokeMainName").textContent = p.name;
      document.getElementById("pokeGender").textContent = p.gender;
      document.getElementById("typePills").innerHTML = p.types.map(t => \`
        <span class="za-type-pill type-\${t}">\${t}</span>
      \`).join("");

      // Stage Image
      document.getElementById("poke3dImg").src = p.img;

      // Role & Banner
      document.getElementById("roleTag").textContent = p.role;
      document.getElementById("dexSubtitle").textContent = \`\${p.dexNum} · \${p.species}\`;
      
      const slotLabelText = formatCfg.slotLabels[activeSlot] || \`Active Slot \${activeSlot + 1}/\${formatCfg.slots}\`;
      document.getElementById("teamSlotLabel").textContent = slotLabelText;
      document.getElementById("strategyDesc").textContent = p.strategy;

      // Moves Header Title
      document.getElementById("movesHeaderTitle").textContent = \`Known Moves (\${gameCfg.shortName})\`;

      // EV Stats
      const totalEvs = p.evStats.reduce((acc, curr) => acc + curr.ev, 0);
      document.getElementById("totalEvHeader").textContent = \`\${totalEvs} / 508 EVs\`;

      const statRowsContainer = document.getElementById("statRowsContainer");
      statRowsContainer.innerHTML = p.evStats.map(s => {
        let boostSymbol = "";
        if (s.boost === "boost") boostSymbol = \`<span class="boost-up">▲</span>\`;
        if (s.boost === "drop") boostSymbol = \`<span class="boost-down">▼</span>\`;

        const isMaxed = s.ev >= 244;
        const fillPercent = Math.round((s.ev / 252) * 100);

        return \`
          <div class="stat-line">
            <span class="stat-label">\${boostSymbol} \${s.name}</span>
            <div class="stat-track">
              <div class="stat-fill \${isMaxed ? 'active-ev' : ''}" style="width: \${fillPercent}%"></div>
            </div>
            <div class="stat-ev-display">
              <span class="ev-num \${isMaxed ? 'max' : ''}">\${s.ev} EV</span>
              <span class="stat-50-val"> (Lv50: \${s.stat})</span>
            </div>
          </div>
        \`;
      }).join("");

      // 4 Moves with PWR, ACC, Priority & Effect Description
      const movesGrid = document.getElementById("movesGrid");
      movesGrid.innerHTML = p.moves.map(m => {
        const hasPriority = m.priority && m.priority !== "0";
        const priorityBadge = hasPriority ? \`<span class="priority-badge">⚡ Priority \${m.priority}</span>\` : "";
        const effectHtml = m.effect ? \`<div class="move-card-effect">\${m.effect}</div>\` : "";

        return \`
          <div class="za-move-card">
            <div class="move-card-top">
              <div class="move-title-wrap">
                <span class="type-dot type-\${m.type}"></span>
                <span class="move-card-name">\${m.name}</span>
              </div>
              <div class="move-card-right-stats">
                \${priorityBadge}
                <span class="move-card-stats">
                  <span>PWR <span class="move-stat-val">\${m.pwr || "—"}</span></span>
                  <span style="opacity:0.4;">|</span>
                  <span>ACC <span class="move-stat-val">\${m.acc || "—"}</span></span>
                </span>
              </div>
            </div>
            \${effectHtml}
            <div class="move-card-sub">
              <span>\${m.learn}</span>
              <span class="method-badge">\${m.method}</span>
            </div>
          </div>
        \`;
      }).join("");

      // Meta & Tooltips
      document.getElementById("lowerHeldItemText").textContent = p.heldItem;
      document.getElementById("itemTooltipText").textContent = p.itemDesc || "Αντικείμενο που κρατάει το Pokémon ενισχύοντας τα στατιστικά ή τη στρατηγική του.";
      
      document.getElementById("abilityText").textContent = p.ability;
      document.getElementById("abilityTooltipText").textContent = p.abilityDesc || "Μοναδική ειδική ικανότητα του Pokémon.";
      
      document.getElementById("natureAlignmentText").textContent = p.nature;
    }

    // Modal Control Logic
    function openModal(type) {
      const currentPoke = getPokemon(activeTeamIds[activeSlot]);
      const modal = document.getElementById("actionModal");
      const title = document.getElementById("modalTitle");
      const body = document.getElementById("modalBody");

      if (type === "preferences") {
        tempPreferences = { ...userPreferences };
        renderPreferencesModal();
      } else if (type === "teams") {
        renderTeamsModal();
      } else if (type === "swap") {
        const formatCfg = competitiveDatabase.formats[userPreferences.format];
        title.innerHTML = \`🔄 Αντικατάσταση Θέσης \${activeSlot + 1}/\${formatCfg.slots}\`;
        
        // Bench contains all other registered pokemon
        const allRegistered = { ...competitiveDatabase.pokemon, ...customPokemon };
        const benchKeys = Object.keys(allRegistered).filter(id => !activeTeamIds.includes(id));

        body.innerHTML = \`
          <strong>Τρέχον Pokémon στη Θέση \${activeSlot + 1}:</strong> \${currentPoke.name} (\${currentPoke.role})
          <br><br>
          <strong>Επιλέξτε Pokémon από τη βάση δεδομένων για αντικατάσταση:</strong>
          <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px; max-height: 50vh; overflow-y:auto; padding-right: 6px;">
            \${benchKeys.map(bId => {
              const b = allRegistered[bId];
              return \`
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.08); padding:10px 16px; border-radius:12px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <img src="\${b.icon}" style="width:36px; height:36px; object-fit:contain;">
                    <div>
                      <strong style="font-size:16px;">\${b.name}</strong> — <span style="font-size:13px; color:#cbd5e1;">\${b.role}</span>
                      <div style="font-size:12px; color:#94a3b8; margin-top:2px;">\${b.types.join('/')} · \${b.heldItem}</div>
                    </div>
                  </div>
                  <button class="btn-action-main" style="padding:6px 16px; font-size:13px;" onclick="replaceCurrentSlot('\${b.id}')">
                    Επιλογή
                  </button>
                </div>
              \`;
            }).join('')}
          </div>
        \`;
      } else if (type === "agent") {
        title.innerHTML = \`🤖 AI Agent Assistant: Δημιουργία & Πρόταση Κάρτας\`;
        body.innerHTML = \`
          <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">
            Πληκτρολογήστε οποιοδήποτε Pokémon για να δημιουργηθεί άμεσα η competitive κάρτα του με υπολογισμένα EVs, nature, ρόλο και κινήσεις:
          </p>
          <div style="display:flex; gap:10px; margin-top:14px;">
            <input type="text" id="agentInput" style="flex:1; background:rgba(30,41,59,0.95); border:1.5px solid rgba(255,255,255,0.3); border-radius:12px; padding:12px 16px; color:#fff; font-size:16px; outline:none;" placeholder="π.χ. Tyranitar, Lucario, Gengar, Flutter Mane, Urshifu..." onkeydown="if(event.key==='Enter') executeAgentRequest()">
            <button class="btn-action-main agent-accent" onclick="executeAgentRequest()">Δημιουργία</button>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:16px;">
            <button class="btn-action-main" style="font-size:13px; padding:6px 14px;" onclick="quickAgent('tyranitar')">⚡ Tyranitar</button>
            <button class="btn-action-main" style="font-size:13px; padding:6px 14px;" onclick="quickAgent('lucario')">⚡ Lucario</button>
            <button class="btn-action-main" style="font-size:13px; padding:6px 14px;" onclick="quickAgent('flutter_mane')">⚡ Flutter Mane</button>
            <button class="btn-action-main" style="font-size:13px; padding:6px 14px;" onclick="quickAgent('incineroar')">⚡ Incineroar</button>
            <button class="btn-action-main" style="font-size:13px; padding:6px 14px;" onclick="quickAgent('mega_lucario')">⚡ Mega Lucario</button>
          </div>
          <div id="agentStatus" style="margin-top:16px; font-size:14px; color:#38bdf8; font-weight:700;"></div>
        \`;
      }

      modal.classList.add("open");
    }

    // PREFERENCES MODAL
    function renderPreferencesModal() {
      const title = document.getElementById("modalTitle");
      const body = document.getElementById("modalBody");
      title.innerHTML = \`⚙️ Προτιμήσεις Παιχνιδιού & Format Μάχης\`;

      const games = Object.values(competitiveDatabase.games);
      const formats = Object.values(competitiveDatabase.formats);

      body.innerHTML = \`
        <div class="pref-section-title">1. Επιλογή Παιχνιδιού / Γενιάς</div>
        <div class="pref-grid">
          \${games.map(g => \`
            <div class="pref-card \${tempPreferences.game === g.id ? 'selected' : ''}" onclick="selectTempGame('\${g.id}')">
              <strong style="color:#f8fafc; font-size:15px; display:block; margin-bottom:4px;">\${g.name}</strong>
              <span style="font-size:12px; color:#cbd5e1; line-height:1.4; display:block;">\${g.desc}</span>
            </div>
          \`).join('')}
        </div>

        <div class="pref-section-title">2. Επιλογή Format Μάχης</div>
        <div class="pref-grid">
          \${formats.map(f => \`
            <div class="pref-card \${tempPreferences.format === f.id ? 'selected' : ''}" onclick="selectTempFormat('\${f.id}')">
              <strong style="color:#f8fafc; font-size:15px; display:block; margin-bottom:4px;">\${f.name}</strong>
              <span style="font-size:12px; color:#cbd5e1; line-height:1.4; display:block;">\${f.desc}</span>
            </div>
          \`).join('')}
        </div>

        <div style="background:rgba(2,132,199,0.15); border:1px solid #0284c7; border-radius:12px; padding:12px 16px; margin: 16px 0; font-size:13.5px; color:#e0f2fe;">
          ℹ️ <strong>Επιλεγμένο Setup:</strong> \${competitiveDatabase.games[tempPreferences.game].shortName} — \${competitiveDatabase.formats[tempPreferences.format].name}.
          Η σελίδα θα προσαρμόσει αυτόματα τον αριθμό των slots (\${competitiveDatabase.formats[tempPreferences.format].slots} μέλη) και τις διαθέσιμες προτάσεις ομάδων!
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
          <button class="btn-action-main primary-accent" style="padding:10px 24px; font-size:15px;" onclick="savePreferences()">
            💾 Αποθήκευση & Εφαρμογή
          </button>
        </div>
      \`;
    }

    function selectTempGame(gameId) {
      tempPreferences.game = gameId;
      renderPreferencesModal();
    }

    function selectTempFormat(formatId) {
      tempPreferences.format = formatId;
      renderPreferencesModal();
    }

    function savePreferences() {
      userPreferences = { ...tempPreferences };
      try {
        localStorage.setItem("pokemon_summary_prefs", JSON.stringify(userPreferences));
      } catch(e) {}

      initActiveTeam();
      renderTopTabs();
      renderActiveCard();
      closeModal();
    }

    // TEAMS MODAL WITH INTERACTIVE CONFIRMATION BUTTON
    function renderTeamsModal() {
      const title = document.getElementById("modalTitle");
      const body = document.getElementById("modalBody");
      const isSingles = userPreferences.format === "singles";
      const teamKey = \`\${userPreferences.game}_\${userPreferences.format}\`;
      const availableTeams = competitiveDatabase.presetTeams[teamKey] || [];
      const gameCfg = competitiveDatabase.games[userPreferences.game];

      title.innerHTML = \`🛡️ Προτάσεις \${isSingles ? 'Τριάδων' : 'Τετράδων'} (\${gameCfg.badge})\`;

      body.innerHTML = \`
        <p style="margin-bottom:12px; font-size:14px; color:#cbd5e1;">
          Επιλέξτε μια από τις competitive ομάδες για το format <strong>\${gameCfg.shortName}</strong>. 
          Κάντε κλικ στην ομάδα που επιθυμείτε και πατήστε <strong>Επιβεβαίωση</strong> στο κάτω μέρος:
        </p>

        <div style="max-height:55vh; overflow-y:auto; padding-right:6px; margin-bottom:18px;">
          \${availableTeams.map(t => {
            const isSelected = t.id === selectedPresetTeamId;
            return \`
              <div class="team-rec-item \${isSelected ? 'selected' : ''}" onclick="selectPresetTeamItem('\${t.id}')">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:18px;">\${isSelected ? '🔘' : '⚪'}</span>
                    <strong style="color:#fef08a; font-size:17px;">\${t.title}</strong>
                  </div>
                  <span style="background:#2563eb; color:#fff; font-size:12px; font-weight:800; padding:3px 10px; border-radius:6px;">\${t.tag}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px; margin:10px 0;">
                  \${t.members.map((mId, slot) => {
                    const m = getPokemon(mId);
                    return \`
                      <span style="background:rgba(255,255,255,0.1); padding:5px 12px; border-radius:8px; font-size:13.5px; font-weight:700; display:flex; align-items:center; gap:6px;">
                        <img src="\${m ? m.icon : ''}" style="width:24px; height:24px; object-fit:contain;">
                        \${slot + 1}. \${m ? m.name : mId}
                      </span>
                    \`;
                  }).join('')}
                </div>
                <p style="font-size:13px; color:#cbd5e1; line-height:1.5;">\${t.desc}</p>
              </div>
            \`;
          }).join('')}
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.15); padding-top:16px;">
          <button class="btn-action-main primary-accent" onclick="confirmTeamSelection()" style="width:100%; justify-content:center; padding:12px; font-size:16px;">
            ✅ Επιβεβαίωση & Εφαρμογή Ομάδας
          </button>
        </div>
      \`;
    }

    function selectPresetTeamItem(teamId) {
      selectedPresetTeamId = teamId;
      renderTeamsModal();
    }

    function confirmTeamSelection() {
      const teamKey = \`\${userPreferences.game}_\${userPreferences.format}\`;
      const availableTeams = competitiveDatabase.presetTeams[teamKey] || [];
      const chosen = availableTeams.find(t => t.id === selectedPresetTeamId) || availableTeams[0];
      
      if (chosen) {
        currentTeamTitle = chosen.title;
        activeTeamIds = [...chosen.members];
        activeSlot = 0; // Reset to Lead
        renderTopTabs();
        renderActiveCard();
        closeModal();
      }
    }

    function replaceCurrentSlot(newId) {
      activeTeamIds[activeSlot] = newId;
      renderTopTabs();
      renderActiveCard();
      closeModal();
    }

    function quickAgent(name) {
      document.getElementById("agentInput").value = name;
      executeAgentRequest();
    }

    async function executeAgentRequest() {
      const input = document.getElementById("agentInput");
      const status = document.getElementById("agentStatus");
      const name = input.value.trim().toLowerCase().replace("-", "_").replace(" ", "_");
      if (!name) return;

      status.innerHTML = \`⏳ Ο Agent προετοιμάζει τα competitive δεδομένα για το <strong>\${name}</strong>...\`;

      // Check if already in database
      const existing = getPokemon(name);
      if (existing) {
        activeTeamIds[activeSlot] = existing.id;
        status.innerHTML = \`✅ Το <strong>\${existing.name}</strong> φορτώθηκε στη θέση \${activeSlot + 1}/\${competitiveDatabase.formats[userPreferences.format].slots}!\`;
        setTimeout(() => {
          renderTopTabs();
          renderActiveCard();
          closeModal();
        }, 600);
        return;
      }

      try {
        const cleanApiName = name.replace("_", "-");
        const resp = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${cleanApiName}\`);
        if (!resp.ok) throw new Error("Not found");
        const data = await resp.json();

        const pokeTypes = data.types.map(t => t.type.name.toUpperCase());
        const officialImg = data.sprites.other["official-artwork"].front_default || data.sprites.other["home"].front_default;
        const iconImg = data.sprites.front_default;
        const isSpecial = data.stats[3].base_stat > data.stats[1].base_stat;

        const dynamicPoke = {
          id: data.name.replace("-", "_"),
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1).replace("-", " "),
          dexNum: \`No. \${String(data.id).padStart(3, '0')}\`,
          species: "Competitive Challenger",
          gender: "♂",
          types: pokeTypes,
          nature: isSpecial ? "Timid (+Speed, -Attack)" : "Jolly (+Speed, -Sp. Atk)",
          ability: data.abilities[0].ability.name.toUpperCase().replace("-", " "),
          abilityDesc: "Αυξάνει την competitive αποτελεσματικότητα στη μάχη.",
          heldItem: "Life Orb / Focus Sash",
          itemDesc: "Αντικείμενο για μέγιστη πίεση και επιβίωση.",
          role: isSpecial ? "Special Sweeper" : "Physical Wallbreaker",
          strategy: \`Εξειδικευμένο Pokémon προσαρμοσμένο για το format \${competitiveDatabase.games[userPreferences.game].shortName}.\`,
          img: officialImg,
          icon: iconImg,
          buildAnalysis: \`<strong>EV Optimization:</strong> 252 \${isSpecial ? 'Sp. Atk' : 'Attack'} / 252 Speed / 4 HP.\`,
          evStats: [
            { name: "HP", ev: 4, stat: Math.floor((2 * data.stats[0].base_stat + 31 + 4/4) * 0.5) + 60, boost: "" },
            { name: "Attack", ev: isSpecial ? 0 : 252, stat: Math.floor((2 * data.stats[1].base_stat + 31 + (isSpecial?0:252)/4) * 0.5) + 5, boost: isSpecial ? "drop" : "boost" },
            { name: "Defense", ev: 0, stat: Math.floor((2 * data.stats[2].base_stat + 31) * 0.5) + 5, boost: "" },
            { name: "Sp. Atk", ev: isSpecial ? 252 : 0, stat: Math.floor((2 * data.stats[3].base_stat + 31 + (isSpecial?252:0)/4) * 0.5) + 5, boost: isSpecial ? "boost" : "drop" },
            { name: "Sp. Def", ev: 0, stat: Math.floor((2 * data.stats[4].base_stat + 31) * 0.5) + 5, boost: "" },
            { name: "Speed", ev: 252, stat: Math.floor(((2 * data.stats[5].base_stat + 31 + 252/4) * 0.5 + 5) * 1.1), boost: "boost" }
          ],
          moves: [
            { name: "Primary STAB", type: pokeTypes[0] || "NORMAL", pwr: "90", acc: "100%", priority: "0", effect: "Κύριο STAB χτύπημα υψηλής ευστοχίας.", learn: "TM / Level-Up", method: "TM" },
            { name: "Secondary STAB", type: pokeTypes[1] || pokeTypes[0] || "NORMAL", pwr: "80", acc: "100%", priority: "0", effect: "Δευτερεύον STAB για ευρεία κάλυψη τύπων.", learn: "Level-Up / Move Reminder", method: "Level-Up" },
            { name: "Coverage Attack", type: "FIGHTING", pwr: "75", acc: "100%", priority: "0", effect: "Κάλυψη αδυναμιών απέναντι σε Steel/Dark/Rock.", learn: "TM", method: "TM" },
            { name: "Setup / Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Προστασία από επιθέσεις ή ενίσχυση στατιστικών.", learn: "TM", method: "TM" }
          ]
        };

        customPokemon[dynamicPoke.id] = dynamicPoke;
        activeTeamIds[activeSlot] = dynamicPoke.id;
        status.innerHTML = \`🎉 Η κάρτα για το <strong>\${dynamicPoke.name}</strong> δημιουργήθηκε και τοποθετήθηκε στη θέση \${activeSlot + 1}/\${competitiveDatabase.formats[userPreferences.format].slots}!\`;
        setTimeout(() => {
          renderTopTabs();
          renderActiveCard();
          closeModal();
        }, 700);

      } catch (err) {
        status.innerHTML = \`❌ Δεν βρέθηκε Pokémon με όνομα "\${name}".\`;
      }
    }

    function closeModal() {
      document.getElementById("actionModal").classList.remove("open");
    }

    function closeModalOnBg(e) {
      if (e.target.id === "actionModal") closeModal();
    }

    // Initial render
    renderTopTabs();
    renderActiveCard();
  </script>
</body>
</html>
`;

fs.writeFileSync(htmlFile, htmlContent, 'utf8');
console.log('✅ pokemon_champions_summary.html updated successfully! Total bytes:', Buffer.byteLength(htmlContent));
