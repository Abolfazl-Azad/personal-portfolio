export const profile = {
  name: "Abolfazl Azad",
  title: "Electrical Engineering B.Sc. Candidate | RTL Design | Hardware Acceleration",
  university: "University of Tehran",
  location: "Tehran, Iran",
  email: "abolfazlazad@ut.ac.ir",
  secondaryEmail: "abolfazlazad321@gmail.com",
  website: "https://abolfazlazad.ir/",
  github: "https://github.com/Abolfazl-Azad",
  linkedin: "https://www.linkedin.com/in/abolfazl-azad/",
  headline: "Electrical Engineering B.Sc. candidate at the University of Tehran focused on digital systems, RTL design, and computer architecture.",
  bio: "Electrical Engineering B.Sc. candidate at the University of Tehran focused on digital systems, RTL design, and computer architecture. Project experience includes SystemVerilog-based matrix-multiplication accelerator design and verification, SystemC-based FIR accelerator integration, and open-source RISC-V SoC verification. Supervised research spans low-power RTL optimization, hardware-aware weight quantization, and NeuroSim-based memristor/CIM characterization. Seeking research experience in energy-efficient digital design, hardware accelerators, RISC-V systems, and AI hardware.",
  aboutKeywords: [
    "Digital Systems",
    "RTL Design",
    "Hardware Acceleration",
    "Computer Architecture",
    "RISC-V / NEORV32",
    "Low-Power RTL",
    "Compute-in-Memory (CIM)",
    "Memristor / NeuroSim",
    "SystemVerilog",
    "FPGA & ASIC Flow"
  ]
};

export const researchInterests = {
  statement: "Low-power RTL and switching-activity reduction; hardware accelerators and datapath/control design; computer architecture and RISC-V; hardware/software co-design; compute-in-memory (CIM); memristor-based neural networks and low-bit weight quantization.",
  seeking: "Seeking research experience in energy-efficient digital design, hardware accelerators, RISC-V systems, and AI hardware.",
  directions: [
    {
      area: "Low-Power RTL & Switching-Activity Reduction",
      detail: "Investigating operation-aware operand isolation in add/sub datapaths and pre-multiplexer isolation variants to reduce unnecessary switching. Evaluating functional simulation and synthesis/timing tradeoffs."
    },
    {
      area: "Hardware Accelerators & Datapath/Control Design",
      detail: "Designing processing-element datapaths, control logic, and I/O integration for matrix-multiplication hardware accelerators (iMPAC), validated through comprehensive SystemVerilog testbenches."
    },
    {
      area: "Compute-in-Memory (CIM) & Memristor NNs",
      detail: "NeuroSim-based RRAM inference simulation (128 × 128 subarray, 5-bit ADC, VGG8/CIFAR-10 baseline) and hardware-aware 3-bit weight quantization and QAT."
    },
    {
      area: "Computer Architecture & RISC-V Systems",
      detail: "5-stage pipelined RV32I microarchitecture, hardware/software co-design with SystemC/DMA, and open-source verification on NEORV32 SoC."
    }
  ]
};

export const focusAreas = [
  {
    title: "RTL & ACCELERATOR DESIGN",
    description: "Designing processing-element datapaths, control logic, and matrix accelerators using SystemVerilog."
  },
  {
    title: "LOW-POWER DIGITAL DESIGN",
    description: "Switching-activity reduction, operand isolation, and synthesis/timing optimization for energy efficiency."
  },
  {
    title: "COMPUTE-IN-MEMORY & CIM",
    description: "RRAM crossbar inference characterization using NeuroSim and hardware-aware 3-bit weight quantization."
  },
  {
    title: "RISC-V & ARCHITECTURE",
    description: "Pipelined microarchitectures, open-source verification on NEORV32, and hardware/software co-design."
  },
  {
    title: "ASIC & FPGA FLOWS",
    description: "Synthesis with Synopsys Design Compiler, physical design with Cadence Innovus, and FPGA prototyping."
  },
  {
    title: "SYSTEM-LEVEL INTEGRATION",
    description: "Transaction-level modeling with SystemC, DMA integration, memory-mapped interfaces, and firmware."
  }
];

export const education = [
  {
    id: "ee",
    institution: "University of Tehran",
    location: "Tehran, Iran",
    degree: "B.Sc. candidate in Electrical Engineering",
    focus: "Focus: Digital Systems",
    gpa: "Cumulative GPA: 17.11/20",
    start: "2023",
    end: "2028 (expected)",
    startPersian: "1402",
    endPersian: "1407"
  },
  {
    id: "ce-minor",
    institution: "University of Tehran",
    location: "Tehran, Iran",
    degree: "Minor candidate in Computer Engineering",
    focus: "Focus: Computer Systems & Software",
    gpa: "",
    start: "2023",
    end: "Present",
    startPersian: "1402",
    endPersian: "Present"
  }
];

export const coursework = [
  {
    category: "ELECTRICAL ENGINEERING",
    courses: [
      "Digital Electronics",
      "Digital Systems I",
      "Computer Architecture",
      "Object-Oriented Programming",
      "ASIC Design",
      "Electronic System-Level (ESL) Design",
      "FPGA-Based Embedded Systems"
    ]
  },
  {
    category: "COMPUTER ENGINEERING MINOR",
    courses: [
      "Advanced Programming",
      "Data Structures and Algorithms",
      "Operating Systems"
    ]
  }
];

export const currentFocus = [
  {
    status: "SUPERVISED RESEARCH",
    title: "iMPAC Low-Power RTL & Accelerator Optimization",
    description: "University of Tehran under Prof. Zainalabedin Navabi — operand isolation & switching-activity reduction."
  },
  {
    status: "SUPERVISED RESEARCH",
    title: "Memristor Weight Quantization & NeuroSim CIM",
    description: "University of Tehran under Dr. Shaghayegh Vahdat — 3-bit QAT & RRAM inference characterization."
  },
  {
    status: "OPEN SOURCE",
    title: "RISC-V SoC Verification (NEORV32)",
    description: "Upstream open-source contributions to processor_check and floating_point_test in NEORV32."
  }
];

export const research = [
  {
    id: "impac",
    topic: "Matrix-Multiplication Hardware Accelerator (iMPAC)",
    type: "Hardware Accelerator / RTL",
    supervisor: "Prof. Zainalabedin Navabi",
    institution: "University of Tehran",
    description: "RTL implementation and verification. Contributed across processing-element datapaths, control logic, and I/O integration; used a SystemVerilog testbench and simulation flow to validate functionality.",
    contribution: "Contributed across processing-element datapaths, control logic, and I/O integration; used a SystemVerilog testbench and simulation flow to validate functionality.",
    methodology: "SystemVerilog RTL design, QuestaSim/ModelSim simulation, testbench-based verification.",
    status: "Completed / Active",
    tags: ["SystemVerilog", "RTL Design", "PE Datapath", "Hardware Acceleration", "Simulation"],
    diagramType: "impac"
  },
  {
    id: "impac-lowpower",
    topic: "Low-Power RTL Optimization for iMPAC",
    type: "Low-Power RTL / Synthesis",
    supervisor: "Prof. Zainalabedin Navabi",
    institution: "University of Tehran",
    description: "Switching-activity reduction. Investigating operation-aware operand isolation in the add/sub datapath and pre-multiplexer isolation variants to reduce unnecessary switching. Functional simulation and synthesis/timing comparisons are ongoing; quantitative power and area gains remain under evaluation.",
    contribution: "Investigating operation-aware operand isolation in the add/sub datapath and pre-multiplexer isolation variants to reduce unnecessary switching. Functional simulation and synthesis/timing comparisons are ongoing; quantitative power and area gains remain under evaluation.",
    methodology: "Functional simulation, RTL synthesis, and timing/power analysis across architectural variants.",
    status: "Ongoing Work",
    tags: ["Low-Power RTL", "Operand Isolation", "Switching Reduction", "Synthesis", "Timing"],
    diagramType: "lowpower"
  },
  {
    id: "weight-quant",
    topic: "Weight Quantization for Memristor-Based Neural Networks",
    type: "Hardware-Aware AI / CIM",
    supervisor: "Dr. Shaghayegh Vahdat",
    institution: "University of Tehran",
    description: "Hardware-aware quantization. Investigating weight-mapping and clustering-based strategies to retain model accuracy at a fixed 3-bit representation. Planned evaluation compares quantization baselines and considers fine-tuning and quantization-aware training (QAT); this is ongoing work, not a published result.",
    contribution: "Investigating weight-mapping and clustering-based strategies to retain model accuracy at a fixed 3-bit representation. Planned evaluation compares quantization baselines and considers fine-tuning and quantization-aware training (QAT); this is ongoing work, not a published result.",
    methodology: "PyTorch-based quantization workflows, clustering algorithms, baseline comparison, and QAT evaluation.",
    status: "Ongoing Work",
    tags: ["3-bit Quantization", "QAT", "Memristor", "PyTorch", "AI Hardware"],
    diagramType: "quant"
  },
  {
    id: "neurosim-cim",
    topic: "NeuroSim-Based Compute-in-Memory Inference Characterization",
    type: "Compute-in-Memory / Simulation",
    supervisor: "Dr. Shaghayegh Vahdat",
    institution: "University of Tehran",
    description: "RRAM-oriented simulation. Set up an inference simulation path with a 128 × 128 subarray, 5-bit ADC, and VGG8/CIFAR-10 baseline. Exploring how circuit assumptions and quantization choices affect estimated area, energy, and latency; results are simulation estimates, not silicon measurements.",
    contribution: "Set up an inference simulation path with a 128 × 128 subarray, 5-bit ADC, and VGG8/CIFAR-10 baseline. Exploring how circuit assumptions and quantization choices affect estimated area, energy, and latency; results are simulation estimates, not silicon measurements.",
    methodology: "NeuroSim simulation framework, 128 × 128 RRAM subarray modeling, 5-bit ADC configuration, VGG8/CIFAR-10 benchmark.",
    status: "Ongoing Work",
    tags: ["NeuroSim", "Compute-in-Memory", "RRAM Crossbar", "VGG8 / CIFAR-10", "Inference Modeling"],
    diagramType: "cim"
  }
];

export const openSource = [
  {
    project: "NEORV32",
    repo: "stnolting/neorv32",
    title: "GPIO input loopback verification",
    pr: "PR #1643",
    url: "https://github.com/stnolting/neorv32/pull/1643",
    description: "Added a repeatable input pattern and masked input checks to processor_check; included in upstream release notes.",
    impact: "Included in upstream release notes",
    tags: ["RISC-V", "NEORV32", "SoC Verification", "GPIO", "VHDL"]
  },
  {
    project: "NEORV32",
    repo: "stnolting/neorv32",
    title: "Floating-point test correction",
    pr: "PR #1644",
    url: "https://github.com/stnolting/neorv32/pull/1644",
    description: "Fixed unreachable special values and signaling-NaN handling in the floating_point_test software test.",
    impact: "Upstream test suite reliability & sNaN compliance",
    tags: ["RISC-V", "NEORV32", "FPU Verification", "C", "IEEE-754"]
  }
];

export const industryExperience = [
  {
    company: "Pars Khodro",
    role: "Electrical Engineering Intern",
    date: "Jul–Sep 2026",
    division: "Digital Motor Control & Embedded Systems",
    location: "Iran",
    highlights: [
      "Traction-inverter analysis. Examined TI TIDM-02017 and digital motor-control topics including C2000/CLA, ADC, ePWM, FOC, SVPWM, and MTPA.",
      "Digital control chain. Studied the path from sensing and signal processing through PWM generation and gate-driver control."
    ]
  }
];

// Backwards-compatibility alias
export const experience = [
  {
    date: "Jul–Sep 2026",
    title: "Electrical Engineering Intern",
    org: "Pars Khodro · Digital Motor Control & Embedded Systems | Iran",
    detail: "Traction-inverter analysis: Examined TI TIDM-02017 and digital motor-control topics including C2000/CLA, ADC, ePWM, FOC, SVPWM, and MTPA. Digital control chain: Studied the path from sensing and signal processing through PWM generation and gate-driver control.",
    highlights: [
      "Traction-inverter analysis. Examined TI TIDM-02017 and digital motor-control topics including C2000/CLA, ADC, ePWM, FOC, SVPWM, and MTPA.",
      "Digital control chain. Studied the path from sensing and signal processing through PWM generation and gate-driver control."
    ]
  }
];

export const teachingExperience = [
  {
    institution: "University of Tehran",
    location: "Tehran, Iran",
    role: "Laboratory Teaching Assistant — Digital Systems I",
    date: "Oct 2026–Present",
    supervisor: "Dr. Zainalabedin Navabi",
    term: "Fall 2026"
  },
  {
    institution: "University of Tehran",
    location: "Tehran, Iran",
    role: "Teaching Assistant — Computer Architecture (Digital Systems II)",
    date: "Sep 2026",
    supervisor: "Dr. Saeed Safari",
    term: "Fall 2026"
  },
  {
    institution: "University of Tehran",
    location: "Tehran, Iran",
    role: "Teaching Assistant — Signals and Systems",
    date: "Jan 2026–Present",
    supervisor: "Dr. Saeed Akhavan",
    term: "Spring & Fall 2026"
  },
  {
    institution: "University of Tehran",
    location: "Tehran, Iran",
    role: "Teaching Assistant — Digital Systems I",
    date: "Jan–Aug 2026",
    supervisor: "Dr. Zainalabedin Navabi",
    term: "Spring 2026"
  }
];

export const skillGroups = [
  {
    number: "01",
    title: "HDL & RTL",
    description: "RTL design, FSMs, datapath/control design, and testbench-based verification.",
    skills: ["Verilog", "SystemVerilog", "VHDL", "RTL Design", "FSMs", "Datapath / Control Design", "Testbench Verification"]
  },
  {
    number: "02",
    title: "SIMULATION & FPGA",
    description: "Simulation/debugging and FPGA-oriented workflows.",
    skills: ["QuestaSim / ModelSim", "Quartus", "Xilinx Vivado", "GHDL", "Verilator", "FPGA Workflows"]
  },
  {
    number: "03",
    title: "SYNTHESIS & PHYSICAL DESIGN",
    description: "RTL synthesis and physical-design tools.",
    skills: ["Synopsys Design Compiler", "Cadence Innovus", "RTL Synthesis", "Timing Analysis", "Place & Route"]
  },
  {
    number: "04",
    title: "SYSTEMS & ARCHITECTURE",
    description: "Memory-mapped I/O, interrupts, DMA, and system-bus integration.",
    skills: ["SystemC", "C / C++", "RISC-V / NEORV32", "Memory-Mapped I/O", "Interrupts", "DMA", "System-Bus Integration"]
  },
  {
    number: "05",
    title: "RESEARCH & SOFTWARE",
    description: "Memristor/CIM modelling and quantization research in progress.",
    skills: ["Python", "PyTorch", "NeuroSim", "Memristor / CIM Modelling", "Quantization / QAT"]
  },
  {
    number: "06",
    title: "DEVELOPMENT ENVIRONMENT",
    description: "Command-line build and simulation workflows.",
    skills: ["Git / GitHub", "Linux / WSL", "Shell / Build Workflows"]
  }
];

export const languages = [
  { language: "Persian", proficiency: "Native" },
  { language: "English", proficiency: "Fluent" }
];

export const projects = [
  {
    number: "01",
    type: "COMPUTER ARCHITECTURE",
    title: "5-Stage RISC-V Processor",
    description: "32-bit RV32I processor implementing a five-stage pipeline (IF/ID/EX/MEM/WB) with full data forwarding, load-use hazard stalling, and branch prediction with flushing. Supports the complete RV32I base instruction set including arithmetic, logical, memory, and control-flow instructions.",
    metrics: "Verified across 20+ test programs · Full RV32I ISA coverage · Data forwarding eliminates ~85% of pipeline stalls",
    tech: ["Verilog", "RISC-V"],
    github: "https://github.com/Abolfazl-Azad/Computer-Architecture-Projects",
    visualType: "pipeline"
  },
  {
    number: "02",
    type: "EMBEDDED SYSTEMS",
    title: "FIR Filter & DMA",
    description: "Hardware/software co-design integrating a 31-tap FIR hardware accelerator with a DMA controller within the SAYAC memory-mapped architecture. The accelerator offloads filter computation from the CPU, while DMA handles autonomous data transfer between memory and the FIR unit.",
    metrics: "31-tap filter · DMA burst transfers · SystemC TLM 2.0 transaction-level modeling",
    tech: ["SystemC", "C++", "TLM"],
    github: "https://github.com/Abolfazl-Azad/embedded-systems-design",
    visualType: "dma"
  },
  {
    number: "03",
    type: "ASIC / RTL",
    title: "Exponential Hardware",
    description: "RTL design, synthesis, and physical implementation of a fixed-point exponential function unit using piecewise polynomial approximation. Complete ASIC flow from RTL through synthesis to place-and-route with timing closure.",
    metrics: "Synthesized using Synopsys Design Compiler · Physical design in Cadence Innovus · Timing-closed netlist",
    tech: ["Verilog", "Synopsys DC", "Cadence Innovus"],
    github: "https://github.com/Abolfazl-Azad/ASIC-Design-Projects",
    visualType: "asic"
  },
  {
    number: "04",
    type: "ASIC / RTL",
    title: "Booth Multiplier",
    description: "Signed hardware multiplier employing Radix-4 Booth encoding to reduce partial product count by 50%. Mapped through the complete ASIC flow including logic synthesis, timing analysis, and place-and-route.",
    metrics: "Radix-4 encoding · 50% fewer partial products vs. standard · Full P&R with timing closure",
    tech: ["SystemVerilog", "P&R"],
    github: "https://github.com/Abolfazl-Azad/ASIC-Design-Projects",
    visualType: "multiplier"
  },
  {
    number: "05",
    type: "FPGA / DIGITAL DESIGN",
    title: "UART Subsystem",
    description: "Serial communication interface featuring independent TX/RX datapaths with configurable baud rate, mid-bit sampling for noise immunity, and FSM-based protocol control. Verified on FPGA hardware using Quartus and ModelSim.",
    metrics: "Configurable baud rate · Mid-bit sampling · Verified on Altera FPGA",
    tech: ["Verilog", "Quartus", "ModelSim"],
    github: "https://github.com/Abolfazl-Azad/DLD_LAB_UART",
    visualType: "uart"
  },
  {
    number: "06",
    type: "FPGA / DIGITAL DESIGN",
    title: "Digital Modulation",
    description: "FPGA implementation of multiple digital modulation schemes including Direct Digital Synthesis (DDS), ASK, FSK, and PWM signal generators. Each modulator is parameterized and independently verifiable.",
    metrics: "4 modulation schemes · Parameterized design · Hardware-verified on FPGA",
    tech: ["Verilog", "FPGA"],
    github: "https://github.com/Abolfazl-Azad/DLD_LAB_Digital-Modulation",
    visualType: "modulation"
  }
];

export const notes = [
  {
    id: "note-fir",
    type: "PROJECT NOTE",
    title: "FIR Acceleration with DMA and SystemC",
    summary: "System-level integration notes on integrating a 31-tap FIR hardware accelerator with a DMA controller within the SAYAC memory-mapped architecture using SystemC and TLM.",
    topic: "Hardware Acceleration",
    status: "DOCUMENTED",
    sourceUrl: "https://github.com/Abolfazl-Azad/embedded-systems-design",
    tech: ["SystemC", "DMA", "TLM"],
    visualType: "dma"
  },
  {
    id: "note-riscv",
    type: "ARCHITECTURE NOTE",
    title: "Designing a 5-Stage RISC-V Pipeline",
    summary: "Microarchitecture documentation detailing the implementation of a 32-bit RV32I processor, including data forwarding paths, hazard detection, and branch flushing mechanisms.",
    topic: "Computer Architecture",
    status: "DOCUMENTED",
    sourceUrl: "https://github.com/Abolfazl-Azad/Computer-Architecture-Projects",
    tech: ["RISC-V", "RV32I", "Pipeline"],
    visualType: "pipeline"
  },
  {
    id: "note-asic",
    type: "TECHNICAL NOTE",
    title: "RTL-to-GDS: An ASIC Design Workflow",
    summary: "Observations and workflow logs tracing a design from RTL synthesis in Synopsys Design Compiler to physical implementation and timing closure in Cadence Innovus.",
    topic: "ASIC",
    status: "DOCUMENTED",
    sourceUrl: "https://github.com/Abolfazl-Azad/ASIC-Design-Projects",
    tech: ["Synthesis", "Timing", "P&R"],
    visualType: "asic"
  },
  {
    id: "note-uart",
    type: "LAB NOTE",
    title: "UART TX/RX Architecture",
    summary: "Hardware verification logs for a serial communication interface featuring independent datapaths, mid-bit sampling logic, and finite state machine control.",
    topic: "Digital Systems",
    status: "DOCUMENTED",
    sourceUrl: "https://github.com/Abolfazl-Azad/DLD_LAB_UART",
    tech: ["UART", "FSM", "Datapath"],
    visualType: "uart"
  }
];
