export const profile = {
  name: "Abolfazl Azad",
  title: "Electrical Engineering Student",
  university: "University of Tehran",
  github: "https://github.com/Abolfazl-Azad",
  linkedin: "https://www.linkedin.com/in/abolfazl-azad/",
  aboutKeywords: [
    "Digital Systems",
    "RTL Design",
    "FPGA",
    "RISC-V",
    "Computer Architecture",
    "ASIC / Physical Design",
    "Embedded Systems",
    "Hardware Acceleration"
  ]
};

export const focusAreas = [
  {
    title: "RTL DESIGN",
    description: "Designing synthesizable digital systems using Verilog and SystemVerilog."
  },
  {
    title: "FPGA",
    description: "Implementing logic, debugging, and testing designs on physical hardware."
  },
  {
    title: "COMPUTER ARCHITECTURE",
    description: "Exploring processor microarchitecture, pipelining, and hardware acceleration."
  },
  {
    title: "RISC-V",
    description: "Building single-cycle and pipelined RISC-V processor implementations."
  },
  {
    title: "ASIC DESIGN",
    description: "Understanding logic synthesis, timing analysis, and physical design flow."
  },
  {
    title: "EMBEDDED SYSTEMS",
    description: "Studying hardware/software co-design and system integration."
  }
];

export const education = [
  {
    id: "ee",
    institution: "University of Tehran",
    degree: "B.Sc. Electrical Engineering",
    start: "1402",
    end: "1406"
  },
  {
    id: "ce-minor",
    institution: "University of Tehran",
    degree: "Minor in Computer Engineering",
    start: "",
    end: ""
  }
];

export const currentFocus = [
  {
    status: "STUDYING",
    title: "Electrical Engineering",
    description: "University of Tehran"
  },
  {
    status: "BUILDING",
    title: "Digital hardware and RTL systems",
    description: "Developing robust digital logic circuits and accelerators."
  },
  {
    status: "EXPLORING",
    title: "FPGA · RISC-V · ASIC Design · Computer Architecture",
    description: "Deepening knowledge in hardware description and microarchitecture."
  }
];

export const experience = [
  {
    date: "RECENT",
    title: "Engineering Internship",
    org: "Pars Khodro Company · Iran",
    detail: "Engineering internship experience in an automotive environment, with exposure to electronic and digital systems."
  }
];

export const research = [
  {
    topic: "IMPAC",
    type: "Reconfigurable Accelerator",
    description: "Research on hardware accelerator architecture with a focus on reconfigurable computing.",
    supervisor: "Dr. Nawabi",
    tags: ["Hardware acceleration", "Reconfigurable architecture"]
  }
];

export const projects = [
  {
    number: "01",
    type: "COMPUTER ARCHITECTURE",
    title: "5-Stage RISC-V Processor",
    description: "32-bit RV32I processor implementing a five-stage pipeline with data forwarding, load-use stalling, and branch flushing.",
    tech: ["Verilog", "RISC-V"],
    github: "https://github.com/Abolfazl-Azad/Computer-Architecture-Projects",
    visualType: "pipeline"
  },
  {
    number: "02",
    type: "EMBEDDED SYSTEMS",
    title: "FIR Filter & DMA",
    description: "Hardware/software co-design integrating a 31-tap FIR accelerator and DMA within the SAYAC memory-mapped architecture.",
    tech: ["SystemC", "C++", "TLM"],
    github: "https://github.com/Abolfazl-Azad/embedded-systems-design",
    visualType: "dma"
  },
  {
    number: "03",
    type: "ASIC / RTL",
    title: "Exponential Hardware",
    description: "RTL design and synthesis of exponential function hardware targeting standard cell libraries.",
    tech: ["Verilog", "Synthesis"],
    github: "https://github.com/Abolfazl-Azad/ASIC-Design-Projects",
    visualType: "asic"
  },
  {
    number: "04",
    type: "ASIC / RTL",
    title: "Booth Multiplier",
    description: "Signed hardware multiplier employing Radix-4 Booth encoding, mapped through the ASIC flow.",
    tech: ["SystemVerilog", "P&R"],
    github: "https://github.com/Abolfazl-Azad/ASIC-Design-Projects",
    visualType: "multiplier"
  },
  {
    number: "05",
    type: "FPGA / DIGITAL DESIGN",
    title: "UART Subsystem",
    description: "Serial communication interface featuring independent TX/RX datapaths, mid-bit sampling, and FSM control.",
    tech: ["Verilog", "Quartus", "ModelSim"],
    github: "https://github.com/Abolfazl-Azad/DLD_LAB_UART",
    visualType: "uart"
  },
  {
    number: "06",
    type: "FPGA / DIGITAL DESIGN",
    title: "Digital Modulation",
    description: "Hardware implementation of DDS, ASK, FSK, and PWM modulators for signal generation.",
    tech: ["Verilog", "FPGA"],
    github: "https://github.com/Abolfazl-Azad/DLD_LAB_Digital-Modulation",
    visualType: "modulation"
  }
];

export const skillGroups = [
  {
    number: "01",
    title: "RTL & HDL",
    description: "Designing synthesizable digital logic and control/datapath structures.",
    skills: ["Verilog", "SystemVerilog", "RTL Design", "FSM", "Datapath"]
  },
  {
    number: "02",
    title: "COMPUTER ARCHITECTURE",
    description: "Processor microarchitecture, RISC-V, pipelining, hazards and data movement.",
    skills: ["RISC-V", "RV32I", "CPU Design", "Pipeline", "Hazard Handling", "Forwarding"]
  },
  {
    number: "03",
    title: "FPGA & DIGITAL SYSTEMS",
    description: "Digital modulation, serial communication, and FPGA-based prototyping.",
    skills: ["FPGA", "Quartus", "ModelSim", "UART", "DDS", "ASK / FSK", "PWM"]
  },
  {
    number: "04",
    title: "ASIC & PHYSICAL DESIGN",
    description: "Exploring RTL synthesis, timing analysis and physical design flows.",
    skills: ["Synthesis", "Synopsys Design Compiler", "Timing Analysis", "Cadence Innovus", "Place & Route"]
  },
  {
    number: "05",
    title: "EMBEDDED & HW/SW",
    description: "System-level integration using SystemC, DMA, memory-mapped interfaces and TLM.",
    skills: ["C", "C++", "SystemC", "SAYAC", "DMA", "Memory-Mapped I/O", "TLM"]
  },
  {
    number: "06",
    title: "TOOLS & WORKFLOW",
    description: "Source control, scripting, and development environments.",
    skills: ["Git", "Linux", "Python", "MATLAB"]
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
