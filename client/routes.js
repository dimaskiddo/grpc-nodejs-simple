const express = require('express')
const router = express.Router()

const ctl = require('./controllers')


// -------------------------------------------------
// Route List
router.get('/', ctl.index)
router.get('/products', ctl.listProducts)
router.post('/products', ctl.insertProduct)
router.post('/products/:id', ctl.updateProduct)
router.delete('/products/:id', ctl.deleteProduct)
router.get('/products/:id', ctl.getProduct)


// -------------------------------------------------
// Export Module
module.exports = router
