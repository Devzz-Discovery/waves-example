const WAVES = 10 ** 8;
const HOLDER_WAVES = 4 * WAVES

// attention! need 4 waves in Account
describe('New token test suite', async function () {

    before(async function () {
        await setupAccounts({holder: HOLDER_WAVES});
    });    
    
    it('create custom token', async function() {
        const tokenParamsCustomCurrency = {
            name: "xRUB",
            quantity: 100000000,
            decimals: 2,
            reissuable: false,
            description: "New World Currency"           
        };

        const signedIssueTx = issue(tokenParamsCustomCurrency, accounts.holder);
        let tx = await broadcast(signedIssueTx);
        await waitForTx(tx.id)

        console.log("tx / token id: " + tx.id)
    })

    it('create indivisible token', async function() {
        const tokenParamsCustomCurrency = {
            name: "burger cupon",
            quantity: 100,
            decimals: 0,     // indivisible
            reissuable: true,
            description: "New Burger Prince fastfood"           
        };

        const signedIssueTx = issue(tokenParamsCustomCurrency, accounts.holder);
        let tx = await broadcast(signedIssueTx);
        await waitForTx(tx.id)

        console.log("tx / token id: " + tx.id)
    })

     it('re-issue coupon smart token', async function() {
        const tokenParamsCustomCurrency = {
            name: "HOT-DOG",
            quantity: 10,
            decimals: 0,
            reissuable: true,
            description: "New biggest awesome umbelivible Hot Dog"           
        };

        const signedIssueTx = issue(tokenParamsCustomCurrency, accounts.holder);
        let tx = await broadcast(signedIssueTx);
        await waitForTx(tx.id)

        const tokenParams = {
            quantity: 10,
            assetId: tx.id,
            reissuable: true,
            description: "New biggest awesome umbelivible Hot Dog"           
        };

        const signedReissueTx = reissue(tokenParams, accounts.holder);
        let reTx = await broadcast(signedReissueTx);
        await waitForTx(reTx.id)

        console.log("tx / token id: " + reTx.id)
    })
})