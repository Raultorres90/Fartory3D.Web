import { useState, useEffect } from "react";
import { client, urlFor } from "./sanityClient";

// Función para transformar los links de video de Sanity
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.split("v=")[1] || url.split("shorts/")[1];
  const cleanId = videoId?.split("&")[0];
  return `https://www.youtube.com/embed/${cleanId}`;
};

export default function App() {
  const [vistaActual, setVistaActual] = useState("inicio");
  const [vistaAnterior, setVistaAnterior] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [carrito, setCarrito] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);

  const [mostrarLore, setMostrarLore] = useState(false);

  // Estado y Efecto para Sanity
  const [itemsSanity, setItemsSanity] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "producto"] | order(_createdAt desc){
      _id, nombre, precio, descripcion, imagenes, videoUrl, enOferta, agotado, categoria
    }`
      )
      .then((data) => setItemsSanity(data))
      .catch(console.error);
  }, []);

  const miTelefono = "526631197438";

  // ==========================================
  // DATA: GUARDIANES ANCESTRALES
  // ==========================================
  const guardianes = [
    {
      id: "axolo",
      nombre: "Axolo-Teotl",
      titulo: "El Guardián del Jade Vivo",
      lore: "Nació donde el agua aún conservaba memoria. Pequeño. Sereno. Silencioso. Fue creado para preservar aquello que el mundo intentaba olvidar: esperanza, regeneración, continuidad. En sus manos apareció la Esfera Aqua, capaz de contener la pureza del Código. Pero sanar consume... y mientras más restauraba el mundo, más sentía el peso de aquello que intentaba destruirlo.",
      ficha: {
        material: "Resina de Alta Definición (8K)",
        altura: "22 cm con peana",
        acabado: "Efecto traslúcido en la Esfera Aqua",
        complejidad: "Alta - 32 piezas individuales",
      },
      icono: (
        <img
          src="/icono axolo.webp"
          alt="Axolo"
          className="w-20 h-20 object-contain brightness-125 contrast-125 drop-shadow-[0_0_25px_rgba(52,211,153,1)]"
        />
      ),
      color: "text-emerald-400",
      glowColor: "shadow-[0_0_40px_rgba(52,211,153,0.4)]",
      bgColor: "bg-emerald-950/20",
      borderColor: "border-emerald-500/50",
    },
    {
      id: "xolo",
      nombre: "Xolo-Mict",
      titulo: "El Guardián del Umbral",
      lore: "Emergió de las cavernas donde las almas cruzaban hacia el silencio. No guiaba muertos. Guiaba transiciones. Sabía que el equilibrio no dependía solo de vivir, sino también de saber partir. Portaba el Cetro del Umbral. Fue el primero en escuchar los susurros del Corazón Petrificado y comprendió algo aterrador: La corrupción no venía desde afuera. Venía desde dentro.",
      ficha: {
        material: "PLA+ Reforzado y Resina",
        altura: "25 cm",
        acabado: "Textura de hueso antiguo y obsidiana",
        complejidad: "Media - Diseño ergonómico sagrado",
      },
      icono: (
        <img
          src="/icono xolo.webp"
          alt="Xolo"
          className="w-20 h-20 object-contain brightness-125 contrast-125 drop-shadow-[0_0_25px_rgba(52,211,153,1)]"
        />
      ),
      color: "text-purple-400",
      glowColor: "shadow-[0_0_40px_rgba(168,85,247,0.4)]",
      bgColor: "bg-purple-950/20",
      borderColor: "border-purple-500/50",
    },
    {
      id: "ocelotl",
      nombre: "Ocelotl-Tecuani",
      titulo: "El Guardián del Sol Vigilante",
      lore: "Nació durante un eclipse. Mientras el cielo se oscurecía, el Código creó a quien custodiaría el juicio. No protegía vidas. Protegía límites. Su presencia imponía orden. Su mirada obligaba a enfrentar verdades. Portaba el Disco Solar, símbolo de vigilancia eterna. Pero incluso él guardaba un miedo: que algún día tendría que decidir entre proteger el equilibrio… o destruir aquello que ama.",
      ficha: {
        material: "Resina Tough-Industrial",
        altura: "20 cm (Posición de acecho)",
        acabado: "Pintado a mano / Detalles Neón UV",
        complejidad: "Máxima - Articulaciones ocultas",
      },
      icono: (
        <img
          src="/icono Ocelotl.webp"
          alt="Ocelotl"
          className="w-20 h-20 object-contain brightness-125 contrast-125 drop-shadow-[0_0_25px_rgba(52,211,153,1)]"
        />
      ),
      color: "text-amber-400",
      glowColor: "shadow-[0_0_40px_rgba(251,191,36,0.4)]",
      bgColor: "bg-amber-950/20",
      borderColor: "border-amber-500/50",
    },
    {
      id: "antagonista",
      nombre: "[ DATO CORRUPTO ]",
      titulo: "⚠️ ANOMALÍA DETECTADA ⚠️",
      lore: "El Corazón Petrificado ha encontrado su recipiente. Ya no son susurros. Ya no es una influencia bajo la piedra. La carne y la resina se han fusionado con el desequilibrio acumulado de milenios. El Código se está reescribiendo a la fuerza. No busca destruir el mundo... busca asimilarlo.",
      ficha: {
        material: "[ ERROR 404 ]",
        altura: "???",
        acabado: "Corrupción Sangrienta",
        complejidad: "INCALCULABLE",
      },
      icono: (
        <img
          src="/icono corazon.webp"
          alt="Anomalía"
          className="w-20 h-20 object-contain brightness-125 contrast-125 drop-shadow-[0_0_25px_rgba(52,211,153,1)]"
        />
      ),
      color: "text-red-600",
      glowColor: "shadow-[0_0_60px_rgba(220,38,38,0.7)]",
      bgColor: "bg-red-950/30",
      borderColor: "border-red-600",
    },
  ];

  const [guardianActivo, setGuardianActivo] = useState(guardianes[0]);

  // ==========================================
  // DATA: CATEGORÍAS
  // ==========================================
  const categorias = [
    {
      id: "llaveros",
      nombre: "Llaveros",
      imgCatalogo: "/Llavero2.webp",
      items: [],
    },
    { id: "figuras", nombre: "Figuras", imgCatalogo: "/Figura.webp", items: [] },
    {
      id: "lamparas",
      nombre: "Lámparas",
      imgCatalogo: "/Lampara.webp",
      items: [],
    },
    {
      id: "custom",
      nombre: "Diseños Únicos",
      imgCatalogo: "/Diseñosunicos.webp",
      items: [],
    },
    {
      id: "autopartes",
      nombre: "Autopartes",
      imgCatalogo: "/Autopartes.webp",
      items: [],
    },
    {
      id: "herramientas",
      nombre: "Herramientas y Accesorios",
      imgCatalogo: "/Herramientas y accesorios.webp",
      items: [],
    },
  ];

  // ==========================================
  // FUNCIONES DE NAVEGACIÓN Y CARRITO
  // ==========================================
  const abrirGaleria = (cat) => {
    setCategoriaSeleccionada(cat);
    setVistaActual("galeria");
  };

  const abrirProducto = (item, origen = "galeria") => {
    setProductoSeleccionado(item);
    setImagenActiva(0);
    setVistaAnterior(origen);
    setVistaActual("producto");
  };

  const agregarAlCarrito = (item) => {
    const itemId = item._id || item.id;
    const existe = carrito.find((prod) => (prod._id || prod.id) === itemId);
    if (existe) {
      setCarrito(
        carrito.map((prod) =>
          (prod._id || prod.id) === itemId
            ? { ...prod, cantidad: prod.cantidad + 1 }
            : prod
        )
      );
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };

  const enviarWhatsAppGeneral = (text) => {
    const mensajeUrl = encodeURIComponent(`¡Hola Fartory 3D! ${text}.`);
    window.open(`https://wa.me/${miTelefono}?text=${mensajeUrl}`, "_blank");
  };

  const enviarWhatsAppCarrito = () => {
    if (carrito.length === 0) return;
    let lista =
      "¡Hola Fartory 3D! Me interesa cotizar los siguientes artículos:\n\n";
    carrito.forEach((item) => {
      lista += `- ${item.cantidad}x ${item.nombre} ($${item.precio})\n`;
    });
    lista += "\n¿Me podrías confirmar disponibilidad y total?";
    const mensajeUrl = encodeURIComponent(lista);
    window.open(`https://wa.me/${miTelefono}?text=${mensajeUrl}`, "_blank");
  };

  const glowOrangeHover =
    "hover:shadow-[0_0_20px_5px_rgba(249,115,22,0.4)] transition-all duration-300";
  const glowOrangeStatic = "shadow-[0_0_15px_rgba(249,115,22,0.3)]";
  const textNeonOrange =
    "text-orange-500 [text-shadow:0_0_10px_rgba(249,115,22,0.8)]";

  const renderCarritoFlotante = () => {
    if (carrito.length === 0) return null;
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    return (
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-zinc-900/90 backdrop-blur-sm border-2 border-orange-500 rounded-2xl p-4 shadow-[0_0_20px_rgba(249,115,22,0.5)] pointer-events-auto">
          <div className="flex justify-between items-center mb-2 gap-4">
            <h4 className="text-orange-500 font-bold">
              Tu Carrito ({totalItems})
            </h4>
            <button
              onClick={() => setCarrito([])}
              className="text-xs text-zinc-600 hover:text-red-500 transition-colors"
            >
              Vaciar
            </button>
          </div>
          <ul className="text-sm text-zinc-300 mb-3 max-h-32 overflow-y-auto pr-2">
            {carrito.map((item, i) => (
              <li key={i} className="mb-1 truncate w-48">
                - {item.cantidad}x {item.nombre}
              </li>
            ))}
          </ul>
          <button
            onClick={enviarWhatsAppCarrito}
            className="w-full bg-orange-500 text-black font-black py-2 rounded-xl text-sm hover:bg-orange-400 transition-colors"
          >
            COTIZAR CARRITO
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // VISTA: DETALLES DEL PRODUCTO INDIVIDUAL
  // ==========================================
  if (vistaActual === "producto" && productoSeleccionado) {
    const item = productoSeleccionado;

    const imagenesGaleria = item.imagenes
      ? item.imagenes.map((img) => urlFor(img).url())
      : [item.img || "📦"];

    return (
      <div className="bg-black text-white min-h-screen font-sans p-6 md:p-12 relative overflow-x-hidden">
        {renderCarritoFlotante()}
        <div className="pt-20 md:pt-0 mb-10 flex flex-col items-start gap-6 relative z-10">
          <button
            onClick={() =>
              setVistaActual(
                vistaAnterior === "guardianes" ? "guardianes" : "galeria"
              )
            }
            className="hover:scale-105 transition-all duration-300"
          >
            <img
              src="/Return2.webp"
              alt="Volver"
              className="h-16 md:h-24 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            />
          </button>
          <button
            onClick={() =>
              setVistaActual(
                vistaAnterior === "guardianes" ? "guardianes" : "galeria"
              )
            }
            className="text-orange-500 hover:text-orange-300 flex items-center gap-2 font-bold uppercase text-sm tracking-wider drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]"
          >
            ← Volver a{" "}
            {vistaAnterior === "guardianes"
              ? "Guardianes"
              : categoriaSeleccionada?.nombre || "Galería"}
          </button>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div
              className={`aspect-square bg-zinc-900/80 rounded-3xl border border-zinc-800 flex items-center justify-center p-8 overflow-hidden relative ${glowOrangeStatic} transition-all duration-500`}
            >
              {typeof imagenesGaleria[imagenActiva] === "string" &&
              (imagenesGaleria[imagenActiva].startsWith("/") ||
                imagenesGaleria[imagenActiva].startsWith("http")) ? (
                <img
                  src={imagenesGaleria[imagenActiva]}
                  alt={item.nombre}
                  className="w-full h-full object-contain animate-[fadeIn_0.3s_ease-in-out]"
                />
              ) : (
                <div className="text-[12rem] animate-[fadeIn_0.3s_ease-in-out]">
                  {imagenesGaleria[imagenActiva]}
                </div>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {imagenesGaleria.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImagenActiva(index)}
                  className={`w-24 h-24 shrink-0 rounded-2xl border-2 flex items-center justify-center overflow-hidden bg-zinc-800/50 transition-all duration-300 ${
                    imagenActiva === index
                      ? "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] scale-105"
                      : "border-zinc-800 hover:border-zinc-500"
                  }`}
                >
                  {typeof img === "string" &&
                  (img.startsWith("/") || img.startsWith("http")) ? (
                    <img
                      src={img}
                      alt="Miniatura"
                      className="w-full h-full object-cover opacity-80 hover:opacity-100"
                    />
                  ) : (
                    <div className="text-4xl">{img}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex gap-3 mb-4">
              {item.enOferta && (
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                  OFERTA ESPECIAL
                </span>
              )}
              {item.agotado && (
                <span className="bg-zinc-700 text-zinc-300 px-4 py-1 rounded-full text-sm font-black uppercase tracking-wider">
                  AGOTADO
                </span>
              )}
            </div>
            <h2
              className={`text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter ${textNeonOrange}`}
            >
              {item.nombre}
            </h2>
            <p className="text-4xl text-zinc-200 font-black mb-8 border-b border-zinc-800 pb-8">
              {item.precio === "Cotizar" ? "Cotizar" : `$${item.precio} MXN`}
            </p>
            <div className="bg-zinc-900/40 p-8 rounded-[2rem] border border-zinc-800 mb-10 backdrop-blur-sm">
              <h4 className="text-orange-500 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                <span>📝</span> Descripción del producto
              </h4>
              <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                {item.descripcion}
              </p>
            </div>
            {item.agotado ? (
              <button
                disabled
                className={`w-full bg-zinc-800 text-zinc-500 font-black px-10 py-6 rounded-2xl text-xl uppercase tracking-wider cursor-not-allowed flex justify-center items-center gap-4`}
              >
                PRODUCTO AGOTADO <span className="text-2xl">🚫</span>
              </button>
            ) : (
              <button
                onClick={() => agregarAlCarrito(item)}
                className={`w-full bg-orange-500 text-black font-black px-10 py-6 rounded-2xl text-xl uppercase tracking-wider transition-all duration-300 hover:bg-orange-400 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.7)] flex justify-center items-center gap-4`}
              >
                AGREGAR AL CARRITO <span className="text-2xl">🛒</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA: GALERÍA DE CATEGORÍA
  // ==========================================
  if (vistaActual === "galeria" && categoriaSeleccionada) {
    const productosSanityFiltrados = itemsSanity.filter(
      (s) => s.categoria === categoriaSeleccionada.id && !s.videoUrl
    );

    const todosLosProductos = [
      ...(categoriaSeleccionada.items || []),
      ...productosSanityFiltrados,
    ];

    return (
      <div className="bg-black text-white min-h-screen font-sans p-6 relative">
        {renderCarritoFlotante()}
        <div className="flex flex-col items-start gap-6 mb-10 pt-20 md:pt-0">
          <button
            onClick={() => setVistaActual("inicio")}
            className="hover:scale-105 transition-all duration-300"
          >
            <img
              src="/Return2.webp"
              alt="Volver al Inicio"
              className="h-16 md:h-24 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            />
          </button>
          <button
            onClick={() => setVistaActual("catalogo")}
            className="text-orange-500 hover:text-orange-300 flex items-center gap-2 font-bold uppercase text-sm tracking-wider"
          >
            ← Volver a Categorías
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          <h1
            className={`text-4xl md:text-7xl font-black mb-16 uppercase italic flex items-center gap-6 ${textNeonOrange}`}
          >
            <img
              src={categoriaSeleccionada.imgCatalogo}
              alt=""
              className="h-32 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            />
            {categoriaSeleccionada.nombre}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {todosLosProductos.length > 0 ? (
              todosLosProductos.map((item, index) => (
                <div
                  key={item._id || item.id || index}
                  className={`group bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-zinc-800 hover:border-orange-500 ${glowOrangeHover} backdrop-blur-sm flex flex-col relative`}
                >
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {item.enOferta && (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                        Oferta
                      </span>
                    )}
                    {item.agotado && (
                      <span className="bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg border border-zinc-600">
                        Agotado
                      </span>
                    )}
                  </div>
                  <div
                    className="h-72 bg-zinc-800/50 flex items-center justify-center overflow-hidden relative cursor-pointer"
                    onClick={() => abrirProducto(item, "galeria")}
                  >
                    {item.imagenes ? (
                      <img
                        src={urlFor(item.imagenes[0]).url()}
                        alt={item.nombre}
                        className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
                          item.agotado
                            ? "grayscale opacity-50"
                            : "group-hover:scale-110"
                        }`}
                      />
                    ) : typeof item.img === "string" &&
                      item.img.startsWith("/") ? (
                      <img
                        src={item.img}
                        alt={item.nombre}
                        className={`w-full h-full object-contain p-4 transition-transform duration-500 ${
                          item.agotado
                            ? "grayscale opacity-50"
                            : "group-hover:scale-110"
                        }`}
                      />
                    ) : (
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                        {item.img || "📦"}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="bg-orange-500 text-black px-4 py-2 rounded-full font-bold uppercase text-sm">
                        Ver detalles
                      </span>
                    </div>
                  </div>
                  <div className="p-8 bg-zinc-900 relative z-10 flex flex-col flex-grow">
                    <h3 className="text-3xl font-black mb-1 group-hover:text-orange-400">
                      {item.nombre}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-4 h-10 line-clamp-2">
                      {item.descripcion}
                    </p>
                    <div className="flex justify-between items-center border-t border-zinc-800 pt-5 mt-auto gap-2">
                      <span
                        className={`font-bold text-2xl whitespace-nowrap ${
                          item.agotado ? "text-zinc-500" : "text-orange-500"
                        }`}
                      >
                        {item.precio === "Cotizar"
                          ? "Cotizar"
                          : `$${item.precio}`}
                      </span>
                      {item.agotado ? (
                        <button
                          disabled
                          className="text-sm bg-zinc-800 border border-zinc-600 text-zinc-500 px-5 py-3 rounded-xl font-black uppercase cursor-not-allowed whitespace-nowrap"
                        >
                          AGOTADO
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            agregarAlCarrito(item);
                          }}
                          className={`text-sm bg-zinc-800 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-5 py-3 rounded-xl font-black uppercase transition-colors whitespace-nowrap ${glowOrangeStatic}`}
                        >
                          + AGREGAR
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-[3rem]">
                <span className="text-7xl mb-4 opacity-50 grayscale">🖨️</span>
                <h3 className="text-2xl font-black uppercase tracking-widest text-zinc-400">
                  Próximamente
                </h3>
                <p className="mt-2 text-zinc-600 text-center max-w-md">
                  Aún no se han cargado productos en esta categoría. Visítanos
                  más tarde para ver nuestras nuevas impresiones.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA: CATÁLOGO
  // ==========================================
  if (vistaActual === "catalogo") {
    return (
      <div className="bg-black text-white min-h-screen font-sans p-6 md:p-12 relative">
        {renderCarritoFlotante()}
        <div className="pt-20 md:pt-0 mb-10 block">
          <button
            onClick={() => setVistaActual("inicio")}
            className="hover:scale-105 transition-all duration-300"
          >
            <img
              src="/Return2.webp"
              alt="Volver al Inicio"
              className="h-16 md:h-24 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            />
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          <h1
            className={`text-6xl md:text-8xl font-black mb-16 uppercase ${textNeonOrange}`}
          >
            CATÁLOGO
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categorias.map((cat, index) => (
              <div
                key={index}
                onClick={() => abrirGaleria(cat)}
                className={`group bg-zinc-900 border border-zinc-800 p-12 rounded-[3rem] hover:border-orange-500 ${glowOrangeHover} cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                  <img
                    src={cat.imgCatalogo}
                    alt=""
                    className="w-full h-full object-contain grayscale"
                  />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="h-48 mb-8 w-full group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-300 flex justify-center">
                    <img
                      src={cat.imgCatalogo}
                      alt={cat.nombre}
                      className="h-full object-contain"
                    />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter group-hover:text-orange-400">
                    {cat.nombre}
                  </h3>
                  <p className="text-orange-500 mt-4 font-bold italic">
                    Explorar modelos →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA: GUARDIANES
  // ==========================================
  if (vistaActual === "guardianes") {
    const g = guardianActivo;
    const esAntagonista = g.id === "antagonista";

    const buscarFiguraEnSanity = () => {
      const productoSanity = itemsSanity.find(
        (p) =>
          p.nombre && p.nombre.toLowerCase().includes(g.nombre.toLowerCase())
      );

      if (productoSanity) {
        abrirProducto(productoSanity, "guardianes");
      } else {
        alert(
          `La figura de ${g.nombre} pronto estará disponible en el catálogo de Sanity.`
        );
      }
    };

    return (
      <div
        className={`${
          esAntagonista ? "bg-black" : "bg-zinc-950"
        } text-white min-h-screen font-sans p-6 md:p-12 relative overflow-x-hidden transition-colors duration-700`}
      >
        <style>{`
          @keyframes glitchAnim {
            0% { transform: translate(0) skew(0deg); }
            20% { transform: translate(-4px, 3px) skew(-5deg); color: #ef4444; text-shadow: 2px 2px #000; }
            40% { transform: translate(4px, -3px) skew(5deg); color: #fff; text-shadow: -2px -2px #ef4444; }
            60% { transform: translate(-2px, 4px) skew(-2deg); color: #991b1b; }
            80% { transform: translate(3px, -2px) skew(2deg); color: #ef4444; }
            100% { transform: translate(0) skew(0deg); }
          }
          
          @keyframes lightning {
            0% { opacity: 0; box-shadow: none; }
            5% { opacity: 1; box-shadow: 0 0 40px 10px rgba(239, 68, 68, 0.8), inset 0 0 20px rgba(239, 68, 68, 0.8); }
            10% { opacity: 0; box-shadow: none; }
            15% { opacity: 1; box-shadow: 0 0 60px 15px rgba(220, 38, 38, 1), inset 0 0 30px rgba(220, 38, 38, 1); }
            20% { opacity: 0; box-shadow: none; }
            100% { opacity: 0; box-shadow: none; }
          }

          .glitch-hover { position: relative; overflow: visible; }
          .glitch-hover:hover {
            animation: glitchAnim 0.1s infinite !important;
            border-color: #ef4444 !important;
            background-color: rgba(100, 0, 0, 0.4) !important;
            z-index: 50;
          }
          .glitch-hover:hover::before, .glitch-hover:hover::after {
            content: ''; position: absolute; background: transparent; z-index: -1; pointer-events: none; animation: lightning 1.5s infinite;
          }
          .glitch-hover:hover::before {
            top: -20px; bottom: -20px; left: 10px; right: 10px; border-left: 2px solid rgba(239, 68, 68, 0.5); border-right: 2px solid rgba(239, 68, 68, 0.5); border-radius: 10px;
          }
          .glitch-hover:hover::after {
            top: 10px; bottom: 10px; left: -20px; right: -20px; border-top: 2px solid rgba(239, 68, 68, 0.5); border-bottom: 2px solid rgba(239, 68, 68, 0.5); border-radius: 10px;
          }

          @keyframes latido {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 30px rgba(220,38,38,0.8)); }
          }
          .animate-latido { animation: latido 1s infinite; }
        `}</style>

        {renderCarritoFlotante()}

        {/* ========================================== */}
        {/* MODAL DE HISTORIA COMPLETA (PERGAMINO) */}
        {/* ========================================== */}
        {mostrarLore && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto pt-4 pb-20 px-4 md:px-10">
            <button
              onClick={() => setMostrarLore(false)}
              className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] bg-zinc-900 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl md:text-4xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.5)]"
            >
              &times;
            </button>
            <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 p-6 md:p-16 rounded-[2rem] relative shadow-[0_0_50px_rgba(249,115,22,0.15)] mt-16 md:mt-10 mb-10">
              <h2
                className={`text-3xl md:text-5xl font-black mb-10 text-center uppercase tracking-widest ${textNeonOrange}`}
              >
                GUARDIANES ANCESTRALES
                <br />
                <span className="text-2xl md:text-4xl block mt-4 text-white">
                  CAPÍTULO I — EL CÓDIGO QUE RESPIRA
                </span>
              </h2>
              <div className="space-y-10 text-zinc-300 text-base md:text-lg leading-relaxed font-serif">
                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    I. Antes del Tiempo
                  </h3>
                  <p>
                    Antes de los hombres.
                    <br />
                    Antes de las ciudades.
                    <br />
                    Antes de los nombres.
                  </p>
                  <p className="mt-4">
                    El mundo existía suspendido en un equilibrio silencioso.
                    <br />
                    No había guerra entre la vida y la muerte, porque ambas
                    obedecían algo más antiguo:
                    <br />
                    <strong className="text-orange-400">El Código.</strong>
                  </p>
                  <p className="mt-4">
                    No era una ley escrita.
                    <br />
                    No pertenecía a dioses ni criaturas.
                    <br />
                    Era una fuerza invisible que mantenía todo en armonía:
                  </p>
                  <ul className="mt-4 ml-6 list-disc text-zinc-400">
                    <li>el agua sabía cuándo fluir</li>
                    <li>la tierra cuándo abrirse</li>
                    <li>el alma cuándo partir</li>
                    <li>el corazón cuándo resistir</li>
                  </ul>
                  <p className="mt-4">
                    Y mientras el Código permaneciera intacto, el mundo
                    continuaría respirando.
                    <br />
                    Pero incluso el equilibrio puede desgastarse.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    II. El Primer Latido
                  </h3>
                  <p>
                    En una era olvidada, una civilización descubrió fragmentos
                    del Código.
                    <br />
                    No podían comprenderlo… pero sí sentirlo.
                  </p>
                  <p className="mt-4">
                    Construyeron templos alrededor de lagos donde el agua
                    parecía recordar el pasado.
                    <br />
                    Excavaron cavernas donde las voces de los muertos aún
                    susurraban.
                    <br />
                    Observaron eclipses donde el cielo parecía partirse en dos.
                  </p>
                  <p className="mt-4">
                    Y fue entonces cuando encontraron algo imposible.
                    <br />
                    Un corazón.
                    <br />
                    No humano. No divino.
                    <br />
                    Un objeto petrificado que parecía seguir latiendo bajo la
                    piedra.
                  </p>
                  <p className="mt-4 font-bold text-white text-xl">
                    Lo llamaron: El Corazón Petrificado
                  </p>
                  <p className="mt-4">
                    Al acercarse a él, escuchaban pensamientos que no eran
                    propios.
                    <br />
                    Deseos que nunca habían tenido.
                    <br />
                    Rencores enterrados.
                  </p>
                  <p className="mt-4">
                    El Corazón no prometía poder. Prometía algo peor:
                    <br />
                    <strong className="text-red-500">Comprensión.</strong>
                    <br />
                    Les mostraba sus miedos más profundos… y luego les ofrecía
                    alivio.
                  </p>
                  <p className="mt-4">
                    Poco a poco, la civilización comenzó a cambiar.
                    <br />
                    Los sabios se volvieron paranoicos. Los protectores
                    violentos. Los líderes desconfiados.
                  </p>
                  <p className="mt-4">
                    No había monstruos. No había invasiones.
                    <br />
                    Solo corazones endureciéndose lentamente.
                    <br />
                    Hasta que el equilibrio comenzó a romperse.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    III. El Nacimiento de los Guardianes
                  </h3>
                  <p>
                    El Código respondió.
                    <br />
                    No con castigo. Con protección.
                  </p>
                  <p className="mt-4">
                    De las profundidades del mundo emergieron tres entidades
                    destinadas a custodiar el equilibrio.
                    <br />
                    No eran dioses. No eran héroes.
                    <br />
                    Eran fragmentos vivientes del propio Código.
                  </p>

                  <div className="mt-8 p-6 border-l-2 border-emerald-500 bg-emerald-950/10 rounded-r-2xl">
                    <h4 className="text-emerald-400 font-bold text-xl mb-2">
                      💧 AXOLO-TEOTL - El Guardián del Jade Vivo
                    </h4>
                    <p>
                      Nació donde el agua aún conservaba memoria.
                      <br />
                      Pequeño. Sereno. Silencioso.
                    </p>
                    <p className="mt-2">
                      Axolo-Teotl fue creado para preservar aquello que el mundo
                      intentaba olvidar: esperanza, regeneración, continuidad.
                      <br />
                      En sus manos apareció la Esfera Aqua, una esfera líquida
                      capaz de contener la pureza del Código.
                    </p>
                    <p className="mt-2">
                      Donde la corrupción avanzaba, él restauraba.
                      <br />
                      Pero sanar consume.
                      <br />Y mientras más restauraba el mundo… más sentía el
                      peso de aquello que intentaba destruirlo.
                    </p>
                  </div>

                  <div className="mt-6 p-6 border-l-2 border-purple-500 bg-purple-950/10 rounded-r-2xl">
                    <h4 className="text-purple-400 font-bold text-xl mb-2">
                      🐕‍🦺 XOLO-MICT - El Guardián del Umbral
                    </h4>
                    <p>
                      Emergió de las cavernas donde las almas cruzaban hacia el
                      silencio.
                      <br />
                      No guiaba muertos. Guiaba transiciones.
                    </p>
                    <p className="mt-2">
                      Sabía que el equilibrio no dependía solo de vivir… sino
                      también de saber partir.
                      <br />
                      Portaba el Cetro del Umbral, un artefacto capaz de sentir
                      fracturas entre mundos.
                    </p>
                    <p className="mt-2">
                      Fue el primero en escuchar los susurros del Corazón
                      Petrificado.
                      <br />Y comprendió algo aterrador: La corrupción no venía
                      desde afuera. Venía desde dentro.
                    </p>
                  </div>

                  <div className="mt-6 p-6 border-l-2 border-amber-500 bg-amber-950/10 rounded-r-2xl">
                    <h4 className="text-amber-400 font-bold text-xl mb-2">
                      🐆 OCELOTL-TECUANI - El Guardián del Sol Vigilante
                    </h4>
                    <p>
                      Nació durante un eclipse.
                      <br />
                      Mientras el cielo se oscurecía, el Código creó a quien
                      custodiaría el juicio.
                    </p>
                    <p className="mt-2">
                      Ocelotl-Tecuani no protegía vidas. Protegía límites.
                      <br />
                      Su presencia imponía orden. Su mirada obligaba a enfrentar
                      verdades.
                      <br />
                      Portaba el Disco Solar, símbolo de vigilancia eterna.
                    </p>
                    <p className="mt-2">
                      Pero incluso él guardaba un miedo: que algún día tendría
                      que decidir entre proteger el equilibrio… o destruir
                      aquello que ama para conservarlo.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    IV. La Guerra Que Nunca Ocurrió
                  </h3>
                  <p>
                    Los guardianes no derrotaron al Corazón Petrificado.
                    <br />
                    Porque el Corazón no podía ser destruido.
                  </p>
                  <p className="mt-4">
                    Intentaron sellarlo.
                    <br />
                    Bajo templos. Bajo agua. Bajo piedra.
                    <br />
                    Nada funcionó.
                  </p>
                  <p className="mt-4">
                    Finalmente comprendieron la verdad: El Corazón existe porque
                    el desequilibrio existe.
                    <br />
                    No era un enemigo. Era una consecuencia.
                  </p>
                  <p className="mt-4">
                    Entonces hicieron lo único posible.
                    <br />
                    Lo encerraron dentro de un santuario oculto, lejos del
                    mundo, protegido por símbolos y pactos ancestrales.
                  </p>
                  <p className="mt-4">
                    Y durante siglos… el equilibrio regresó.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    V. El Silencio Antes de la Ruptura
                  </h3>
                  <p>
                    Las civilizaciones desaparecieron. Los templos quedaron
                    enterrados. Las historias se volvieron mitos.
                    <br />
                    Pero el Código seguía vivo.
                    <br />
                    Dormido. Esperando.
                  </p>
                  <p className="mt-4">
                    Los guardianes permanecieron ocultos:
                    <br />
                    observando, restaurando pequeñas fracturas, evitando que el
                    mundo recordara demasiado.
                  </p>
                  <p className="mt-4">Hasta que algo cambió.</p>
                  <p className="mt-4">
                    No fue una guerra. Ni un desastre.
                    <br />
                    Fue un pensamiento.
                  </p>
                  <p className="mt-4">
                    Una grieta invisible apareció sobre la Esfera Aqua de
                    Axolo-Teotl.
                    <br />
                    Xolo-Mict comenzó a escuchar almas que no deberían existir.
                    <br />Y Ocelotl-Tecuani empezó a sentir ira… sin razón.
                  </p>
                  <p className="mt-4 font-bold">
                    El sello se debilitaba. El Corazón Petrificado estaba
                    despertando.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    VI. La Verdadera Amenaza
                  </h3>
                  <p>
                    El antagonista aún no tiene forma.
                    <br />
                    Porque aún no ha terminado de despertar.
                  </p>
                  <p className="mt-4">
                    El Corazón no necesita cuerpo. Necesita voluntad.
                    <br />
                    Cada duda. Cada resentimiento. Cada pérdida.
                    <br />
                    Lo alimenta.
                  </p>
                  <p className="mt-4">
                    Y mientras los guardianes intentan proteger el equilibrio,
                    el Corazón trabaja lentamente sobre ellos:
                    <br />
                    sembrando miedo, endureciendo emociones, debilitando su
                    propósito.
                  </p>
                  <p className="mt-4">
                    El verdadero horror no es que el mundo sea destruido.
                    <br />
                    Es que deje de querer salvarse.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    VII. El Código Se Está Rompiendo
                  </h3>
                  <p>
                    Axolo-Teotl comienza a preguntarse si sanar tiene sentido.
                    <br />
                    Xolo-Mict escucha voces que intentan cruzar desde lugares
                    prohibidos.
                    <br />Y Ocelotl-Tecuani siente impulsos violentos que nunca
                    había conocido.
                  </p>
                  <p className="mt-4">
                    Por primera vez… los guardianes dudan.
                    <br />Y el Código puede sentirlo.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-4 font-sans tracking-widest text-orange-500">
                    VIII. Lo Que Viene
                  </h3>
                  <p>
                    La historia apenas comienza.
                    <br />
                    Porque el antagonista aún no ha aparecido realmente.
                  </p>
                  <p className="mt-4">
                    Hasta ahora: solo ha sido un susurro, una influencia, un
                    latido bajo piedra.
                    <br />
                    Pero llegará el día en que el Corazón encuentre un
                    recipiente.
                  </p>
                  <p className="mt-4 font-bold text-red-500">
                    Y cuando eso ocurra… ya no intentará corromper guardianes.
                    <br />
                    Intentará reescribir el Código mismo.
                  </p>

                  <div className="mt-16 text-center border-y border-zinc-800 py-10 bg-zinc-900/30 rounded-3xl shadow-inner">
                    <p className="text-orange-500 font-bold uppercase tracking-widest mb-6">
                      CAPÍTULO I TERMINA CON UNA ADVERTENCIA:
                    </p>
                    <p className="text-2xl md:text-3xl text-white italic">
                      "El equilibrio no muere cuando la oscuridad avanza…
                      <br />
                      <br />
                      muere cuando quienes lo protegen comienzan a rendirse."
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-center pb-8">
                <button
                  onClick={() => setMostrarLore(false)}
                  className="bg-zinc-900 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-black px-8 py-4 md:px-12 md:py-5 rounded-2xl text-lg md:text-xl transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                  ← Regresar a los Guardianes
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full ${g.bgColor} blur-[150px] pointer-events-none transition-colors duration-1000`}
        ></div>

        <div className="relative z-10 pt-20 md:pt-0 mb-12">
          <button
            onClick={() => setVistaActual("inicio")}
            className="hover:scale-105 transition-all duration-300"
          >
            <img
              src="/Return2.webp"
              alt="Volver"
              className="h-16 md:h-24 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.4)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.8)]"
            />
          </button>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
          <div className="w-full lg:w-1/4 flex flex-col gap-4">
            <div
              className={`mb-6 relative rounded-2xl overflow-hidden border ${
                esAntagonista ? "border-red-800" : "border-zinc-800"
              } transition-colors duration-700`}
            >
              <div
                className={`absolute inset-0 opacity-50 ${
                  esAntagonista
                    ? "bg-gradient-to-r from-red-950 to-black"
                    : "bg-gradient-to-r from-zinc-800 to-black"
                }`}
              ></div>
              <div className="relative p-4 flex items-center justify-between">
                <div
                  className={`w-1 h-8 rounded-full ${
                    esAntagonista
                      ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"
                      : "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                  }`}
                ></div>
                <h3
                  className={`font-black text-sm md:text-base uppercase tracking-[0.4em] text-center w-full ${
                    esAntagonista
                      ? "text-red-500 [text-shadow:0_0_10px_rgba(239,68,68,0.5)]"
                      : "text-zinc-300 [text-shadow:0_0_10px_rgba(255,255,255,0.2)]"
                  }`}
                >
                  GUARDIANES
                </h3>
                <div
                  className={`w-1 h-8 rounded-full ${
                    esAntagonista
                      ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse"
                      : "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                  }`}
                ></div>
              </div>
            </div>

            {guardianes.map((item) => (
              <button
                key={item.id}
                onClick={() => setGuardianActivo(item)}
                className={`p-6 rounded-2xl border transition-all duration-500 text-left flex items-center gap-4 group
                ${
                  g.id === item.id && item.id !== "antagonista"
                    ? `bg-white/5 ${item.borderColor} ${item.glowColor} translate-x-2`
                    : ""
                }
                ${
                  g.id === item.id && item.id === "antagonista"
                    ? `bg-red-950/40 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)] translate-x-2`
                    : ""
                }
                ${
                  g.id !== item.id
                    ? "bg-black/20 border-zinc-900 hover:border-zinc-700"
                    : ""
                }
                ${
                  item.id === "antagonista" && g.id !== "antagonista"
                    ? "glitch-hover border-red-900/20 opacity-60"
                    : ""
                }
                `}
              >
                <div
                  className={`text-4xl transition-transform group-hover:scale-110 ${
                    g.id === item.id ? item.color : "opacity-40"
                  }`}
                >
                  {item.icono}
                </div>
                <span
                  className={`font-black uppercase tracking-tighter ${
                    g.id === item.id ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {item.nombre}
                </span>
              </button>
            ))}

            <div className="mt-8 border-t border-zinc-800 pt-8">
              <button
                onClick={() => setMostrarLore(true)}
                className="w-full p-6 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-zinc-300 hover:text-white transition-all flex flex-col items-center gap-3 group shadow-[0_0_15px_rgba(249,115,22,0.1)]"
              >
                <img
                  src="/pergamino.webp"
                  alt="Pergamino"
                  className="w-16 h-28 object-contain brightness-125 contrast-125 saturate-125 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] group-hover:scale-110 transition-all duration-300"
                />
                <span className="font-bold uppercase tracking-widest text-xs text-center text-orange-500">
                  Leer Capítulo I:
                  <br />
                  El Código Que Respira
                </span>
              </button>
            </div>
          </div>

          <div
            className={`w-full lg:w-3/4 rounded-[3rem] border p-8 md:p-16 transition-all duration-1000 backdrop-blur-md bg-black/40 ${
              g.borderColor
            } ${g.glowColor} ${
              esAntagonista
                ? "border-red-600/80 shadow-[inset_0_0_50px_rgba(220,38,38,0.1)]"
                : "border-zinc-800"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div
                  className={`aspect-square w-full rounded-full border flex items-center justify-center text-[8rem] md:text-[10rem] mb-8 transition-transform duration-500 ${
                    esAntagonista
                      ? "bg-black border-red-800 shadow-[inset_0_0_50px_rgba(220,38,38,0.4)] animate-latido"
                      : "bg-zinc-900/50 border-emerald-800 hover:scale-105 shadow-inner"
                  }`}
                >
                  <div className="scale-[3] md:scale-[4]">{g.icono}</div>
                </div>

                {/* BOTÓN CONECTADO A SANITY - ESTÉTICA MEJORADA */}
                {esAntagonista ? (
                  <button className="w-full bg-red-800 text-black font-black py-4 px-2 rounded-2xl tracking-widest uppercase cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse text-xs md:text-sm">
                    DESPERTARÁ PRONTO
                  </button>
                ) : (
                  <button
                    onClick={buscarFiguraEnSanity}
                    className="w-full bg-white text-black font-black py-4 px-2 rounded-2xl tracking-widest uppercase hover:bg-orange-500 transition-colors shadow-xl text-xs md:text-sm flex items-center justify-center gap-2"
                  >
                    VER EN CATÁLOGO
                  </button>
                )}
              </div>

              <div className="w-full md:w-2/3">
                <h2
                  className={`text-5xl md:text-7xl font-black mb-2 tracking-tighter italic ${
                    g.color
                  } ${
                    esAntagonista
                      ? "[text-shadow:0_0_20px_rgba(220,38,38,0.8)]"
                      : ""
                  }`}
                >
                  {g.nombre}
                </h2>
                <h3
                  className={`text-xl font-bold uppercase tracking-widest mb-10 ${
                    esAntagonista
                      ? "text-red-500 animate-pulse"
                      : "text-zinc-400"
                  }`}
                >
                  {g.titulo}
                </h3>

                <div className="mb-10">
                  <h4
                    className={`font-black text-xs uppercase tracking-widest mb-4 border-l-2 pl-3 ${
                      esAntagonista
                        ? "border-red-600 text-red-800"
                        : "border-orange-500 text-zinc-500"
                    }`}
                  >
                    {esAntagonista ? "ADVERTENCIA DE SISTEMA" : "El Mito"}
                  </h4>
                  <p
                    className={`text-xl leading-relaxed italic font-serif ${
                      esAntagonista ? "text-red-200" : "text-zinc-300"
                    }`}
                  >
                    "{g.lore}"
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-3xl border ${
                    esAntagonista
                      ? "bg-red-950/20 border-red-900/50"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                  {Object.entries(g.ficha).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span
                        className={`text-[10px] uppercase font-bold mb-1 ${
                          esAntagonista ? "text-red-800" : "text-zinc-500"
                        }`}
                      >
                        {key}
                      </span>
                      <span
                        className={`font-bold ${
                          esAntagonista
                            ? "text-red-500 font-mono"
                            : "text-white"
                        }`}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA: INICIO (PRINCIPAL)
  // ==========================================
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden relative">
      {renderCarritoFlotante()}

      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-950/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div
          className={`bg-zinc-900 border border-orange-500/30 rounded-3xl p-10 mb-12 relative z-10 ${glowOrangeStatic}`}
        >
          <img
            src="/Logo.webp"
            alt="Fartory 3D Logo"
            className="w-72 md:w-[30rem] mx-auto object-contain drop-shadow-[0_0_35px_rgba(249,115,22,0.7)]"
          />
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center w-full max-w-5xl relative z-10">
          <button
            onClick={() => setVistaActual("catalogo")}
            className={`w-full md:w-auto bg-orange-500 text-black font-black px-12 py-6 rounded-2xl text-xl transition-all duration-300 ${glowOrangeHover} ${glowOrangeStatic}`}
          >
            VER CATÁLOGO
          </button>
          <button
            onClick={() =>
              enviarWhatsAppGeneral(
                "Me interesa cotizar un diseño personalizado"
              )
            }
            className={`w-full md:w-auto border-2 border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-white font-bold px-12 py-6 rounded-2xl text-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
          >
            COTIZAR DISEÑO
          </button>
          <button
            onClick={() => setVistaActual("guardianes")}
            className={`w-full md:w-auto bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-orange-500 hover:text-white font-bold px-12 py-6 rounded-2xl text-xl flex items-center justify-center gap-3 transition-all duration-300 ${glowOrangeHover}`}
          >
            <div className="flex items-center gap-3">
              <img
                src="/icono tlalocode.webp"
                alt="Guardianes"
                className="w-16 h-16 object-contain"
              />
              <span>GUARDIANES ANCESTRALES</span>
            </div>
          </button>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-6xl font-black mb-4 uppercase italic ${textNeonOrange}`}
          >
            CREACIÓN EN ACCIÓN
          </h2>
          <p className="text-zinc-400 text-lg">
            Mira cómo materializamos las ideas, capa por capa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {itemsSanity.filter((item) => item.videoUrl).length > 0 ? (
            itemsSanity
              .filter((item) => item.videoUrl)
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-orange-500 transition-all duration-300 ${glowOrangeHover}`}
                >
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      className="w-full h-full border-none"
                      src={getYouTubeEmbedUrl(item.videoUrl)}
                      title={item.nombre}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {item.nombre}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-orange-500 font-bold">
                        {item.precio ? `$${item.precio} MXN` : "Cotizar"}
                      </span>
                      {item.enOferta && (
                        <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-full uppercase font-black">
                          Oferta
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        enviarWhatsAppGeneral(`Me interesa: ${item.nombre}`)
                      }
                      className="w-full bg-zinc-800 border border-zinc-700 py-3 rounded-xl text-sm font-bold text-zinc-300 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-colors"
                    >
                      MÁS INFO
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div
              className={`aspect-[9/16] bg-zinc-900/50 rounded-3xl border border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:border-orange-500 transition-all duration-300 cursor-pointer ${glowOrangeHover} col-span-full`}
            >
              <span className="text-6xl mb-4 text-orange-500/50 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                🎥
              </span>
              <p className="font-bold text-zinc-300">Cargando Novedades...</p>
              <p className="text-sm text-zinc-500 mt-2">
                Sube tu primer video en Sanity
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/Fartory3D.webp"
              alt="Fartory 3D Logo"
              className="h-80 md:h-[28rem] object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]"
            />
            <p className="text-zinc-500 mt-8 max-w-xs md:max-w-md text-lg">
              Impresión 3D creativa, diseño de personajes y refacciones
              funcionales.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
              Síguenos
            </h4>
            <div className="flex gap-6">
  {/* Instagram o Red 1 */}
  <a
    href="https://instagram.com/tu-usuario" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-400 hover:text-orange-500 transition-colors drop-shadow-[0_0_5px_rgba(249,115,22,0)] hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
  >
    <img 
      src="https://cdn-icons-png.flaticon.com/512/4096/4096260.png" 
      alt="Instagram" 
      className="w-8 h-8" 
    />
  </a>
  
  {/* Tu TikTok */}
 <a
    href="https://www.tiktok.com/@fartory.3d" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-400 hover:text-orange-500 transition-colors drop-shadow-[0_0_5px_rgba(249,115,22,0)] hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
  >
    <img 
      src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" 
      alt="TikTok" 
      className="w-8 h-8" 
    />
  </a>
</div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
              Contacto
            </h4>
            <button
              onClick={() =>
                enviarWhatsAppGeneral("Hola, me gustaría más información")
              }
              className="text-zinc-400 hover:text-orange-500 transition-colors font-bold"
            >
              +52 663 119 74 38
            </button>
            <p className="text-zinc-600 text-sm mt-4">
              © 2026 Fartory 3D. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
