let datajson = {
    "title": "t-Shit",
    "coupon_price": 100,
    "old_price": 1500,
    "new_price": 1100,
    "address": "Universe",
    "description": "t-Shirt coupon",
    "image": "www.google.com"
}

const WAVES = 10 ** 8;

const BAZAR_WAVES = 0.05 * WAVES
const SUPPLIER_WAVES = 0.05 * WAVES
const CUSTOMER_WAVES = 0.05 * WAVES

describe('Coupon bazar test suite', async function () {

    before(async function () {

        await setupAccounts({bazar: BAZAR_WAVES, supplier: SUPPLIER_WAVES, customer: CUSTOMER_WAVES});
        
        const scriptC = compile(file('bazar.ride'));
        const ssTx = setScript({script:scriptC}, accounts.bazar);
        await broadcast(ssTx);
        await waitForTx(ssTx.id)
        console.log('Script has been set')
    });    
    
    it('add new bazar item from supplier', async function(){
        let ts = invokeScript({
            dApp: address(accounts.bazar),
            call:{
                function:"addItem",
                args:[
                    {type:"string", value: datajson.title},
                    {type: "integer", value: datajson.coupon_price},
                    {type: "string", value: JSON.stringify(datajson)}        
                ]},
                payment: []
        }, accounts.supplier)
        let tx = await broadcast(ts)
        await waitForTx(tx.id)
    })

    it('purchase item', async function() {
        let item = "item_" + accounts.customer
         console.log("Cur height: " + item)
        let ts = invokeScript({
            dApp: address(accounts.bazar),
            call: {
                function: "purchase",
                args:[
                    {type: "string", value: item}
                ]},
                payment: [{amount: datajson.coupon_price, assetId: null}]
            }, accounts.customer)
        let tx = await broadcast(ts)
        await waitForTx(tx.id)
    })
})