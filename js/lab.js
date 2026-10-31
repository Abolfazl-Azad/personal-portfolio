/* ==========================================================
   js/lab.js — Silicon Lab Interactive Workbench Engine
   Abolfazl Azad Portfolio
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStationTabs();
  initRiscVPipelineSim();
  initMemristorSandbox();
  initTimingSlackAnalyzer();
});

/* ──────────────────────────────────────────────────────────
   1. STATION NAVIGATION TABS
   ────────────────────────────────────────────────────────── */
function initStationTabs() {
  const tabs = document.querySelectorAll('.lab-tab-btn');
  const stations = document.querySelectorAll('.lab-station');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      tabs.forEach(t => t.classList.remove('active'));
      stations.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const targetStation = document.getElementById(targetId);
      if (targetStation) targetStation.classList.add('active');
    });
  });
}

/* ──────────────────────────────────────────────────────────
   2. RISC-V 5-STAGE PIPELINE SIMULATOR
   ────────────────────────────────────────────────────────── */
const PROGRAMS = {
  arithmetic: {
    name: "01: Basic Arithmetic & Data Flow",
    desc: "Sequential execution through IF, ID, EX, MEM, WB without hazards.",
    insts: [
      { text: "ADDI x1, x0, 5", op: "ADDI", rd: 1, rs1: 0, imm: 5 },
      { text: "ADDI x2, x0, 10", op: "ADDI", rd: 2, rs1: 0, imm: 10 },
      { text: "ADD  x3, x1, x2", op: "ADD",  rd: 3, rs1: 1, rs2: 2 },
      { text: "SUB  x4, x3, x1", op: "SUB",  rd: 4, rs1: 3, rs2: 1 },
      { text: "ADDI x5, x4, 1",  op: "ADDI", rd: 5, rs1: 4, imm: 1 }
    ]
  },
  hazard: {
    name: "02: Load-Use Hazard & Stall Bubble",
    desc: "Demonstrates 1-cycle stall insertion when dependent instruction follows LW immediately.",
    insts: [
      { text: "LW   x1, 0(x0)", op: "LW",   rd: 1, rs1: 0, imm: 0 },
      { text: "ADD  x2, x1, x3", op: "ADD",  rd: 2, rs1: 1, rs2: 3 }, // Hazard on x1!
      { text: "ADDI x4, x0, 8",  op: "ADDI", rd: 4, rs1: 0, imm: 8 },
      { text: "SW   x2, 4(x0)", op: "SW",   rs1: 0, rs2: 2, imm: 4 }
    ]
  },
  forwarding: {
    name: "03: Data Forwarding Unit in Action",
    desc: "ALU results in EX/MEM and MEM/WB forwarded directly to EX operand inputs.",
    insts: [
      { text: "ADD  x1, x2, x3", op: "ADD", rd: 1, rs1: 2, rs2: 3 },
      { text: "SUB  x4, x1, x5", op: "SUB", rd: 4, rs1: 1, rs2: 5 }, // EX-to-EX forwarding of x1!
      { text: "AND  x6, x1, x7", op: "AND", rd: 6, rs1: 1, rs2: 7 }  // MEM-to-EX forwarding of x1!
    ]
  },
  branch: {
    name: "04: Branch Hazard & Speculative Flush",
    desc: "BEQ taken branches to target; IF and ID stages flushed with NOPs.",
    insts: [
      { text: "ADDI x1, x0, 0",        op: "ADDI", rd: 1, rs1: 0, imm: 0 },
      { text: "BEQ  x1, x0, target",   op: "BEQ",  rs1: 1, rs2: 0, target: 4 },
      { text: "ADDI x2, x0, 99 [FLUSH]", op: "ADDI", rd: 2, rs1: 0, imm: 99 },
      { text: "ADDI x3, x0, 99 [FLUSH]", op: "ADDI", rd: 3, rs1: 0, imm: 99 },
      { text: "target: ADDI x4, x0, 42", op: "ADDI", rd: 4, rs1: 0, imm: 42 }
    ]
  }
};

function initRiscVPipelineSim() {
  const progSelect = document.getElementById('pipeline-prog-select');
  const stepBtn = document.getElementById('pipeline-step-btn');
  const runBtn = document.getElementById('pipeline-run-btn');
  const resetBtn = document.getElementById('pipeline-reset-btn');
  const cycleCountEl = document.getElementById('pipeline-cycle-count');
  const pcValEl = document.getElementById('pipeline-pc-val');
  const hazardBanner = document.getElementById('hazard-banner');
  const forwardBanner = document.getElementById('forward-banner');

  if (!progSelect || !stepBtn) return;

  let currentProgKey = 'arithmetic';
  let pc = 0;
  let cycle = 0;
  let timer = null;
  let isRunning = false;

  // Initial RegFile: x0=0, x1..x7
  let regFile = [0, 5, 10, 0, 0, 0, 0, 0];

  // Pipeline registers: each can hold an instruction object or null
  let pipe = {
    IF: null,
    ID: null,
    EX: null,
    MEM: null,
    WB: null
  };

  function resetSim() {
    if (timer) { clearInterval(timer); timer = null; }
    isRunning = false;
    runBtn.textContent = 'Auto Clock ▶';
    runBtn.classList.remove('active');

    pc = 0;
    cycle = 0;
    regFile = [0, 5, 10, 0, 0, 0, 0, 0];
    pipe = { IF: null, ID: null, EX: null, MEM: null, WB: null };

    if (hazardBanner) hazardBanner.classList.remove('active');
    if (forwardBanner) forwardBanner.classList.remove('active');

    updateUI();
  }

  function stepClock() {
    cycle++;
    const prog = PROGRAMS[currentProgKey];
    let isStall = false;
    let isForwarding = false;
    let forwardMsg = '';

    // 1. WB Stage (Retire & Write to RegFile)
    if (pipe.WB) {
      const inst = pipe.WB;
      if (inst.rd && inst.rd !== 0 && inst.res !== undefined) {
        regFile[inst.rd] = inst.res;
        highlightReg(inst.rd);
      }
    }

    // 2. MEM Stage -> WB
    const nextWB = pipe.MEM ? { ...pipe.MEM } : null;

    // 3. EX Stage -> MEM
    let nextMEM = null;
    if (pipe.EX) {
      if (pipe.EX.isBubble) {
        nextMEM = null;
      } else {
        const inst = pipe.EX;
        let res = 0;
        let v1 = (inst.rs1 !== undefined) ? regFile[inst.rs1] : 0;
        let v2 = (inst.rs2 !== undefined) ? regFile[inst.rs2] : (inst.imm || 0);

        // Check Forwarding into EX
        if (pipe.MEM && pipe.MEM.rd && pipe.MEM.rd !== 0) {
          if (pipe.MEM.rd === inst.rs1) {
            v1 = pipe.MEM.res;
            isForwarding = true;
            forwardMsg = `Forwarding x${pipe.MEM.rd} (from MEM) to ALU Op1`;
          }
          if (pipe.MEM.rd === inst.rs2) {
            v2 = pipe.MEM.res;
            isForwarding = true;
            forwardMsg = `Forwarding x${pipe.MEM.rd} (from MEM) to ALU Op2`;
          }
        }

        switch (inst.op) {
          case 'ADDI': res = v1 + (inst.imm || 0); break;
          case 'ADD':  res = v1 + v2; break;
          case 'SUB':  res = v1 - v2; break;
          case 'AND':  res = v1 & v2; break;
          case 'OR':   res = v1 | v2; break;
          case 'LW':   res = 16; break; // simulated loaded value
          case 'SW':   res = v2; break;
          case 'BEQ':  res = (v1 === v2); break;
          default:     res = 0;
        }

        nextMEM = { ...inst, res };

        // Handle Branch Taken
        if (inst.op === 'BEQ' && res === true && inst.target !== undefined) {
          pc = inst.target;
          pipe.IF = null; // Flush IF
          pipe.ID = null; // Flush ID
        }
      }
    }

    // 4. Hazard Detection (ID Stage)
    // If ID requires register that EX is loading via LW -> Insert Bubble
    if (pipe.EX && pipe.EX.op === 'LW' && pipe.ID) {
      if (pipe.ID.rs1 === pipe.EX.rd || pipe.ID.rs2 === pipe.EX.rd) {
        isStall = true;
      }
    }

    let nextEX = null;
    let nextID = pipe.ID;
    let nextIF = pipe.IF;

    if (isStall) {
      // Insert bubble into EX, freeze ID and IF
      nextEX = { text: "NOP [STALL BUBBLE]", op: "NOP", isBubble: true };
      if (hazardBanner) {
        hazardBanner.classList.add('active');
        hazardBanner.textContent = `⚠️ LOAD-USE HAZARD DETECTED: Stalling IF & ID, inserting Bubble into EX stage.`;
      }
    } else {
      if (hazardBanner) hazardBanner.classList.remove('active');
      nextEX = pipe.ID ? { ...pipe.ID } : null;
      nextID = pipe.IF ? { ...pipe.IF } : null;

      // 5. IF Stage (Fetch new instruction)
      if (pc < prog.insts.length) {
        nextIF = { ...prog.insts[pc], pcVal: pc * 4 };
        pc++;
      } else {
        nextIF = null;
      }
    }

    // Forwarding banner update
    if (isForwarding && forwardBanner) {
      forwardBanner.classList.add('active');
      forwardBanner.textContent = `⚡ DATA FORWARDING ACTIVE: ${forwardMsg}`;
    } else if (forwardBanner) {
      forwardBanner.classList.remove('active');
    }

    pipe = {
      IF: nextIF,
      ID: nextID,
      EX: nextEX,
      MEM: nextMEM,
      WB: nextWB
    };

    updateUI();

    // Auto stop if pipeline empty and program finished
    if (pc >= prog.insts.length && !pipe.IF && !pipe.ID && !pipe.EX && !pipe.MEM && !pipe.WB) {
      if (isRunning) toggleRun();
    }
  }

  function updateUI() {
    if (cycleCountEl) cycleCountEl.textContent = cycle;
    if (pcValEl) pcValEl.textContent = `0x${(pc * 4).toString(16).padStart(2, '0')}`;

    ['IF', 'ID', 'EX', 'MEM', 'WB'].forEach(stage => {
      const box = document.getElementById(`stage-${stage.toLowerCase()}`);
      const instBadge = document.getElementById(`inst-${stage.toLowerCase()}`);
      const detailEl = document.getElementById(`detail-${stage.toLowerCase()}`);
      const item = pipe[stage];

      if (!box || !instBadge) return;

      if (item) {
        box.classList.add('is-active');
        if (item.isBubble) box.classList.add('is-stalled');
        else box.classList.remove('is-stalled');

        instBadge.textContent = item.text || item.op;

        if (detailEl) {
          if (stage === 'IF') detailEl.textContent = `PC: 0x${(item.pcVal || 0).toString(16)}`;
          else if (stage === 'ID') detailEl.textContent = `Decoded: ${item.op} | rd: x${item.rd || 0}`;
          else if (stage === 'EX') detailEl.textContent = item.isBubble ? 'STALL BUBBLE' : `ALU Res: ${item.res !== undefined ? item.res : 'Evaluating'}`;
          else if (stage === 'MEM') detailEl.textContent = item.op === 'LW' ? 'Mem Read -> 16' : `Value: ${item.res || 0}`;
          else if (stage === 'WB') detailEl.textContent = item.rd ? `Commit x${item.rd} = ${item.res || 0}` : 'Done';
        }
      } else {
        box.classList.remove('is-active', 'is-stalled');
        instBadge.textContent = '[ IDLE / EMPTY ]';
        if (detailEl) detailEl.textContent = 'Standby';
      }
    });

    // Update RegFile Display
    regFile.forEach((val, idx) => {
      const cell = document.getElementById(`rf-x${idx}`);
      if (cell) {
        cell.querySelector('.reg-val').textContent = val;
      }
    });
  }

  function highlightReg(rd) {
    const cell = document.getElementById(`rf-x${rd}`);
    if (cell) {
      cell.classList.add('highlight');
      setTimeout(() => cell.classList.remove('highlight'), 600);
    }
  }

  function toggleRun() {
    if (isRunning) {
      clearInterval(timer);
      timer = null;
      isRunning = false;
      runBtn.textContent = 'Auto Clock ▶';
      runBtn.classList.remove('active');
    } else {
      isRunning = true;
      runBtn.textContent = 'Pause ⏸';
      runBtn.classList.add('active');
      timer = setInterval(stepClock, 750);
    }
  }

  progSelect.addEventListener('change', (e) => {
    currentProgKey = e.target.value;
    resetSim();
  });

  stepBtn.addEventListener('click', stepClock);
  runBtn.addEventListener('click', toggleRun);
  resetBtn.addEventListener('click', resetSim);

  resetSim();
}

/* ──────────────────────────────────────────────────────────
   3. MEMRISTOR / CIM SANDBOX (NeuroSim Model)
   ────────────────────────────────────────────────────────── */
function initMemristorSandbox() {
  const table = document.getElementById('crossbar-grid');
  const vToggles = document.querySelectorAll('.v-toggle-btn');
  const resetWeightsBtn = document.getElementById('cim-reset-weights-btn');
  const randWeightsBtn = document.getElementById('cim-rand-weights-btn');

  if (!table) return;

  // 4x4 matrix of 3-bit conductance states (0 to 7)
  // G = state * 12.5 uS
  let conductanceMatrix = [
    [5, 2, 7, 0],
    [1, 6, 3, 4],
    [4, 0, 6, 2],
    [7, 3, 1, 5]
  ];

  let inputVoltages = [1, 1, 0, 1]; // 4 rows

  function computeCIM() {
    const colCurrents = [0, 0, 0, 0];
    const adcs = [0, 0, 0, 0];
    const G_STEP_US = 12.5; // micro-siemens per state level

    // Ohm's & Kirchhoff's Current Law: I_j = Sum(V_i * G_ij)
    for (let c = 0; c < 4; c++) {
      let currentSum = 0;
      for (let r = 0; r < 4; r++) {
        if (inputVoltages[r] === 1) {
          currentSum += conductanceMatrix[r][c] * G_STEP_US;
        }
      }
      colCurrents[c] = currentSum;
      // NeuroSim 5-bit ADC quantization (range 0 to 31)
      // Max current ~ 4 * 7 * 12.5 = 350 uA
      adcs[c] = Math.min(31, Math.round((currentSum / 350) * 31));
    }

    // Update Output Readouts
    for (let c = 0; c < 4; c++) {
      const curEl = document.getElementById(`col-current-${c}`);
      const adcEl = document.getElementById(`col-adc-${c}`);
      if (curEl) curEl.textContent = `${colCurrents[c].toFixed(1)} μA`;
      if (adcEl) adcEl.textContent = `0b${adcs[c].toString(2).padStart(5, '0')} (${adcs[c]})`;
    }

    // NeuroSim Estimations
    const totalCurrent = colCurrents.reduce((a, b) => a + b, 0);
    const readLatencyNs = 4.2; // 128x128 array read latency baseline
    const dynamicEnergyFj = (totalCurrent * 1.0 * readLatencyNs).toFixed(1); // I * V * t

    const energyEl = document.getElementById('metric-cim-energy');
    const latencyEl = document.getElementById('metric-cim-latency');
    if (energyEl) energyEl.textContent = `${dynamicEnergyFj} fJ / MAC`;
    if (latencyEl) latencyEl.textContent = `${readLatencyNs} ns`;
  }

  function renderGrid() {
    const G_STEP_US = 12.5;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cellBtn = document.getElementById(`mem-cell-${r}-${c}`);
        if (!cellBtn) continue;
        const val = conductanceMatrix[r][c];

        // Clean classes
        cellBtn.className = `mem-cell-btn g-lvl-${val}`;
        cellBtn.innerHTML = `
          <span class="cell-state">G${val}</span>
          <span class="cell-cond">${(val * G_STEP_US).toFixed(0)}μS</span>
        `;
      }
    }
    computeCIM();
  }

  // Cell click -> cycle through 0..7
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const btn = document.getElementById(`mem-cell-${r}-${c}`);
      if (btn) {
        btn.addEventListener('click', () => {
          conductanceMatrix[r][c] = (conductanceMatrix[r][c] + 1) % 8;
          renderGrid();
        });
      }
    }
  }

  // Voltage toggles
  vToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const row = parseInt(btn.getAttribute('data-row'), 10);
      inputVoltages[row] = inputVoltages[row] === 1 ? 0 : 1;
      btn.classList.toggle('active', inputVoltages[row] === 1);
      btn.textContent = inputVoltages[row] === 1 ? '1.0 V' : '0.0 V';
      computeCIM();
    });
  });

  if (resetWeightsBtn) {
    resetWeightsBtn.addEventListener('click', () => {
      conductanceMatrix = [
        [7, 0, 0, 7],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [7, 0, 0, 7]
      ];
      renderGrid();
    });
  }

  if (randWeightsBtn) {
    randWeightsBtn.addEventListener('click', () => {
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          conductanceMatrix[r][c] = Math.floor(Math.random() * 8);
        }
      }
      renderGrid();
    });
  }

  renderGrid();
}

/* ──────────────────────────────────────────────────────────
   4. SETUP & HOLD TIMING SLACK ANALYZER
   ────────────────────────────────────────────────────────── */
function initTimingSlackAnalyzer() {
  const fclkSlider = document.getElementById('slider-fclk');
  const tcombSlider = document.getElementById('slider-tcomb');
  const tcqSlider = document.getElementById('slider-tcq');
  const tsetupSlider = document.getElementById('slider-tsetup');
  const tskewSlider = document.getElementById('slider-tskew');

  const banner = document.getElementById('timing-slack-banner');
  const arrivalEl = document.getElementById('timing-arrival-val');
  const requiredEl = document.getElementById('timing-required-val');
  const setupSlackEl = document.getElementById('timing-slack-val');
  const holdSlackEl = document.getElementById('timing-hold-slack-val');
  const pathWire = document.getElementById('timing-path-wire');

  if (!fclkSlider || !banner) return;

  function updateTiming() {
    const fclkMhz = parseFloat(fclkSlider.value);
    const tclkNs = (1000 / fclkMhz);
    const tcombNs = parseFloat(tcombSlider.value);
    const tcqNs = parseFloat(tcqSlider.value);
    const tsetupNs = parseFloat(tsetupSlider.value);
    const tskewNs = parseFloat(tskewSlider.value);
    const tholdNs = 0.20; // 200 ps fixed hold requirement

    // Static Timing Analysis Equations:
    // Arrival Time = T_cq + T_comb
    const arrival = tcqNs + tcombNs;
    // Required Time (Setup) = T_clk - T_setup + T_skew
    const required = tclkNs - tsetupNs + tskewNs;
    // Setup Slack = Required - Arrival
    const setupSlack = required - arrival;
    // Hold Slack = Arrival - T_hold - T_skew
    const holdSlack = arrival - tholdNs - tskewNs;

    // Update Summary Metric Badges
    const periodMetric = document.getElementById('timing-metric-period');
    const critPathMetric = document.getElementById('timing-metric-critpath');
    const fmaxMetric = document.getElementById('timing-metric-fmax');

    if (periodMetric) periodMetric.textContent = `${tclkNs.toFixed(2)} ns`;
    if (critPathMetric) critPathMetric.textContent = `${arrival.toFixed(2)} ns`;
    if (fmaxMetric) {
      const minPeriodNs = tcqNs + tcombNs + tsetupNs - tskewNs;
      if (minPeriodNs > 0) {
        const fmaxMhz = 1000 / minPeriodNs;
        fmaxMetric.textContent = `${fmaxMhz.toFixed(1)} MHz`;
        fmaxMetric.style.color = fmaxMhz >= fclkMhz ? 'var(--accent)' : '#ff5f56';
      } else {
        fmaxMetric.textContent = 'Infinite (Skew Dominated)';
        fmaxMetric.style.color = '#fff';
      }
    }

    if (arrivalEl) arrivalEl.textContent = `${arrival.toFixed(2)} ns`;
    if (requiredEl) requiredEl.textContent = `${required.toFixed(2)} ns`;
    if (setupSlackEl) setupSlackEl.textContent = `${setupSlack >= 0 ? '+' : ''}${setupSlack.toFixed(2)} ns`;
    if (holdSlackEl) holdSlackEl.textContent = `${holdSlack >= 0 ? '+' : ''}${holdSlack.toFixed(2)} ns`;

    // Verdict Badge
    const isMet = setupSlack >= 0 && holdSlack >= 0;
    const badge = banner.querySelector('.slack-badge');

    if (isMet) {
      banner.className = 'slack-verdict-banner pass';
      if (badge) badge.textContent = `TIMING MET (+${setupSlack.toFixed(2)} ns SLACK)`;
      if (pathWire) {
        pathWire.setAttribute('stroke', 'var(--accent)');
        pathWire.setAttribute('filter', 'drop-shadow(0 0 6px rgba(56, 255, 139, 0.6))');
      }
    } else {
      banner.className = 'slack-verdict-banner violation';
      const reason = setupSlack < 0 ? `SETUP VIOLATION (${setupSlack.toFixed(2)} ns WNS)` : `HOLD VIOLATION (${holdSlack.toFixed(2)} ns)`;
      if (badge) badge.textContent = `⚠️ ${reason}`;
      if (pathWire) {
        pathWire.setAttribute('stroke', '#ff5f56');
        pathWire.setAttribute('filter', 'drop-shadow(0 0 10px rgba(255, 95, 86, 0.8))');
      }
    }
  }

  [fclkSlider, tcombSlider, tcqSlider, tsetupSlider, tskewSlider].forEach(slider => {
    slider.addEventListener('input', updateTiming);
  });

  updateTiming();
}
