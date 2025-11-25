import { Worker } from "bullmq";
import { CartJob, UserCart } from "../../types/types";
import Cart from "../models/cartModel";
import { CartItem} from "../../types/types";


const connection = {
    host: 'localhost',
    port: 6379
}

const cartWorker = new Worker('cart-persistence',
    async(job) => {
        const {userId, cartItem, productIds, action} = job.data
        if(action === 'createOrUpdateCart') {
            createOrUpdateCart(userId, cartItem)
        } else if(action === 'removeFromCart') {
            removeFromCart(userId, productIds)
        }        
    },
    {
        connection,
        concurrency: 10,
    }
)



const createOrUpdateCart = async (userId: String, cartItem: CartItem) => {
    const user = await Cart.findOne({userId})

    if(!user) {
        const cartData = {
            userId,
            cartData: [cartItem]
        }

        try {
            await Cart.create(cartData)
        } catch(err) {
            console.log("Error occurred while creating Cart Item...")
            console.log(err)
        }
        
    } else {
        const isProductAlreadyInCart = user.cartData.find(item => item.id == cartItem.id)

        if(!isProductAlreadyInCart) {
            const cartData = [cartItem, ...user.cartData]

            try {
                await Cart.findOneAndUpdate({userId: userId}, {cartData: cartData})
            } catch(err) {
                console.log("Error occurred while updating Cart...")
                console.log(err)
            }
            
        } else {
            for (const productItem of user.cartData) {
                if(productItem.id == cartItem.id) {
                    productItem.quantity = cartItem.quantity
                }
            }
            user.markModified('cartData')
            try {
                await user.save()
            } catch(err) {
                console.log("Error occurred while updaing the quantity...")
                console.log(err)
            }
            
            
        }
    }
}


const removeFromCart = async(userId: String, productIds: String[]) => {
    const user = await Cart.findOne({userId}) as any
    const itemsNotToBeRemoved = []

    for (const productItem of user.cartData) {
        if(!productIds.includes(productItem.id)) itemsNotToBeRemoved.push(productItem)
    }

    user.cartData = itemsNotToBeRemoved
    user.markModified('cartData')
    await user.save()
    

}

cartWorker.on("completed", () => {
    console.log("Completed")
})

cartWorker.on("failed", () => {
    console.log("Failed")
})

export default cartWorker
