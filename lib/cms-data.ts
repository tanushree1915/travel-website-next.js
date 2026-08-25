import { supabase } from "@/lib/supabase";

export async function getHeroData() {
  const { data, error } = await supabase
    .from("hero_banner")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Hero CMS error:", error);
    return [];
  }

  return data ?? [];
}

export async function getDealsData() {
  const { data, error } = await supabase
    .from("travel_exclusives")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Deals CMS error:", error);
    return [];
  }

  return (data ?? []).map((deal) => ({
    id: deal.id,
    name: deal.property_name,
    location: deal.location,
    price: deal.starting_price
      ? `TSh ${Number(deal.starting_price).toLocaleString("en-US")}`
      : "",
    badge: deal.badge,
    image: deal.image,
  }));
}

export async function getDestinationsData() {
  const { data, error } = await supabase
    .from("popular_destinations")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Destinations CMS error:", error);
    return [];
  }

  return data ?? [];
}

export async function getPromosData() {
  const { data, error } = await supabase
    .from("promo_banners")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Promos CMS error:", error);
    return [];
  }

  return (data ?? []).map((promo) => ({
    id: promo.id,
    tag: promo.badge_label,
    title: promo.headline,
    subtitle: "",
    imagePath: promo.background_image,
    link: promo.link,
  }));
}

export async function getTestimonialsData() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Testimonials CMS error:", error);
    return [];
  }

  return data ?? [];
}

export async function getInsightsData() {
  const { data, error } = await supabase
    .from("latest_insights")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Insights CMS error:", error);
    return [];
  }

  return (data ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    date: post.date,
    categories: post.tags
      ? post.tags.split(",").map((tag: string) => tag.trim())
      : [],
  }));
}