import {useRouter} from 'next/router'
import {client} from '../../utils/shopify'
import {useState} from 'react'
import {Button, Container, Grid, Header, Image, Input, List, Menu, Segment, Sidebar, Visibility} from 'semantic-ui-react'

const {Row, Column} = Grid
const Product = ({product}) => {
    const [image, setImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(0)
    const router = useRouter()
    const {productId} = router.query
    console.log({product});

    const addToCart = async () => {
        const storage = window.localStorage;
        let checkoutId = storage.getItem("checkoutId");
        if(!checkoutId){
            const checkout = await client.checkout.create();
            checkoutId = checkout.id;
            storage.setItem('checkoutId', checkoutId);
        }
        const cart = await client.checkout.addLineItems(checkoutId, [{
            variantId: product.variants[0].id,
            quantity
        }])
        storage.setItem('Cart', JSON.stringify(cart))
        console.log(cart)
    };

    return (
    <Grid container centered>
        <Row columns = {2}>
            <Column width = {10}>
                <Row><Image src = {image.src} /></Row>
                <Row>
                    <List divided horizontal>
                    {product.images.map((image, index) => {
                    return (
                        <List.Item key = {index} onClick = {()=>setImage(image)}>
                            <Image size = {'small'} avatar src = {image.src} />
                        </List.Item>
                    )
                })}
                </List>
                </Row>
            </Column>
            <Column style = {{marginTop:50}} width = {6}>
                <Input
                action = {{
                    color: "teal",
                    labelPosition: "left",
                    icon: "cart",
                    onClick : addToCart,
                    content: "Add To Cart",
                }}
                onChange = {(e, {value}) => setQuantity(Number(value))}
                type = "number"
                actionPosition = "left"
                placeholder = "Search..."
                defaultValue = "1"
                />
            </Column>
        </Row>
    </Grid>)
}

export async function getServerSideProps({query}){
    const productId = query.productId
    const product = await client.product.fetch(productId);
    return {props:{product: JSON.parse(JSON.stringify(product))}}
}

export default Product