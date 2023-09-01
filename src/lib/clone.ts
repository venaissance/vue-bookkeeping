function clone<X>(data: X): X {
  console.log("🚀 xxxxxxxx ~ file: clone.ts:2 ~ data:", data);
  return JSON.parse(JSON.stringify(data));
}

export default clone;