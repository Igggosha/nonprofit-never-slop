"use server"
export default function GetGuid()
{
    return crypto.randomUUID()
}