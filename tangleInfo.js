'use strict'

const axios = require('axios')


module.exports = (promclient, config) => {

    let module = {}

    let Gauge = promclient.Gauge

    let numberOfNodes = new Gauge({
        name: 'tangle_number_nodes_count',
        help: 'Total nodes queried'
    })
    let appVersion = new Gauge({
        name: 'tangle_number_nodes_by_IRI_version',
        help: 'Count by version of nodes queried',
        labelNames: ['version']
    })
    let neighborCount = new Gauge({
        name: 'tangle_number_neighbors_count',
        help: 'Count by number of neighbors of nodes queried',
        labelNames: ['neighbors']
    })
    let milestoneOffsetCount = new Gauge({
        name: 'tangle_number_milestone_offset_count',
        help: 'Count by milestone offset of nodes queried',
        labelNames: ['offset']
    })
    let tipsMean = new Gauge({
        name: 'tangle_number_tips_mean',
        help: 'Mean Tip count across all nodes queried'
    })
    let tipsMedian = new Gauge({
        name: 'tangle_number_tips_median',
        help: 'Median of Tip count across all nodes queried'
    })
    let tipsMax = new Gauge({
        name: 'tangle_number_tips_max',
        help: 'Max of Tip count across all nodes queried'
    })
    let tips90thPercentile = new Gauge({
        name: 'tangle_number_tips_percentile_90',
        help: '90th percentile of Tip count across all nodes queried'
    })
    let toRequestMean = new Gauge({
        name: 'tangle_number_toRequest_mean',
        help: 'Mean toRequest count across all nodes queried'
    })
    let toRequestMedian = new Gauge({
        name: 'tangle_number_toRequest_median',
        help: 'Median of toRequest count across all nodes queried'
    })
    let toRequestMax = new Gauge({
        name: 'tangle_number_toRequest_max',
        help: 'Max of toRequest count across all nodes queried'
    })
    let toRequest90thPercentile = new Gauge({
        name: 'tangle_number_toRequest_percentile_90',
        help: '90th percentile of toRequest count across all nodes queried'
    })
    

    module.getInfo = async () => {

        try {
            let info = await axios.get(config.tangle_info_url)
            numberOfNodes.set(info.data.nodesQueried)
            
            Object.entries(info.data.appVersion).forEach(
                ([key, value]) => appVersion.set({'version': key}, value )
            )

            Object.entries(info.data.neighbors).forEach(
                ([key, value]) => neighborCount.set({'neighbors': key}, value )
            )

            Object.entries(info.data.milestoneOffset).forEach(
                ([key, value]) => milestoneOffsetCount.set({'offset': key}, value )
            )

            tipsMean.set(info.data.tips.statistics.mean)
            tipsMedian.set(info.data.tips.statistics.median)
            tipsMax.set(info.data.tips.statistics.max)
            tips90thPercentile.set(info.data.tips.statistics.percentile90)

            toRequestMean.set(info.data.transactionsToRequest.statistics.mean)
            toRequestMedian.set(info.data.transactionsToRequest.statistics.median)
            toRequestMax.set(info.data.transactionsToRequest.statistics.max)
            toRequest90thPercentile.set(info.data.transactionsToRequest.statistics.percentile90)

        } catch (e) {
            return e
        }
    }
    return module
}

