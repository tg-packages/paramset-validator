module.exports = v => {
  const n = Number(v);
  return isNaN(n) ? v : n;
};
