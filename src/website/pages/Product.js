import ProductDetail from "../components/layouts/ProductDetail"

const Product = (props) => {
    return (
        <>
            <ProductDetail action={props.action} />
        </>
    )
}
export default Product