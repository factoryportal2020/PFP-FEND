import ProductOverview from "../components/layouts/ProductOverview"

const Shop = () => {
    return (
        <>
            <div className="shop_div">
                <ProductOverview pagination={true} />
            </div>
        </>
    )
}
export default Shop