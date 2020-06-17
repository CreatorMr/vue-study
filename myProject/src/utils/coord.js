import th from "element-ui/src/locale/lang/th";

var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

//gcj-->bd
export function gcj02tobd09(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat]
};

//wgs84->bd09
export function wgs84tobd09(lng, lat) {
  // [mglng, mglat]  lng, lat
  var gcj = wgs84togcj02(lng, lat);
  return gcj02tobd09(gcj[0], gcj[1]);
};

function transformlat(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
};

export function wgs84togcj02(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  if (out_of_china(lng, lat)) {
    return [lng, lat]
  } else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat]
  }
};

//gcj->wgs84
export function gcj02towgs84(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  if (out_of_china(lng, lat)) {
    return [lng, lat]
  } else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat]
  }
};

//bd09->wgs84
export function bd09towgs84(lng, lat) {
  // [mglng, mglat]  lng, lat
  var gcj = bd09togcj02(lng, lat);
  return gcj02towgs84(gcj[0], gcj[1]);
};

//bd09->gcj02
export function bd09togcj02(lng,lat){
  var bd_lng =+lng;
  var bd_lat =+lat;
  var x = bd_lng-0.0065;
  var y = bd_lat-0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
  var theta = Math.atan2(bd_lat, bd_lng) + 0.000003 * Math.cos(bd_lng * x_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng,gg_lat];
};

function transformlng(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
};

//判断是否在国内，不在国内则不做偏移
function out_of_china(lng, lat) {
  var lat = +lat;
  var lng = +lng;
  // 纬度3.86~53.55,经度73.66~135.05
  return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
};

// 地图画线
export function point_line(map, list, num) {
  var ptsArr = []
  var points_list = list.split('|')
  for (var k = 0; k < points_list.length; k++) {
    var bdcoord = points_list[k].split(",");
    var pt = new BMap.Point(bdcoord[1], bdcoord[0]);
    // if (num == 0 & k == 0) {
    //   //设置中心
    //   map.centerAndZoom(pt, 10);
    // }
    ptsArr.push(pt);
  }
  var pline = new BMap.Polyline(ptsArr, {strokeColor: 'red', strokeWeight: 2});
  map.addOverlay(pline);
}

// 文件下载
export function download(content, filename) {
  let link = document.createElement('a')
  link.download = filename
  link.style.display = 'none'
  // 字符内容转变成blob地址
  let blob = new Blob([content])
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
