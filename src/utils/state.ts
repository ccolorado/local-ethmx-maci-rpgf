import { isAfter } from "date-fns";
import { config } from "~/config";
import { useMaciPoll } from "~/hooks/useMaciPoll";

type AppState =
  | "LOADING"
  | "APPLICATION"
  | "REVIEWING"
  | "VOTING"
  | "RESULTS"
  | "TALLYING";

export const getAppState = (): AppState => {
  const now = new Date();
  const { isLoading, votingEndsAt, pollData, tallyData } = useMaciPoll();

  if (isLoading) {
    return "LOADING";
  }

  if (isAfter(config.registrationEndsAt, now)) return "APPLICATION";
  if (isAfter(config.reviewEndsAt, now)) return "REVIEWING";
  if (isAfter(votingEndsAt, now)) return "VOTING";
  if (!pollData?.isStateAqMerged || !tallyData) return "TALLYING";

  return "RESULTS";
};