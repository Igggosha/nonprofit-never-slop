"use server"

type ImageBatchResponse = {
    data: [
        {
            requestId: string,
            errorCode: number,
            errorMessage: string,
            targetId: number,
            state: "Completed" | string,
            imageUrl: string,
            version: string
        }
    ]
}

export default async function GetImages(gameIds: number[] | string[])
{
    let requestBody = "["

    for (let i = 0; i < gameIds.length; i++)
    {
        requestBody += `{
            "requestId":"${gameIds[i]}::GameIcon:256x256:webp:regular:",
            "type":"GameIcon",
            "targetId":${gameIds[i]},
            "token":"",
            "format":"webp",
            "size":"256x256",
            "version":""
            }`
        if (i < gameIds.length - 1) requestBody += ","
    }

    requestBody += "]"

    let response = await fetch("https://thumbnails.roblox.com/v1/batch", {
        "headers": {
        },
        "referrer": "https://www.roblox.com/",
        "body": requestBody,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })

    let json: ImageBatchResponse = await response.json()
    return json
}