import type { PackageId } from "@/lib/service-slugs";
import type { ServiceDetail, ServiceDetails } from "./types";
import { PART_A } from "./part-a";
import { PART_B } from "./part-b";
import { PART_C } from "./part-c";
import { PART_D } from "./part-d";

// Server-side only: the service page passes just its own entry to the client,
// so a phone never downloads the long copy of all twelve services.
export const SERVICE_DETAILS: ServiceDetails = { ...PART_A, ...PART_B, ...PART_C, ...PART_D };

export const getServiceDetail = (id: string): ServiceDetail | undefined => SERVICE_DETAILS[id as PackageId];
