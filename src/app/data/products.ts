export type Product = {
  slug: string;
  name: string;
  type: string;
  price: number; // in Iraqi Dinar
  shortDescription: string;
  details: string;
  featured?: boolean;
  image: string; // image path in /public
};

export const products: Product[] = [
  {
    slug: "bedroom-set",
    name: "غرفة نوم تركية كاملة",
    type: "غرف نوم",
    price: 2150000,
    shortDescription: "سرير مع خزانه و كومودين و مرآة بتصميم خشبي راقي.",
    details:
      "يمكن إضافة تفاصيل أكثر هنا مثل نوع الخشب، القياسات، والألوان المتوفرة.",
    featured: true,
    image: "/products/bedroom-set.jpg",
  },
  {
    slug: "corner-sofa",
    name: "طقم كنب زاوية",
    type: "غرف جلوس",
    price: 1350000,
    shortDescription:
      "زاوية مريحة مع قماش عملي يناسب الاستخدام اليومي في غرفة الجلوس.",
    details: "تفاصيل عن نوع القماش، الألوان المتوفرة، وسهولة التنظيف.",
    featured: true,
    image: "/products/corner-sofa.jpg",
  },
  {
    slug: "dining-6-chairs",
    name: "سفرة 6 كراسي",
    type: "سفرة و طاولات",
    price: 1100000,
    shortDescription:
      "طاولة طعام مع 6 كراسي بتصميم معدني/خشبي متين مناسب للعائلة.",
    details: "قياس الطاولة، نوع الخشب، وقابلية التفكيك والنقل.",
    featured: true,
    image: "/products/dining-6-chairs.jpg",
  },
  {
    slug: "kids-room-shared",
    name: "غرفة أطفال مشتركة",
    type: "غرف أطفال",
    price: 1650000,
    shortDescription:
      "سريران مع خزانه و مكتب دراسة، مناسب لغرفة مشتركة لطفلين.",
    details: "تصميم آمن للأطفال مع مساحة تخزين إضافية وألوان مبهجة.",
    featured: true,
    image: "/products/kids-room-shared.jpg",
  },
  {
    slug: "classic-living-set",
    name: "طقم صالة كلاسيكي",
    type: "غرف جلوس",
    price: 1900000,
    shortDescription:
      "طقم صالة بثلاثة قطع بستايل كلاسيكي لمحبي الديكور التقليدي.",
    details: "تفاصيل خشب فاخر ونقوش كلاسيكية مميزة.",
    featured: true,
    image: "/products/classic-living-set.jpg",
  },
  {
    slug: "offer-bedroom-dining",
    name: "عرض خاص – غرفة نوم + سفرة",
    type: "عروض خاصة",
    price: 3800000,
    shortDescription:
      "باقة مخفّضة لفترة محدودة تشمل غرفة نوم كاملة مع سفرة 6 كراسي.",
    details: "عرض لفترة محدودة، مناسب للتجهيز الكامل لشقة جديدة.",
    featured: true,
    image: "/products/offer-bedroom-dining.jpg",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function findProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function findProductByName(name: string): Product | undefined {
  return products.find((p) => p.name === name);
}
