import { Fighter } from "../types";

export const mockFighters: Fighter[] = [
  // Architects (4)
  {
    id: "1",
    name: "Neo",
    portrait: "/portraits/neo.jpg",
    origin: "The Matrix",
    stats: {
      type: "Architect",
      logic: 95,
      flow: 88,
      chaos: 72
    }
  },
  {
    id: "2", 
    name: "Tony Stark",
    portrait: "/portraits/ironman.jpg",
    origin: "Marvel",
    stats: {
      type: "Architect",
      logic: 93,
      flow: 85,
      chaos: 75
    }
  },
  {
    id: "3",
    name: "Bruce Banner",
    portrait: "/portraits/hulk.jpg", 
    origin: "Marvel",
    stats: {
      type: "Architect",
      logic: 96,
      flow: 82,
      chaos: 68
    }
  },
  {
    id: "4",
    name: "Lex Luthor",
    portrait: "/portraits/lex.jpg",
    origin: "DC Comics", 
    stats: {
      type: "Architect",
      logic: 94,
      flow: 86,
      chaos: 70
    }
  },
  // Operators (4)
  {
    id: "5",
    name: "Agent Smith",
    portrait: "/portraits/smith.jpg", 
    origin: "The Matrix",
    stats: {
      type: "Operator",
      logic: 88,
      flow: 92,
      chaos: 65
    }
  },
  {
    id: "6",
    name: "Trinity",
    portrait: "/portraits/trinity.jpg",
    origin: "The Matrix", 
    stats: {
      type: "Operator",
      logic: 85,
      flow: 90,
      chaos: 75
    }
  },
  {
    id: "7",
    name: "Batman",
    portrait: "/portraits/batman.jpg", 
    origin: "DC Comics",
    stats: {
      type: "Operator",
      logic: 87,
      flow: 89,
      chaos: 68
    }
  },
  {
    id: "8",
    name: "Black Widow",
    portrait: "/portraits/blackwidow.jpg",
    origin: "Marvel",
    stats: {
      type: "Operator",
      logic: 84,
      flow: 91,
      chaos: 72
    }
  },
  // Wildcards (4)
  {
    id: "9",
    name: "Deadpool",
    portrait: "/portraits/deadpool.jpg",
    origin: "Marvel",
    stats: {
      type: "Wildcard",
      logic: 70,
      flow: 85,
      chaos: 98
    }
  },
  {
    id: "10",
    name: "Mr. Freeze", 
    portrait: "/portraits/freeze.jpg",
    origin: "DC Comics",
    stats: {
      type: "Wildcard", 
      logic: 82,
      flow: 78,
      chaos: 88
    }
  },
  {
    id: "11",
    name: "Loki",
    portrait: "/portraits/loki.jpg",
    origin: "Marvel",
    stats: {
      type: "Wildcard",
      logic: 85,
      flow: 83,
      chaos: 92
    }
  },
  {
    id: "12",
    name: "The Riddler",
    portrait: "/portraits/riddler.jpg", 
    origin: "DC Comics",
    stats: {
      type: "Wildcard",
      logic: 88,
      flow: 80,
      chaos: 90
    }
  }
];