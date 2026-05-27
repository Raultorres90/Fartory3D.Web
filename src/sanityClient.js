import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "vw5aa9kt",
  dataset: "production",
  useCdn: true, // Esto hace que la página cargue súper rápido
  apiVersion: "2024-05-10", // La fecha de hoy para estar actualizados
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
