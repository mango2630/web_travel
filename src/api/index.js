import request from './request'

// 首页订单概况
export function orderOverview (data){
    return request({
        url:'track/orderOverview',
        data,
        method: 'post'
    })
}
//系统监控接口
export function testData (data){
    return request({
        url:'api/didiRedis/monitoring',
        data,
        method: 'post'
    })
}
//用户数据-订单-赵宏伟
export function proData (data){
    return request({
        url:'api/didi/pro',
        data,
        method: 'post'
    })
}
//用户数据-留存率-赵宏伟
export function srsData (data){
    return request({
        url:'api/didi/srs',
        data,
        method: 'post'
    })
}
//用户数据-活跃-赵宏伟
export function asData (data){
    return request({
        url:'api/didi/as',
        data,
        method: 'post'
    })
}

//用户数据-注册用户-赵宏伟
export function rssData (data){
    return request({
        url:'api/didi/rss',
        data,
        method: 'post'
    })
}

export function orderGps (data){
    return request({
        url:'api/track/orderGps',
        data,
        method: 'post'
    })
}

// 平均速度
export function avgSpeed (data){
    return request({
        url:'api/track/avgSpeed',
        data,
        method: 'post'
    })
}


// 订单数量变化
export function hourOrderCount (data){
    return request({
        url:'track/hourOrderCount',
        data,
        method: 'post'
    })
}

// 订单统计
export function statistics (data){
    return request({
        url:'api/order/haikou/getProductCount',
        method: 'get'
    })
}

// 点击订单列表
export function getList (data){
    return request({
        url:'api/order/haikou/getHaiKouOrderByConditions/1/10',
        data,
        method: 'post'
    })
}

// 历史订单
export function historyTrackPoints (data){
    return request({
        url:'api/track/historyTrackPoints',
        data,
        method: 'post'
    })
}
// 实时订单
export function realtimeOrder (data){
    return request({
        url:'api/track/realtimeOrder',
        data,
        method: 'post'
    })
}

