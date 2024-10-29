import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "w7fttgl9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-03",
});

export default client;
