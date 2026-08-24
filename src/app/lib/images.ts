const APARTMENT_IMAGES: Record<string, string[]> = {
  ap1: [
    "/apartments/ap1/01.jpg",
    "/apartments/ap1/02.jpg",
    "/apartments/ap1/03.jpg",
    "/apartments/ap1/04.jpeg",
    "/apartments/ap1/05.jpg",
    "/apartments/ap1/06.jpeg",
    "/apartments/ap1/07.jpg",
    "/apartments/ap1/08.png",
  ],
  ap2: [
    "/apartments/ap2/01.jpg",
    "/apartments/ap2/02.jpg",
    "/apartments/ap2/03.jpg",
    "/apartments/ap2/04.jpg",
    "/apartments/ap2/05.jpg",
    "/apartments/ap2/06.jpg",
    "/apartments/ap2/07.jpg",
    "/apartments/ap2/08.png",
  ],
  ap3: [
    "/apartments/ap3/01.jpg",
    "/apartments/ap3/02.jpg",
    "/apartments/ap3/03.jpg",
    "/apartments/ap3/04.jpg",
    "/apartments/ap3/05.avif",
    "/apartments/ap3/06.avif",
    "/apartments/ap3/07.jpeg",
    "/apartments/ap3/08.jpg",
    "/apartments/ap3/09.png",
  ],
  ap4: [
    "/apartments/ap4/1.avif",
    "/apartments/ap4/2.avif",
    "/apartments/ap4/3.avif",
    "/apartments/ap4/4.avif",
    "/apartments/ap4/5.avif",
    "/apartments/ap4/6.avif",
    "/apartments/ap4/7.webp",
    "/apartments/ap4/8.avif",
    "/apartments/ap4/9.avif",
    "/apartments/ap4/IMG_1001.jpeg",
    "/apartments/ap4/10.png",
  ],
};

export function getApartmentImages(folder: string): string[] {
  return APARTMENT_IMAGES[folder] ?? [];
}

export { APARTMENT_IMAGES };
