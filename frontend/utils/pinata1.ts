
export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
            pinata_api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
        body: formData,
    });

    const data = await response.json();
    const cid = data.IpfsHash;
    const imageUrl = `https://ipfs.io/ipfs/${cid}`
    return imageUrl;
    // return data.IpfsHash;
};

export const uploadJson = async (
    title: string,
    description: string,
    imageHash: string
) => {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            pinata_api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
            pinata_secret_api_key: `${process.env.NEXT_PUBLIC_API_SECRET}`,
        },
        body: JSON.stringify({
            name: title,
            description: description,
            image: `${imageHash}`,
        }),
    });

    const data = await response.json();
    return data.IpfsHash;
};