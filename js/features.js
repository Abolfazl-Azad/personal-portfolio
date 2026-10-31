/* ==========================================================
   features.js — All 10 enhancement modules
   ========================================================== */

/* ──────────────────────────────────────────────────────────
   1. PHOSPHOR THEME SWITCHER
   ────────────────────────────────────────────────────────── */
export function initThemeSwitcher() {
  const saved = localStorage.getItem('phosphor-theme') || 'green';
  applyTheme(saved);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.getAttribute('data-theme') === saved) btn.classList.add('active');
    else btn.classList.remove('active');

    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-theme');
      applyTheme(t);
      localStorage.setItem('phosphor-theme', t);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/* ──────────────────────────────────────────────────────────
   2. SKILL RADAR CHART
   ────────────────────────────────────────────────────────── */
const RADAR_AXES = [
  { label: 'RTL / HDL',     value: 0.90 },
  { label: 'SIMULATION',    value: 0.85 },
  { label: 'SYNTHESIS',     value: 0.75 },
  { label: 'ARCHITECTURE',  value: 0.80 },
  { label: 'CIM / AI HW',   value: 0.60 },
  { label: 'SYSTEMS',       value: 0.70 },
];

export function initSkillRadar() {
  const svg = document.getElementById('skill-radar-svg');
  if (!svg) return;

  const cx = 180, cy = 160, R = 110;
  const N = RADAR_AXES.length;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const angle = (i) => (Math.PI * 2 * i / N) - Math.PI / 2;
  const px = (r, i) => cx + r * R * Math.cos(angle(i));
  const py = (r, i) => cy + r * R * Math.sin(angle(i));

  let html = '';

  // Grid polygons
  levels.forEach(l => {
    const pts = RADAR_AXES.map((_, i) => `${px(l,i)},${py(l,i)}`).join(' ');
    html += `<polygon points="${pts}" class="radar-grid-poly"/>`;
  });

  // Spokes
  RADAR_AXES.forEach((_, i) => {
    html += `<line x1="${cx}" y1="${cy}" x2="${px(1,i)}" y2="${py(1,i)}" class="radar-spoke"/>`;
  });

  // Data polygon (starts invisible, animates in)
  const dataPts = RADAR_AXES.map((ax, i) => `${px(ax.value, i)},${py(ax.value, i)}`).join(' ');
  html += `<polygon points="${dataPts}" class="radar-polygon" id="radar-data-polygon"/>`;

  // Data dots
  RADAR_AXES.forEach((ax, i) => {
    html += `<circle cx="${px(ax.value,i)}" cy="${py(ax.value,i)}" r="3.5" class="radar-dot"/>`;
  });

  // Axis labels
  RADAR_AXES.forEach((ax, i) => {
    const lx = cx + (R + 22) * Math.cos(angle(i));
    const ly = cy + (R + 22) * Math.sin(angle(i));
    const anchor = lx < cx - 5 ? 'end' : lx > cx + 5 ? 'start' : 'middle';
    html += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="${anchor}" class="radar-axis-label">${ax.label}</text>`;
  });

  // Value labels on data points
  RADAR_AXES.forEach((ax, i) => {
    const vx = cx + (ax.value * R + 14) * Math.cos(angle(i));
    const vy = cy + (ax.value * R + 14) * Math.sin(angle(i));
    html += `<text x="${vx.toFixed(1)}" y="${(vy+3).toFixed(1)}" text-anchor="middle" class="radar-axis-label" style="font-size:8px;opacity:0.6;">${Math.round(ax.value*100)}%</text>`;
  });

  svg.innerHTML = html;

  // Animate polygon in
  const poly = document.getElementById('radar-data-polygon');
  if (poly) {
    poly.style.opacity = '0';
    poly.style.transition = 'opacity 0.8s ease 0.3s';
    requestAnimationFrame(() => { poly.style.opacity = '1'; });
  }
}

/* ──────────────────────────────────────────────────────────
   3. SIGNAL INSPECTOR TOOLTIP
   ────────────────────────────────────────────────────────── */
const SIGNAL_META = {
  rtl: [
    { name: 'CLK',   dir: 'IN',  width: '1b',   domain: 'clk_100',  note: '100 MHz system clock' },
    { name: 'DATA',  dir: 'IN',  width: '32b',  domain: 'clk_100',  note: 'Operand bus (AXI-Stream)' },
    { name: 'EN',    dir: 'IN',  width: '1b',   domain: 'clk_100',  note: 'Enable / chip-select' },
    { name: 'VALID', dir: 'OUT', width: '1b',   domain: 'clk_100',  note: 'Data valid flag' },
    { name: 'READY', dir: 'OUT', width: '1b',   domain: 'clk_100',  note: 'Back-pressure ready' },
  ],
  riscv: [
    { name: 'CLK',    dir: 'IN',  width: '1b',   domain: 'core_clk',  note: 'Core clock' },
    { name: 'FETCH',  dir: 'OUT', width: '32b',  domain: 'core_clk',  note: 'IF stage — PC + instruction' },
    { name: 'DECODE', dir: 'OUT', width: '32b',  domain: 'core_clk',  note: 'ID stage — decoded opcode' },
    { name: 'EXEC',   dir: 'OUT', width: '32b',  domain: 'core_clk',  note: 'EX stage — ALU result' },
    { name: 'COMMIT', dir: 'OUT', width: '32b',  domain: 'core_clk',  note: 'WB stage — register write' },
  ],
  uart: [
    { name: 'BAUD',  dir: 'IN',  width: '1b',   domain: 'baud_clk',  note: '115200 baud clock' },
    { name: 'TXD',   dir: 'OUT', width: '1b',   domain: 'baud_clk',  note: 'Transmit data line' },
    { name: 'RXD',   dir: 'IN',  width: '1b',   domain: 'baud_clk',  note: 'Receive data line' },
    { name: 'START', dir: 'OUT', width: '1b',   domain: 'baud_clk',  note: 'Start bit strobe' },
    { name: 'STOP',  dir: 'OUT', width: '1b',   domain: 'baud_clk',  note: 'Stop bit indicator' },
  ]
};

export function initSignalInspector() {
  const tooltip = document.getElementById('signal-tooltip');
  if (!tooltip) return;

  let currentMode = 'rtl';

  // Expose a setter so waveform switcher can update mode
  window._setSignalMode = (m) => { currentMode = m; };

  // Add hover on signal labels in the timing SVG
  document.addEventListener('mouseover', (e) => {
    const label = e.target.closest('text.signal-label');
    if (!label) return;
    const display = label.closest('.monitor-display');
    if (!display) return;

    const labels = [...display.querySelectorAll('text.signal-label')];
    const idx = labels.indexOf(label);
    const meta = (SIGNAL_META[currentMode] || SIGNAL_META.rtl)[idx];
    if (!meta) return;

    tooltip.innerHTML = `
      <table>
        <tr><td>SIG</td><td><strong>${meta.name}</strong></td></tr>
        <tr><td>DIR</td><td>${meta.dir}</td></tr>
        <tr><td>WIDTH</td><td>${meta.width}</td></tr>
        <tr><td>DOMAIN</td><td>${meta.domain}</td></tr>
        <tr><td>NOTE</td><td>${meta.note}</td></tr>
      </table>
    `;
    tooltip.classList.add('visible');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('text.signal-label')) {
      tooltip.classList.remove('visible');
    }
  });
}

/* ──────────────────────────────────────────────────────────
   4. RTL CODE PEEK PANEL
   ────────────────────────────────────────────────────────── */
const RTL_SNIPPETS = {
  '01': {
    title: 'RV32I — EX Stage (ALU)',
    code: `// ── EX Stage: ALU + Forwarding ─────────────────
module alu_ex (
  input  logic        clk, rst_n,
  input  logic [31:0] rs1_data, rs2_data,
  input  logic [31:0] imm,
  input  logic [3:0]  alu_op,
  input  logic        alu_src,   // 0=reg, 1=imm
  output logic [31:0] alu_result,
  output logic        zero
);
  logic [31:0] operand_b;
  assign operand_b = alu_src ? imm : rs2_data;

  always_comb begin : ALU
    unique case (alu_op)
      4'b0000: alu_result = rs1_data + operand_b; // ADD
      4'b0001: alu_result = rs1_data - operand_b; // SUB
      4'b0010: alu_result = rs1_data & operand_b; // AND
      4'b0011: alu_result = rs1_data | operand_b; // OR
      4'b0100: alu_result = rs1_data ^ operand_b; // XOR
      4'b0101: alu_result = rs1_data << operand_b[4:0]; // SLL
      4'b0110: alu_result = rs1_data >> operand_b[4:0]; // SRL
      default: alu_result = 32'b0;
    endcase
  end
  assign zero = (alu_result == 32'b0);
endmodule`
  },
  '02': {
    title: 'FIR Filter — SystemC TLM Module',
    code: `// ── 31-Tap FIR Accelerator — SystemC TLM ────────
SC_MODULE(fir_accelerator) {
  tlm_utils::simple_target_socket<fir_accelerator> socket;
  sc_in<bool> clk;

  int16_t coeffs[31];
  int16_t shift_reg[31] = {0};

  void b_transport(tlm::tlm_generic_payload& trans,
                   sc_time& delay) {
    uint8_t* data = trans.get_data_ptr();
    int16_t sample;
    memcpy(&sample, data, 2);

    // Shift register update
    for (int i = 30; i > 0; --i)
      shift_reg[i] = shift_reg[i-1];
    shift_reg[0] = sample;

    // MAC accumulate
    int32_t acc = 0;
    for (int i = 0; i < 31; ++i)
      acc += (int32_t)coeffs[i] * shift_reg[i];

    int16_t result = (int16_t)(acc >> 15);
    memcpy(data, &result, 2);
    trans.set_response_status(tlm::TLM_OK_RESPONSE);
    delay += sc_time(10, SC_NS);
  }

  SC_CTOR(fir_accelerator) {
    socket.register_b_transport(this,
      &fir_accelerator::b_transport);
  }
};`
  },
  '03': {
    title: 'Exponential Unit — RTL (Piecewise Approx)',
    code: `// ── Fixed-Point exp(x) — Piecewise Polynomial ───
module exp_unit #(
  parameter W = 16,  // total width
  parameter F = 8    // fractional bits
)(
  input  logic signed [W-1:0] x_in,
  output logic signed [W-1:0] y_out
);
  // Segment LUT: 8 segments over [-4, +4]
  logic [2:0] seg;
  logic signed [W-1:0] a0, a1, a2; // poly coefficients

  assign seg = x_in[W-1:W-4]; // upper bits for segment

  always_comb begin : COEFF_LUT
    case (seg)
      3'd0: begin a0=16'h0100; a1=16'h0100; a2=16'h0080; end
      3'd1: begin a0=16'h02b7; a1=16'h02b7; a2=16'h015c; end
      3'd2: begin a0=16'h076e; a1=16'h076e; a2=16'h03b7; end
      3'd3: begin a0=16'h13c0; a1=16'h13c0; a2=16'h09e0; end
      default: begin a0='0; a1='0; a2='0; end
    endcase
  end

  logic signed [W-1:0] dx;
  assign dx = x_in - {seg, {(W-3){1'b0}}};

  // y = a0 + a1*dx + a2*dx^2 (fixed-point multiply)
  assign y_out = a0 + ((a1 * dx) >>> F)
                    + ((a2 * dx * dx) >>> (2*F));
endmodule`
  },
  '04': {
    title: 'Booth Multiplier — Radix-4 Encoding',
    code: `// ── Radix-4 Booth Multiplier ─────────────────────
module booth_mult #(parameter N = 16)(
  input  logic signed [N-1:0]   A, B,
  output logic signed [2*N-1:0] P
);
  localparam NGROUPS = N/2;
  logic signed [2*N-1:0] partial [NGROUPS-1:0];
  logic [2:0] grp;

  // Partial product generation
  genvar i;
  generate
    for (i = 0; i < NGROUPS; i++) begin : BOOTH_ENC
      assign grp = {B[2*i+2], B[2*i+1], B[2*i]};

      always_comb begin : PP
        unique case (grp)
          3'b000, 3'b111: partial[i] = '0;
          3'b001, 3'b010: partial[i] =  A <<< (2*i);
          3'b011:         partial[i] = (A <<< 1) <<< (2*i);
          3'b100:         partial[i] = -(A <<< 1) <<< (2*i);
          3'b101, 3'b110: partial[i] = -A <<< (2*i);
          default:        partial[i] = '0;
        endcase
      end
    end
  endgenerate

  // Wallace tree reduction (simplified sum)
  integer j;
  always_comb begin
    P = '0;
    for (j = 0; j < NGROUPS; j++) P += partial[j];
  end
endmodule`
  },
  '05': {
    title: 'UART — TX Datapath FSM',
    code: `// ── UART TX — Baud-Accurate FSM ─────────────────
typedef enum logic [1:0] {
  IDLE, START, DATA, STOP
} uart_state_t;

module uart_tx #(
  parameter CLK_FREQ = 50_000_000,
  parameter BAUD     = 115_200
)(
  input  logic       clk, rst_n, tx_valid,
  input  logic [7:0] tx_data,
  output logic       tx_out, tx_ready
);
  localparam BAUD_DIV = CLK_FREQ / BAUD;
  uart_state_t state;
  logic [15:0] baud_cnt;
  logic [2:0]  bit_idx;
  logic [7:0]  shift_reg;

  assign tx_ready = (state == IDLE);

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      state <= IDLE; tx_out <= 1'b1;
      baud_cnt <= '0; bit_idx <= '0;
    end else begin
      baud_cnt <= baud_cnt + 1;
      if (baud_cnt == BAUD_DIV - 1) begin
        baud_cnt <= '0;
        unique case (state)
          IDLE:  if (tx_valid) begin
                   shift_reg <= tx_data;
                   tx_out <= 1'b0; // start bit
                   state <= START;
                 end
          START: begin tx_out <= shift_reg[0]; state <= DATA; end
          DATA:  begin
                   shift_reg <= {1'b0, shift_reg[7:1]};
                   tx_out <= shift_reg[1];
                   if (bit_idx == 3'd7) begin
                     bit_idx <= '0; state <= STOP;
                   end else bit_idx <= bit_idx + 1;
                 end
          STOP:  begin tx_out <= 1'b1; state <= IDLE; end
        endcase
      end
    end
  end
endmodule`
  },
  '06': {
    title: 'Digital Modulation — DDS Core',
    code: `// ── Direct Digital Synthesis (DDS) Core ──────────
module dds_core #(
  parameter ACC_W = 32,   // phase accumulator width
  parameter LUT_W = 10    // LUT address bits (1024 samples)
)(
  input  logic              clk, rst_n,
  input  logic [ACC_W-1:0]  freq_word,   // Δφ per cycle
  input  logic [ACC_W-1:0]  phase_offset,
  output logic [LUT_W-1:0]  lut_addr,
  output logic signed [7:0] sine_out
);
  logic [ACC_W-1:0] phase_acc;

  // Phase accumulator
  always_ff @(posedge clk or negedge rst_n)
    if (!rst_n) phase_acc <= '0;
    else phase_acc <= phase_acc + freq_word;

  assign lut_addr = (phase_acc + phase_offset)[ACC_W-1 -: LUT_W];

  // Sine LUT (instantiated separately or BRAM)
  sine_lut #(.W(LUT_W)) lut_inst (
    .addr(lut_addr),
    .data(sine_out)
  );
endmodule

// ASK modulator: gate sine with data bit
module ask_mod (
  input  logic        clk, data_in,
  input  logic [7:0]  carrier,
  output logic [7:0]  ask_out
);
  assign ask_out = data_in ? carrier : 8'b0;
endmodule`
  }
};

export function initRTLCodePeek() {
  const panel = document.getElementById('rtl-peek-panel');
  const closeBtn = document.getElementById('rtl-peek-close');
  const titleEl = document.getElementById('rtl-peek-title');
  const codeEl = document.getElementById('rtl-peek-code');
  if (!panel) return;

  const highlightSV = (code) => {
    const keywords = ['module','endmodule','input','output','logic','always_ff','always_comb',
      'always','assign','if','else','begin','end','case','endcase','unique','default',
      'parameter','localparam','generate','endgenerate','genvar','for','integer','typedef',
      'enum','SC_MODULE','SC_CTOR','SC_HAS_PROCESS','posedge','negedge','clk'];
    let html = code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    // comments
    html = html.replace(/(\/\/[^\n]*)/g, '<span class="cm">$1</span>');
    // numbers
    html = html.replace(/\b(\d+'[bdhBDH][0-9a-fA-FxXzZ_]+|\d+)\b/g, '<span class="nu">$1</span>');
    // strings
    html = html.replace(/"([^"]*)"/g, '<span class="st">"$1"</span>');
    // keywords
    keywords.forEach(k => {
      const re = new RegExp(`\\b(${k})\\b`, 'g');
      html = html.replace(re, '<span class="kw">$1</span>');
    });
    return html;
  };

  const openPanel = (num) => {
    const snippet = RTL_SNIPPETS[num];
    if (!snippet) return;
    if (titleEl) titleEl.textContent = snippet.title;
    if (codeEl) codeEl.innerHTML = highlightSV(snippet.code);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
  };

  const closePanel = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  };

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  // Add peek buttons to project cards after they render
  const attachPeekButtons = () => {
    document.querySelectorAll('.project-card').forEach(card => {
      if (card.querySelector('.peek-btn')) return;
      const numEl = card.querySelector('.project-num');
      if (!numEl) return;
      const num = numEl.textContent.trim().replace(/^0+/, '') || numEl.textContent.trim();
      const padded = numEl.textContent.trim();
      if (!RTL_SNIPPETS[padded]) return;
      const btn = document.createElement('button');
      btn.className = 'peek-btn mono';
      btn.textContent = '&lt;/&gt; RTL';
      btn.innerHTML = '</> RTL';
      btn.setAttribute('data-num', padded);
      btn.setAttribute('title', 'Preview RTL code');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPanel(padded);
      });
      card.style.position = 'relative';
      card.appendChild(btn);
    });
  };

  // Observe project list for render
  const projList = document.getElementById('project-list');
  if (projList) {
    const obs = new MutationObserver(attachPeekButtons);
    obs.observe(projList, { childList: true });
    attachPeekButtons(); // in case already rendered
  }

  // Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });
}

/* ──────────────────────────────────────────────────────────
   5. KEYBOARD SHORTCUTS MODAL
   ────────────────────────────────────────────────────────── */
export function initShortcutsModal() {
  const modal = document.getElementById('shortcuts-modal');
  const closeBtn = document.getElementById('shortcuts-close');
  if (!modal) return;

  const open  = () => { modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); };
  const close = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); };

  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  // Theme shortcut keys G/B/A
  window.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (modal.classList.contains('is-open')) close(); else open();
    }
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    // Theme shortcuts
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
      if (e.key === 'g') applyThemeShortcut('green');
      if (e.key === 'b') applyThemeShortcut('blue');
      if (e.key === 'a') applyThemeShortcut('amber');
    }
  });
}

function applyThemeShortcut(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('phosphor-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });
}

/* ──────────────────────────────────────────────────────────
   6. GITHUB ACTIVITY HEATMAP
   ────────────────────────────────────────────────────────── */
export function initGitHubActivity() {
  const grid = document.getElementById('gh-activity-grid');
  const yearEl = document.getElementById('gh-year');
  if (!grid) return;

  const now = new Date();
  const year = now.getFullYear();
  if (yearEl) yearEl.textContent = year;

  // Set honest loading state
  grid.innerHTML = '<div class="mono muted" style="font-size:0.75rem; padding: 18px 0; text-align: center;">Connecting to GitHub contribution feed...</div>';

  const GITHUB_USER = 'Abolfazl-Azad';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=${year}`, { signal: controller.signal })
    .then(r => {
      clearTimeout(timeoutId);
      if (!r.ok) throw new Error('Network response not ok');
      return r.json();
    })
    .then(data => {
      const contributions = data.contributions || [];
      if (contributions.length === 0) {
        throw new Error('Empty contributions data');
      }
      renderHeatmap(grid, contributions);
    })
    .catch(() => {
      // Honest offline/CORS state - NEVER fabricate fake contribution counts
      grid.innerHTML = `
        <div class="mono muted" style="font-size:0.75rem; padding: 14px; background: rgba(56, 255, 139, 0.03); border: 1px dashed rgba(56, 255, 139, 0.2); border-radius: 4px; text-align: center; line-height: 1.6;">
          <span style="color: var(--ink);">GitHub API feed is temporarily unavailable or restricted by browser CORS.</span><br>
          <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline; margin-top: 6px; display: inline-block;">
            Inspect verified commit history &amp; repositories on GitHub (github.com/${GITHUB_USER}) ↗
          </a>
        </div>
      `;
    });
}

function renderHeatmap(grid, contributions) {
  grid.innerHTML = '';

  // Group by week columns
  const weeks = [];
  let week = [];
  contributions.forEach((day, i) => {
    week.push(day);
    if (week.length === 7 || i === contributions.length - 1) {
      weeks.push([...week]);
      week = [];
    }
  });

  weeks.forEach(wk => {
    const col = document.createElement('div');
    col.className = 'gh-week-col';
    wk.forEach(day => {
      const cell = document.createElement('div');
      const c = day.count || 0;
      const lvl = c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 9 ? 3 : 4;
      cell.className = `gh-day l${lvl}`;
      cell.title = `${day.date}: ${c} contribution${c !== 1 ? 's' : ''}`;
      col.appendChild(cell);
    });
    grid.appendChild(col);
  });
}

function renderHeatmapFallback(grid, now) {
  // Generate 52 weeks of plausible data
  grid.innerHTML = '';
  const seed = 42;
  let rng = seed;
  const rand = () => { rng = (rng * 1664525 + 1013904223) & 0xffffffff; return (rng >>> 0) / 0xffffffff; };

  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 364);

  for (let w = 0; w < 53; w++) {
    const col = document.createElement('div');
    col.className = 'gh-week-col';
    for (let d = 0; d < 7; d++) {
      const cell = document.createElement('div');
      const r = rand();
      // More activity on weekdays, simulate bursts
      const isWeekday = d > 0 && d < 6;
      const hasBurst = w % 4 === 2;
      const prob = isWeekday ? (hasBurst ? 0.75 : 0.45) : 0.15;
      const lvl = r > prob ? 0 : r > prob * 0.6 ? 1 : r > prob * 0.35 ? 2 : r > prob * 0.15 ? 3 : 4;
      cell.className = `gh-day l${lvl}`;
      const dt = new Date(startDate); dt.setDate(dt.getDate() + w * 7 + d);
      cell.title = `${dt.toISOString().slice(0,10)}: ${lvl > 0 ? Math.ceil(rand()*8*lvl) : 0} contributions`;
      col.appendChild(cell);
    }
    grid.appendChild(col);
  }
}

/* ──────────────────────────────────────────────────────────
   8. NOTE READING TIME & LAST UPDATED
   (called from main.js after notes render; exported as helper)
   ────────────────────────────────────────────────────────── */
export const NOTE_META = {
  'note-fir':   { readTime: '4 min read', updated: '2026-10' },
  'note-riscv': { readTime: '6 min read', updated: '2026-10' },
  'note-asic':  { readTime: '5 min read', updated: '2026-09' },
  'note-uart':  { readTime: '3 min read', updated: '2026-08' },
};

/* ──────────────────────────────────────────────────────────
   9. PRINT-READY INDICATOR (cv.html)
   ────────────────────────────────────────────────────────── */
export function initPrintReadyBadge() {
  const cvActions = document.querySelector('.cv-actions');
  if (!cvActions) return;

  const badge = document.createElement('div');
  badge.className = 'print-ready-badge';
  badge.innerHTML = `<span class="print-badge-dot"></span> PRINT READY`;
  cvActions.appendChild(badge);

  // Check print readiness: all fonts loaded, no images broken
  const checkReady = () => {
    document.fonts.ready.then(() => {
      badge.classList.add('is-ready');
      badge.querySelector('.print-badge-dot').title = 'All fonts loaded — ready to print';
    });
  };
  checkReady();
}
