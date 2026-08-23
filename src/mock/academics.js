export const academicSubjects = [
  { 
    id: 'ep', 
    name: 'Engineering Physics', 
    code: 'BS101',
    description: 'Complete study material for this subject',
    units: [
      {
        unitNumber: 1,
        title: 'Unit 1: Wave Optics',
        topics: [
          'Interference: Introduction',
          'Principle of Superposition',
          'Interference of Light',
          'Interference in Thin Films (Reflection Geometry) & Applications',
          'Colours in Thin Films',
          'Newton\'s Rings – Determination of Wavelength & Refractive Index',
          'Diffraction: Introduction',
          'Fresnel Diffraction',
          'Fraunhofer Diffraction',
          'Fraunhofer Diffraction due to Single Slit',
          'Double Slit Diffraction',
          'N-Slits (Diffraction Grating)',
          'Resolving Power of Grating',
          'Polarisation of Light',
          'Double Refraction & Nicol Prism',
          'Quarter and Half Wave Plates',
          'Production of Circularly & Elliptically Polarised Light',
          'Laser Introduction & Characteristics',
          'Einstein Coefficients of Absorption & Emission',
          'Ruby Laser & He-Ne Laser Operation',
          'Semiconductor Diode Laser',
          'Optical Fibres Principle & Acceptance Angle',
          'Fiber Optics Applications in Communication'
        ]
      },
      {
        unitNumber: 2,
        title: 'Unit 2: Crystallography and X-ray diffraction',
        topics: [
          'Lattice Parameters & Crystal Systems',
          'Bravais Lattices & Miller Indices',
          'Interplanar Spacing in Cubic Lattices',
          'Bragg\'s Law of X-ray Diffraction',
          'Laue Method & Powder Method'
        ]
      },
      {
        unitNumber: 3,
        title: 'Unit 3: Dielectric and Magnetic Materials',
        topics: [
          'Electric Susceptibility & Polarisation Mechanism',
          'Clausius-Mosotti Equation',
          'Ferroelectricity & Piezoelectricity',
          'Origin of Magnetic Moment & Bohr Magneton',
          'Classification of Magnetic Materials (Dia, Para, Ferro)'
        ]
      },
      {
        unitNumber: 4,
        title: 'Unit 4: Quantum Mechanics and Free Electron Theory',
        topics: [
          'de Broglie Hypothesis & Matter Waves',
          'Davisson-Germer Experiment',
          'Heisenberg Uncertainty Principle',
          'Schrödinger Time-Independent Wave Equation',
          'Particle in a 1D Potential Box'
        ]
      },
      {
        unitNumber: 5,
        title: 'Unit 5: Semiconductors',
        topics: [
          'Intrinsic and Extrinsic Semiconductors',
          'Carrier Concentration in Semiconductors',
          'Fermi Level Location in Semiconductors',
          'Hall Effect and Its Applications',
          'Direct and Indirect Bandgap Semiconductors'
        ]
      }
    ],
    previousPapers: [
      { id: 'ep-paper-2023', title: 'Engineering Physics JNTUH/JNTUK R22 2023 Question Paper', year: '2023', pdfUrl: '#' },
      { id: 'ep-paper-2022', title: 'Engineering Physics R18 2022 End-Sem Examination', year: '2022', pdfUrl: '#' }
    ],
    importantQuestions: [
      { id: 'ep-imp-1', title: 'Unit 1 & 2 Most Repeated University Short & Long Questions', count: 12 },
      { id: 'ep-imp-2', title: 'Unit 3 & 4 Numericals & Derivations Guide', count: 15 },
      { id: 'ep-imp-3', title: 'Unit 5 Semiconductors Top Exam Questions', count: 10 }
    ]
  },
  { 
    id: 'lac', 
    name: 'Linear Algebra & Calculus', 
    code: 'BS102',
    description: 'Complete study material for this subject',
    units: [
      {
        unitNumber: 1,
        title: 'Unit 1: Matrices & Systems of Linear Equations',
        topics: [
          'Rank of a Matrix by Echelon Form',
          'Consistency of Linear System of Equations',
          'Gauss Elimination Method',
          'Gauss-Jordan Elimination',
          'LU Decomposition Method'
        ]
      },
      {
        unitNumber: 2,
        title: 'Unit 2: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
        topics: [
          'Eigenvalues and Eigenvectors Properties',
          'Diagonalization of Matrices',
          'Cayley-Hamilton Theorem Statement & Proof',
          'Inverse & Powers of Matrix using Cayley-Hamilton',
          'Quadratic Forms & Reduction to Canonical Form'
        ]
      },
      {
        unitNumber: 3,
        title: 'Unit 3: Single Variable Calculus & Mean Value Theorems',
        topics: [
          'Rolle\'s Theorem & Lagrange\'s Mean Value Theorem',
          'Cauchy\'s Mean Value Theorem',
          'Taylor\'s and Maclaurin\'s Series Expansions',
          'Evaluation of Indeterminate Forms using L\'Hopital Rule'
        ]
      },
      {
        unitNumber: 4,
        title: 'Unit 4: Multivariable Calculus & Partial Derivatives',
        topics: [
          'Partial Differentiation & Euler\'s Theorem',
          'Total Derivative & Chain Rule',
          'Jacobian Matrix & Applications',
          'Maxima and Minima of Functions of Two Variables',
          'Lagrange Multipliers Method'
        ]
      },
      {
        unitNumber: 5,
        title: 'Unit 5: Vector Calculus',
        topics: [
          'Gradient of a Scalar Field & Directional Derivative',
          'Divergence and Curl of a Vector Field',
          'Vector Line Integrals & Work Done',
          'Green\'s Theorem in a Plane',
          'Gauss Divergence & Stokes Theorem Statements'
        ]
      }
    ],
    previousPapers: [
      { id: 'lac-paper-1', title: 'Linear Algebra & Calculus 2023 University Question Paper', year: '2023', pdfUrl: '#' }
    ],
    importantQuestions: [
      { id: 'lac-imp-1', title: 'Matrices & Eigenvalues Top Important Questions', count: 10 },
      { id: 'lac-imp-2', title: 'Vector Calculus Theorems & Problem Solutions', count: 14 }
    ]
  },
  { 
    id: 'beee', 
    name: 'Basic Electrical & Electronics Engineering', 
    code: 'ES103',
    description: 'Complete study material for this subject',
    units: [
      {
        unitNumber: 1,
        title: 'Unit 1: DC Circuits & Mesh/Nodal Analysis',
        topics: [
          'Ohm\'s Law & Kirchhoff\'s Voltage and Current Laws',
          'Mesh Analysis & Nodal Analysis of DC Networks',
          'Thevenin\'s and Norton\'s Theorems',
          'Superposition Theorem & Maximum Power Transfer'
        ]
      },
      {
        unitNumber: 2,
        title: 'Unit 2: AC Circuits & Single-Phase Systems',
        topics: [
          'Sinusoidal Waveform Parameters (RMS, Average Value)',
          'Phasor Representation of R, L, C Elements',
          'Series R-L, R-C, and R-L-C Circuits',
          'Resonance in Series and Parallel AC Circuits'
        ]
      },
      {
        unitNumber: 3,
        title: 'Unit 3: Electrical Machines & Transformers',
        topics: [
          'Single Phase Transformer Working Principle & EMF Equation',
          'Transformer Losses & Efficiency Calculation',
          'DC Generator & DC Motor Operations',
          'Three-Phase Induction Motor Basics'
        ]
      },
      {
        unitNumber: 4,
        title: 'Unit 4: Semiconductor Diodes & Applications',
        topics: [
          'P-N Junction Diode Characteristics',
          'Half Wave and Full Wave Rectifiers',
          'Zener Diode as Voltage Regulator',
          'Light Emitting Diode (LED) & Photodiode'
        ]
      },
      {
        unitNumber: 5,
        title: 'Unit 5: Bipolar Junction Transistors (BJT)',
        topics: [
          'BJT Configurations (CB, CE, CC)',
          'Input and Output Characteristics in CE Mode',
          'Transistor as a Switch and Amplifier',
          'Operational Amplifier (Op-Amp) Basics'
        ]
      }
    ],
    previousPapers: [
      { id: 'beee-paper-1', title: 'BEEE 2023 University Question Paper', year: '2023', pdfUrl: '#' }
    ],
    importantQuestions: [
      { id: 'beee-imp-1', title: 'BEEE Network Theorems & Machines IMP Questions', count: 12 }
    ]
  },
  { 
    id: 'irp', 
    name: 'Introduction to Programming', 
    code: 'CS104',
    description: 'Complete study material for this subject',
    units: [
      {
        unitNumber: 1,
        title: 'Unit 1: Fundamentals of Computers & C Language',
        topics: [
          'Computer Architecture & Problem Solving Steps',
          'Structure of C Program & Compilation Stages',
          'Data Types, Variables & Constants in C',
          'Operators & Expression Evaluation'
        ]
      },
      {
        unitNumber: 2,
        title: 'Unit 2: Control Structures & Arrays',
        topics: [
          'If-Else, Switch-Case Decision Making',
          'While, Do-While, For Loops',
          '1D Arrays & 2D Matrices',
          'String Operations & Library Functions'
        ]
      },
      {
        unitNumber: 3,
        title: 'Unit 3: Functions & Recursion',
        topics: [
          'User Defined Functions & Prototypes',
          'Call by Value vs Call by Reference',
          'Recursive Functions & Towers of Hanoi',
          'Storage Classes (auto, register, static, extern)'
        ]
      },
      {
        unitNumber: 4,
        title: 'Unit 4: Pointers & Dynamic Memory',
        topics: [
          'Pointer Concept & Declaration',
          'Pointer Arithmetic & Array Pointers',
          'Pointers to Functions & Void Pointers',
          'Dynamic Memory Allocation (malloc, calloc, free)'
        ]
      },
      {
        unitNumber: 5,
        title: 'Unit 5: Structures, Unions & Files',
        topics: [
          'Structure Declaration & Nested Structures',
          'Unions vs Structures Memory Layout',
          'File Input/Output Operations (fopen, fclose, fprintf)',
          'Binary Files & Random Access (fseek, ftell)'
        ]
      }
    ],
    previousPapers: [
      { id: 'irp-paper-1', title: 'C Programming 2023 Question Paper', year: '2023', pdfUrl: '#' }
    ],
    importantQuestions: [
      { id: 'irp-imp-1', title: 'Pointers & Dynamic Memory IMP Questions', count: 10 }
    ]
  },
  { 
    id: 'eg', 
    name: 'Engineering Graphics', 
    code: 'ES105',
    description: 'Complete study material for this subject',
    units: [
      {
        unitNumber: 1,
        title: 'Unit 1: Scales & Conic Sections',
        topics: [
          'Plain Scales and Diagonal Scales Construction',
          'Construction of Ellipse, Parabola, Hyperbola',
          'Cycloids, Involutes & Epicycloids Curves'
        ]
      },
      {
        unitNumber: 2,
        title: 'Unit 2: Orthographic Projections & Points/Lines',
        topics: [
          'First Angle vs Third Angle Projection Principles',
          'Projections of Points in Different Quadrants',
          'Projections of Straight Lines Inclined to Both Planes',
          'True Length & True Inclination Determination'
        ]
      },
      {
        unitNumber: 3,
        title: 'Unit 3: Projections of Planes & Regular Solids',
        topics: [
          'Projections of Regular Plane Surfaces (Triangular, Square, Circle)',
          'Projections of Prisms and Pyramids',
          'Projections of Cylinders and Cones'
        ]
      },
      {
        unitNumber: 4,
        title: 'Unit 4: Sections of Solids & Development of Surfaces',
        topics: [
          'Section Planes & True Shape of Section',
          'Development of Lateral Surfaces of Prisms & Pyramids',
          'Development of Cylinders and Cones'
        ]
      },
      {
        unitNumber: 5,
        title: 'Unit 5: Isometric Projections & CAD Basics',
        topics: [
          'Isometric Scale & Isometric Views of Plane Figures',
          'Isometric Projections of Simple & Composite Solids',
          'Conversion of Orthographic Views to Isometric Views',
          'Introduction to AutoCAD Tools & Commands'
        ]
      }
    ],
    previousPapers: [
      { id: 'eg-paper-1', title: 'Engineering Graphics 2023 End-Sem Exam Paper', year: '2023', pdfUrl: '#' }
    ],
    importantQuestions: [
      { id: 'eg-imp-1', title: 'Projections of Lines & Planes Exam Questions', count: 8 }
    ]
  }
];

export const academicMockData = {
  universities: [
    { id: 'jntuk', name: 'JNTUK' },
    { id: 'jntuh', name: 'JNTUH' },
    { id: 'jntua', name: 'JNTUA' },
    { id: 'osmania', name: 'Osmania University (OU)' },
    { id: 'anna', name: 'Anna University' },
    { id: 'vtu', name: 'VTU Karnataka' }
  ],
  regulations: ['R23', 'R22', 'R18', 'R16', 'R15'],
  colleges: [
    { id: 'ists', name: 'International School of Tech & Sciences' },
    { id: 'jntuh-ce', name: 'JNTUH College of Engineering' },
    { id: 'vnr', name: 'VNR Vignana Jyothi Institute' },
    { id: 'cbit', name: 'Chaitanya Bharathi Institute of Tech' },
    { id: 'vasavi', name: 'Vasavi College of Engineering' },
    { id: 'griet', name: 'Gokaraju Rangaraju Institute' },
    { id: 'other', name: 'Other Affiliated College' }
  ],
  branches: [
    { id: 'cse-aids', code: 'CSE (AI & DS)', name: 'CSE (AI & Data Science)' },
    { id: 'cse', code: 'CSE', name: 'Computer Science & Engineering' },
    { id: 'aiml', code: 'CSE (AI & ML)', name: 'Artificial Intelligence & Machine Learning' },
    { id: 'ds', code: 'DS', name: 'Data Science' },
    { id: 'ece', code: 'ECE', name: 'Electronics & Communication' },
    { id: 'eee', code: 'EEE', name: 'Electrical & Electronics' },
    { id: 'me', code: 'ME', name: 'Mechanical Engineering' },
    { id: 'ce', code: 'CE', name: 'Civil Engineering' }
  ],
  years: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  semesters: ['1st Semester', '2nd Semester'],
  defaultSubjects: academicSubjects,
  subjectsSample: academicSubjects,
  stats: {
    videoCount: '1,000+',
    studyMaterials: '5,000+',
    previousPapers: '10+ Years',
    branchesCovered: 'All B.Tech Branches'
  }
};
