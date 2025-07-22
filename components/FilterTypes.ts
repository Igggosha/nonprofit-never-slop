export type ComplexFilters = {
    allowedGenres?: string[]
}
export type SimpleFilters =
{
    minPlayers?: number;
    maxPlayers?: number;
    minVoteRatio?: number;
    minMinAge?: number;
    maxMinAge?: number;
}