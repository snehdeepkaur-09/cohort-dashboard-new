import type { Resident } from "@/lib/mockData";

const styles: Record<Resident["mlEligibility"], string> = {
  "ML Eligible": "bg-risk-low/15 text-risk-low border-risk-low/20",
  "Excluded": "bg-risk-critical/15 text-risk-critical border-risk-critical/20",
  "Pending Review": "bg-risk-medium/15 text-risk-medium border-risk-medium/20",
};

export function ConsentBadge({ status }: { status: Resident["mlEligibility"] }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold rounded-md border px-2 py-0.5 ${styles[status]}`}>
      {status}
    </span>
  );
}
