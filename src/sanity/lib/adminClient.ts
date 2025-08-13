import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, adminToken } from "../env";
// import baseUrl from "@/lib/baseUrl";

export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: adminToken
});