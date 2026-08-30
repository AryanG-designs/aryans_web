export type Category =
  | "Graphic Novel"
  | "Character Design"
  | "Texturing"
  | "Animation"
  | "Illustration";

export type MaterialNote = {
  label: string;
  detail: string;
  x: number; // percentage position on image
  y: number;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  duration: string;
  role: string;
  featured: boolean;
  size: "large" | "medium" | "small";
  cover: string;
  coverAlt: string;
  tagline: string;
  brief: {
    problem: string;
    objectives: string[];
    audience: string;
    constraints: string;
  };
  research: { image: string; caption: string }[];
  exploration: { image: string; caption: string }[];
  process: { image: string; caption: string }[];
  materials?: MaterialNote[];
  materialsImage?: string;
  outcome: { image: string; caption: string }[];
  reflection: string;
  tools: string[];
  tags: string[];
};

export const seedProjects: Project[] = [
  {
    slug: "graphic-novel",
    title: "Graphic Novel",
    category: "Graphic Novel",
    year: "2025",
    duration: "12 weeks",
    role: "Writer / Illustrator",
    featured: true,
    size: "large",
    cover: "/images/projects/graphic-novel/cover.jpg",
    coverAlt: "Inked spread from an original graphic novel",
    tagline:
      "An original short graphic novel about memory and migration, hand-inked and digitally coloured across 32 pages.",
    brief: {
      problem:
        "Wanted to tell a personal, longer-form narrative in comic form rather than single illustrations — something that used pacing and panel rhythm to carry emotion.",
      objectives: [
        "Write and thumbnail a complete 32-page script",
        "Develop a consistent character and environment style",
        "Ink and colour the full book to a publishable standard",
      ],
      audience: "Submitted to a student graphic novel anthology.",
      constraints: "One semester, one artist — writing, art, lettering and colour all done solo.",
    },
    research: [
      { image: "/images/projects/graphic-novel/research-1.jpg", caption: "Reference research on panel pacing in memoir comics" },
      { image: "/images/projects/graphic-novel/research-2.jpg", caption: "Location photography used for background reference" },
    ],
    exploration: [
      { image: "/images/projects/graphic-novel/sketch-1.jpg", caption: "Thumbnail script, pages 1–8" },
      { image: "/images/projects/graphic-novel/sketch-2.jpg", caption: "Character design exploration" },
    ],
    process: [
      { image: "/images/projects/graphic-novel/process-1.jpg", caption: "Pencils to inks, page 14" },
      { image: "/images/projects/graphic-novel/process-2.jpg", caption: "Colour flatting and lighting pass" },
    ],
    outcome: [
      { image: "/images/projects/graphic-novel/final-1.jpg", caption: "Finished spread, pages 12–13" },
      { image: "/images/projects/graphic-novel/final-2.jpg", caption: "Cover art, final" },
    ],
    reflection:
      "Carrying one story across 32 pages taught me more about pacing than any single illustration could — the hardest part was knowing when to let a panel breathe. Next time I'd storyboard the full book before inking a single page.",
    tools: ["Procreate", "Photoshop", "Clip Studio Paint"],
    tags: ["comics", "narrative", "character"],
  },
  {
    slug: "texturing",
    title: "Texturing",
    category: "Texturing",
    year: "2025",
    duration: "5 weeks",
    role: "Illustrator",
    featured: true,
    size: "medium",
    cover: "/images/projects/texturing/cover.jpg",
    coverAlt: "Illustration study focused on surface texture and material rendering",
    tagline:
      "A study series exploring how hand-rendered texture — fabric, stone, foliage, skin — can carry mood in flat illustration.",
    brief: {
      problem:
        "My earlier work leaned on clean, flat colour. I wanted to push into texture to add tactility and depth without losing the flatness I like in my line work.",
      objectives: [
        "Develop custom brush textures for five material types",
        "Apply the same character across five texture-led scenes",
        "Keep the palette restrained so texture — not colour — does the work",
      ],
      audience: "Personal study, shared as a process series.",
      constraints: "One material study per week, no reference tracing.",
    },
    research: [
      { image: "/images/projects/texturing/research-1.jpg", caption: "Material reference board — fabric, stone, foliage" },
      { image: "/images/projects/texturing/research-2.jpg", caption: "Brush texture tests" },
    ],
    exploration: [
      { image: "/images/projects/texturing/sketch-1.jpg", caption: "Early texture brush experiments" },
      { image: "/images/projects/texturing/sketch-2.jpg", caption: "Value studies before colour" },
    ],
    process: [
      { image: "/images/projects/texturing/process-1.jpg", caption: "Custom brush set, round two" },
      { image: "/images/projects/texturing/process-2.jpg", caption: "Layering texture over flat colour" },
    ],
    outcome: [
      { image: "/images/projects/texturing/final-1.jpg", caption: "Final study — fabric and skin" },
      { image: "/images/projects/texturing/final-2.jpg", caption: "Final study — stone and foliage" },
    ],
    reflection:
      "Building my own brush set was slower than I expected but paid off — texture now feels like part of my drawing hand rather than a filter on top of it.",
    tools: ["Procreate", "Photoshop"],
    tags: ["texture", "material study", "brushwork"],
  },
  {
    slug: "wander-short-animation",
    title: "Wander — Short Animation",
    category: "Animation",
    year: "2024",
    duration: "9 weeks",
    role: "Animator / Illustrator",
    featured: true,
    size: "medium",
    cover: "/images/projects/wander/cover.jpg",
    coverAlt: "Frame from a hand-drawn short animation called Wander",
    tagline:
      "A 90-second hand-drawn animated short about a child following a paper boat down a flooded street.",
    brief: {
      problem: "Wanted to move a character convincingly through a single continuous action for the first time.",
      objectives: [
        "Animate a full 90-second sequence, frame by frame",
        "Design a believable water and reflection effect",
        "Score and sound-design the final cut",
      ],
      audience: "Submitted to a student animation showcase.",
      constraints: "12fps hand-drawn, no rigged puppet tools.",
    },
    research: [{ image: "/images/projects/wander/research-1.jpg", caption: "Reference footage of water movement" }],
    exploration: [{ image: "/images/projects/wander/sketch-1.jpg", caption: "Storyboard, first pass" }],
    process: [
      { image: "/images/projects/wander/process-1.jpg", caption: "Rough animation pass, walk cycle" },
      { image: "/images/projects/wander/process-2.jpg", caption: "Clean-up and in-betweens" },
    ],
    outcome: [{ image: "/images/projects/wander/final-1.jpg", caption: "Final frame, colour graded" }],
    reflection:
      "The walk cycle alone took three redraws to feel weighted correctly — animation humbled me in a way static illustration never has.",
    tools: ["Toon Boom", "After Effects", "Procreate"],
    tags: ["animation", "frame-by-frame", "sound design"],
  },
  {
    slug: "field-of-portraits",
    title: "Field of Portraits",
    category: "Character Design",
    year: "2024",
    duration: "4 weeks",
    role: "Illustrator",
    featured: false,
    size: "small",
    cover: "/images/projects/field-of-portraits/cover.jpg",
    coverAlt: "Series of character portrait illustrations",
    tagline: "A 30-day character design challenge — one original portrait a day, no repeats in silhouette.",
    brief: {
      problem: "Wanted a personal, low-stakes project to rebuild daily drawing habits and character range.",
      objectives: ["Design one original character per day for a month", "Avoid repeating silhouette or palette"],
      audience: "Personal project, later compiled into a lookbook.",
      constraints: "One hour per portrait, no reference tracing.",
    },
    research: [{ image: "/images/projects/field-of-portraits/research-1.jpg", caption: "Silhouette and palette tracker" }],
    exploration: [{ image: "/images/projects/field-of-portraits/sketch-1.jpg", caption: "Daily thumbnail sketches" }],
    process: [{ image: "/images/projects/field-of-portraits/process-1.jpg", caption: "Palette experiments, week two" }],
    outcome: [{ image: "/images/projects/field-of-portraits/final-1.jpg", caption: "Final compiled lookbook spread" }],
    reflection: "The 'no repeats' constraint was the whole point — it's the loosest and most varied my character work has ever been.",
    tools: ["Procreate", "Illustrator"],
    tags: ["character design", "personal", "daily practice"],
  },
  {
    slug: "night-market-sketch-series",
    title: "Night Market Sketch Series",
    category: "Illustration",
    year: "2024",
    duration: "3 weeks",
    role: "Illustrator",
    featured: false,
    size: "small",
    cover: "/images/projects/night-market/cover.jpg",
    coverAlt: "Ink and watercolour sketches of a night market",
    tagline: "On-location ink and watercolour sketches of a neighbourhood night market over three weekends.",
    brief: {
      problem: "Wanted to practise fast, observational drawing outside of screen-based work.",
      objectives: ["Sketch on location, no photo reference", "Build a sequence that reads as a single narrative"],
      audience: "Submitted to a student illustration zine.",
      constraints: "Ink and watercolour only, 20 minutes per sketch.",
    },
    research: [{ image: "/images/projects/night-market/research-1.jpg", caption: "Location scouting notes" }],
    exploration: [{ image: "/images/projects/night-market/sketch-1.jpg", caption: "Sequencing on the studio wall" }],
    process: [{ image: "/images/projects/night-market/process-1.jpg", caption: "On-location ink sketching" }],
    outcome: [{ image: "/images/projects/night-market/final-1.jpg", caption: "Final spread, published in student zine" }],
    reflection: "Drawing on location forced patience I don't normally have — fewer, more considered marks.",
    tools: ["Ink", "Watercolour", "Sketchbook"],
    tags: ["illustration", "observational", "location sketching"],
  },
  {
    slug: "texture-of-sound",
    title: "Texture of Sound",
    category: "Illustration",
    year: "2023",
    duration: "5 weeks",
    role: "Illustrator / Animator",
    featured: false,
    size: "medium",
    cover: "/images/projects/texture-of-sound/cover.jpg",
    coverAlt: "Experimental abstract illustration responding to sound",
    tagline:
      "An open-ended studio experiment translating recorded sound into hand-drawn abstract texture and motion.",
    brief: {
      problem: "A self-directed brief to explore how sound could inform mark-making without a fixed outcome in mind.",
      objectives: ["Translate 6 sound recordings into abstract texture studies", "Animate two of the studies"],
      audience: "Studio experiment, shared at end-of-term crit.",
      constraints: "No brief beyond 'sound + mark' — outcome left open.",
    },
    research: [{ image: "/images/projects/texture-of-sound/research-1.jpg", caption: "Field recordings collected around campus" }],
    exploration: [{ image: "/images/projects/texture-of-sound/sketch-1.jpg", caption: "Mark-making tests responding to recordings" }],
    process: [{ image: "/images/projects/texture-of-sound/process-1.jpg", caption: "Animating two of the texture studies" }],
    outcome: [{ image: "/images/projects/texture-of-sound/final-1.jpg", caption: "Installation at end-of-term crit" }],
    reflection: "The least resolved project in my portfolio and maybe the most useful — it fed directly into the texture brushwork I use now.",
    tools: ["Field Recorder", "Procreate", "After Effects"],
    tags: ["experimental", "sound", "texture"],
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  "Graphic Novel",
  "Character Design",
  "Texturing",
  "Animation",
  "Illustration",
];

