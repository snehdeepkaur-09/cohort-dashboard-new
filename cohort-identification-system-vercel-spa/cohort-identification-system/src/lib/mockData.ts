export interface Resident {
  id: string;
  name: string;
  riskScore: number | null;
  riskLevel: "Low" | "Medium" | "High" | "Critical" | null;
  consentStatus: "Granted" | "Pending" | "Denied";
  dataSource: string;
  missingData: boolean;
  factors: string[];
  aiInsight: string;
  mlEligibility: "ML Eligible" | "Excluded" | "Pending Review";
}

const firstNames = ["James", "Sarah", "Mohammed", "Emily", "David", "Fatima", "Robert", "Lisa", "Ali", "Karen", "Michael", "Priya", "Thomas", "Angela", "Hassan", "Diane", "Peter", "Amina", "Richard", "Sophie"];
const lastNames = ["Smith", "Jones", "Khan", "Williams", "Brown", "Ahmed", "Taylor", "Patel", "Wilson", "Singh", "Johnson", "Ali", "Davies", "Begum", "Evans", "Hussain", "Walker", "Kaur", "Roberts", "Mahmood"];

const dataSources = ["Housing Register", "Social Care DB", "Benefits System", "NHS Referral", "Council Tax"];
const factorOptions = [
  "Rent arrears (3+ months)", "Previous eviction notice", "Social care referral history",
  "Disability living allowance", "Single parent household", "Unemployment >12 months",
  "Mental health service usage", "Overcrowded housing", "Anti-social behaviour reports",
  "Emergency housing application", "Debt management referral", "Fuel poverty indicator"
];

function getRiskLevel(score: number): "Low" | "Medium" | "High" | "Critical" {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 35) return "Medium";
  return "Low";
}

function generateResident(i: number): Resident {
  const rawScore = Math.floor(Math.random() * 100);
  const consentStatus = (["Granted", "Granted", "Granted", "Pending", "Denied"] as const)[Math.floor(Math.random() * 5)];

  const isGranted = consentStatus === "Granted";
  const score = isGranted ? rawScore : null;
  const level = isGranted ? getRiskLevel(rawScore) : null;
  const numFactors = !isGranted ? 0 : level === "Critical" ? 4 : level === "High" ? 3 : level === "Medium" ? 2 : 1;
  const shuffled = [...factorOptions].sort(() => 0.5 - Math.random());

  return {
    id: `BCC-${String(10000 + i).slice(1)}`,
    name: `${firstNames[i % firstNames.length]} ${lastNames[(i + 7) % lastNames.length]}`,
    riskScore: score,
    riskLevel: level,
    consentStatus,
    dataSource: dataSources[Math.floor(Math.random() * dataSources.length)],
    missingData: Math.random() > 0.75,
    factors: shuffled.slice(0, numFactors),
    aiInsight: !isGranted
      ? consentStatus === "Denied"
        ? "Excluded from ML predictions — consent denied."
        : "Awaiting consent — not yet processed by ML model."
      : level === "Critical"
      ? "Multiple compounding risk factors detected. Immediate multi-agency intervention recommended."
      : level === "High"
      ? "Elevated risk profile. Early intervention through targeted support services advised."
      : level === "Medium"
      ? "Moderate risk indicators present. Monitoring and preventative support recommended."
      : "Low risk profile. Standard service provision appropriate.",
    mlEligibility: consentStatus === "Granted" ? "ML Eligible" : consentStatus === "Denied" ? "Excluded" : "Pending Review",
  };
}

export const residents: Resident[] = Array.from({ length: 120 }, (_, i) => generateResident(i));

const granted = residents.filter(r => r.consentStatus === "Granted");

export const cohortStats = {
  total: residents.length,
  mlEligible: granted.length,
  low: granted.filter(r => r.riskLevel === "Low").length,
  medium: granted.filter(r => r.riskLevel === "Medium").length,
  high: granted.filter(r => r.riskLevel === "High").length,
  critical: granted.filter(r => r.riskLevel === "Critical").length,
  excluded: residents.filter(r => r.consentStatus === "Denied").length,
  pending: residents.filter(r => r.consentStatus === "Pending").length,
  dataQuality: 87.3,
};

export const riskDistribution = [
  { name: "Low", count: cohortStats.low, fill: "var(--color-risk-low)" },
  { name: "Medium", count: cohortStats.medium, fill: "var(--color-risk-medium)" },
  { name: "High", count: cohortStats.high, fill: "var(--color-risk-high)" },
  { name: "Critical", count: cohortStats.critical, fill: "var(--color-risk-critical)" },
];
