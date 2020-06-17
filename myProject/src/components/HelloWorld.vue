<template>
<div style="height: 100%;">
    <h3>网格划分</h3>
    <div>
        <span>
        </span>
        <label> &nbsp;纬度边界&nbsp;：</label>
        <el-input v-model="lat_min" size="mini" placeholder="最小纬度" style="width: 200px"></el-input>
        <label> &nbsp;-&nbsp; </label>
        <el-input v-model="lat_max" size="mini" placeholder="最大纬度" style="width: 200px"></el-input>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <label>数量（个）： </label>
        <el-input-number v-model="length_num" :min="0" :max="5000" size="mini" style="width: 200px"></el-input-number>
        <label> &nbsp;*&nbsp; </label>
        <el-input-number v-model="wide_num" :min="0" :max="5000" size="mini" style="width: 200px"></el-input-number>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label> 上传坐标系 ：</label>
        <el-radio-group v-model="radio" size="medium">
            <el-radio label="1" value='1'>BD-09</el-radio>
            <el-radio label="2" value='2'>GCJ-02</el-radio>
            <el-radio label="3" value='3'>WGS-84</el-radio>
        </el-radio-group>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button type="primary" round @click="gridCreate(1)" size="medium"> Grid View</el-button>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <br>
        <br>
        <label> &nbsp;经度边界&nbsp;：</label>
        <el-input v-model="lng_min" size="mini" placeholder="最小经度" style="width: 200px"></el-input>
        <label> &nbsp;-&nbsp; </label>
        <el-input v-model="lng_max" size="mini" placeholder="最大经度" style="width: 200px"></el-input>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
        <label> 长宽（米）：</label>
        <el-input-number v-model="length_size" :min="0" :max="10000" size="mini" style="width: 200px"></el-input-number>
        <label> &nbsp;*&nbsp; </label>
        <el-input-number v-model="wide_size" :min="0" :max="10000" size="mini" style="width: 200px"></el-input-number>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <label>下载坐标系 ： </label>
        <el-radio-group v-model="radio1" size="medium">
            <el-radio label="1" value='1'>BD-09</el-radio>
            <el-radio label="2" value='2'>GCJ-02</el-radio>
            <el-radio label="3" value='3'>WGS-84</el-radio>
        </el-radio-group>
        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <el-button type="primary" round @click="downloadFile()" size="medium">Download</el-button>
        <br>
        <br>
        <div class="map-wrap">
            <baidu-map :center="center" :zoom="zoom" @ready="handler" :style="select" :scroll-wheel-zoom='true'>
            </baidu-map>
        </div>

    </div>
    <br>
    <br>
</div>
</template>

<script>
import * as geoutil from "../utils/coord"

export default {
    data() {
        return {
            select: {
                width: '100%',
                height: '',
                marginBottom: '10px'
            },
            center: {
                lng: 116.480559,
                lat: 39.978634
            },
            zoom: 13,
            lat_min: 39.46343923,
            lat_max: 41.0524079,
            lng_min: 115.44131368,
            lng_max: 117.50518555,
            length_num: 5,
            wide_num: 6,
            length_size: 0,
            wide_size: 0,
            radio: '1',
            radio1: '1',
            map: null,
            grid_len_num: 0,
            grid_wide_num: 0,
            lat_grid: 0,
            lng_grid: 0,
            content: [],
            grid_dict: {},
            coordinate1: [],
            coordinate2: [],
            coordinate3: []
        }
    },
    methods: {
        hh() {
            //获取窗口的高度，减去一个定值，你可以自己* 乘以一个小数
            this.select.height = (window.innerHeight) - 350 + 'px';
        },
        handler({
            BMap,
            map
        }) {
            let point = new BMap.Point(116.404023, 39.935409);
            map.centerAndZoom(point, 15);
            this.map = map;
            this.hh();
            // map.addControl(new BMap.NavigationControl())
            // map.addOverlay(marker) // 将标注添加到地图中
        },
        async gridCreate(e) {
            // 坐标转换
            if (this.radio === '1') {} else if (this.radio === '2') {
                //gcj
                this.coordinate1 = geoutil.gcj02tobd09(this.lng_min, this.lat_min);
                this.coordinate2 = geoutil.gcj02tobd09(this.lng_max, this.lat_max);
                [this.lng_min, this.lat_min] = this.coordinate1;
                [this.lng_max, this.lat_max] = this.coordinate2;
                // console.info(this.lng_min, this.lat_min);
            } else {
                //wgs
                this.coordinate1 = geoutil.wgs84tobd09(this.lng_min, this.lat_min);
                this.coordinate2 = geoutil.wgs84tobd09(this.lng_max, this.lat_max);
                [this.lng_min, this.lat_min] = this.coordinate1;
                [this.lng_max, this.lat_max] = this.coordinate2;
            }
            // 计算grid
            if (this.lat_min >= 0 && this.lat_max > 0 && this.lng_min >= 0 && this.lng_max > 0) {
                if (this.length_num > 0 && this.wide_num > 0) {
                    this.grid_len_num = this.length_num;
                    this.grid_wide_num = this.wide_num;
                } else if (this.length_size > 0 && this.wide_size > 0) {
                    let params = {
                        lat_min: this.lat_min,
                        lat_max: this.lat_max,
                        lng_min: this.lng_min,
                        lng_max: this.lng_max
                    };
                    await this.axios.get('/api/geo/grid', {
                        params: params
                    }).then(res => {
                        if (res.data.code === 200) {
                            const lng_length = res.data.data[0];
                            const lat_length = res.data.data[1];
                            this.grid_len_num = Math.ceil(lng_length / this.length_size);
                            this.grid_wide_num = Math.ceil(lat_length / this.wide_size);
                            console.info('长' + ':' + String(this.grid_len_num) + '宽' + ':' + String(this.grid_wide_num))
                        } else {
                            alert("检查传递参数")
                        }
                    }).catch(err => {
                        alert(err)
                    })
                } else {
                    alert('网格长宽数或网格长宽长度均未输入，请输入');
                    return
                }
            } else {
                alert('经纬度边界未输入，请输入');
                return;
            }
            var map = this.map;
            this.map.clearOverlays();
            // 计算网格经纬度间距
            this.lat_grid = (this.lat_max - this.lat_min) / this.grid_wide_num;
            this.lng_grid = (this.lng_max - this.lng_min) / this.grid_len_num;
            // 画横线
            for (let i = 0; i <= this.grid_wide_num; i++) {
                let lat_line = '';
                let lat = Number(this.lat_max) - i * this.lat_grid;
                for (let j = 0; j <= this.grid_len_num; j++) {
                    let lng = Number(this.lng_min) + j * this.lng_grid;
                    lat_line = lat_line + String(lat) + ',' + String(lng) + '|';
                }
                lat_line = lat_line.substring(0, lat_line.length - 1);
                geoutil.point_line(this.map, lat_line, 1);
            }
            // 画竖线
            for (let i = 0; i <= this.grid_len_num; i++) {
                let lng_line = '';
                let lng = Number(this.lng_min) + i * this.lng_grid;
                for (let j = 0; j <= this.grid_wide_num; j++) {
                    let lat = Number(this.lat_max) - j * this.lat_grid;
                    lng_line = lng_line + String(lat) + ',' + String(lng) + '|'
                }
                lng_line = lng_line.substring(0, lng_line.length - 1);
                geoutil.point_line(this.map, lng_line, 1);
            }
            // 设置中心点
            let center_lat = this.lat_max - this.grid_wide_num / 2 * this.lat_grid;
            let center_lng = Number(this.lng_min) + Number(this.grid_len_num / 2 * this.lng_grid);
            let center = new BMap.Point(center_lng, center_lat);
            this.map.centerAndZoom(center, 10);
        },
        downloadFile: function () {
            // 下载文件的坐标格式{'0,1':[min_lat,max_lat,min_lng,max_lng]} 左上角为0,0
            this.content = [];
            let w_lat = '';
            let w_lng = '';
            if (this.grid_wide_num > 0 && this.grid_len_num > 0) {
                for (let i = 0; i < this.grid_wide_num; i++) {
                    let lat = Number(this.lat_max) - i * this.lat_grid;
                    for (let j = 0; j < this.grid_len_num; j++) {
                        let lng = Number(this.lng_min) + j * this.lng_grid;
                        // console.info(String(i) + ',' + String(j));
                        if (this.radio1 === '1') {
                            w_lat = lat;
                            w_lng = lng;
                        } else if (this.radio1 === '2') {
                            //gcj
                            this.coordinate3 = geoutil.bd09togcj02(lng, lat);
                            w_lat = this.coordinate3[1];
                            w_lng = this.coordinate3[0];
                            // console.info(this.lng_min, this.lat_min);
                        } else {
                            //wgs
                            this.coordinate3 = geoutil.bd09towgs84(lng, lat);
                            w_lat = this.coordinate3[1];
                            w_lng = this.coordinate3[0];
                        }
                        this.grid_dict[String(i) + ',' + String(j)] = [w_lat - this.lat_grid, w_lat, w_lng, w_lng + this.lng_grid];
                    }
                }
            } else {
                alert('请先点击 Grid View 😎😎😎');
                return
            }
            this.content.push(this.grid_dict);
            console.info(this.content);
            let filecontent = JSON.stringify(this.content);
            // console.info(filecontent)
            if ('download' in document.createElement('a')) {
                geoutil.download(filecontent, 'grid_dict.json')
            } else {
                alert('浏览器不支持')
            }
        }
    }
}
</script>

<style scoped>
h1,
h2 {
    font-weight: normal;
}

body {
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.div {
    margin: 0 auto;
    border: 2px solid darkgreen;
    padding-top: 10px;
}

.map-wrap {
    display: flex;
    flex: 1;

}
</style>
