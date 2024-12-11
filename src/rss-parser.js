const parse = (data) => {
    const parser = new DOMParser();
    const parsedData = parser.parseFromString(data, 'application/xml');
};