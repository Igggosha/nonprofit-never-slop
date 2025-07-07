"use server"

function GenerateGuid()
{
    return crypto.randomUUID()
}

export default async function Search(query, nextPageToken)
{
    // console.log(query)
    let response = await fetch(`https://apis.roblox.com/search-api/omni-search?searchQuery=${query}&pageToken=${nextPageToken}&sessionId=${GenerateGuid()}`, {
        "headers": {
            // "accept": "application/json, text/plain, */*",
            // "accept-language": "en",
            // "cache-control": "no-cache",
            // "pragma": "no-cache",
            // "priority": "u=1, i",
            // "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
            // "sec-ch-ua-mobile": "?0",
            // "sec-ch-ua-platform": "\"macOS\"",
            // "sec-fetch-dest": "empty",
            // "sec-fetch-mode": "cors",
            // "sec-fetch-site": "same-site"
        },
        // "referrer": "https://www.roblox.com/",
        // "referrerPolicy": "strict-origin-when-cross-origin",
        // "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })
    console.log(response)
    let json = await response.json()
    console.log(json)
    return json




}