import Client from 'shopify-buy'

const client = Client.buildClient({
    domain: 'dearpartners.myshopify.com',
    storefrontAccessToken: '273536c35d8bb2fcf47c01c084f41c31'
});

export {client}