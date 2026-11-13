export default function sitemap() {
  const baseUrl = "https://apartmentsedessa.com";

  // Includes all currently implemented routes in the project.
  const routes = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/apartments`, priority: 1.0 },
    { url: `${baseUrl}/location`, priority: 1.0 },
    { url: `${baseUrl}/attractions`, priority: 1.0 },
    { url: `${baseUrl}/faq`, priority: 1.0 },
    { url: `${baseUrl}/contact`, priority: 1.0 },
  ];

  const lastMod = new Date().toISOString().split("T")[0];

  return routes.map((r) => ({
    url: r.url,
    lastModified: lastMod,
    priority: r.priority,
  }));
}

