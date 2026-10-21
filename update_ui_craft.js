const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'pokemon_champions_summary.html');

const htmlContent = `<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokémon Legends Z-A — Summary & Competitive Terminal</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --za-card-bg: #182239;
      --za-card-inner: #222f4d;
      --za-accent-cyan: #0284c7;
      --za-accent-sky: #38bdf8;
      --za-border-line: rgba(255, 255, 255, 0.14);
      --za-border-subtle: rgba(255, 255, 255, 0.08);
      --za-text-main: #f8fafc;
      --za-text-sub: #cbd5e1;
      --za-stat-bar-bg: #111a2d;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      user-select: none;
    }

    body {
      background: radial-gradient(circle at 50% 15%, #3d5885 0%, #243559 45%, #141f35 85%, #0b111e 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 24px 30px;
      color: var(--za-text-main);
      overflow-x: hidden;
    }

    .screen-frame {
      width: 100%;
      max-width: 1100px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* TOP BAR: Clean Information Architecture */
    .top-legend-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px 4px;
    }

    .top-title-cluster {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .game-format-tag {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #38bdf8;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .game-format-tag::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
    }

    .screen-title-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .screen-main-title {
      font-size: 21px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.4px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    /* Minimal Settings Icon Button (Game Console Style) */
    .btn-settings-icon {
      background: rgba(255, 255, 255, 0.09);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #e2e8f0;
      width: 32px;
      height: 32px;
      border-radius: 9px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(8px);
    }

    .btn-settings-icon:hover {
      background: rgba(56, 189, 248, 0.25);
      border-color: #38bdf8;
      color: #38bdf8;
      transform: rotate(30deg) scale(1.05);
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
    }

    /* Top Team Active Strip */
    .team-switch-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .active-team-trio {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(11, 17, 30, 0.65);
      padding: 5px 8px;
      border-radius: 16px;
      border: 1.5px solid rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(12px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }

    .mini-team-slot {
      width: 62px;
      height: 50px;
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.06);
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
      background: rgba(255, 255, 255, 0.14);
      transform: translateY(-1px);
    }

    .mini-team-slot.active {
      background: linear-gradient(180deg, rgba(2, 132, 199, 0.55) 0%, rgba(56, 189, 248, 0.25) 100%);
      border-color: #38bdf8;
      box-shadow: 0 0 14px rgba(56, 189, 248, 0.5), inset 0 0 8px rgba(56, 189, 248, 0.25);
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
      width: 38px;
      height: 38px;
      object-fit: contain;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
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

    /* MAIN LEGENDS Z-A BLUEPRINT CARD */
    .za-main-card {
      background: var(--za-card-bg);
      border: 1.5px solid rgba(255, 255, 255, 0.22);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55), 0 0 40px rgba(56, 189, 248, 0.12);
      display: flex;
      flex-direction: column;
    }

    /* Crisp White Header Strip */
    .za-card-white-header {
      background: #ffffff;
      color: #0f172a;
      padding: 13px 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid rgba(0, 0, 0, 0.05);
    }

    .header-left-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pokeball-icon-sm {
      font-size: 20px;
    }

    .pokemon-title-name {
      font-size: 25px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
    }

    .header-right-meta {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .level-badge {
      font-size: 16px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .gender-symbol {
      color: #0284c7;
      font-weight: 900;
      font-size: 17px;
    }

    .types-strip {
      display: flex;
      gap: 6px;
    }

    .za-type-pill {
      font-size: 12px;
      font-weight: 800;
      padding: 4px 11px;
      border-radius: 7px;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Type Palette */
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

    /* CARD INTERIOR: BALANCED INFORMATION ARCHITECTURE */
    .za-card-body {
      display: grid;
      grid-template-columns: 350px 1fr;
      min-height: 560px;
    }

    /* LEFT STAGE: 3D Render + Tactical Spec Sheet (No empty space void!) */
    .za-center-stage {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: radial-gradient(circle at 50% 38%, rgba(56, 189, 248, 0.14) 0%, rgba(15, 23, 42, 0.35) 75%);
      border-right: 1.5px solid var(--za-border-line);
      padding: 24px 20px 20px;
    }

    .za-stage-upper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 270px;
    }

    .za-hologram-circle {
      position: absolute;
      width: 230px;
      height: 70px;
      border-radius: 50%;
      background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.45) 0%, rgba(2, 132, 199, 0.1) 60%, transparent 80%);
      bottom: 24px;
      border: 1.5px solid rgba(56, 189, 248, 0.5);
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
      transform: rotateX(60deg);
    }

    .za-pokemon-3d {
      width: 260px;
      height: 260px;
      object-fit: contain;
      z-index: 10;
      filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.65));
      transition: transform 0.3s ease;
    }

    .za-pokemon-3d:hover {
      transform: scale(1.05) translateY(-4px);
    }

    /* Grounding Tactical Spec Sheet (Solves empty negative space!) */
    .za-stage-bio-card {
      background: rgba(15, 23, 42, 0.55);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      backdrop-filter: blur(10px);
    }

    .stage-bio-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 8px;
    }

    .bio-spec-dex {
      font-size: 13px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 0.5px;
    }

    .bio-spec-species {
      font-size: 13px;
      font-weight: 700;
      color: #e2e8f0;
    }

    .stage-bio-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px 12px;
    }

    .bio-metric-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .bio-lbl {
      font-size: 10.5px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .bio-val {
      font-size: 13px;
      font-weight: 800;
      color: #f8fafc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* RIGHT CONTENT PANEL */
    .za-content-panel {
      padding: 22px 26px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .za-role-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--za-border-line);
    }

    .role-badge {
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 7px;
      font-size: 12.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .strategy-card-box {
      background: rgba(34, 47, 77, 0.65);
      border-left: 3px solid #38bdf8;
      padding: 9px 13px;
      border-radius: 8px;
      font-size: 13px;
      color: #e2e8f0;
      line-height: 1.5;
    }

    /* EV Stat Table */
    .za-stats-section {
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 13px;
      padding: 12px 16px;
    }

    .section-headline {
      font-size: 12.5px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }

    .stats-rows-container {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }

    .stat-line {
      display: grid;
      grid-template-columns: 105px 1fr 135px;
      align-items: center;
      gap: 10px;
    }

    .stat-label {
      font-size: 13px;
      font-weight: 700;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .boost-up { color: #f87171; font-size: 11px; font-weight: 900; }
    .boost-down { color: #60a5fa; font-size: 11px; font-weight: 900; }

    .stat-track {
      background: var(--za-stat-bar-bg);
      height: 8px;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .stat-fill {
      height: 100%;
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      border-radius: 4px;
    }

    .stat-fill.active-ev {
      background: linear-gradient(90deg, #0284c7, #38bdf8);
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
    }

    .stat-ev-display {
      text-align: right;
      line-height: 1.2;
    }

    .ev-num {
      font-size: 14.5px;
      font-weight: 800;
      color: #38bdf8;
    }
    .ev-num.max {
      color: #facc15;
    }

    .stat-50-val {
      font-size: 11.5px;
      color: #94a3b8;
      font-weight: 600;
    }

    /* 4 Move Cards (Legends Z-A Style) */
    .za-moves-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .za-move-card {
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 13px;
      padding: 10px 13px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .za-move-card:hover {
      border-color: #38bdf8;
      background: rgba(40, 56, 92, 0.85);
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
      gap: 7px;
    }

    .type-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .move-card-name {
      font-size: 14.5px;
      font-weight: 800;
      color: #ffffff;
    }

    .move-card-right-stats {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .priority-badge {
      font-size: 10.5px;
      font-weight: 800;
      color: #fef08a;
      background: rgba(234, 179, 8, 0.22);
      border: 1px solid rgba(234, 179, 8, 0.45);
      padding: 1px 6px;
      border-radius: 5px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .move-card-stats {
      font-size: 11.5px;
      font-weight: 700;
      color: #94a3b8;
      background: rgba(0, 0, 0, 0.35);
      padding: 2px 7px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .move-stat-val {
      color: #f8fafc;
      font-weight: 800;
    }

    .move-card-effect {
      font-size: 11.5px;
      line-height: 1.4;
      color: #cbd5e1;
      background: rgba(0, 0, 0, 0.22);
      padding: 5px 8px;
      border-radius: 7px;
      border-left: 2.5px solid #38bdf8;
      margin: 2px 0 1px 0;
    }

    .move-card-sub {
      font-size: 11.5px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 5px;
      margin-top: 1px;
    }

    .method-badge {
      color: #fde047;
      font-weight: 800;
    }

    /* Lower Meta Strip: Held Item + Ability + Nature */
    .za-lower-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--za-card-inner);
      border: 1px solid var(--za-border-line);
      border-radius: 13px;
      padding: 10px 18px;
      font-size: 13.5px;
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
      letter-spacing: 0.4px;
      font-size: 12.5px;
    }

    .item-badge-val {
      color: #38bdf8;
      font-weight: 800;
      background: rgba(56, 189, 248, 0.15);
      padding: 4px 12px;
      border-radius: 7px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }

    .meta-hover-wrap:hover .item-badge-val {
      background: rgba(56, 189, 248, 0.25);
      border-color: #38bdf8;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }

    .ability-name-val {
      color: #86efac;
      font-weight: 800;
      background: rgba(34, 197, 94, 0.15);
      padding: 4px 12px;
      border-radius: 7px;
      border: 1px solid rgba(134, 239, 172, 0.4);
      transition: all 0.2s ease;
    }

    .meta-hover-wrap:hover .ability-name-val {
      background: rgba(34, 197, 94, 0.25);
      border-color: #86efac;
      box-shadow: 0 0 10px rgba(134, 239, 172, 0.4);
    }

    .za-tooltip {
      position: absolute;
      bottom: calc(100% + 9px);
      left: 50%;
      transform: translateX(-50%) translateY(4px);
      background: #0f172a;
      border: 1.5px solid #38bdf8;
      color: #f1f5f9;
      padding: 9px 13px;
      border-radius: 11px;
      font-size: 12.5px;
      line-height: 1.45;
      font-weight: 600;
      width: 240px;
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
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 4px;
    }

    .active-team-indicator-tag {
      font-size: 14px;
      font-weight: 800;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .actions-group {
      display: flex;
      gap: 10px;
    }

    .btn-action-main {
      background: rgba(255, 255, 255, 0.1);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 9px 18px;
      border-radius: 12px;
      font-size: 13.5px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      transition: all 0.2s ease;
      backdrop-filter: blur(8px);
    }

    .btn-action-main:hover {
      background: rgba(56, 189, 248, 0.25);
      border-color: #38bdf8;
      transform: translateY(-2px);
    }

    .btn-action-main.primary-accent {
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      border-color: #818cf8;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
    }

    .btn-action-main.agent-accent {
      background: linear-gradient(135deg, #059669, #0284c7);
      border-color: #38bdf8;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
    }

    /* NINTENDO SWITCH / LEGENDS Z-A MODAL OVERLAY */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(7, 12, 22, 0.85);
      backdrop-filter: blur(14px);
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

    /* AUTHENTIC SYSTEM TERMINAL MODAL (No AI slop!) */
    .za-terminal-modal {
      background: #141c2e;
      border: 1.5px solid rgba(56, 189, 248, 0.4);
      border-radius: 20px;
      width: 92%;
      max-width: 660px;
      color: #f1f5f9;
      box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.15);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .za-modal-top-bar {
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 16px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .za-modal-headline-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .za-modal-head-tag {
      font-size: 11px;
      font-weight: 800;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .za-modal-main-title {
      font-size: 18px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.3px;
    }

    .za-modal-close-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #cbd5e1;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 800;
      transition: all 0.2s ease;
    }

    .za-modal-close-btn:hover {
      background: #ef4444;
      border-color: #ef4444;
      color: #ffffff;
    }

    .za-modal-body {
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: 70vh;
      overflow-y: auto;
    }

    /* SEGMENTED SWITCHERS (Switch Console Style) */
    .za-segment-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .za-segment-label {
      font-size: 11.5px;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .za-segment-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 6px;
      background: #0d1322;
      padding: 5px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .za-seg-btn {
      background: transparent;
      border: 1px solid transparent;
      color: #94a3b8;
      padding: 10px 12px;
      border-radius: 9px;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
    }

    .za-seg-btn:hover {
      color: #f1f5f9;
      background: rgba(255, 255, 255, 0.05);
    }

    .za-seg-btn.active {
      background: #1c2640;
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.35), inset 0 0 8px rgba(56, 189, 248, 0.15);
    }

    .seg-submeta {
      font-size: 10.5px;
      font-weight: 700;
      color: #64748b;
    }

    .za-seg-btn.active .seg-submeta {
      color: #38bdf8;
    }

    /* LIVE SPECIFICATION HUD (Legends Z-A Tech) */
    .za-hud-readout {
      background: rgba(13, 19, 34, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 12px;
      padding: 14px 16px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .hud-spec-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .hud-lbl {
      font-size: 10.5px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .hud-val {
      font-size: 13px;
      font-weight: 800;
      color: #e2e8f0;
    }

    /* MODAL FOOTER */
    .za-modal-footer {
      background: rgba(13, 19, 34, 0.6);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 14px 22px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .btn-modal-cancel {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #cbd5e1;
      padding: 9px 18px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-modal-cancel:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .btn-modal-apply {
      background: linear-gradient(135deg, #0284c7, #2563eb);
      border: 1px solid #38bdf8;
      color: #ffffff;
      padding: 9px 22px;
      border-radius: 10px;
      font-size: 13.5px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
    }

    .btn-modal-apply:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(2, 132, 199, 0.55);
    }

    /* Teams Selection Items */
    .team-rec-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1.5px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .team-rec-item:hover {
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.08);
    }

    .team-rec-item.selected {
      border: 2px solid #38bdf8 !important;
      background: rgba(56, 189, 248, 0.16) !important;
      box-shadow: 0 0 16px rgba(56, 189, 248, 0.3) !important;
    }
  </style>
</head>
<body>

  <div class="screen-frame">

    <!-- TOP BAR (Legends Z-A Header) -->
    <div class="top-legend-bar">
      <!-- Title Cluster with Dynamic Game & Format -->
      <div class="top-title-cluster">
        <div class="game-format-tag" id="topFormatTag">BDSP · 3v3 SINGLES</div>
        <div class="screen-title-row">
          <span class="screen-main-title" id="topGameTitle">Brilliant Diamond · Battle Team</span>
          <button class="btn-settings-icon" onclick="openModal('preferences')" title="Settings / Προτιμήσεις">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
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

        <!-- Left Stage: 3D Render & Grounded Pokédex Bio Box -->
        <div class="za-center-stage">
          <div class="za-stage-upper">
            <div class="za-hologram-circle"></div>
            <img id="poke3dImg" class="za-pokemon-3d" src="" alt="Pokemon">
          </div>
          
          <!-- Grounding Tactical Spec Sheet (Fills empty negative space!) -->
          <div class="za-stage-bio-card">
            <div class="stage-bio-header">
              <span class="bio-spec-dex" id="bioDexNumber">No. 445</span>
              <span class="bio-spec-species" id="bioSpeciesText">Mach Pokémon</span>
            </div>
            <div class="stage-bio-grid">
              <div class="bio-metric-item">
                <span class="bio-lbl">BASE STAT TOTAL</span>
                <span class="bio-val" id="bioBstVal">600 (Pseudo-Legend)</span>
              </div>
              <div class="bio-metric-item">
                <span class="bio-lbl">COMBAT PROFILE</span>
                <span class="bio-val" id="bioProfileVal">Physical Wallbreaker</span>
              </div>
              <div class="bio-metric-item">
                <span class="bio-lbl">SPEED TIER</span>
                <span class="bio-val" id="bioSpeedTierVal">169 Speed (Lv. 50)</span>
              </div>
              <div class="bio-metric-item">
                <span class="bio-lbl">TEAM SYNERGY</span>
                <span class="bio-val" id="bioSynergyVal">Alpha Fantasy Core</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content Panel -->
        <div class="za-content-panel">

          <!-- Role & Banner -->
          <div class="za-role-banner">
            <div>
              <span class="role-badge" id="roleTag">Lead Wallbreaker</span>
              <span class="dex-subtitle" id="dexSubtitle" style="margin-left: 10px;">No. 445 Mach Pokémon</span>
            </div>
            <div style="font-size: 13.5px; color: #38bdf8; font-weight: 800;" id="teamSlotLabel">
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

          <!-- Lower Meta: Held Item + Ability + Nature -->
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
        <button class="btn-action-main agent-accent" onclick="openModal('agent')">
          🤖 AI Agent: Ζήτα Κάρτα
        </button>
      </div>
    </div>

  </div>

  <!-- Interactive System Modal -->
  <div class="modal-overlay" id="actionModal" onclick="closeModalOnBg(event)">
    <div class="za-terminal-modal" id="modalContainer">
      <!-- Modal Header -->
      <div class="za-modal-top-bar">
        <div class="za-modal-headline-group">
          <span style="font-size:18px;">🔴</span>
          <div>
            <div class="za-modal-head-tag" id="modalHeadTag">TERMINAL SETTINGS</div>
            <div class="za-modal-main-title" id="modalMainTitle">Settings</div>
          </div>
        </div>
        <button class="za-modal-close-btn" onclick="closeModal()">✕</button>
      </div>

      <!-- Modal Body -->
      <div class="za-modal-body" id="modalBody">
        <!-- Content rendered via JS -->
      </div>

      <!-- Modal Footer -->
      <div class="za-modal-footer" id="modalFooter">
        <button class="btn-modal-cancel" onclick="closeModal()">Close</button>
      </div>
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

    function updateTopTitle() {
      const game = userPreferences.game;
      const format = userPreferences.format;
      
      const titles = {
        bdsp: "Brilliant Diamond · Battle Team",
        sv_vgc: "Scarlet & Violet · VGC Champions Team",
        legends_za: "Legends: Z-A · Mega Champions Team"
      };

      const formatBadges = {
        singles: "3v3 SINGLES",
        doubles: "4v4 DOUBLES"
      };

      const gamePrefixes = {
        bdsp: "BDSP",
        sv_vgc: "VGC",
        legends_za: "MEGA META"
      };

      document.getElementById("topGameTitle").textContent = titles[game] || "Battle Team";
      document.getElementById("topFormatTag").textContent = \`\${gamePrefixes[game]} · \${formatBadges[format]}\`;
    }

    // Render active slots in the top bar (3 or 4)
    function renderTopTabs() {
      const formatCfg = competitiveDatabase.formats[userPreferences.format];
      const maxSlots = formatCfg.slots;
      
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

      const isSingles = userPreferences.format === "singles";
      document.getElementById("btnTeamRecs").innerHTML = isSingles ? "🛡️ Προτάσεις Τριάδων" : "👥 Προτάσεις Τετράδων";
      document.getElementById("btnSwapPoke").innerHTML = isSingles ? "🔄 Αλλαγή Pokémon Τριάδας" : "🔄 Αλλαγή Pokémon Τετράδας";

      updateTopTitle();
    }

    function selectSlot(slotIdx) {
      activeSlot = slotIdx;
      renderTopTabs();
      renderActiveCard();
    }

    function getBstInfo(p) {
      const bstMap = {
        garchomp: "600 (Pseudo-Legend)",
        scizor: "500 (Technician Sweeper)",
        suicune: "580 (Legendary Beast)",
        cloyster: "525 (Skill Link Sweeper)",
        togekiss: "545 (Serene Grace Disruptor)",
        azumarill: "420 (Huge Power x2)",
        tyranitar: "600 (Pseudo-Legend)",
        gengar: "500 (Shadow Sweeper)",
        latios: "600 (Eon Legendary)",
        heatran: "600 (Lava Legendary)",
        pelipper: "440 (Drizzle Setter)",
        kingdra: "540 (Swift Swim Cleaner)",
        cresselia: "600 (Lunar Wall)",
        torkoal: "470 (Drought Erupter)",
        flutter_mane: "570 (Paradox Nuker)",
        urshifu_rapid: "550 (Wushu Legend)",
        incineroar: "530 (VGC Core Anchor)",
        rillaboom: "530 (Grassy Glide Pivot)",
        dragonite: "600 (Multiscale Cleaner)",
        mega_lucario: "625 (Adaptability Mega)",
        mega_gengar: "600 (Shadow Tag Mega)",
        mega_kangaskhan: "590 (Parental Bond Mega)",
        mega_charizard_y: "634 (Drought Mega)"
      };
      return bstMap[p.id] || "Competitive Lv. 50 Build";
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

      // Grounding Tactical Spec Sheet (Solves negative space!)
      document.getElementById("bioDexNumber").textContent = p.dexNum;
      document.getElementById("bioSpeciesText").textContent = p.species;
      document.getElementById("bioBstVal").textContent = getBstInfo(p);
      document.getElementById("bioProfileVal").textContent = p.role;
      
      const speedStat = p.evStats.find(s => s.name === "Speed");
      document.getElementById("bioSpeedTierVal").textContent = \`\${speedStat ? speedStat.stat : '—'} Spe (Lv. 50)\`;
      document.getElementById("bioSynergyVal").textContent = currentTeamTitle.split(':')[0].trim();

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

    // MODAL CONTROL LOGIC
    function openModal(type) {
      const modal = document.getElementById("actionModal");
      const headTag = document.getElementById("modalHeadTag");
      const mainTitle = document.getElementById("modalMainTitle");
      const body = document.getElementById("modalBody");
      const footer = document.getElementById("modalFooter");

      if (type === "preferences") {
        tempPreferences = { ...userPreferences };
        headTag.textContent = "SYSTEM CONFIGURATION";
        mainTitle.textContent = "Battle Format & Game Rules";
        renderPreferencesModal();
      } else if (type === "teams") {
        const isSingles = userPreferences.format === "singles";
        headTag.textContent = "TACTICAL ROSTER";
        mainTitle.textContent = isSingles ? "Preset Trios (3v3)" : "Preset Quads (4v4)";
        renderTeamsModal();
      } else if (type === "swap") {
        const currentPoke = getPokemon(activeTeamIds[activeSlot]);
        const formatCfg = competitiveDatabase.formats[userPreferences.format];
        headTag.textContent = "ROSTER SUBSTITUTION";
        mainTitle.textContent = \`Swap Slot \${activeSlot + 1}/\${formatCfg.slots} (\${currentPoke.name})\`;
        
        const allRegistered = { ...competitiveDatabase.pokemon, ...customPokemon };
        const benchKeys = Object.keys(allRegistered).filter(id => !activeTeamIds.includes(id));

        body.innerHTML = \`
          <div style="font-size:13.5px; color:#cbd5e1; margin-bottom:12px;">
            Select a bench Pokémon to substitute into slot <strong>\${activeSlot + 1}</strong>:
          </div>
          <div style="display:flex; flex-direction:column; gap:8px; max-height:55vh; overflow-y:auto; padding-right:4px;">
            \${benchKeys.map(bId => {
              const b = allRegistered[bId];
              return \`
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.06); padding:10px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.08);">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <img src="\${b.icon}" style="width:34px; height:34px; object-fit:contain;">
                    <div>
                      <strong style="font-size:15px; color:#f8fafc;">\${b.name}</strong> — <span style="font-size:12.5px; color:#38bdf8;">\${b.role}</span>
                      <div style="font-size:11.5px; color:#94a3b8; margin-top:1px;">\${b.types.join('/')} · \${b.heldItem}</div>
                    </div>
                  </div>
                  <button class="btn-modal-apply" style="padding:6px 14px; font-size:12.5px;" onclick="replaceCurrentSlot('\${b.id}')">
                    Select
                  </button>
                </div>
              \`;
            }).join('')}
          </div>
        \`;

        footer.innerHTML = \`<button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>\`;
      } else if (type === "agent") {
        headTag.textContent = "AI COMBAT AGENT";
        mainTitle.textContent = "Generate Pokémon Card";
        body.innerHTML = \`
          <p style="font-size:13.5px; color:#cbd5e1; line-height:1.5;">
            Enter any Pokémon name to generate its optimized Level 50 competitive build for this format:
          </p>
          <div style="display:flex; gap:10px; margin-top:14px;">
            <input type="text" id="agentInput" style="flex:1; background:#0d1322; border:1px solid rgba(255,255,255,0.25); border-radius:10px; padding:10px 14px; color:#fff; font-size:15px; outline:none;" placeholder="e.g. Tyranitar, Lucario, Gengar, Flutter Mane..." onkeydown="if(event.key==='Enter') executeAgentRequest()">
            <button class="btn-modal-apply" onclick="executeAgentRequest()">Generate</button>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:14px;">
            <button class="btn-modal-cancel" style="font-size:12px; padding:5px 12px;" onclick="quickAgent('tyranitar')">⚡ Tyranitar</button>
            <button class="btn-modal-cancel" style="font-size:12px; padding:5px 12px;" onclick="quickAgent('lucario')">⚡ Lucario</button>
            <button class="btn-modal-cancel" style="font-size:12px; padding:5px 12px;" onclick="quickAgent('flutter_mane')">⚡ Flutter Mane</button>
            <button class="btn-modal-cancel" style="font-size:12px; padding:5px 12px;" onclick="quickAgent('incineroar')">⚡ Incineroar</button>
            <button class="btn-modal-cancel" style="font-size:12px; padding:5px 12px;" onclick="quickAgent('mega_lucario')">⚡ Mega Lucario</button>
          </div>
          <div id="agentStatus" style="margin-top:14px; font-size:13.5px; color:#38bdf8; font-weight:700;"></div>
        \`;

        footer.innerHTML = \`<button class="btn-modal-cancel" onclick="closeModal()">Close</button>\`;
      }

      modal.classList.add("open");
    }

    // NINTENDO SWITCH / LEGENDS Z-A SYSTEM SETTINGS (No AI Slop!)
    function renderPreferencesModal() {
      const body = document.getElementById("modalBody");
      const footer = document.getElementById("modalFooter");

      const hudData = {
        bdsp_singles: { rules: "Battle Tower Master Class (Lv. 50 Flat)", roster: "3 Pokémon (Lead / Cleaner / Anchor)", restrictions: "Item Clause Active · No Mythicals" },
        bdsp_doubles: { rules: "Battle Tower Doubles Master Class", roster: "4 Pokémon (2 Leads + 2 Backline)", restrictions: "Item Clause Active · Weather Focus" },
        sv_vgc_singles: { rules: "Battle Stadium Ranked Singles", roster: "3 Pokémon (Tera Mechanics Enabled)", restrictions: "Bring 6 Pick 3 · Regulation H/I" },
        sv_vgc_doubles: { rules: "Official VGC World Championship Rules", roster: "4 Pokémon (Bring 6 Pick 4)", restrictions: "Item Clause · Open Team Sheets" },
        legends_za_singles: { rules: "Mega Evolution Champions Singles", roster: "3 Pokémon (1 Mega Evolution active)", restrictions: "Mega Stones Active · High Velocity" },
        legends_za_doubles: { rules: "Mega Evolution Doubles Circuit", roster: "4 Pokémon (Mega + Weather Synergies)", restrictions: "Parental Bond & Pixilate Meta" }
      };

      const key = \`\${tempPreferences.game}_\${tempPreferences.format}\`;
      const hud = hudData[key] || hudData["bdsp_singles"];

      body.innerHTML = \`
        <!-- Segment 1: Game / Series -->
        <div class="za-segment-group">
          <div class="za-segment-label">SELECT GAME / META SERIES</div>
          <div class="za-segment-bar">
            <button class="za-seg-btn \${tempPreferences.game === 'bdsp' ? 'active' : ''}" onclick="selectTempGame('bdsp')">
              <span>💎 Brilliant Diamond</span>
              <span class="seg-submeta">BDSP Gen 8</span>
            </button>
            <button class="za-seg-btn \${tempPreferences.game === 'sv_vgc' ? 'active' : ''}" onclick="selectTempGame('sv_vgc')">
              <span>⚡ Scarlet & Violet</span>
              <span class="seg-submeta">VGC Gen 9</span>
            </button>
            <button class="za-seg-btn \${tempPreferences.game === 'legends_za' ? 'active' : ''}" onclick="selectTempGame('legends_za')">
              <span>🏙️ Legends: Z-A</span>
              <span class="seg-submeta">Mega Meta</span>
            </button>
          </div>
        </div>

        <!-- Segment 2: Battle Format -->
        <div class="za-segment-group">
          <div class="za-segment-label">BATTLE FORMAT</div>
          <div class="za-segment-bar">
            <button class="za-seg-btn \${tempPreferences.format === 'singles' ? 'active' : ''}" onclick="selectTempFormat('singles')">
              <span>⚔️ Singles</span>
              <span class="seg-submeta">3v3 Trios</span>
            </button>
            <button class="za-seg-btn \${tempPreferences.format === 'doubles' ? 'active' : ''}" onclick="selectTempFormat('doubles')">
              <span>👥 Doubles</span>
              <span class="seg-submeta">4v4 Quads</span>
            </button>
          </div>
        </div>

        <!-- Technical Specification HUD -->
        <div class="za-hud-readout">
          <div class="hud-spec-item">
            <span class="hud-lbl">RULESET</span>
            <span class="hud-val">\${hud.rules}</span>
          </div>
          <div class="hud-spec-item">
            <span class="hud-lbl">TEAM ROSTER</span>
            <span class="hud-val">\${hud.roster}</span>
          </div>
          <div class="hud-spec-item" style="grid-column: span 2;">
            <span class="hud-lbl">BATTLE CONSTRAINTS</span>
            <span class="hud-val" style="color:#38bdf8;">\${hud.restrictions}</span>
          </div>
        </div>
      \`;

      footer.innerHTML = \`
        <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-modal-apply" onclick="savePreferences()">Apply Settings</button>
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

    // TEAMS MODAL (High-Tech Strategy Selector)
    function renderTeamsModal() {
      const body = document.getElementById("modalBody");
      const footer = document.getElementById("modalFooter");
      const teamKey = \`\${userPreferences.game}_\${userPreferences.format}\`;
      const availableTeams = competitiveDatabase.presetTeams[teamKey] || [];

      body.innerHTML = \`
        <div style="font-size:13.5px; color:#cbd5e1; margin-bottom:10px;">
          Choose a tactical strategy to load into your active team slots:
        </div>

        <div style="max-height:55vh; overflow-y:auto; padding-right:4px;">
          \${availableTeams.map(t => {
            const isSelected = t.id === selectedPresetTeamId;
            return \`
              <div class="team-rec-item \${isSelected ? 'selected' : ''}" onclick="selectPresetTeamItem('\${t.id}')">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:\${isSelected ? '#38bdf8' : '#64748b'}; font-size:16px;">\${isSelected ? '●' : '○'}</span>
                    <strong style="color:#ffffff; font-size:15.5px;">\${t.title}</strong>
                  </div>
                  <span style="background:rgba(37,99,235,0.3); border:1px solid #38bdf8; color:#38bdf8; font-size:11.5px; font-weight:800; padding:2px 8px; border-radius:5px;">\${t.tag}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; margin:8px 0;">
                  \${t.members.map((mId, slot) => {
                    const m = getPokemon(mId);
                    return \`
                      <span style="background:rgba(255,255,255,0.08); padding:4px 10px; border-radius:7px; font-size:12.5px; font-weight:700; display:flex; align-items:center; gap:5px;">
                        <img src="\${m ? m.icon : ''}" style="width:20px; height:20px; object-fit:contain;">
                        \${slot + 1}. \${m ? m.name : mId}
                      </span>
                    \`;
                  }).join('')}
                </div>
                <p style="font-size:12.5px; color:#cbd5e1; line-height:1.45;">\${t.desc}</p>
              </div>
            \`;
          }).join('')}
        </div>
      \`;

      footer.innerHTML = \`
        <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
        <button class="btn-modal-apply" onclick="confirmTeamSelection()">Confirm Team Selection</button>
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
        activeSlot = 0;
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

      status.innerHTML = \`⏳ Calculating competitive parameters for <strong>\${name}</strong>...\`;

      const existing = getPokemon(name);
      if (existing) {
        activeTeamIds[activeSlot] = existing.id;
        status.innerHTML = \`✅ Loaded <strong>\${existing.name}</strong> into slot \${activeSlot + 1}!\`;
        setTimeout(() => {
          renderTopTabs();
          renderActiveCard();
          closeModal();
        }, 500);
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
          species: "Challenger Pokémon",
          gender: "♂",
          types: pokeTypes,
          nature: isSpecial ? "Timid (+Speed, -Attack)" : "Jolly (+Speed, -Sp. Atk)",
          ability: data.abilities[0].ability.name.toUpperCase().replace("-", " "),
          abilityDesc: "Competitive battle ability.",
          heldItem: "Life Orb / Focus Sash",
          itemDesc: "Strategic held item for competitive pressure.",
          role: isSpecial ? "Special Sweeper" : "Physical Wallbreaker",
          strategy: \`Specialized counter for the active \${competitiveDatabase.games[userPreferences.game].shortName} meta.\`,
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
            { name: "Primary STAB", type: pokeTypes[0] || "NORMAL", pwr: "90", acc: "100%", priority: "0", effect: "High-accuracy reliable primary STAB attack.", learn: "TM / Level-Up", method: "TM" },
            { name: "Secondary STAB", type: pokeTypes[1] || pokeTypes[0] || "NORMAL", pwr: "80", acc: "100%", priority: "0", effect: "Secondary coverage STAB.", learn: "Level-Up", method: "Level-Up" },
            { name: "Coverage Attack", type: "FIGHTING", pwr: "75", acc: "100%", priority: "0", effect: "Coverage move against common defensive types.", learn: "TM", method: "TM" },
            { name: "Setup / Protect", type: "NORMAL", pwr: "—", acc: "—", priority: "+4", effect: "🛡️ Priority +4. Shields from attacks or boosts stats.", learn: "TM", method: "TM" }
          ]
        };

        customPokemon[dynamicPoke.id] = dynamicPoke;
        activeTeamIds[activeSlot] = dynamicPoke.id;
        status.innerHTML = \`🎉 Generated <strong>\${dynamicPoke.name}</strong> and loaded into slot \${activeSlot + 1}!\`;
        setTimeout(() => {
          renderTopTabs();
          renderActiveCard();
          closeModal();
        }, 600);

      } catch (err) {
        status.innerHTML = \`❌ Could not find Pokémon "\${name}".\`;
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

fs.writeFileSync(targetFile, htmlContent, 'utf8');
console.log('✅ UI Craft update applied to pokemon_champions_summary.html! Total bytes:', Buffer.byteLength(htmlContent));
