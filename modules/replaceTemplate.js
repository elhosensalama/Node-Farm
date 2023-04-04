const replaceTemp = (temp, product) => {
    temp = temp
        .replace(/{%PRODUCTNAME%}/g, product.productName)
        .replace(/{%FROM%}/g, product.from)
        .replace(/{%PRICE%}/g, product.price)
        .replace(/{%IMAGE%}/g, product.image)
        .replace(/{%QUANTITY%}/g, product.quantity)
        .replace(/{%NUTRIENTSC%}/g, product.nutrientsc)
        .replace(/{%DESCRIPTION%}/g, product.description)
        .replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        temp = temp.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return temp;
};

module.exports = replaceTemp;
