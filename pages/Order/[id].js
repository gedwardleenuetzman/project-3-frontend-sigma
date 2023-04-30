import { useRouter } from "next/router";
import { div } from "prelude-ls";
import styles from '../_app.js';
import Image from 'next/image';
import chkImg from '../public/ChickenSandwich.jpg';

const Product = () => {

    const chicken_sand = {
        id: 1,
        //img: "/z../public/ChickenSandwich.jpg",
        name: "Original Chicken Sandwich",
        price: [5.99, 10.99],
        desc: "Lorem"
    };

    return <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={chkImg} layout="fill" />
            </div>
        </div>

        <div className={styles.right}>

        </div>
    </div>
}

export default Product;