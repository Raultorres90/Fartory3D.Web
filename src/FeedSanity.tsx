import { useEffect, useState } from "react";
import { client, urlFor } from "./sanityClient";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.split("v=")[1] || url.split("shorts/")[1];
  const cleanId = videoId?.split("&")[0];
  return `https://www.youtube.com/embed/${cleanId}`;
};

const FeedSanity = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "producto"] | order(_createdAt desc){
      nombre, precio, descripcion, imagenes, videoUrl, enOferta, agotado, categoria
    }`
      )
      .then((data) => setProductos(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {productos.map((prod, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300 shadow-2xl"
        >
          {/* Prioridad al Video (Shorts de TlaloCode/Fartory) */}
          {prod.videoUrl ? (
            <div className="aspect-[9/16] max-h-[500px] w-full bg-black">
              <iframe
                className="w-full h-full"
                src={getYouTubeEmbedUrl(prod.videoUrl)}
                title={prod.nombre}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            prod.imagenes && (
              <img
                src={urlFor(prod.imagenes[0]).url()}
                alt={prod.nombre}
                className="w-full h-72 object-cover"
              />
            )
          )}

          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-white">{prod.nombre}</h3>
              {prod.enOferta && (
                <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Oferta
                </span>
              )}
            </div>

            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
              {prod.descripcion}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-black text-orange-500">
                {prod.precio ? `$${prod.precio} MXN` : "Consultar"}
              </span>
              {prod.agotado ? (
                <span className="text-zinc-600 text-xs italic">Agotado</span>
              ) : (
                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-500 hover:text-white transition-colors">
                  Ver Detalles
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSanity;
