import PQueue from "p-queue";
import { X_RATELIMIT_LIMIT_SECOND } from "~/lib/constant";
import { apiKeysLength } from "~/lib/apiKeys";

export const apiQueue = new PQueue({
  concurrency: X_RATELIMIT_LIMIT_SECOND * apiKeysLength,
  interval: 1000,
  intervalCap: X_RATELIMIT_LIMIT_SECOND * apiKeysLength,
});
