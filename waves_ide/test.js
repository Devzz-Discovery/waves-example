const accountASeed = "wedding hockey atom gift creek clarify typical obvious luggage tuna jewel play cliff organ noble"
const accountBAdress = "3Mq92YvTGg87wCG2QRk3r2gFxJoagKaVaYS"

console.log("address with Waves:")
console.log(address(accountASeed))

it('transfer', async function(){
    let tx = await broadcast(transfer({amount: 100000000, recipient: accountBAdress}, accountASeed))
    await waitForTx(tx.id)
    console.log(JSON.stringify(tx))
})

it('data transaction', async function(){
    let aboutObject = {
        "name": "Devzz",
        "occupation": "Devzz Space"
    }
    let aboutString = JSON.stringify(aboutObject)
    let tx = await broadcast(data({data: [{key: "devz-user-data", value: aboutString}]}, accountASeed))
    await waitForTx(tx.id)
})