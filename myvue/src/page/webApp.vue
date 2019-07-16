<template>
<div>
    <draggable :options="{group:'people',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}" v-model="list2" @change="change" @start="start" @end="end" :move="move" style="display: inline-block; width:190px;height: 200px;background: #eee;overflow: auto">
        <li v-for="(item, index) in list2" :class="setclass(item,index)" :key="index">
            {{item.name}}
        </li>
    </draggable>
</div>
</template>

<script>
// 引入拖拽组件
import draggable from 'vuedraggable'
export default {
    name: 'demo',
    components: {
        //调用组件
        draggable,
    },
    data() {
        return {
            list2: [{
                    id: 1,
                    name: 'a'
                },
                {
                    id: 2,
                    name: 'b'
                },
                {
                    id: 3,
                    name: 'c'
                },
                {
                    id: 4,
                    name: 'd'
                },
                {
                    id: 5,
                    name: 'e'
                },
                {
                    id: 6,
                    name: 'f'
                },
            ]
        }
    },
    methods: {
		setclass(item,index) {
			if(index%2 == 1) {
				return "background:red";
			} else {
				return "background:green";
			}
		},
        //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
        change: function (evt) {
            console.log(evt)
        },
        //start ,end ,add,update, sort, remove 得到的都差不多
        start: function (evt) {
            console.log(evt)
        },
        end: function (evt) {
            console.log(evt)
            evt.item //可以知道拖动的本身
            evt.to // 可以知道拖动的目标列表
            evt.from // 可以知道之前的列表
            evt.oldIndex // 可以知道拖动前的位置
            evt.newIndex // 可以知道拖动后的位置
        },
        move: function (evt, originalEvent) {
            console.log(evt)
            console.log(originalEvent) //鼠标位置
        }
    }
}
</script>
