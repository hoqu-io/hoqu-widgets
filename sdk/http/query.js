export const parseQueryString = query =>
  decodeURIComponent(query)
    .replace(/^\?/, '')
    .split('&')
    .map(item => /([^=]+)=(.*)/.exec(item))
    .reduce((result, itemParts) => {
      if (!Array.isArray(itemParts)) {
        return result;
      }
      const [item, name, value] = itemParts;
      if (name) {
        return Object.assign({}, result, {
          [name]: value ? value : true,
        });
      }
      return result;
    }, {});
