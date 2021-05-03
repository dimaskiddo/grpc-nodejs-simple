const express = require('express')
const router = express.Router()

const ctl = require('./grpc-client')


// -------------------------------------------------
// Route List
router.get('/', ctl.index)
router.get('/api/v1/products', ctl.listProducts)
router.post('/api/v1/products', ctl.insertProduct)
router.post('/api/v1/products/:id', ctl.updateProduct)
router.delete('/api/v1/products/:id', ctl.deleteProduct)
router.get('/api/v1/products/:id', ctl.getProduct)


// -------------------------------------------------
// Export Module
module.exports = router
