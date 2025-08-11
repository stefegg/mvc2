import { Fighter } from "../types";

export const mockFighters: Fighter[] = [
  // Architects
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Tony Stark",
    portrait: "/portraits/stark.png",
    origin: "Marvel",
    stats: {
      type: "Architect",
      logic: 96,
      flow: 90,
      chaos: 78
    }
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    name: "Neo",
    portrait: "/portraits/neo.png",
    origin: "The Matrix",
    stats: {
      type: "Architect",
      logic: 94,
      flow: 88,
      chaos: 80
    }
  },
  {
    id: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
    name: "Lex Luthor",
    portrait: "/portraits/luthor.png",
    origin: "DC Comics",
    stats: {
      type: "Architect",
      logic: 95,
      flow: 84,
      chaos: 70
    }
  },
  {
    id: "6ba7b812-9dad-11d1-80b4-00c04fd430c8",
    name: "Lisbeth Salander",
    portrait: "/portraits/lisbeth.png",
    origin: "The Girl with the Dragon Tattoo",
    stats: {
      type: "Architect",
      logic: 92,
      flow: 86,
      chaos: 76
    }
  },

  // Operators
  {
    id: "6ba7b813-9dad-11d1-80b4-00c04fd430c8",
    name: "Trinity",
    portrait: "/portraits/trinity.png",
    origin: "The Matrix",
    stats: {
      type: "Operator",
      logic: 88,
      flow: 93,
      chaos: 77
    }
  },
  {
    id: "6ba7b814-9dad-11d1-80b4-00c04fd430c8",
    name: "Motoko Kusanagi",
    portrait: "/portraits/motoko.png",
    origin: "Ghost in the Shell",
    stats: {
      type: "Operator",
      logic: 91,
      flow: 94,
      chaos: 75
    }
  },
  {
    id: "6ba7b815-9dad-11d1-80b4-00c04fd430c8",
    name: "Bulma",
    portrait: "/portraits/bulma.png",
    origin: "Dragon Ball",
    stats: {
      type: "Operator",
      logic: 85,
      flow: 90,
      chaos: 72
    }
  },
  {
    id: "6ba7b816-9dad-11d1-80b4-00c04fd430c8",
    name: "Richard Hendricks",
    portrait: "/portraits/richard.png",
    origin: "Silicon Valley",
    stats: {
      type: "Operator",
      logic: 89,
      flow: 82,
      chaos: 74
    }
  },

  // Wildcards
  {
    id: "6ba7b817-9dad-11d1-80b4-00c04fd430c8",
    name: "Dade 'Zero Cool' Murphy",
    portrait: "/portraits/zerocool.png",
    origin: "Hackers",
    stats: {
      type: "Wildcard",
      logic: 82,
      flow: 88,
      chaos: 94
    }
  },
  {
    id: "6ba7b818-9dad-11d1-80b4-00c04fd430c8",
    name: "Chloe O'Brian",
    portrait: "/portraits/obrien.png",
    origin: "24",
    stats: {
      type: "Wildcard",
      logic: 87,
      flow: 84,
      chaos: 90
    }
  },
  {
    id: "6ba7b819-9dad-11d1-80b4-00c04fd430c8",
    name: "Dennis Nedry",
    portrait: "/portraits/nedry.png",
    origin: "Jurassic Park",
    stats: {
      type: "Wildcard",
      logic: 80,
      flow: 76,
      chaos: 96
    }
  },
  {
    id: "6ba7b81a-9dad-11d1-80b4-00c04fd430c8",
    name: "Data",
    portrait: "/portraits/data.png",
    origin: "Star Trek: The Next Generation",
    stats: {
      type: "Wildcard",
      logic: 84,
      flow: 89,
      chaos: 92
    }
  }
];
