import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Blinds,
  Check,
  Frame,
  Leaf,
  PanelTop,
  Square,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import aluminiumImage from "@/assets/official-solutions/reinas-aluminium-kozijnen.jpeg";
import houtenImage from "@/assets/official-solutions/reinas-houten-kozijnen.jpeg";
import kunststofImage from "@/assets/official-solutions/reinas-kunststof-kozijnen.jpeg";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type CategoryId =
  | "kunststof-kozijnen"
  | "aluminium-kozijnen"
  | "houten-kozijnen"
  | "horren"
  | "screens-sunscreens"
  | "sectionaal-poorten-hekwerken";

type SelectionMap = Record<string, string>;

type Choice = {
  id: string;
  label: string;
  description: string;
  note?: string;
  badge?: string;
};

type OptionGroup = {
  id: string;
  title: string;
  subtitle: string;
  columns?: 1 | 2 | 3;
  choices: readonly Choice[];
};

type FeatureCard = {
  title: string;
  body: string;
};

type CategoryConfig = {
  id: CategoryId;
  name: string;
  shortLabel: string;
  icon: LucideIcon;
  image: string;
  objectPosition: string;
  previewEyebrow: string;
  previewTitle: string;
  description: string;
  tone: string;
  highlights: readonly [string, string, string];
  requestExpectations: readonly [string, string, string];
  sourceHref: string;
  sourceLabel: string;
  accent: string;
  stageOverlay: string;
  stageOverlayBlend: "screen" | "soft-light" | "multiply" | "overlay";
  infoPanelBackground: string;
  featureCards: readonly [FeatureCard, FeatureCard, FeatureCard];
  getGroups: (selections: SelectionMap) => OptionGroup[];
};

const STEPS = ["Productgroep", "Configuratie", "Samenvatting"] as const;

const CONFIG_BUTTON_PRIMARY =
  "inline-flex items-center gap-2 rounded-[0.95rem] bg-[linear-gradient(135deg,oklch(0.76_0.11_215),oklch(0.73_0.10_215))] px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.01em] text-primary-foreground shadow-[0_14px_28px_-20px_oklch(0.78_0.13_215/0.52)] transition-all duration-200 ease-out hover:-translate-y-px hover:brightness-[1.02] active:scale-[0.99]";

const CONFIG_BUTTON_SECONDARY =
  "inline-flex items-center gap-2 rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-medium tracking-[0.01em] text-foreground/78 shadow-[0_10px_24px_-22px_oklch(0_0_0/0.65)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-white/16 hover:bg-white/[0.05] hover:text-foreground active:scale-[0.99]";

const HORREN_IMAGE_URL = "https://primary.jwwb.nl/pexels/47/4786952.jpeg?enable-io=true&width=1600";

const SCREENS_IMAGE_URL =
  "https://primary.jwwb.nl/pexels/19/19382819.jpeg?enable-io=true&width=1600";

const POORTEN_IMAGE_URL =
  "https://primary.jwwb.nl/public/r/t/k/temp-lrigfpiduabdezijfjkl/544813773_122194725374302681_4446317325391135687_n-high-d2ihto.jpg?enable-io=true&enable=upscale&fit=bounds&width=1600";

const ALUPLAST_SERIES = [
  {
    id: "ideal-4000",
    label: "IDEAL 4000 (vlak)",
    note: "Strak en modern",
    description:
      "Universeel inzetbaar profiel met nette isolatiewaarden en een rustige, strakke uitstraling voor renovatie- en nieuwbouwprojecten.",
  },
  {
    id: "ideal-4000-new",
    label: "IDEAL 4000 New (half)",
    note: "Elegante isolatie",
    description:
      "Half verdiept profiel met betere isolatie en een elegantere belijning voor comfortabele, energiezuinige woongevels.",
  },
  {
    id: "ideal-7000-nl",
    label: "IDEAL 7000 NL (verdiept)",
    note: "Nederlands renovatieprofiel",
    description:
      "Robuust verdiept profiel voor de Nederlandse markt, sterk in renovatie, houtlook-uitstraling en hogere isolatiewensen.",
  },
  {
    id: "ideal-5000",
    label: "IDEAL 5000",
    note: "Extra afdichting",
    description:
      "Meer afdichting en verbeterde isolatie binnen een vertrouwde profielopbouw voor nette, duurzame woonprojecten.",
  },
  {
    id: "ideal-8000",
    label: "IDEAL 8000",
    note: "Passiefhuisgeschikt",
    description:
      "Dieper systeem voor topisolatie en triple glas, ontwikkeld voor toekomstgerichte woningen met maximale energie-efficiëntie.",
  },
  {
    id: "energeto-series",
    label: "ENERGETO-serie",
    note: "Staalvrij en licht",
    description:
      "Glasvezelversterkte systeemlijn met zeer lage warmtedoorgang, laag gewicht en een sterke focus op ultra-isolatie.",
  },
] as const satisfies readonly Choice[];

const DRUTEX_SERIES = [
  {
    id: "iglo-5-classic",
    label: "IGLO 5 Classic",
    note: "70 mm 5-kamer",
    description:
      "Traditioneel en elegant profiel met degelijke isolatie, betrouwbare geluidsdemping en een verzorgde uitstraling voor dagelijks woongebruik.",
  },
  {
    id: "iglo-energy-classic",
    label: "IGLO Energy Classic",
    note: "7-kamer isolatie",
    description:
      "Slank en modern systeem met extra thermische prestaties, hogere luchtdichting en duidelijke focus op energie-efficiëntie.",
  },
  {
    id: "iglo-edge",
    label: "IGLO Edge",
    note: "Topisolatie",
    description:
      "Hoekig modern design met de sterkste isolatiewaarden binnen de serie, bedoeld voor strakke en hoogwaardige gevelbeelden.",
  },
  {
    id: "iglo-light",
    label: "IGLO Light",
    note: "Meer daglicht",
    description:
      "Slank profiel met extra glasvlak voor open ruimtes, meer daglicht en een lichte, minimalistische woonuitstraling.",
  },
  {
    id: "iglo-premier",
    label: "IGLO Premier",
    note: "Naar buiten draaiend",
    description:
      "Traditioneel profiel met duurzame basis en praktische buitenwaartse opening voor projecten waar functionaliteit voorop staat.",
  },
] as const satisfies readonly Choice[];

const GEALAN_SERIES = [
  {
    id: "base",
    label: "Base",
    note: "120 mm · 15 graden",
    description:
      "Slanke basisvariant met 120 mm inbouwdiepte en rustige schuinte, geschikt voor nette gevels met sterk thermisch rendement.",
  },
  {
    id: "haax",
    label: "Haax",
    note: "120 mm · hoekig",
    description:
      "Robuust en hoekig profiel voor moderne gevels waar een uitgesproken architectonische belijning gewenst is.",
  },
  {
    id: "styl",
    label: "Styl",
    note: "Klassiek-modern",
    description:
      "Combinatie van authentieke en moderne detaillering voor projecten die warmte en strakke vormgeving samenbrengen.",
  },
  {
    id: "slim",
    label: "Slim",
    note: "82,5 mm slank",
    description:
      "Fijner profiel voor meer glas, strakke gevels en een elegante uitstraling binnen moderne woningbouw.",
  },
] as const satisfies readonly Choice[];

const CATALOG: readonly CategoryConfig[] = [
  {
    id: "kunststof-kozijnen",
    name: "Kunststof Kozijnen",
    shortLabel: "Kunststof",
    icon: Square,
    image: kunststofImage,
    objectPosition: "center center",
    previewEyebrow: "Officiele kunststof productlijn",
    previewTitle:
      "Kunststof kozijnen met sterke isolatie, duurzame profielkeuze en een verzorgde woonuitstraling.",
    description:
      "Gebaseerd op de officiele kunststof kozijnen van Reina's B.V., inclusief Aluplast, Drutex en Gealan voor renovatie en nieuwbouw.",
    tone: "Modern wooncomfort",
    highlights: ["Onderhoudsarm", "Goede isolatie", "Rustige profilering"],
    requestExpectations: [
      "Technisch advies op basis van merk en profielserie.",
      "Heldere afstemming voor renovatie of nieuwbouw.",
      "Vrijblijvende offerte voor uw project in heel Nederland.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/kunststof-kozijnen",
    sourceLabel: "Bron: officiele kunststof kozijnen pagina",
    accent: "rgba(92, 192, 226, 0.2)",
    stageOverlay:
      "linear-gradient(180deg, rgba(240,245,248,0.12), transparent 28%), radial-gradient(68% 62% at 78% 16%, rgba(178,208,224,0.18), transparent 72%)",
    stageOverlayBlend: "screen",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(12,18,24,0.76), rgba(18,28,36,0.62)), radial-gradient(80% 120% at 0% 100%, rgba(159,198,218,0.16), transparent 56%)",
    featureCards: [
      {
        title: "Isolatiegericht",
        body: "Profielkeuze voor comfort, energiebesparing en dagelijks woongebruik.",
      },
      {
        title: "Merkselectie",
        body: "Aluplast, Drutex en Gealan sluiten aan op echte productpagina's van Reina's.",
      },
      {
        title: "Renovatie & nieuwbouw",
        body: "Geschikt voor moderne gezinswoningen met een rustige Nederlandse uitstraling.",
      },
    ],
    getGroups: (selections) => {
      const brandChoices = [
        {
          id: "aluplast",
          label: "Aluplast",
          note: "Duits profielmerk",
          description:
            "Sterk in moderne woonprofielen met focus op isolatie, nette detaillering en breed toepasbaar maatwerk.",
        },
        {
          id: "drutex",
          label: "Drutex",
          note: "Comfort en prestaties",
          description:
            "Geschikt voor woningen waar energie-efficiency, slanke belijning en duurzaam dagelijks gebruik belangrijk zijn.",
        },
        {
          id: "gealan",
          label: "Gealan",
          note: "Europese signatuur",
          description:
            "Architectonisch rustiger systemen met premium Europese uitstraling en een verzorgde esthetiek.",
        },
      ] as const satisfies readonly Choice[];

      const brand = selections.kunststof_merk ?? brandChoices[0].id;
      const seriesByBrand = {
        aluplast: ALUPLAST_SERIES,
        drutex: DRUTEX_SERIES,
        gealan: GEALAN_SERIES,
      } as const;

      return [
        {
          id: "kunststof_merk",
          title: "Merk",
          subtitle: "Kies een realistische profielleverancier die past bij uw projectwens.",
          columns: 3,
          choices: brandChoices,
        },
        {
          id: "kunststof_serie",
          title: "Profielserie",
          subtitle:
            "De serie volgt direct uit het gekozen merk en bepaalt isolatie, profilering en uitstraling.",
          columns: 2,
          choices: seriesByBrand[brand as keyof typeof seriesByBrand],
        },
      ];
    },
  },
  {
    id: "aluminium-kozijnen",
    name: "Aluminium Kozijnen",
    shortLabel: "Aluminium",
    icon: Frame,
    image: aluminiumImage,
    objectPosition: "78% 38%",
    previewEyebrow: "Officiele aluminium productlijn",
    previewTitle:
      "Aluminium kozijnen met slanke profielen, thermische onderbreking en een kleurvaste poedercoating.",
    description:
      "Gebaseerd op de officiele aluminium kozijnen pagina van Reina's B.V., met focus op daglicht, minimalisme en duurzame afwerking.",
    tone: "Slanke architectuur",
    highlights: ["Ultra slim", "Thermisch geisoleerd", "Poedercoating"],
    requestExpectations: [
      "Afstemming op gewenste profilering en zichtlijnen.",
      "Geschikt voor eigentijdse woningbouw en projectarchitectuur.",
      "Vrijblijvende systeemselectie met maatwerkadvies.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/aluminium-kozijnen",
    sourceLabel: "Bron: officiele aluminium kozijnen pagina",
    accent: "rgba(118, 196, 232, 0.18)",
    stageOverlay:
      "linear-gradient(180deg, rgba(72,92,108,0.18), transparent 34%), radial-gradient(70% 64% at 82% 18%, rgba(90,150,188,0.22), transparent 72%)",
    stageOverlayBlend: "screen",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(8,12,18,0.82), rgba(13,20,28,0.68)), radial-gradient(80% 120% at 100% 0%, rgba(88,146,184,0.18), transparent 48%)",
    featureCards: [
      {
        title: "Meer daglicht",
        body: "Slanke lijnen en royale glasvlakken voor moderne villa's en minimalistische gevels.",
      },
      {
        title: "Kleurvast afgewerkt",
        body: "Poedercoating en onderhoudsarme prestaties sluiten aan op het officiele productverhaal.",
      },
      {
        title: "Luxe engineering",
        body: "Thermische prestaties en strakke detaillering voor hoogwaardige woonarchitectuur.",
      },
    ],
    getGroups: () => [
      {
        id: "aluminium_systeem",
        title: "Systeemtype",
        subtitle: "Alleen realistische premium uitvoeringen, zonder fictieve merkclaims.",
        columns: 2,
        choices: [
          {
            id: "modern-slim",
            label: "Modern Slim",
            note: "Slanke woonlijn",
            description:
              "Thermisch geisoleerde aluminium profielen met een rustig, modern aanzicht voor eigentijdse woningen.",
          },
          {
            id: "panorama-series",
            label: "Panorama Series",
            note: "Maximaal daglicht",
            description:
              "Voor grote glasvlakken en een open gevelbeeld, met focus op licht, rust en premium detaillering.",
          },
          {
            id: "minimal-frame",
            label: "Minimal Frame",
            note: "Luxe minimalisme",
            description:
              "Een strak systeemtype met minimale zichtlijnen, passend bij hoogwaardige architectuur en moderne villa's.",
          },
          {
            id: "industrial-line",
            label: "Industrial Line",
            note: "Karaktervol raster",
            description:
              "Geinspireerd op industriele belijning, maar uitgevoerd in een verfijnde en thermisch onderbroken aluminium basis.",
          },
        ],
      },
    ],
  },
  {
    id: "houten-kozijnen",
    name: "Houten Kozijnen",
    shortLabel: "Hout",
    icon: Leaf,
    image: houtenImage,
    objectPosition: "center center",
    previewEyebrow: "Officiele houten kozijnen",
    previewTitle:
      "Houten kozijnen op maat met natuurlijke isolatie, warme uitstraling en ambachtelijke afwerking.",
    description:
      "Gebaseerd op de houten kozijnen pagina van Reina's B.V., met Meranti, Mahonie en Europees Eiken als realistische houtbasis.",
    tone: "Warm vakmanschap",
    highlights: ["Natuurlijke warmte", "Ambachtelijk", "Duurzaam hout"],
    requestExpectations: [
      "Afstemming op houtsoort en architectonische stijl.",
      "Geschikt voor renovatie, klassieke woningen en modern maatwerk.",
      "Vrijblijvend advies voor detaillering en afwerking.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/houten-kozijnen",
    sourceLabel: "Bron: officiele houten kozijnen pagina",
    accent: "rgba(202, 168, 121, 0.18)",
    stageOverlay:
      "linear-gradient(180deg, rgba(244,222,196,0.16), transparent 30%), radial-gradient(70% 64% at 82% 18%, rgba(175,126,78,0.22), transparent 72%)",
    stageOverlayBlend: "screen",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(24,18,14,0.8), rgba(31,24,18,0.7)), radial-gradient(80% 120% at 0% 100%, rgba(182,140,92,0.18), transparent 56%)",
    featureCards: [
      {
        title: "Warme materialiteit",
        body: "Natuurlijke uitstraling voor tijdloze woningen, renovatie en verfijnd maatwerk.",
      },
      {
        title: "Meranti, Mahonie, Eiken",
        body: "Houtsoorten uit het officiele aanbod met ruimte voor sfeer en detaillering.",
      },
      {
        title: "Ambachtelijk maatwerk",
        body: "Comfort, karakter en natuurlijke isolatie in een geloofwaardige premium uitvoering.",
      },
    ],
    getGroups: () => [
      {
        id: "hout_houtsoort",
        title: "Houtsoort",
        subtitle:
          "Kies de houtbasis die past bij uitstraling, levensduur en gewenste detaillering.",
        columns: 3,
        choices: [
          {
            id: "meranti",
            label: "Meranti",
            note: "Veelgekozen basis",
            description:
              "Betrouwbare houtsoort voor maatwerk kozijnen met een goede balans tussen stabiliteit, uitstraling en duurzaamheid.",
          },
          {
            id: "mahonie",
            label: "Mahonie",
            note: "Rijke uitstraling",
            description:
              "Warme, luxe houtuitstraling met verfijnd karakter voor premium woonprojecten en representatieve gevels.",
          },
          {
            id: "europees-eiken",
            label: "Europees Eiken",
            note: "Natuurlijk en sterk",
            description:
              "Karaktervol hout met een robuuste, duurzame basis en een uitgesproken ambachtelijke uitstraling.",
          },
        ],
      },
      {
        id: "hout_stijl",
        title: "Stijltype",
        subtitle: "Stem de houtlijn af op de architectuur van uw woning of renovatieproject.",
        columns: 3,
        choices: [
          {
            id: "klassiek",
            label: "Klassiek",
            note: "Tijdloze verfijning",
            description:
              "Traditionele verhoudingen en warme detaillering voor karaktervolle woningen en renovatie met behoud van uitstraling.",
          },
          {
            id: "modern",
            label: "Modern",
            note: "Strakke belijning",
            description:
              "Een rustiger en strakker aanzicht, met de warmte van hout en de uitstraling van eigentijdse architectuur.",
          },
          {
            id: "landelijk",
            label: "Landelijk",
            note: "Zacht en natuurlijk",
            description:
              "Voor woningen waar natuurlijke elegantie, zachte belijning en een warme leefuitstraling belangrijk zijn.",
          },
        ],
      },
    ],
  },
  {
    id: "horren",
    name: "Horren",
    shortLabel: "Horren",
    icon: PanelTop,
    image: HORREN_IMAGE_URL,
    objectPosition: "center center",
    previewEyebrow: "Officiele horren oplossing",
    previewTitle:
      "Horren op maat voor draaikiepramen, frisse lucht en insectwering zonder boren of schroeven.",
    description:
      "Gebaseerd op de officiele horren pagina van Reina's B.V., met nadruk op inzethorren op maat, eenvoudige plaatsing en keuze uit pollenwerend, petscreen, zwart of grijs gaas.",
    tone: "Frisse ventilatie",
    highlights: ["Zonder boren", "Op maat", "Insectwerend"],
    requestExpectations: [
      "Advies per kozijnsituatie, vooral voor draaikiepramen en maatwerktoepassingen.",
      "Heldere keuzehulp voor gaastype, gaaskleur en dagelijks wooncomfort.",
      "Vrijblijvende maatwerkofferte voor levering, inmeten en montage indien gewenst.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/horren",
    sourceLabel: "Bron: officiele horren pagina en productbeeld",
    accent: "rgba(114, 187, 222, 0.16)",
    stageOverlay:
      "linear-gradient(180deg, rgba(220,238,244,0.14), transparent 28%), radial-gradient(70% 62% at 82% 18%, rgba(127,190,214,0.16), transparent 74%)",
    stageOverlayBlend: "screen",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(10,18,22,0.78), rgba(17,28,34,0.62)), radial-gradient(80% 120% at 100% 0%, rgba(129,196,220,0.12), transparent 54%)",
    featureCards: [
      {
        title: "Geen schade aan kozijnen",
        body: "Inzethorren worden klemvast geplaatst en sluiten netjes aan zonder te boren of schroeven.",
      },
      {
        title: "Volledig op maat",
        body: "Elke hor wordt afgestemd op het kozijn, met keuze uit pollenwerend, petscreen, zwart of grijs gaas.",
      },
      {
        title: "Ventilatie & comfort",
        body: "Frisse lucht blijft welkom, terwijl muggen, vliegen en andere insecten effectief buiten blijven.",
      },
    ],
    getGroups: () => [
      {
        id: "horren_type",
        title: "Type hor",
        subtitle: "Kies het functionele hor-type dat past bij gebruik, comfort en onderhoud.",
        columns: 3,
        choices: [
          {
            id: "inzethor",
            label: "Inzethor",
            note: "Zonder boren",
            description:
              "Een nette maatwerkoplossing die zonder boren geplaatst kan worden en mooi aansluit op het kozijn.",
          },
          {
            id: "pollenwerend",
            label: "Pollenwerend",
            note: "Comfort focus",
            description:
              "Voor extra wooncomfort in het pollenseizoen, met ventilatie en betere filtering in een verzorgde uitvoering.",
          },
          {
            id: "petscreen",
            label: "Petscreen",
            note: "Sterker gaas",
            description:
              "Meer robuuste uitvoering voor huishoudens waar stevigheid en dagelijks gebruik extra belangrijk zijn.",
          },
        ],
      },
      {
        id: "horren_gaas",
        title: "Gaaskleur",
        subtitle: "Stem de hor af op kozijn, zichtlijn en de gewenste rust in de gevel.",
        columns: 2,
        choices: [
          {
            id: "zwart-gaas",
            label: "Zwart gaas",
            note: "Strakker zicht",
            description:
              "Geeft een rustiger doorkijk en sluit visueel sterk aan op donkere kozijnen en moderne woonarchitectuur.",
          },
          {
            id: "grijs-gaas",
            label: "Grijs gaas",
            note: "Zachte uitstraling",
            description:
              "Een subtieler beeld voor lichtere kozijnen of woningen waar een zachtere afwerking gewenst is.",
          },
        ],
      },
    ],
  },
  {
    id: "screens-sunscreens",
    name: "Screens / Sunscreens",
    shortLabel: "Screens",
    icon: Blinds,
    image: SCREENS_IMAGE_URL,
    objectPosition: "center center",
    previewEyebrow: "Officiele screens pagina",
    previewTitle:
      "Screens houden zonnestralen tegen voordat het glas opwarmt en zorgen voor strakke verticale zonwering.",
    description:
      "Gebaseerd op de officiele sunscreens pagina van Reina's B.V., met focus op strakke montage langs het raam, warmtewering en behoud van licht en uitzicht.",
    tone: "Zonwerend comfort",
    highlights: ["Zonwerend", "Warmtereductie", "Strakke integratie"],
    requestExpectations: [
      "Afstemming op gevelbeeld, lichtinval en gewenste mate van warmtewering.",
      "Keuze voor standaard, ZIP of solar uitvoering binnen een realistische maatwerkoplossing.",
      "Vrijblijvende offerte voor buitenzonwering, comfort en nette gevelintegratie.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/sunscreens",
    sourceLabel: "Bron: officiele sunscreens pagina en productbeeld",
    accent: "rgba(100, 188, 220, 0.18)",
    stageOverlay:
      "linear-gradient(180deg, rgba(255,215,149,0.14), rgba(18,24,29,0.02) 34%, transparent 62%), linear-gradient(125deg, rgba(17,24,28,0.2), transparent 44%)",
    stageOverlayBlend: "soft-light",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(14,20,24,0.8), rgba(18,25,31,0.66)), radial-gradient(80% 120% at 100% 0%, rgba(228,180,102,0.14), transparent 46%)",
    featureCards: [
      {
        title: "Warmte buiten houden",
        body: "De screens vangen zonnestralen op voordat ze het glas raken, zodat de woning koeler blijft.",
      },
      {
        title: "Strak langs het raam",
        body: "Verticale montage zorgt voor een verzorgde, moderne geveluitstraling zonder onrust in het ontwerp.",
      },
      {
        title: "Licht en uitzicht",
        body: "Comfortabele zonwering met behoud van daglicht, uitzicht en een rustige woonatmosfeer.",
      },
    ],
    getGroups: () => [
      {
        id: "screens_type",
        title: "Screentype",
        subtitle: "Kies de uitvoering die past bij comfort, gevelbeeld en bedieningswens.",
        columns: 3,
        choices: [
          {
            id: "standaard-screen",
            label: "Standaard Screen",
            note: "Heldere basis",
            description:
              "Een nette en bewezen oplossing voor dagelijkse zonwering met rustige gevelintegratie en degelijk comfort.",
          },
          {
            id: "zip-screen",
            label: "ZIP Screen",
            note: "Strakker systeem",
            description:
              "Meer gesloten geleiding voor een strakker aanzicht, meer stabiliteit en een hoogwaardige premium afwerking.",
          },
          {
            id: "solar-screen",
            label: "Solar Screen",
            note: "Draadloos comfort",
            description:
              "Voor opdrachtgevers die zonwering en comfort willen combineren met een zelfstandige energieoplossing.",
          },
        ],
      },
    ],
  },
  {
    id: "sectionaal-poorten-hekwerken",
    name: "Sectionaal Poorten & Hekwerken",
    shortLabel: "Poorten",
    icon: Warehouse,
    image: POORTEN_IMAGE_URL,
    objectPosition: "center center",
    previewEyebrow: "Officiele poorten en hekwerken",
    previewTitle:
      "Garagepoorten en hekwerken op maat met focus op veiligheid, uitstraling en comfortabel dagelijks gebruik.",
    description:
      "Gebaseerd op de officiele sectionaal poorten en hekwerken pagina van Reina's B.V., met garagepoorten, schuif- en draaipoorten en hekwerken als echte maatwerkcategorieen.",
    tone: "Veilige entree",
    highlights: ["Veiligheid", "Automatisering", "Duurzame entree"],
    requestExpectations: [
      "Afstemming op woning, garage, terrein of opritoplossing.",
      "Keuze tussen garagepoorten en hekwerken met materiaal-, stijl- en bedieningsadvies.",
      "Vrijblijvend advies voor toegang, beveiliging, automatisering en maatwerk.",
    ],
    sourceHref: "https://www.reinas-bv.nl/onze-producten/sectionaal-poorten-hekwerken",
    sourceLabel: "Bron: officiele poorten en hekwerken pagina en productbeeld",
    accent: "rgba(120, 186, 226, 0.18)",
    stageOverlay:
      "linear-gradient(180deg, rgba(88,110,128,0.14), rgba(10,16,21,0.08) 38%, transparent 62%), radial-gradient(70% 64% at 82% 18%, rgba(109,168,205,0.18), transparent 72%)",
    stageOverlayBlend: "screen",
    infoPanelBackground:
      "linear-gradient(135deg, rgba(10,14,18,0.82), rgba(16,22,28,0.68)), radial-gradient(80% 120% at 100% 0%, rgba(90,150,188,0.16), transparent 48%)",
    featureCards: [
      {
        title: "Garagepoorten op maat",
        body: "Sectionaal, kantel, openslaand of automatisch, afgestemd op gevel, isolatie en dagelijks comfort.",
      },
      {
        title: "Hekwerken & toegang",
        body: "Sierhekwerk, aluminium, hout, schuifpoort en draaipoort voor een veilige en representatieve entree.",
      },
      {
        title: "Automatisering mogelijk",
        body: "Ruimte voor elektrische bediening, sensoren, intercom of toegangscontrole binnen een geloofwaardige premium oplossing.",
      },
    ],
    getGroups: (selections) => {
      const type = selections.poorten_categorie ?? "garagepoorten";
      return [
        {
          id: "poorten_categorie",
          title: "Categorie",
          subtitle: "Kies eerst of de aanvraag over een garagepoort of een hekwerkoplossing gaat.",
          columns: 2,
          choices: [
            {
              id: "garagepoorten",
              label: "Garagepoorten",
              note: "Woning en garage",
              description:
                "Gericht op veilige, nette en comfortabele toegangen voor garages, bijgebouwen en woonprojecten.",
            },
            {
              id: "hekwerken",
              label: "Hekwerken",
              note: "Terrein en entree",
              description:
                "Voor premium buitenentrees waar afscheiding, veiligheid en representatieve uitstraling samenkomen.",
            },
          ],
        },
        {
          id: "poorten_uitvoering",
          title: type === "garagepoorten" ? "Garagepoorttype" : "Hekwerktype",
          subtitle:
            type === "garagepoorten"
              ? "Kies de uitvoering die past bij gebruiksgemak, automatisering en het gewenste entreebeeld."
              : "Kies het hekwerk of poorttype dat aansluit op veiligheid, routing en uitstraling.",
          columns: 2,
          choices:
            type === "garagepoorten"
              ? [
                  {
                    id: "sectionaalpoort",
                    label: "Sectionaalpoort",
                    note: "Veelgekozen premium",
                    description:
                      "Een moderne en praktische garagepoort met nette belijning, goede afdichting en comfortabele bediening.",
                  },
                  {
                    id: "kantelpoort",
                    label: "Kantelpoort",
                    note: "Bewezen oplossing",
                    description:
                      "Klassieke garagepoortoplossing met een heldere basis voor dagelijkse toegang en degelijke functionaliteit.",
                  },
                  {
                    id: "openslaande-deuren",
                    label: "Openslaande deuren",
                    note: "Traditioneel en praktisch",
                    description:
                      "Ideaal wanneer looptoegang, ruim openingscomfort en een rustiger traditioneel beeld gewenst zijn.",
                  },
                  {
                    id: "automatische-poort",
                    label: "Automatische poort",
                    note: "Bedieningscomfort",
                    description:
                      "Voor opdrachtgevers die automatisering, veiligheid en dagelijks gemak centraal willen stellen.",
                  },
                ]
              : [
                  {
                    id: "sierhekwerk",
                    label: "Sierhekwerk",
                    note: "Representatieve entree",
                    description:
                      "Meer decoratieve hekwerkoplossing voor woningen en entrees waar uitstraling een belangrijke rol speelt.",
                  },
                  {
                    id: "aluminium-hekwerk",
                    label: "Aluminium hekwerk",
                    note: "Onderhoudsarm",
                    description:
                      "Rustige, moderne hekwerkoplossing met duurzame afwerking en een strakke premium uitstraling.",
                  },
                  {
                    id: "houten-hekwerk",
                    label: "Houten hekwerk",
                    note: "Warm karakter",
                    description:
                      "Voor buitenruimtes waar natuurlijke uitstraling en ambachtelijke sfeer goed moeten aansluiten op de woning.",
                  },
                  {
                    id: "schuifpoort",
                    label: "Schuifpoort",
                    note: "Ruime toegang",
                    description:
                      "Praktische toegangspoort voor ruime inritten en terreinen waar routing, veiligheid en gebruiksgemak belangrijk zijn.",
                  },
                  {
                    id: "draaipoort",
                    label: "Draaipoort",
                    note: "Klassieke entree",
                    description:
                      "Tijdloze poortoplossing voor representatieve entrees met focus op uitstraling, veiligheid en duurzaamheid.",
                  },
                ],
        },
      ];
    },
  },
];

const CATALOG_BY_ID = Object.fromEntries(CATALOG.map((item) => [item.id, item])) as Record<
  CategoryId,
  CategoryConfig
>;

function getCategoryGroups(categoryId: CategoryId, selections: SelectionMap) {
  return CATALOG_BY_ID[categoryId].getGroups(selections);
}

function shallowEqualRecords(a: SelectionMap, b: SelectionMap) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return bKeys.every((key) => a[key] === b[key]);
}

function resolveSelections(categoryId: CategoryId, current: SelectionMap) {
  let working = current;

  for (let i = 0; i < 3; i += 1) {
    const groups = getCategoryGroups(categoryId, working);
    const next: SelectionMap = {};

    groups.forEach((group) => {
      const currentValue = working[group.id];
      next[group.id] = group.choices.some((choice) => choice.id === currentValue)
        ? currentValue
        : group.choices[0].id;
    });

    if (shallowEqualRecords(working, next)) return next;
    working = next;
  }

  return working;
}

function getSelectedChoice(group: OptionGroup, selections: SelectionMap) {
  return group.choices.find((choice) => choice.id === selections[group.id]) ?? group.choices[0];
}

export function ConfiguratorOfficial() {
  const [step, setStep] = useState(0);
  const [categoryId, setCategoryId] = useState<CategoryId>(CATALOG[0].id);
  const [selections, setSelections] = useState<SelectionMap>({});

  const category = CATALOG_BY_ID[categoryId];

  useEffect(() => {
    setSelections((current) => {
      const next = resolveSelections(categoryId, current);
      return shallowEqualRecords(current, next) ? current : next;
    });
  }, [categoryId, selections]);

  const optionGroups = useMemo(
    () => getCategoryGroups(categoryId, selections),
    [categoryId, selections],
  );

  const selectedChoices = useMemo(
    () => optionGroups.map((group) => ({ group, choice: getSelectedChoice(group, selections) })),
    [optionGroups, selections],
  );

  const summaryRows = useMemo(
    () => [
      { label: "Productgroep", value: category.name },
      ...selectedChoices.map(({ group, choice }) => ({ label: group.title, value: choice.label })),
    ],
    [category.name, selectedChoices],
  );

  const goNext = () => setStep((current) => Math.min(STEPS.length - 1, current + 1));
  const goPrev = () => setStep((current) => Math.max(0, current - 1));

  return (
    <section id="configurator" className="relative overflow-hidden px-4 py-24 md:px-6 md:py-36">
      <div className="absolute inset-x-0 top-0 h-[60%] gradient-radial-glow opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-[82rem]">
        <Reveal variant="rise" className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-primary">
            Reina&apos;s configurator
          </p>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight">
            Configureer met
            <span className="font-serif-italic gradient-text"> officiele productlijnen.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Geen generieke demo, maar een realistische productselectie op basis van de echte
            kozijnen, horren, screens en entreeoplossingen van Reina&apos;s B.V.
          </p>
        </Reveal>

        <Reveal variant="lift" delay={1} className="mt-12 flex justify-center">
          <ol className="glass relative flex w-full max-w-3xl items-center justify-between gap-1 rounded-2xl p-1.5">
            {STEPS.map((item, index) => {
              const active = index === step;
              const done = index < step;

              return (
                <li key={item} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={cn(
                      "group relative flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[11.5px] font-medium tracking-[0.04em] transition-all md:px-3 md:text-[12.5px]",
                      active
                        ? "bg-white/[0.05] text-foreground ring-1 ring-white/12 shadow-[0_18px_28px_-26px_oklch(0_0_0/0.8)]"
                        : done
                          ? "text-foreground/80 hover:text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full text-[10px] transition-all",
                        active
                          ? "bg-primary/16 text-primary ring-1 ring-primary/18"
                          : done
                            ? "bg-white/[0.08] text-foreground/78"
                            : "bg-white/5 text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="h-3 w-3" /> : index + 1}
                    </span>
                    <span className="hidden sm:inline">{item}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <Reveal
            variant="slide-left"
            delay={1}
            className="glass-strong relative flex flex-col overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-elevated)] md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(72% 58% at 100% 0%, ${category.accent}, transparent 68%)`,
                opacity: 0.48,
              }}
            />
            <motion.div
              key={`${step}-${categoryId}`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              {step === 0 && (
                <ControlGroup
                  title="Kies uw productgroep"
                  subtitle="Alleen de echte productcategorieen van Reina's B.V."
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    {CATALOG.map((item) => {
                      const Icon = item.icon;
                      const active = item.id === categoryId;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCategoryId(item.id)}
                          className={cn(
                            "group relative overflow-hidden rounded-[1.35rem] border text-left transition-all duration-300",
                            active
                              ? "border-primary/38 bg-white/[0.05] shadow-[0_20px_48px_-30px_oklch(0.78_0.13_215/0.42)]"
                              : "border-white/8 bg-white/[0.02] hover:border-white/14 hover:bg-white/[0.035]",
                          )}
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                              style={{ objectPosition: item.objectPosition }}
                              loading="lazy"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/22 to-transparent" />
                            <div
                              className="pointer-events-none absolute inset-0 opacity-90"
                              style={{
                                background: `radial-gradient(78% 62% at 78% 20%, ${item.accent}, transparent 70%)`,
                              }}
                            />
                            <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/44 px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-white/72 backdrop-blur">
                              <Icon className="h-3.5 w-3.5 text-primary" />
                              {item.tone}
                            </div>
                            {active && (
                              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_14px_-2px_oklch(0.78_0.13_215/0.45)]">
                                <Check className="h-3.5 w-3.5" />
                              </span>
                            )}
                          </div>
                          <div className="relative p-4">
                            <p className="text-[14px] font-semibold tracking-tight text-foreground/94">
                              {item.name}
                            </p>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {item.highlights.map((highlight) => (
                                <span
                                  key={highlight}
                                  className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-[8.5px] uppercase tracking-[0.14em] text-foreground/62"
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ControlGroup>
              )}

              {step === 1 && (
                <ControlGroup
                  title={`Configureer ${category.name.toLowerCase()}`}
                  subtitle="Alle opties volgen de officiele productstructuur en tone of voice van Reina's B.V."
                >
                  <div className="space-y-6">
                    {optionGroups.map((group) => (
                      <div key={group.id}>
                        <div className="mb-3">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/76">
                            {group.title}
                          </p>
                          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground/88">
                            {group.subtitle}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "grid gap-2.5",
                            group.columns === 1 && "grid-cols-1",
                            group.columns === 2 && "grid-cols-1 md:grid-cols-2",
                            group.columns === 3 && "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
                          )}
                        >
                          {group.choices.map((choice) => {
                            const active = selections[group.id] === choice.id;
                            return (
                              <button
                                key={choice.id}
                                type="button"
                                onClick={() =>
                                  setSelections((current) => ({
                                    ...current,
                                    [group.id]: choice.id,
                                  }))
                                }
                                className={cn(
                                  "group relative overflow-hidden rounded-[1.2rem] border p-3.5 text-left transition-all duration-250",
                                  active
                                    ? "border-primary/42 bg-white/[0.05] shadow-[0_18px_36px_-28px_oklch(0.78_0.13_215/0.38)]"
                                    : "border-white/10 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.03]",
                                )}
                              >
                                <div
                                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                  style={{
                                    background: `linear-gradient(145deg, ${category.accent}, transparent 48%)`,
                                  }}
                                />
                                <div className="relative">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-[13px] font-semibold tracking-tight text-foreground/94">
                                        {choice.label}
                                      </p>
                                      {choice.note && (
                                        <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-primary/88">
                                          {choice.note}
                                        </p>
                                      )}
                                    </div>
                                    {active && (
                                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/16 text-primary ring-1 ring-primary/24">
                                        <Check className="h-3 w-3" />
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground/88">
                                    {choice.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/[0.025] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary/90">
                      Waarom deze selectie geloofwaardig voelt
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground/88">
                      Elke optie is nu opgebouwd vanuit echte merken, profielseries, materiaalkeuzes
                      en productgroepen van Reina&apos;s B.V. Daardoor voelt deze configurator als
                      een echte voorbereiding op maatwerkadvies, niet als een generieke demo.
                    </p>
                  </div>
                </ControlGroup>
              )}
              {step === 2 && (
                <ControlGroup
                  title="Uw aanvraag is klaar"
                  subtitle="Een heldere productsamenvatting voor een realistische offerteaanvraag"
                >
                  <ul className="space-y-2.5 text-sm">
                    {summaryRows.map((row) => (
                      <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 border-b border-white/5 pb-2.5"
                      >
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="text-right font-medium text-foreground/92">
                          {row.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-[1.35rem] border border-primary/24 bg-[linear-gradient(180deg,rgba(25,34,42,0.84),rgba(15,20,25,0.84))] p-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                      Wat u van Reina&apos;s B.V. mag verwachten
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {category.requestExpectations.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-[12.5px] leading-relaxed text-foreground/84"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ControlGroup>
              )}
            </motion.div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={step === 0}
                className={`${CONFIG_BUTTON_SECONDARY} disabled:pointer-events-none disabled:opacity-35`}
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Vorige
              </button>

              {step < STEPS.length - 1 ? (
                <button type="button" onClick={goNext} className={`group ${CONFIG_BUTTON_PRIMARY}`}>
                  Volgende
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <a href="#contact" className={`group ${CONFIG_BUTTON_PRIMARY}`}>
                  Vraag maatwerkofferte aan
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal variant="slide-right" delay={2} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] blur-3xl transition-all duration-700"
              style={{
                background: `radial-gradient(56% 56% at 68% 26%, ${category.accent}, transparent 72%)`,
                opacity: 0.8,
              }}
            />

            <div className="glass-strong relative overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)] ring-1 ring-white/10">
              <div className="relative min-h-[420px] overflow-hidden md:min-h-[500px] xl:min-h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={category.id}
                    src={category.image}
                    alt={category.name}
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: category.objectPosition }}
                    draggable={false}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.18),rgba(8,12,16,0.24)_40%,rgba(8,12,16,0.88)_100%)]" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: category.stageOverlay,
                    mixBlendMode: category.stageOverlayBlend,
                    opacity: 0.92,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:96px_96px]" />

                <div className="absolute left-5 top-5 flex max-w-[calc(100%-9rem)] flex-wrap gap-2">
                  <Chip label="Reina's B.V." dot />
                  <Chip label={category.shortLabel} />
                  <Chip label={category.tone} />
                </div>

                <div className="absolute right-5 top-5">
                  <a
                    href={category.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex"
                  >
                    <Chip label="Officiele productpagina" />
                  </a>
                </div>

                <div
                  className="absolute inset-x-5 bottom-5 rounded-[1.3rem] border border-white/10 p-4 shadow-[0_24px_60px_-34px_oklch(0_0_0/0.9)] backdrop-blur-2xl"
                  style={{ background: category.infoPanelBackground }}
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-primary/92">
                    {category.previewEyebrow}
                  </p>
                  <h3 className="font-display mt-2 text-[1.32rem] font-medium leading-tight tracking-tight text-white/95">
                    {category.previewTitle}
                  </h3>
                  <p className="mt-2 max-w-[32rem] text-[12px] leading-relaxed text-white/66">
                    {category.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedChoices.map(({ group, choice }) => (
                      <span
                        key={group.id}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/64"
                      >
                        {group.title} · {choice.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-primary/18 bg-primary/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-primary"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <a
                    href={category.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-[10px] leading-relaxed text-white/48 transition-colors hover:text-white/72"
                  >
                    {category.sourceLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {category.featureCards.map((item) => (
                <div
                  key={item.title}
                  className="glass rounded-[1.2rem] border border-white/7 px-5 py-4 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.035]"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), radial-gradient(90% 120% at 0% 0%, ${category.accent}, transparent 78%)`,
                  }}
                >
                  <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ControlGroup({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.08em] text-primary/82">{subtitle}</p>
      <h3 className="font-display mt-2 text-[1.5rem] font-medium leading-tight tracking-tight">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Chip({ label, dot }: { label: string; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[0.8rem] bg-background/42 px-2.5 py-1 text-[9.5px] font-medium tracking-[0.08em] text-foreground/76 ring-1 ring-white/10 backdrop-blur-xl">
      {dot && (
        <span className="relative grid h-1.5 w-1.5 place-items-center">
          <span className="absolute inset-0 rounded-full bg-primary/18 blur-[2px]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
        </span>
      )}
      {label}
    </span>
  );
}
