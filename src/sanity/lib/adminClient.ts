import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
// import baseUrl from "@/lib/baseUrl";


export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_ADMIN_TOKEN||""
});