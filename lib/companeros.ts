// Datos de cada carta. Edita libremente los textos para personalizarlos
// con recuerdos, anécdotas o detalles propios de cada compañero.
// El orden de la lista es el orden en que aparecen los sobres en la portada.
//
// Estructura de cada carta:
//   apertura  → párrafo inicial
//   gracias   → tres agradecimientos concretos (título + texto)
//   frase     → cita destacada
//   cierre    → deseos para el futuro
//   despedida → fórmula antes de la firma
//
// Solo servidor: el texto de las cartas nunca se envía al navegador
// hasta que se valida el PIN (ver app/carta/[slug]/acciones.ts).

import "server-only";
import type {
  Companero,
  ContenidoCarta,
  DatosPublicos,
} from "./tipos";

export { iniciales } from "./tipos";
export type { Acento, Companero, ContenidoCarta, DatosPublicos, Gracia } from "./tipos";

export const FIRMA = "Joab";
export const FECHA = "Noviembre de 2026";

export const COMPANEROS: Companero[] = [
  // ---------- Dirección ----------
  {
    slug: "julian-alvarez",
    nombre: "Julian Alvarez",
    primerNombre: "Julian",
    cargo: "Director General",
    acento: "violeta",
    palabra: "Confianza",
    apertura:
      "Hay despedidas que se escriben con nostalgia; esta quiero escribirla, sobre todo, con gratitud. Antes de cerrar mi etapa en H2A, quería tomarme un momento para agradecerte de manera personal.",
    gracias: [
      {
        titulo: "Por la oportunidad",
        texto:
          "Por abrirme las puertas de H2A y permitirme ser parte de una empresa que cree en escuchar antes de actuar. Esa oportunidad marcó mi camino profesional.",
      },
      {
        titulo: "Por la confianza",
        texto:
          "Por creer en mi trabajo y darme espacio para asumir retos, aprender y volver a intentarlo. Pocas cosas impulsan tanto a una persona como sentir que alguien confía en ella.",
      },
      {
        titulo: "Por el ejemplo",
        texto:
          "Por liderar con una visión clara y construir una cultura donde la tecnología, el contenido y el marketing se unen para transformar. Trabajar en ese entorno me enseñó a pensar en grande.",
      },
    ],
    frase:
      "Liderar es abrir caminos para que otros puedan recorrerlos, y creer en ellos antes de que lo hagan.",
    cierre:
      "Me llevo mucho más de lo que traje. Te deseo que H2A siga creciendo, que cada nuevo reto encuentre al equipo listo para resolverlo y que sigas construyendo un lugar donde otros puedan crecer como yo lo hice.",
    despedida: "Con profundo agradecimiento,",
  },
  {
    slug: "juliana-moreno",
    nombre: "Juliana Moreno Pérez",
    primerNombre: "Juliana",
    cargo: "Directora Administrativa",
    acento: "magenta",
    palabra: "Respaldo",
    apertura:
      "Al cerrar esta etapa en H2A, quiero dedicarte unas líneas para expresarte algo que no siempre se dice lo suficiente: gracias.",
    gracias: [
      {
        titulo: "Por el respaldo",
        texto:
          "Por cuidar que todo funcione: las personas, los procesos y cada detalle que sostiene a la empresa. Ese trabajo, muchas veces silencioso, es el que permite que los demás podamos crear y crecer.",
      },
      {
        titulo: "Por la cercanía",
        texto:
          "Por la disposición para escuchar y resolver, y por recordarnos que detrás de cada proceso hay personas. Esa mirada humana hace la diferencia.",
      },
      {
        titulo: "Por hacer de H2A un buen lugar",
        texto:
          "Por todo el compromiso que pones para que el equipo tenga lo que necesita. Gracias a ese esfuerzo, H2A fue un lugar donde fue posible crecer.",
      },
    ],
    frase:
      "Cuidar a las personas es la forma más silenciosa, y más poderosa, de liderar.",
    cierre:
      "Te deseo muchos éxitos, proyectos que te llenen de orgullo y el reconocimiento que merece todo lo que haces. Me llevo un recuerdo muy bonito de esta etapa.",
    despedida: "Con sincera gratitud,",
  },

  // ---------- Líderes ----------
  {
    slug: "andres-montoya",
    nombre: "Andrés Montoya",
    primerNombre: "Andrés",
    cargo: "Director de Operaciones y Producto",
    acento: "turquesa",
    palabra: "Rumbo",
    apertura:
      "Cierro mi etapa en H2A con el corazón lleno de gratitud, y una parte importante de ese sentimiento lleva tu nombre.",
    gracias: [
      {
        titulo: "Por la dirección",
        texto:
          "Por darle rumbo al producto y ayudarnos a entender el porqué detrás de cada cosa que construíamos. Con claridad, todo trabajo cobra sentido.",
      },
      {
        titulo: "Por la perspectiva",
        texto:
          "Por enseñarme a mirar más allá del código: a pensar en el usuario, en la operación y en el impacto real de cada decisión.",
      },
      {
        titulo: "Por la exigencia",
        texto:
          "Por pedir calidad y, al mismo tiempo, acompañar el proceso. Esa combinación me hizo crecer como profesional.",
      },
    ],
    frase:
      "Un buen producto no nace del código; nace de entender para quién y para qué se construye.",
    cierre:
      "Te deseo muchos éxitos, productos que sigan creciendo y equipos que valoren la claridad con la que lideras. Fue un honor trabajar bajo tu dirección.",
    despedida: "Con gratitud y admiración,",
  },
  {
    slug: "reuth-onate",
    nombre: "Reuth Afef Oñate Díaz",
    primerNombre: "Reuth",
    cargo: "Líder de Desarrollo",
    acento: "magenta",
    palabra: "Guía",
    apertura:
      "Despedirse de quien ha guiado tu trabajo día a día nunca es fácil. Por eso quiero que esta carta sea, ante todo, un gracias sincero.",
    gracias: [
      {
        titulo: "Por las enseñanzas",
        texto:
          "Por cada revisión de código, cada consejo técnico y cada conversación que me ayudó a encontrar una mejor solución. Aprendí muchísimo de tu forma de pensar.",
      },
      {
        titulo: "Por la paciencia",
        texto:
          "Por acompañarme cuando algo no salía, por explicar con calma y por darme el espacio para aprender de mis errores.",
      },
      {
        titulo: "Por la confianza",
        texto:
          "Por creer en mi trabajo y animarme a asumir retos nuevos. Cada responsabilidad que me confiaste fue una oportunidad para crecer.",
      },
    ],
    frase:
      "Un buen líder técnico no solo revisa el código: ayuda a crecer a quien lo escribe.",
    cierre:
      "Me voy con más herramientas, más criterio y más seguridad, y mucho de eso es gracias a ti. Te deseo que sigas formando equipos y construyendo productos de los que sientas orgullo.",
    despedida: "Con todo mi agradecimiento,",
  },
  {
    slug: "luis-galeano",
    nombre: "Luis Galeano",
    primerNombre: "Luis",
    cargo: "Líder de Proyectos de Desarrollo",
    acento: "violeta",
    palabra: "Orden",
    apertura:
      "Antes de despedirme de H2A, quería agradecerte por todo lo que hiciste para que el trabajo del equipo fluyera, incluso en los días más exigentes.",
    gracias: [
      {
        titulo: "Por la organización",
        texto:
          "Por convertir lo urgente en un plan, ordenar prioridades y darle estructura a cada proyecto. Gracias a eso, siempre supimos hacia dónde íbamos.",
      },
      {
        titulo: "Por el acompañamiento",
        texto:
          "Por estar presente cuando algo se trababa y buscar soluciones junto al equipo, en lugar de solo pedir resultados.",
      },
      {
        titulo: "Por cuidar al equipo",
        texto:
          "Por proteger nuestros tiempos y defender lo que era posible entregar. Ese cuidado se nota, y se agradece.",
      },
    ],
    frase:
      "Detrás de cada entrega a tiempo hay alguien que convirtió el caos en un plan.",
    cierre:
      "Te deseo éxitos enormes en todos los proyectos que vienen. Sé que seguirás llevándolos a buen puerto, como lo hiciste con los que compartimos.",
    despedida: "Con aprecio y gratitud,",
  },

  // ---------- Equipo ----------
  {
    slug: "yonny-lezcano",
    nombre: "Yonny Lezcano",
    primerNombre: "Yonny",
    cargo: "Equipo TrainMe 2 · Backend",
    acento: "turquesa",
    palabra: "Solidez",
    apertura:
      "Llegó el momento de despedirme y no quería hacerlo sin agradecerte por todo lo que compartimos construyendo TrainMe.",
    gracias: [
      {
        titulo: "Por el trabajo en equipo",
        texto:
          "Por cada integración resuelta juntos, cada error investigado a cuatro manos y cada conversación para entender cómo debía funcionar algo.",
      },
      {
        titulo: "Por la solidez",
        texto:
          "Por el cuidado que pones en el backend. Lo que el usuario no ve es lo que sostiene todo, y tú lo construyes con responsabilidad.",
      },
      {
        titulo: "Por la buena energía",
        texto:
          "Por hacer que los días de trabajo intenso se sintieran más livianos. Trabajar contigo fue tan productivo como agradable.",
      },
    ],
    frase:
      "Lo que nadie ve es lo que sostiene todo. Gracias por construirlo con tanto cuidado.",
    cierre:
      "Te deseo lo mejor con TrainMe 2 y con todo lo que venga. Ojalá la vida nos vuelva a cruzar en algún proyecto, y que el código siempre compile a la primera.",
    despedida: "Un abrazo y mil gracias,",
  },
  {
    slug: "juan-diego-patino",
    nombre: "Juan Diego Patiño Osorio",
    primerNombre: "Juan Diego",
    cargo: "Equipo TrainMe 2",
    acento: "magenta",
    palabra: "Comienzo",
    apertura:
      "Compartimos poco tiempo en TrainMe 2, pero no quería irme sin escribirte. Llegas al equipo justo cuando yo me despido, y quiero que esta carta sea un gracias y, al mismo tiempo, una bienvenida al proyecto.",
    gracias: [
      {
        titulo: "Por llegar con ganas",
        texto:
          "Por la disposición y el entusiasmo con los que te sumaste al equipo. Esa energía de los comienzos es valiosa, y se nota desde el primer día.",
      },
      {
        titulo: "Por la experiencia",
        texto:
          "Por todo lo que traes de tu camino en H2A. Tu conocimiento de la empresa y de cómo se hacen las cosas aquí es un gran aporte para TrainMe 2.",
      },
      {
        titulo: "Por darle continuidad",
        texto:
          "Por tomar el relevo en TrainMe 2. Me voy con la tranquilidad de saber que el proyecto queda en buenas manos.",
      },
    ],
    frase:
      "Todo gran camino empieza con alguien que se atreve a dar el primer paso. Este es el tuyo.",
    cierre:
      "Te deseo muchos éxitos en esta nueva etapa con TrainMe 2. Con la experiencia que ya tienes en H2A, sé que vas a aportarle muchísimo al proyecto. Aquí me tienes para lo que necesites.",
    despedida: "Con gratitud y los mejores deseos,",
  },
  {
    slug: "sebastian-moreno",
    nombre: "Sebastián Moreno",
    primerNombre: "Sebastián",
    cargo: "Equipo H2A",
    acento: "violeta",
    palabra: "Creatividad",
    apertura:
      "Al cerrar esta etapa, quiero tomarme un momento para agradecerte. Compartir equipo contigo hizo este camino mucho más enriquecedor.",
    gracias: [
      {
        titulo: "Por la creatividad",
        texto:
          "Por tu manera de ver las cosas y por proponer siempre algo distinto. Tus ideas le dieron otra dimensión a nuestro trabajo.",
      },
      {
        titulo: "Por las conversaciones",
        texto:
          "Por cuestionar, proponer y debatir con respeto. De esas conversaciones salieron muchas de las mejores decisiones.",
      },
      {
        titulo: "Por el compromiso",
        texto:
          "Por buscar siempre la mejor versión de cada idea y no conformarte con lo suficiente.",
      },
    ],
    frase: "Las ideas se vuelven realidad cuando alguien se atreve a darles forma.",
    cierre:
      "Que todo lo que venga esté a la altura de tu talento. Sigue creando, sigue soñando en grande y no dejes de ser tú.",
    despedida: "Con gratitud,",
  },
  {
    slug: "nick-silva",
    nombre: "Nick Silva",
    primerNombre: "Nick",
    cargo: "Equipo H2A",
    acento: "turquesa",
    palabra: "Buena vibra",
    apertura:
      "Llegó el día de decir hasta luego, y no podía irme sin agradecerte por todo lo compartido.",
    gracias: [
      {
        titulo: "Por la actitud",
        texto:
          "Por la buena energía con la que enfrentas cada día. Tu actitud hizo que las jornadas fueran más llevaderas.",
      },
      {
        titulo: "Por la disposición",
        texto:
          "Por tener siempre la disposición de ayudar y sumar, sin importar el tamaño del reto.",
      },
      {
        titulo: "Por el ambiente",
        texto:
          "Por contribuir a que el equipo se sintiera cercano. Un buen ambiente de trabajo no aparece solo: lo construyen personas como tú.",
      },
    ],
    frase:
      "Un buen equipo se reconoce por cómo se siente trabajar en él. Gracias por hacerlo sentir bien.",
    cierre:
      "Te deseo muchísimos éxitos, crecimiento y momentos que te llenen de orgullo. Aquí me tienes para lo que necesites.",
    despedida: "Un abrazo grande,",
  },
  {
    slug: "katerin-herrera",
    nombre: "Katerin Herrera Mesa",
    primerNombre: "Katerin",
    cargo: "Equipo H2A",
    acento: "magenta",
    palabra: "Calidez",
    apertura:
      "Despedirse no es sencillo, sobre todo de quienes hicieron que este camino fuera tan especial. Por eso quiero empezar por lo más importante: gracias.",
    gracias: [
      {
        titulo: "Por la calidez",
        texto:
          "Por tu forma tan humana de trabajar y por la amabilidad con la que tratas a cada persona.",
      },
      {
        titulo: "Por la dedicación",
        texto:
          "Por tu atención al detalle y tu compromiso, que hacen que todo a tu alrededor funcione mejor, aunque no siempre se note.",
      },
      {
        titulo: "Por la compañía",
        texto:
          "Por cada conversación y cada gesto que hicieron más bonito el día a día en H2A.",
      },
    ],
    frase:
      "La amabilidad también es una forma de excelencia, y tú la practicas todos los días.",
    cierre:
      "Te deseo un futuro lleno de logros y de personas que te valoren tanto como lo hicimos aquí. Gracias por tanto, de corazón.",
    despedida: "Con cariño,",
  },
];

export function getCompanero(slug: string) {
  return COMPANEROS.find((c) => c.slug === slug);
}

/** Solo lo que se puede mostrar sin PIN. */
export function datosPublicos(c: Companero): DatosPublicos {
  const { slug, nombre, primerNombre, cargo, acento, palabra } = c;
  return { slug, nombre, primerNombre, cargo, acento, palabra };
}

/** El texto de la carta (se entrega solo tras validar el PIN). */
export function contenidoCarta(c: Companero): ContenidoCarta {
  const { apertura, gracias, frase, cierre, despedida } = c;
  return { apertura, gracias, frase, cierre, despedida };
}
