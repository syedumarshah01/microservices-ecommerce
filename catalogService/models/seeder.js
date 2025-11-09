import fs from 'fs/promises'
import axios from 'axios'

fs.readFile('./models/products_seed_data_with_images.json', 'utf-8')
.then(data => {
    const parsedData = JSON.parse(data)
    for (const element of parsedData) {
        request(element)
    }
})


const request = async(data) => {
    await axios.post('http://localhost:3000/products', data)
}