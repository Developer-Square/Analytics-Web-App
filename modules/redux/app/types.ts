export interface IPaginationResult {
    documents: Record<string, any>[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}