export const isSafeHttpUrl=(value:unknown):value is string=>{if(typeof value!=='string'||value.length>4096)return false;try{const url=new URL(value);return url.protocol==='https:'||url.protocol==='http:'}catch{return false}};
export const isSafeDataImage=(value:unknown):value is string=>typeof value==='string'&&value.length<=5242880&&/^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value);
export const safeText=(value:unknown,max=10000)=>typeof value==='string'?value.slice(0,max):'';
export const safeIds=(value:unknown)=>Array.isArray(value)?value.filter((id):id is string=>typeof id==='string'&&id.length<=128).slice(0,100):[];
