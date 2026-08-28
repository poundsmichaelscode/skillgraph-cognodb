import type {
  ApiEnvelope,
  ApiErrorBody,
  CareerPathResult,
  DashboardStats,
  GraphEntityType,
  GraphResult,
  PaginatedEnvelope,
  PersonDetail,
  PersonSummary,
  RoleDetail,
  RoleSummary,
  SkillDetail,
  SkillSummary,
} from "@/types/api";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1"
).replace(/\/$/, "");

export class ApiError extends Error {
  public constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new ApiError(
      503,
      "API_UNAVAILABLE",
      "SkillGraph cannot reach its data service right now.",
    );
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
    throw new ApiError(
      response.status,
      body.error?.code ?? "REQUEST_FAILED",
      body.error?.message ?? "The request could not be completed.",
    );
  }

  return (await response.json()) as T;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await request<ApiEnvelope<DashboardStats>>("/stats");
  return response.data;
}

export async function getPeople(limit = 4): Promise<PersonSummary[]> {
  const parameters = new URLSearchParams({ page: "1", limit: String(limit) });
  const response = await request<PaginatedEnvelope<PersonSummary>>(
    `/people?${parameters.toString()}`,
  );
  return response.data;
}

interface CatalogPageInput {
  query?: string;
  page?: number;
  limit?: number;
}

function catalogParameters({
  query = "",
  page = 1,
  limit = 12,
}: CatalogPageInput): string {
  return new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
  }).toString();
}

export function getPeoplePage(input: CatalogPageInput = {}) {
  return request<PaginatedEnvelope<PersonSummary>>(
    `/people?${catalogParameters(input)}`,
  );
}

export async function getPerson(id: string): Promise<PersonDetail> {
  const response = await request<ApiEnvelope<PersonDetail>>(
    `/people/${encodeURIComponent(id)}`,
  );
  return response.data;
}

export function getSkillsPage(input: CatalogPageInput = {}) {
  return request<PaginatedEnvelope<SkillSummary>>(
    `/skills?${catalogParameters(input)}`,
  );
}

export async function getSkill(id: string): Promise<SkillDetail> {
  const response = await request<ApiEnvelope<SkillDetail>>(
    `/skills/${encodeURIComponent(id)}`,
  );
  return response.data;
}

export function getRolesPage(input: CatalogPageInput = {}) {
  return request<PaginatedEnvelope<RoleSummary>>(
    `/roles?${catalogParameters(input)}`,
  );
}

export async function getRole(id: string): Promise<RoleDetail> {
  const response = await request<ApiEnvelope<RoleDetail>>(
    `/roles/${encodeURIComponent(id)}`,
  );
  return response.data;
}

export async function getCareerPath(
  personId: string,
  roleId: string,
): Promise<CareerPathResult> {
  const response = await request<ApiEnvelope<CareerPathResult>>(
    `/career-path/${encodeURIComponent(personId)}/${encodeURIComponent(roleId)}`,
  );
  return response.data;
}

export async function getGraph(
  type: GraphEntityType,
  id: string,
): Promise<GraphResult> {
  const response = await request<ApiEnvelope<GraphResult>>(
    `/graph/${encodeURIComponent(type)}/${encodeURIComponent(id)}`,
  );
  return response.data;
}
