import { useRouter } from "next/router";
import { div } from "prelude-ls";
import 'styles/Product.modules.css'

const Product = () => {

    const chicken_sand = {
        id: 1,
        name: "Original Chicken Sandwich",
        price: [5.99, 10.99],
        desc: "Lorem"
    };

    return <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>

            </div>
        </div>

        <div className={styles.right}>

        </div>
    </div>
}

export default Product;