"use server"
export default async function GetGuid()
{
    return crypto.randomUUID()
}