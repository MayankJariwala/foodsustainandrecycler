const ip_address = 'http://10.192.199.51:5000/';
export const uploadFileToServer = async (image_uri) => {
    try {
        const data = JSON.stringify({
            'data': image_uri,
        });
        const response = await fetch(ip_address + 'processImage/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'image/jpeg',
            },
            body: data,
        });
        return await response.json();
    } catch (e) {
        return e;
    }
};

export const uploadProduct = async (image_uri, expiry_date) => {
    try {
        const data = JSON.stringify({
            'image': image_uri.split(',', 2)[1],
            'expiry_date': expiry_date,
        });
        const response = await fetch(ip_address + 'product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
        return await response.json();
    } catch (e) {
        return e;
    }
};


export const getExpiryList = async () => {
    try {
        const response = await fetch(ip_address + 'expiry/products/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (e) {
        return e;
    }
};


export const getRecipes = async (link) => {
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (e) {
        return e;
    }
};
