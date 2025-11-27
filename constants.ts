import { EraId, EraData } from './types';

export const MUSIC_ERAS: Record<EraId, EraData> = {
  [EraId.BARROC]: {
    id: EraId.BARROC,
    title: "El Barroc",
    years: "1600 - 1750",
    color: "from-amber-800 to-yellow-600",
    // Versailles Hall of Mirrors
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chateau_Versailles_Galerie_Glaces.jpg/1200px-Chateau_Versailles_Galerie_Glaces.jpg",
    description: "Una època de contrastos, ornamentació i el naixement de l'òpera. La música busca moure els afectes i sentiments de l'oient mitjançant la grandiositat i el dramatisme.",
    characteristics: [
      "Ús del Baix Continu (clavecin, violoncel)",
      "Contrast dinàmic (fort/fluix)",
      "Melodia acompanyada",
      "Ritme mecànic i pulsió constant",
      "Molta ornamentació en les melodies"
    ],
    forms: [
      "Òpera (naixement)",
      "Oratori i Cantata",
      "Concert (Concerto Grosso / Solista)",
      "Fuga",
      "Suite"
    ],
    composers: [
      {
        name: "Johann Sebastian Bach",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg",
        notableWorks: ["Passió segons Sant Mateu", "Concerts de Brandenburg", "El clavecí ben temperat"]
      },
      {
        name: "Antonio Vivaldi",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Vivaldi.jpg",
        notableWorks: ["Les Quatre Estacions", "Gloria"]
      },
      {
        name: "Georg Friedrich Händel",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/George_Frideric_Handel_by_Balthasar_Denner.jpg",
        notableWorks: ["El Messies (Al·leluia)", "Música aquàtica"]
      }
    ],
    videoLinks: [
      { title: "El Barroc Musical en 5 minuts", url: "https://www.youtube.com/watch?v=3gVqWc7XwKk" },
      { title: "Audició: Les Quatre Estacions", url: "https://www.youtube.com/watch?v=GRxofEmo3HA" }
    ]
  },
  [EraId.CLASSICISME]: {
    id: EraId.CLASSICISME,
    title: "El Classicisme",
    years: "1750 - 1820",
    color: "from-blue-800 to-sky-600",
    // Pantheon or neoclassical architecture
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pantheon_Paris_August_2009.jpg/1200px-Pantheon_Paris_August_2009.jpg",
    description: "La recerca de la bellesa a través de l'equilibri, la proporció i la senzillesa. La raó s'imposa sobre l'emoció desmesurada. La música esdevé un entreteniment refinat.",
    characteristics: [
      "Melodia clara i estructurada (frases de 8 compassos)",
      "Desaparició del Baix Continu",
      "Harmonia simple i transparent",
      "Contrastos d'humor dins la mateixa obra",
      "Naixement de l'orquestra simfònica moderna"
    ],
    forms: [
      "Sonata (forma estructural clau)",
      "Simfonia",
      "Concert clàssic",
      "Quartet de corda",
      "Òpera bufa"
    ],
    composers: [
      {
        name: "Wolfgang Amadeus Mozart",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wolfgang-amadeus-mozart_1.jpg",
        notableWorks: ["La Flauta Màgica", "Simfonia núm. 40", "Rèquiem"]
      },
      {
        name: "Franz Joseph Haydn",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Joseph_Haydn.jpg",
        notableWorks: ["Simfonia de la Sorpresa", "La Creació"]
      },
      {
        name: "Ludwig van Beethoven",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
        notableWorks: ["Simfonia núm. 5", "Simfonia núm. 9", "Per a Elisa"]
      }
    ],
    videoLinks: [
      { title: "El Classicisme Musical explicat", url: "https://www.youtube.com/watch?v=7uJ_3Z_t0wI" },
      { title: "Què és la Forma Sonata?", url: "https://www.youtube.com/watch?v=Wd3hVjQ6w_I" }
    ]
  },
  [EraId.ROMANTICISME]: {
    id: EraId.ROMANTICISME,
    title: "El Romanticisme",
    years: "1820 - 1910",
    color: "from-rose-900 to-pink-700",
    // Caspar David Friedrich painting
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog_-_Google_Art_Project.jpg/1200px-Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog_-_Google_Art_Project.jpg",
    description: "L'expressió dels sentiments íntims i les emocions fortes. L'artista busca la llibertat creativa trencant les normes clàssiques. La música expressa allò inefable.",
    characteristics: [
      "Predomini del sentiment sobre la raó",
      "Llibertat formal i melodies apassionades",
      "Harmonies riques i cromatismes",
      "Grans contrastos dinàmics (ff - pp)",
      "Interès pel folklore i la natura"
    ],
    forms: [
      "Lied (cançó per a veu i piano)",
      "Poema Simfònic (música programàtica)",
      "Òpera romàntica (Wagner, Verdi)",
      "Petites formes per a piano (Nocturn, Vals)",
      "Simfonia romàntica"
    ],
    composers: [
      {
        name: "Frédéric Chopin",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Frederic_Chopin_photo.jpeg",
        notableWorks: ["Nocturns", "Valsos", "Poloneses"]
      },
      {
        name: "Franz Schubert",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Franz_Schubert_by_Wilhelm_August_Rieder_1875.jpg",
        notableWorks: ["La Truita", "Viatge d'hivern", "Ave Maria"]
      },
      {
        name: "Giuseppe Verdi",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Giuseppe_Verdi_officielle.jpg",
        notableWorks: ["Nabucco", "La Traviata", "Aida"]
      }
    ],
    videoLinks: [
      { title: "Característiques del Romanticisme", url: "https://www.youtube.com/watch?v=OigV_bXb2u4" },
      { title: "El Piano al Romanticisme", url: "https://www.youtube.com/watch?v=5t6H1qZ_w_w" }
    ]
  }
};