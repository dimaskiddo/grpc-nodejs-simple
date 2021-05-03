const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const productProto = protoLoader.loadSync('../protos/product.proto')
const productDefinition = grpc.loadPackageDefinition(productProto).product

const grpcHost = process.env.GRPC_SERVER_HOST || '127.0.0.1'
const grpcPort = process.env.GRPC_SERVER_PORT || 3000

const grpcClient = new productDefinition.ProductService(grpcHost+':'+grpcPort, grpc.credentials.createInsecure())


// -------------------------------------------------
// Index Root Function
function index(req, res) {
  let response = {
    "status": true,
    "code": 200,
    "message": "NodeJS GRPC Client in REST is running"
  }

  res.status(response.code).json(response)
}


// -------------------------------------------------
// List Products Function
function listProducts(req, res) {
  grpcClient.ListProducts({}, (err, results) => {
    if (!err) {
      let response = {
        "status": true,
        "code": 200,
        "message": "Success",
        "data": results.products
      }

      res.status(response.code).json(response)
    } else {
      let response = {
        "status": false,
        "code": 404,
        "message": "Failed",
        "errors": err.details        
      }

      res.status(response.code).json(response)
    }
  })
}


// -------------------------------------------------
// Insert Product Function
function insertProduct(req, res) {
  let product = {
    "name": req.body.name,
    "price": req.body.price
  }

  grpcClient.InsertProduct(product, (err, result) => {
    if (!err) {
      let response = {
        "status": true,
        "code": 201,
        "message": "Created"
      }
    
      res.status(response.code).json(response)
    } else {
      let response = {
        "status": false,
        "code": 500,
        "message": "Failed",
        "errors": "Internal Server Error"
      }
    
      res.status(response.code).json(response)
    }
  })
}


// -------------------------------------------------
// Update Product Function
function updateProduct(req, res) {
  let product = {
    "id": req.params.id,
    "name": req.body.name,
    "price": req.body.price
  }

  grpcClient.UpdateProduct(product, (err, result) => {
    if (!err) {
      let response = {
        "status": true,
        "code": 200,
        "message": "Updated"
      }
    
      res.status(response.code).json(response)
    } else {
      let response = {
        "status": false,
        "code": 500,
        "message": "Failed",
        "errors": "Internal Server Error"
      }
    
      res.status(response.code).json(response)
    }
  })
}


// -------------------------------------------------
// Delete Product Function
function deleteProduct(req, res) {
  grpcClient.DeleteProduct({ id: req.params.id }, (err, results) => {
    if (!err) {
      let response = {
        "status": true,
        "code": 200,
        "message": "Success"
      }

      res.status(response.code).json(response)
    } else {
      let response = {
        "status": false,
        "code": 404,
        "message": "Failed",
        "errors": err.details
      }

      res.status(response.code).json(response)
    }
  })
}


// -------------------------------------------------
// Get Product Function
function getProduct(req, res) {
  grpcClient.GetProduct({ id: req.params.id }, (err, results) => {
    if (!err) {
      let response = {
        "status": true,
        "code": 200,
        "message": "Success",
        "data": results
      }

      res.status(response.code).json(response)
    } else {
      let response = {
        "status": false,
        "code": 404,
        "message": "Failed",
        "errors": err.details
      }

      res.status(response.code).json(response)
    }
  })
}


// -------------------------------------------------
// Export Module
module.exports = {
  index,
  listProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProduct
}